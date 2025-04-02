"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const SaveSnippet = async (
  id: number,
  code: string
) => {
  await prisma.snippet.update({
    where: { id },
    data: { code },
  });
  revalidatePath(`/snippet/${id}`);
  redirect(`/snippet/${id}`);
};

export const deleteSnippet = async (id: number) => {
  await prisma.snippet.delete({
    where: { id },
  });

  revalidatePath("/");
  redirect("/");
};

export async function createSnippet(
  message: { message: string },
  formData: FormData
) {
  const title = formData.get("title") as string;
  const code = formData.get("code") as string;

  if (!title) {
    return { message: "Title is required" };
  }
  if (!code) {
    return { message: "Code is required" };
  }

  const snippet = await prisma.snippet.create({
    data: { title, code },
  });

  console.log(snippet);

  revalidatePath("/");
  redirect("/");
}
