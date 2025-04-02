"use client";
import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";
import type { Snippet } from "@prisma/client";
import { Button } from "./ui/button";
import { SaveSnippet } from "@/actions";

const EditorSnippet = ({
  snippet,
}: {
  snippet: Snippet;
}) => {
  const [code, setCode] = useState(snippet.code);

  const changeCodeValue = (value: string = "") => {
    setCode(value);
  };

  const saveSnippet = SaveSnippet.bind(
    null,
    snippet.id,
    code
  );

  return (
    <>
      <form action={saveSnippet}>
        <div className="flex justify-between mb-3">
          <h1>Edit the code</h1>
          <Button type="submit">Save</Button>
        </div>
      </form>
      <div>
        <Editor
          height="40vh"
          theme="vs-dark"
          defaultValue={code}
          className="rounded-3xl"
          onChange={changeCodeValue}
        />
      </div>
    </>
  );
};

export default EditorSnippet;
