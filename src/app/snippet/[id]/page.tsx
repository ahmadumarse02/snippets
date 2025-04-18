import React from "react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as actions from "@/actions";
import { notFound } from "next/navigation";

interface Snippet {
  id: number;
  title: string;
  code: string;
}


const SnippetDetail = async ({ params }: {params: Promise<{id: string}>}) => {
  let snippet: Snippet | null = null;
  
  try {
    const id = parseInt((await params).id);
    if (isNaN(id)) {
      return notFound();
    }

    snippet = await prisma.snippet.findUnique({
      where: { id },
    });

    if (!snippet) {
      return notFound();
    }
  } catch (error) {
    console.error("Database error:", error);
    
    if (process.env.NODE_ENV === 'production') {
      snippet = {
        id: 0,
        title: "Snippet Preview",
        code: "// Code loading...\n// Database connection unavailable during build",
      };
    } else {
      throw error;
    }
  }

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4 items-center">
          <Link href={`/snippet/${snippet.id}/edit`}>
            <Button>Edit</Button>
          </Link>
          <form action={deleteSnippetAction}>
            <Button type="submit" variant={"destructive"}>
              Delete
            </Button>
          </form>
        </div>
      </div>
      <pre className="p-4 rounded-lg bg-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
};

export default SnippetDetail;