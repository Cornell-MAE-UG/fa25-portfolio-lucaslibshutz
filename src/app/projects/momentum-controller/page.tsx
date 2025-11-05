"use client";
import ProjectArticle from "../ProjectArticle";
import React from "react";

export default function MomentumControllerProjectPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center" style={{overflow: 'hidden'}}>
      {/* Project Content */}
      <main className="relative z-20 w-full flex items-center justify-center">
        <ProjectArticle src="/api/content/projects/momentum-controller.html" />
      </main>
    </div>
  );
} 