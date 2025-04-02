"use client";
import React, { useActionState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import * as actions from "@/actions/index";

const CreateSnippet = () => {
  const [message, action] = useActionState(
    actions.createSnippet,
    {
      message: "",
    }
  );

  return (
    <form action={action}>
      <div className="space-y-2">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input type="text" name="title" id="title" />
        </div>

        <div className="space-y-2">
          <Label>Code</Label>
          <Textarea name="code" id="code" />
        </div>

        {message.message && (
          <div className="p-2 text-lg text-red-500">
            {message.message}
          </div>
        )}

        <Button type="submit">New</Button>
      </div>
    </form>
  );
};

export default CreateSnippet;
