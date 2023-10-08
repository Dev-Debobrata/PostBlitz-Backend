"use client";

import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const WritePage = () => {
  const [content, setContent] = useState("");

  const handleImageUpload = (file: File) => {
    // Handle image upload logic here
  };

  const handlePostBlogs = () => {
    // Send data to server using postBlogs function
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] w-full px-5 ">
      <ReactQuill
        value={content}
        onChange={setContent}
        modules={{
          toolbar: {
            container: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline"],
              ["image"],
            ],
            handlers: {
              image: () => {
                const input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*");
                input.onchange = () => {
                  const file = input.files?.[0];
                  if (file) {
                    handleImageUpload(file);
                  }
                };
                input.click();
              },
            },
          },
        }}
      />
      <button onClick={handlePostBlogs}>Post</button>
    </div>
  );
};

export default WritePage;
