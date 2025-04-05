import React from "react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as actions from "@/actions";
import { notFound } from "next/navigation";


const SnippetDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = parseInt((await params).id);

  const snippet = await prisma.snippet.findUnique({
    where: { id },
  });

  if (!snippet) notFound();
  const DeleteSnippet = actions.deleteSnippet.bind(
    null,
    snippet.id
  );

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">
          {snippet?.title}
        </h1>
        <div className="flex gap-4 items-center">
          <Link href={`/snippet/${id}/edit`}>
            <Button>Edit</Button>
          </Link>
          <form action={DeleteSnippet}>
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
