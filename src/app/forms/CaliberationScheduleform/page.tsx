"use client";

import React, { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";

const CalibrationScheduleForm = () => {
  const [docNo, setDocNo] = useState<string>("IAD01O");
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
  const [instrumentName, setInstrumentName] = useState<string>("");
  const [instrumentNo, setInstrumentNo] = useState<string>("");
  const [frequencyOfCalibration, setFrequencyOfCalibration] =
    useState<string>("");
  const [typeOfInstrument, setTypeOfInstrument] = useState<string>("");
  const [lastDoneAt, setLastDoneAt] = useState<Date>();
  const [refNo, setRefNo] = useState<string>("");
  const [nextDueOn, setNextDueOn] = useState<Date>();
  const [comments, setComments] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !instrumentName ||
      !instrumentNo ||
      !frequencyOfCalibration ||
      !typeOfInstrument ||
      !lastDoneAt ||
      !refNo ||
      !nextDueOn ||
      !comments
    ) {
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
      instrumentName,
      instrumentNo,
      frequencyOfCalibration,
      typeOfInstrument,
      lastDoneAt,
      refNo,
      nextDueOn,
      comments,
    };

    console.log("Client before Send", formData);
    setLoading(true);
    try {
      const result = await axios.post(
        "/api/post/create/caliberation_Schedule",
        formData
      );
      console.log("Result", result);
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

  return (
    <div className="w-full h-full text-white flex p-4 justify-center items-center flex-col bg-gray-900">
      <div className="text-6xl font-bold text-gray-300">
        Calibration Schedule Form
      </div>

      <form
        onSubmit={handleSubmit}
        className="min-w-[500px] px-4 py-4 flex flex-col gap-4 mt-8 bg-gray-800 p-4 rounded-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="docNo" className="text-slate-300 font-semibold">
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

          <div className="flex flex-col gap-2">
            <label htmlFor="version" className="text-slate-300 font-semibold">
              Version No
            </label>
            <Input
              type="text"
              id="version"
              placeholder="Version No"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="p-2 text-slate-600 rounded border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="preparedBy"
              className="text-slate-300 font-semibold"
            >
              Prepared By
            </label>
            <Input
              type="text"
              id="preparedBy"
              placeholder="Prepared By"
              value={preparedBy}
              onChange={(e) => setPreparedBy(e.target.value)}
              className="p-2 text-slate-600 rounded border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="reviewedBy"
              className="text-slate-300 font-semibold"
            >
              Reviewed By
            </label>
            <Input
              type="text"
              id="reviewedBy"
              placeholder="Reviewed By"
              value={reviewedBy}
              onChange={(e) => setReviewedBy(e.target.value)}
              className="p-2 text-slate-600 rounded border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="approvedBy"
              className="text-slate-300 font-semibold"
            >
              Approved By
            </label>
            <Input
              type="text"
              id="approvedBy"
              placeholder="Approved By"
              value={approvedBy}
              onChange={(e) => setApprovedBy(e.target.value)}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="departmentName"
              className="text-slate-300 font-semibold"
            >
              Department Name
            </label>
            <Input
              type="text"
              id="departmentName"
              placeholder="Department Name"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="instrumentName"
              className="text-slate-300 font-semibold"
            >
              Instrument Name
            </label>
            <Input
              type="text"
              id="instrumentName"
              placeholder="Instrument Name"
              value={instrumentName}
              onChange={(e) => setInstrumentName(e.target.value)}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="instrumentNo"
              className="text-slate-300 font-semibold"
            >
              Instrument No
            </label>
            <Input
              type="text"
              id="instrumentNo"
              placeholder="Instrument No"
              value={instrumentNo}
              onChange={(e) => setInstrumentNo(e.target.value)}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="frequencyOfCalibration"
              className="text-slate-300 font-semibold"
            >
              Frequency of Calibration
            </label>
            <Input
              type="text"
              id="frequencyOfCalibration"
              placeholder="Frequency of Calibration"
              value={frequencyOfCalibration}
              onChange={(e) => setFrequencyOfCalibration(e.target.value)}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="typeOfInstrument"
              className="text-slate-300 font-semibold"
            >
              Type of Instrument (Internal/External)
            </label>
            <Input
              type="text"
              id="typeOfInstrument"
              placeholder="Type of Instrument (Internal/External)"
              value={typeOfInstrument}
              onChange={(e) => setTypeOfInstrument(e.target.value)}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="lastDoneAt"
              className="text-slate-300 font-semibold"
            >
              Last Done At
            </label>
            <Input
              type="date"
              id="lastDoneAt"
              placeholder="Last Done At"
              value={lastDoneAt ? lastDoneAt.toISOString().split("T")[0] : ""}
              onChange={(e) => setLastDoneAt(new Date(e.target.value))}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="refNo" className="text-slate-300 font-semibold">
              Reference No
            </label>
            <Input
              type="text"
              id="refNo"
              placeholder="Reference No"
              value={refNo}
              onChange={(e) => setRefNo(e.target.value)}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="nextDueOn" className="text-slate-300 font-semibold">
              Next Due On
            </label>
            <Input
              type="date"
              id="nextDueOn"
              placeholder="Next Due On"
              value={nextDueOn ? nextDueOn.toISOString().split("T")[0] : ""}
              onChange={(e) => setNextDueOn(new Date(e.target.value))}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2 col-span-full">
            <label htmlFor="comments" className="text-slate-300 font-semibold">
              Comments
            </label>
            <Input
              type="text"
              id="comments"
              placeholder="Comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>
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

export default CalibrationScheduleForm;
