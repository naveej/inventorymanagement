import React from "react";

const SkeletonLoader = () => {
  return (
    <>
      {" "}
      <div>
        <div className="animate-pulse bg-gray-700 px-2 rounded-md py-5 w-1/2 justify-center mx-auto"></div>
        {/* --- Header --- */}
        <div className="bg-slate-100 dark:bg-slate-900 py-4 mt-6 p-4 max-w-[93rem] px-4 mx-auto border-2 border-slate-600 rounded-lg">
          <div className="flex text-center mb-4 border-b-2 border-gray-600 pb-2">
            <div className="w-20 aspect-square bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            <div className="w-1/2 mx-auto justify-center">
              <div className="h-6 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
              <div className="h-5 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="col-span-1 border border-slate-600 p-2 rounded-md dark:bg-slate-800 dark:border-slate-700">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-1 border border-slate-600 p-2 rounded-md dark:bg-slate-800 dark:border-slate-700">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6 rounded-md">
            <div className="border border-slate-600 p-2 rounded-md dark:bg-slate-800 dark:border-slate-700">
              <div className="h-5 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            </div>
            <div className="border border-slate-600 p-2 rounded-md dark:bg-slate-800 dark:border-slate-700">
              <div className="h-5 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            </div>
            <div className="border border-slate-600 p-2 rounded-md dark:bg-slate-800 dark:border-slate-700">
              <div className="h-5 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            </div>
          </div>

          <div className="border border-slate-600 p-2 rounded-md dark:bg-slate-800 dark:border-slate-700">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
          </div>

          {/* --- Database --- */}
          <div className="justify-center px-12 py-6">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonLoader;
