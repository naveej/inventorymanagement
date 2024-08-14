"use client";

import React, { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

const SkillMatrixForm = () => {
  const [docNo, setDocNo] = useState<string>("IAD003");
  const [version, setVersion] = useState<string>("01");
  const [preparedBy, setPreparedBy] = useState<string>(
    "Dr Pavana Kumara B - Head-IQAC"
  );
  const [reviewedBy, setReviewedBy] = useState<string>(
    "Dr Prakash Pinto - Dean MBA"
  );
  const [approvedBy, setApprovedBy] = useState<string>(
    "Dr Rio D'Souza - Principal"
  );
  const [departmentName, setDepartmentName] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([""]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !skills) {
      setError("Please fill out all required fields.");
      return;
    }
    const metadata = {
      docNo,
      version,
      preparedBy,
      reviewedBy,
      approvedBy,
      departmentName,
    };

    const formData = {
      metadata,
      name,
      skills,
    };
    console.log("Client before Send", formData);

    setLoading(true);
    try {
      const result = await axios.post("/api/post/create/skillMatrix", formData);
      console.log("Result", result);
      setError(null); // Clear any previous errors
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error message:", error.message);
        console.error("Axios error response:", error.response);
        setError(error.response?.data?.error || "An error occurred");
      } else {
        console.error("Unexpected error:", error);
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };

  const addSkillField = () => {
    setSkills([...skills, ""]);
  };

  const removeSkillField = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  return (
    <div className="w-full flex justify-center items-center flex-col">

      <div className="flex justify-between items-center w-full px-8 py-4">
        <h1 className="text-[2.5rem] text-gray-300 font-bold">
          Skill Matrix
        </h1>

        <Link href={"./skillmatrix/create"} className="flex justify-center items-center bg-primary text-white text-[1.2rem] gap-2 px-4 py-2 rounded">
          <PlusIcon />
          <span>Create</span>
        </Link>
      </div>
      {/* <form
        onSubmit={handleSubmit}
        className="min-w-[500px] px-4 py-4 flex text-black flex-col gap-4 mt-8 bg-gray-500 p-4 rounded-lg"
      >
        <Input
          type="text"
          placeholder="Doc No"
          value={docNo}
          onChange={(e) => setDocNo(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Version No"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Prepared By"
          value={preparedBy}
          onChange={(e) => setPreparedBy(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Reviewed By"
          value={reviewedBy}
          onChange={(e) => setReviewedBy(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Approved By"
          value={approvedBy}
          onChange={(e) => setApprovedBy(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Department Name"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-4">
            <Input
              type="text"
              placeholder={`Skill ${index + 1}`}
              value={skill}
              onChange={(e) => handleSkillChange(index, e.target.value)}
            />
            <Button
              type="button"
              onClick={() => removeSkillField(index)}
              className="border-2 text-white bg-white/40 hover:bg-white/70 transition duration-300 ease-in-out"
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={addSkillField}
          className="border-2 text-white bg-white/40 hover:bg-white/70 transition duration-300 ease-in-out"
        >
          Add Skill
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="border-2 text-white bg-white/40 hover:bg-white/70 transition duration-300 ease-in-out"
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form> */}
      <form
        onSubmit={handleSubmit}
        className="min-w-[500px] px-4 py-6 bg-gray-800 p-6 mt-6 rounded-lg shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="docNo" className="mb-2 text-slate-300">
              Doc No
            </label>
            <Input
              type="text"
              id="docNo"
              placeholder="Doc No"
              value={docNo}
              onChange={(e) => setDocNo(e.target.value)}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="version" className="mb-2 text-slate-300">
              Version No
            </label>
            <Input
              type="text"
              id="version"
              placeholder="Version No"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="preparedBy" className="mb-2 text-slate-300">
              Prepared By
            </label>
            <Input
              type="text"
              id="preparedBy"
              placeholder="Prepared By"
              value={preparedBy}
              onChange={(e) => setPreparedBy(e.target.value)}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="reviewedBy" className="mb-2 text-slate-300">
              Reviewed By
            </label>
            <Input
              type="text"
              id="reviewedBy"
              placeholder="Reviewed By"
              value={reviewedBy}
              onChange={(e) => setReviewedBy(e.target.value)}
              className="p-2 text-slate-600 text-sm rounded border-gray-300"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="approvedBy" className="mb-2 text-slate-300">
              Approved By
            </label>
            <Input
              type="text"
              id="approvedBy"
              placeholder="Approved By"
              value={approvedBy}
              onChange={(e) => setApprovedBy(e.target.value)}
              className="p-2 text-slate-600 text-sm rounded border-gray-300"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="departmentName" className="mb-2 text-slate-300">
              Department Name
            </label>
            <Input
              type="text"
              id="departmentName"
              placeholder="Department Name"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              className="p-2 text-slate-600 text-sm rounded border-gray-300"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 text-slate-300">
              Name
            </label>
            <Input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center"
            >
              <div className="flex flex-col">
                <label
                  htmlFor={`skill-${index}`}
                  className="mb-2 text-slate-300"
                >
                  Skill {index + 1}
                </label>
                <Input
                  type="text"
                  id={`skill-${index}`}
                  placeholder={`Skill ${index + 1}`}
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  className="p-2 h-10 text-slate-600 rounded border-gray-300"
                />
              </div>
              <Button
                type="button"
                onClick={() => removeSkillField(index)}
                className="border-2 text-white bg-white/20 hover:bg-red-600/70 transition duration-300 ease-in-out rounded p-2 h-10 mt-7"
              >
                Remove
              </Button>
            </div>
          ))}

          <Button
            type="button"
            onClick={addSkillField}
            className="border-2 text-white bg-teal-600 hover:bg-teal-900 transition duration-300 ease-in-out rounded p-2"
          >
            Add Skill
          </Button>
        </div>

        {error && <div className="text-red-500">{error}</div>}

        <Button
          type="submit"
          disabled={loading}
          className="mt-6 border-2 w-1/2 mx-auto text-white bg-blue-900 hover:bg-blue-600 transition duration-300 ease-in-out rounded p-2"
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>

      <div className="mt-4">
        <Link href="/" className="text-white underline">
          Home
        </Link>
      </div>
    </div>
  );
};

export default SkillMatrixForm;
