import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllStaff } from "@/actions/allSnippets";

export default async function Home() {
  interface Snippet {
    id: string;
    title: string;
    code: string;
  }

  let snippets: Snippet[] = [];
  
  try {
    snippets = (await getAllStaff()).map((snippet) => ({
      ...snippet,
      id: snippet.id.toString(),
    }));
  } catch (error) {
    console.error("Failed to fetch snippets:", error);
  }

  return (
    <>
      <div className="gap-4">
        <h1 className="text-center text-orange-500 text-4xl font-extrabold">
          Home
        </h1>
        <div className="flex justify-between items-center">
          <h1>Snippets</h1>
          <Button>
            <Link href={"/snippet/new"}>New</Link>
          </Button>
        </div>
        {snippets.map((snippet) => (
          <div
            className="flex items-center justify-between bg-gray-200 p-2 rounded-md my-3 gap-5"
            key={snippet.id}
          >
            <h1 className="ml-4">{snippet.title}</h1>
            <Link
              className="mr-4"
              href={`/snippet/${snippet.id}`}
            >
              <Button variant={"link"}>View</Button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}