"use client";

import React, { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

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
  const [skills1, setSkill1] = useState<string>("");
  const [skills2, setSkill2] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      skills: [skills1, skills2],
    };
    console.log("Client before Send", formData);

    try {
      const result = await axios.post("/api/post/create/skillMatrix", formData);
      console.log("Result", result);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col bg-blue-500/50">
      <h1>Skill Matrix Form</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-[400px] flex flex-col gap-4 mt-8 bg-white/50 p-4"
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
        <Input
          type="text"
          placeholder="Skill 1"
          value={skills1}
          onChange={(e) => setSkill1(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Skill 2"
          value={skills2}
          onChange={(e) => setSkill2(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default SkillMatrixForm;
