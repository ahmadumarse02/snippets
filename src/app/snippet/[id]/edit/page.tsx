"use server";

import React from "react";
import { prisma } from "@/lib/prisma";
import EditorSnippet from "@/components/EditorSnippet";

export const dynamic = 'force-static';

const EditPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = parseInt((await params).id);

  const snippet = await prisma.snippet.findUnique({
    where: { id },
  });

  if (!snippet)
    return (
      <div className="text-2xl text-red-600 mt-4">
        Snippet not found
      </div>
    );

  return <EditorSnippet snippet={snippet} />;
};

export default EditPage;
