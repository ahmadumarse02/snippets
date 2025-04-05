"use server";

import { prisma } from "@/lib/prisma";

export async function getAllStaff() {
  return await prisma.snippet.findMany();
}
