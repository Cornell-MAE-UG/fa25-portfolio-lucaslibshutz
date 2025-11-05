"use client";
import ProjectArticle from "../ProjectArticle";
import React from "react";

export default function CEVPage() {
  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center"
      style={{ overflow: 'hidden' }}
    >
      <main className="relatvie z-20 w-full flex items-center justify-center">
        <ProjectArticle src="/api/content/projects/scratch-transformer.html" />
      </main>

    </div>
  )
}
