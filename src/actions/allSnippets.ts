import { prisma } from "@/lib/prisma";

export async function getAllStaff() {
  try {
    const snippets = await prisma.snippet.findMany();
    return snippets;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch snippets.");
  }
}