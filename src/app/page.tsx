"use client";
import Sidebar from "@/components/ui/Sidebar";
import TestForm from "./forms/TestForm/page";

export default function Home() {
  return (
    // <>
    //   <div className="w-full min-h-screen">
    //     <div className="flex flex-col items-center justify-center">
    //       <span className="text-3xl pt-5 py-4 font-bold">
    //         Welcome , <span className="font-light">User</span>
    //       </span>
    //     </div>
    //   </div>
    // </>
    <div className="max-w-3xl mx-auto p-10">
      <TestForm />
      <div className="text-white font-bold">hello</div>
    </div>
  );
}
