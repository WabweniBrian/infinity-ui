import ComponentsList from "@/components/main/components/components-list";
import { componentsData } from "@/data/components";
import React from "react";

const Components = () => {
  return (
    <div className="relative h-full w-full bg-background">
      <div className="fixed bottom-0 left-[-20%] right-0 top-[-10%] h-[650px] w-[650px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
      <div className="fixed bottom-0 right-[-20%] top-[-10%] h-[650px] w-[650px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
      <div className="relative z-10 mx-auto max-w-7xl px-2 py-10">
        <h1 className="mb-6 text-3xl font-bold">Component List</h1>
        <ComponentsList components={componentsData} />
      </div>
    </div>
  );
};

export default Components;
