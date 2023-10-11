"use client";

import Profile from "@components/Profile";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MyProfile = () => {
  const [posts, setPosts] = useState();
  const { data: session } = useSession();
  const router = useRouter();

  const handleEdit = (id) => {
    router.push("/update-prompt/" + id);
  };

  const handleDelete = async (id) => {
    try {
      alert("are you sure to want Delete this Prompt");

      const res = await fetch("/api/prompt/" + id, { method: "DELETE" });

      if (res.ok) {
        const response = await fetch(
          "/api/users/" + session?.user.id + "/posts"
        );
        const data = await response.json();
        setPosts(data);
        console.log("hi");
        router.refresh();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetcData = async () => {
      const response = await fetch("/api/users/" + session?.user.id + "/posts");
      const data = await response.json();
      setPosts(data);
    };

    if (session?.user.id) fetcData();
  }, []);

  return (
    <section>
      <Profile
        name="My"
        desc="welcome to your personalize page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </section>
  );
};

export default MyProfile;
