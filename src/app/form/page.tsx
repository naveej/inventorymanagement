"use client";

import React, { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

const SkillMatrixForm = () => {
  const [docNo, setDocNo] = useState(" ");
  const [version, setVersion] = useState(" ");
  const [preparedBy, setPreparedBy] = useState(" ");
  const [reviewedBy, setReviewedBy] = useState(" ");
  const [approvedBy, setApprovedBy] = useState(" ");
  const [departmentName, setDepartmentName] = useState(" ");
  const [name, setName] = useState(" ");
  const [skills1, setSkill1] = useState(" ");
  const [skills2, setSkill2] = useState(" ");

  const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!docNo) {
      console.error("Doc No is empty!");
      return;
    }
    const formData = {
      docNo,
      version,
      preparedBy,
      reviewedBy,
      approvedBy,
      departmentName,
      name,
      skills: [skills1, skills2],
    };
    console.log("Client before Send", formData);

    const result = await axios.post("/api/post/form", formData);
    console.log("Result", result);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col bg-blue-500/50">
      <h1>Skill Matrix Form</h1>

      <form
        onSubmit={HandleSubmit}
        className="max-w-[400px] flex flex-col gap-4 mt-8 bg-white/50 p-4"
      >
        <Input
          type="text"
          placeholder="Doc No"
          onChange={(e) => setDocNo(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Version No"
          onChange={(e) => setVersion(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Prepared By"
          onChange={(e) => setPreparedBy(e.target.value)}
        />
        <Input
          type="text"
          placeholder="reviewedBy"
          onChange={(e) => setReviewedBy(e.target.value)}
        />
        <Input
          type="text"
          placeholder="approvedBy"
          onChange={(e) => setApprovedBy(e.target.value)}
        />
        <Input
          type="text"
          placeholder="departmentName"
          onChange={(e) => setDepartmentName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Skill 1"
          onChange={(e) => setSkill1(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Skill 2"
          onChange={(e) => setSkill2(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default SkillMatrixForm;
