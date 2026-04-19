import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Domain = "SE" | "ML" | "AI";

const DOMAINS: Domain[] = ["SE", "ML", "AI"];
const CATEGORIES: Record<Domain, string> = {
  SE: "Software Engineering",
  ML: "Machine Learning",
  AI: "Artificial Intelligence",
};

function getDifficulty(day: number): string {
  if (day <= 20) return "Easy";
  if (day <= 40) return "Medium";
  return "Hard";
}

const CHALLENGE_TITLES: Record<number, string> = {
  1: "Two Sum",
  2: "Valid Parentheses",
  3: "Merge Two Sorted Lists",
  4: "Best Time to Buy and Sell Stock",
  5: "Valid Palindrome",
  6: "Invert Binary Tree",
  7: "Valid Anagram",
  8: "Binary Search",
  9: "Flood Fill",
  10: "Linked List Cycle",
  11: "Implement Queue using Stacks",
  12: "First Bad Version",
  13: "Ransom Note",
  14: "Climbing Stairs",
  15: "Longest Palindrome",
  16: "Reverse Linked List",
  17: "Majority Element",
  18: "Add Binary",
  19: "Diameter of Binary Tree",
  20: "Middle of Linked List",
  21: "Maximum Depth of Binary Tree",
  22: "Contains Duplicate",
  23: "Maximum Subarray",
  24: "Insert Interval",
  25: "3Sum",
  26: "Binary Tree Level Order Traversal",
  27: "Evaluate Reverse Polish Notation",
  28: "Implement Trie",
  29: "Coin Change",
  30: "Product of Array Except Self",
  31: "Min Stack",
  32: "Validate Binary Search Tree",
  33: "Number of Islands",
  34: "Clone Graph",
  35: "Pacific Atlantic Water Flow",
  36: "Course Schedule",
  37: "Implement LRU Cache",
  38: "K Closest Points to Origin",
  39: "Longest Substring Without Repeating",
  40: "Serialize and Deserialize Binary Tree",
  41: "Linear Regression from Scratch",
  42: "Gradient Descent Implementation",
  43: "K-Nearest Neighbors",
  44: "Naive Bayes Classifier",
  45: "Decision Tree Split",
  46: "Logistic Regression",
  47: "K-Means Clustering",
  48: "Principal Component Analysis",
  49: "Support Vector Machine Basics",
  50: "Neural Network Forward Pass",
  51: "Backpropagation",
  52: "Batch Normalization",
  53: "Dropout Layer",
  54: "Convolutional Filter",
  55: "Pooling Layer",
  56: "Recurrent Cell (RNN)",
  57: "LSTM Gate Mechanics",
  58: "Attention Weights Computation",
  59: "Transformer Self-Attention",
  60: "End-to-End ML Pipeline",
};

const INDUSTRY_NOTES: Record<string, string> = {
  "Software Engineering":
    "Core data structures and algorithms used in coding interviews and production systems.",
  "Machine Learning":
    "Fundamental ML concepts expected in ML engineer and data science roles.",
  "Artificial Intelligence":
    "AI/Deep Learning concepts used in research and industry applications.",
};

function industryNote(category: string): string {
  return INDUSTRY_NOTES[category] ?? "";
}

async function main() {
  for (const domain of DOMAINS) {
    const category = CATEGORIES[domain];
    for (let day = 1; day <= 60; day++) {
      const difficulty = getDifficulty(day);
      const title = CHALLENGE_TITLES[day] || `Day ${day} Challenge`;
      await prisma.challenge.upsert({
        where: { dayNumber_domain: { dayNumber: day, domain } },
        create: {
          dayNumber: day,
          domain,
          category,
          difficulty,
          description: `**${title}**\n\nSolve the following problem. This challenge focuses on ${category} fundamentals. Difficulty: ${difficulty}. Implement your solution and submit to verify.`,
          industryNote: industryNote(category),
        },
        update: {
          category,
          difficulty,
          description: `**${title}**\n\nSolve the following problem. This challenge focuses on ${category} fundamentals. Difficulty: ${difficulty}. Implement your solution and submit to verify.`,
          industryNote: industryNote(category),
        },
      });
    }
  }

  const problems = [
    { title: "Two Sum", description: "Given an array of integers and a target, return indices of the two numbers that add up to target.", category: "Software Engineering", difficulty: "Easy", domain: "SE" as Domain },
    { title: "Reverse Linked List", description: "Reverse a singly linked list in-place and return the new head.", category: "Software Engineering", difficulty: "Easy", domain: "SE" as Domain },
    { title: "Binary Search", description: "Implement binary search to find target in a sorted array. Return index or -1.", category: "Software Engineering", difficulty: "Easy", domain: "SE" as Domain },
    { title: "Valid Parentheses", description: "Given a string of brackets, determine if the string is valid (properly closed and nested).", category: "Software Engineering", difficulty: "Medium", domain: "SE" as Domain },
    { title: "Maximum Subarray", description: "Find the contiguous subarray with the largest sum (Kadane's algorithm).", category: "Software Engineering", difficulty: "Medium", domain: "SE" as Domain },
    { title: "3Sum", description: "Find all unique triplets in the array that sum to zero.", category: "Software Engineering", difficulty: "Medium", domain: "SE" as Domain },
    { title: "Merge Intervals", description: "Merge all overlapping intervals and return non-overlapping intervals.", category: "Software Engineering", difficulty: "Medium", domain: "SE" as Domain },
    { title: "LRU Cache", description: "Design and implement an LRU (Least Recently Used) cache.", category: "Software Engineering", difficulty: "Hard", domain: "SE" as Domain },
    { title: "Linear Regression", description: "Implement linear regression using gradient descent from scratch.", category: "Machine Learning", difficulty: "Medium", domain: "ML" as Domain },
    { title: "K-Nearest Neighbors", description: "Implement KNN for classification with configurable k and distance metric.", category: "Machine Learning", difficulty: "Easy", domain: "ML" as Domain },
    { title: "Decision Tree Split", description: "Implement information gain and best split selection for a decision tree.", category: "Machine Learning", difficulty: "Hard", domain: "ML" as Domain },
    { title: "Matrix Multiplication for Neural Nets", description: "Implement batched matrix multiplication as used in neural network layers.", category: "Artificial Intelligence", difficulty: "Medium", domain: "AI" as Domain },
    { title: "Softmax and Cross-Entropy", description: "Implement softmax and cross-entropy loss for classification.", category: "Artificial Intelligence", difficulty: "Medium", domain: "AI" as Domain },
  ];

  await prisma.problem.deleteMany({});
  await prisma.problem.createMany({ data: problems });
  console.log("Seeded 60 challenges and", problems.length, "problems.");

  const now = new Date();
  const events = [
    {
      title: "Breaking Into Software Engineering in 60 Days",
      description:
        "A live breakdown of how to use the ABTalks 60-day engine to ship production-grade projects, build interview-ready skills, and stand out to hiring managers.",
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7),
      time: "7:00 PM IST",
      location: "Online",
      guestName: "Ankit Bansal",
      guestBio:
        "Ex-FAANG engineer and founder of ABTalks, mentoring students to land industry roles through structured challenge-based learning.",
      guestImage:
        "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
      outcomes: [
        "Understand the 60-day ABTalks roadmap",
        "Learn how to pair daily coding with events & podcasts",
        "Set up a weekly reflection and review system",
      ],
    },
    {
      title: "Machine Learning for Real-World Products",
      description:
        "From theory to deployment: how ML skills from the challenge map to real production systems, case studies, and interview conversations.",
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14),
      time: "8:00 PM IST",
      location: "Online",
      guestName: "Dr. Riya Mehta",
      guestBio:
        "Applied ML scientist working on recommendation systems and ranking models used by millions of users daily.",
      guestImage:
        "https://images.pexels.com/photos/1181579/pexels-photo-1181579.jpeg",
      outcomes: [
        "See how ML projects are scoped in industry",
        "Learn how to talk about ML projects in interviews",
        "Identify portfolio gaps for ML & AI roles",
      ],
    },
    {
      title: "Consistency Systems for Developers",
      description:
        "Design a personal system to stay consistent for 60 days: routines, accountability, and feedback loops that actually work for engineers.",
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 21),
      time: "6:30 PM IST",
      location: "Online",
      guestName: "Sarthak Sharma",
      guestBio:
        "Senior engineer and mentor who has helped hundreds of learners build long-term, sustainable habits around coding.",
      guestImage:
        "https://images.pexels.com/photos/4065133/pexels-photo-4065133.jpeg",
      outcomes: [
        "Turn the 60-day challenge into a daily habit",
        "Build a review ritual that compounds learning",
        "Create a simple system to avoid burnout and plateaus",
      ],
    },
  ];

  await prisma.event.deleteMany({});
  await prisma.event.createMany({ data: events });
  console.log("Seeded", events.length, "events.");

  const podcasts = [
    {
      title: "From Zero to First Dev Job",
      description:
        "How to move from fundamentals to a real software engineering offer using projects, storytelling, and the right interview prep sequence.",
      guestName: "Neha Verma",
      guestBio:
        "Full-stack engineer who transitioned from a non-CS background into a high-growth startup.",
      guestImage:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
      episodeNumber: 1,
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      spotifyUrl: "https://open.spotify.com/episode/1",
      publishedAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7),
    },
    {
      title: "Designing a 60-Day Challenge Engine",
      description:
        "Deep dive into how the ABTalks 60-day system was architected: constraints, unlock rules, and why streaks matter for learning.",
      guestName: "Product & Curriculum Team, ABTalks",
      guestBio:
        "The team behind the challenge engine that blends software engineering, ML, and AI into one roadmap.",
      guestImage:
        "https://images.pexels.com/photos/1181528/pexels-photo-1181528.jpeg",
      episodeNumber: 2,
      youtubeUrl: "https://www.youtube.com/watch?v=oHg5SJYRHA0",
      spotifyUrl: "https://open.spotify.com/episode/2",
      publishedAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3),
    },
    {
      title: "AI, Hiring, and the Next 5 Years",
      description:
        "What AI is changing about developer hiring, what stays the same, and how to future-proof your skill set.",
      guestName: "Industry Panel",
      guestBio:
        "Engineering leaders and hiring managers from product companies and startups.",
      guestImage:
        "https://images.pexels.com/photos/7648494/pexels-photo-7648494.jpeg",
      episodeNumber: 3,
      youtubeUrl: "https://www.youtube.com/watch?v=3GwjfUFyY6M",
      spotifyUrl: "https://open.spotify.com/episode/3",
      publishedAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1),
    },
  ];

  await prisma.podcast.deleteMany({});
  await prisma.podcast.createMany({ data: podcasts });
  console.log("Seeded", podcasts.length, "podcast episodes.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
