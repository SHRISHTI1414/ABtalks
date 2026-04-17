import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { verifyPassword, createToken, setSession } from "@/lib/auth";
import { loginSchema } from "@/lib/validations/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      const first = parsed.error.flatten().fieldErrors;
      const message = first.password?.[0] ?? first.email?.[0] ?? "Invalid input";
      return NextResponse.json(
        { error: message },
        { status: 400 }
      );
    }
    const { email, password } = parsed.data;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    const valid = await verifyPassword(password, user.password);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    const token = createToken({
      userId: user.id,
      email: user.email,
      role: (user as any).role ?? "USER",
    });
    await setSession(token);
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        selectedDomain: user.selectedDomain,
        role: (user as any).role ?? "USER",
      },
    });
  } catch (e) {
    console.error(e);
    if (e instanceof Prisma.PrismaClientInitializationError) {
      return NextResponse.json(
        { error: "Database connection failed. Check DATABASE_URL in Vercel env." },
        { status: 500 }
      );
    }
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2021" || e.code === "P2022") {
        return NextResponse.json(
          { error: "Database schema is outdated. Please run production migrations." },
          { status: 500 }
        );
      }
    }
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}
