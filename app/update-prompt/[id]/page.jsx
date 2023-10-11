"use client";

import Form from "@components/Form";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UpdatePrompt = ({ params }) => {
  const { id } = params;

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const router = useRouter();

  useEffect(() => {
    const getPromptDetails = async () => {
      const res = await fetch("/api/prompt/" + id);
      const data = await res.json();
      console.log(data);
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (id) getPromptDetails();
  }, [id]);

  const EditPrompt = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    if (!id) return alert("Prompt not Found");
    try {
      const response = await fetch("/api/prompt/" + id, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={EditPrompt}
      />
    </div>
  );
};

export default UpdatePrompt;
