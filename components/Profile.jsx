"use client";

import PromptCard from "./PromptCard";

const Profile = ({ name, desc, handleEdit, handleDelete, data }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient text-left">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-16 prompt_layout">
        {data?.map((post, index) => (
          <div key={index + 1}>
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post._id)}
              handleDelete={() => handleDelete && handleDelete(post._id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Profile;
