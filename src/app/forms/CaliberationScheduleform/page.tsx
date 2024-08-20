"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner"; // Import sonnar
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

// Define the form schema using zod
const formSchema = z.object({
  docNo: z.string().min(1, { message: "Doc No is required." }),
  version: z.string().min(1, { message: "Version No is required." }),
  preparedBy: z.string().min(1, { message: "Prepared By is required." }),
  reviewedBy: z.string().min(1, { message: "Reviewed By is required." }),
  approvedBy: z.string().min(1, { message: "Approved By is required." }),
  departmentName: z
    .string()
    .min(1, { message: "Department Name is required." }),
  instrumentName: z
    .string()
    .min(1, { message: "Instrument Name is required." }),
  instrumentNo: z.string().min(1, { message: "Instrument No is required." }),
  frequencyOfCalibration: z
    .string()
    .min(1, { message: "Frequency of Calibration is required." }),
  typeOfInstrument: z
    .string()
    .min(1, { message: "Type of Instrument is required." }),
  lastDoneAt: z.string().min(1, { message: "Last Done At is required." }),
  refNo: z.string().min(1, { message: "Ref No is required." }),
  nextDueOn: z.string().min(1, { message: "Next Due On is required." }),
  comments: z.string().min(1, { message: "Comments are required." }),
});

const CaliberationScheduleForm = () => {
  const {data: session} = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const dataString = searchParams.get('data');
  let data:any;
  if(dataString){
    data = JSON.parse(dataString);
  }
  // Set up the form using useForm and zodResolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      docNo: data?.metadata?.docNo|| "IAD011",
      version: data?.metadata?.version||"01",
      preparedBy: data?.metadata?.preparedBy || "Dr Pavana Kumara B - Head-IQAC",
      reviewedBy: data?.metadata?.reviewedBy || "Dr Prakash Pinto - Dean MBA",
      approvedBy: data?.metadata?.approvedBy || "Dr Rio D'Souza - Principal",
      departmentName: data?.metadata?.departmentName || session?.user?.departmentName,
      instrumentName: data?.instrumentName ||"",
      instrumentNo: data?.instrumentNo || "",
      frequencyOfCalibration: data?.frequencyOfCalibration || "",
      typeOfInstrument: data?.typeOfInstrument || "",
      lastDoneAt: data?.lastDoneAt || "",
      refNo: data?.refNo || "",
      nextDueOn: data?.nextDueOn || "",
      comments: data?.comments || "",
    },
  });

  // Define the submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const metadata = {
      docNo: values.docNo,
      version: values.version,
      preparedBy: values.preparedBy,
      reviewedBy: values.reviewedBy,
      approvedBy: values.approvedBy,
      departmentName: values.departmentName,
    };

    const formData = {
      metadata,
      instrumentName: values.instrumentName,
      instrumentNo: values.instrumentNo,
      frequencyOfCalibration: values.frequencyOfCalibration,
      typeOfInstrument: values.typeOfInstrument,
      lastDoneAt: values.lastDoneAt,
      refNo: values.refNo,
      nextDueOn: values.nextDueOn,
      comments: values.comments,
    };

    console.log("Client before Send", formData);
    let promise;
    if(!data){
      promise = axios.post("/api/post/create/caliberation_Schedule", formData);
    }else{
      promise = axios.post("/api/post/update/caliberation_Schedule", {...formData, _id: data._id});
    }
    form.reset();
    toast.promise(promise, {
      loading: "Loading...",
      success: (result) => {
        console.log("Result", result);
        router.push('/dashboard/caliberation_Schedule');
        return data?"Form updated successfully!":"Form submitted succesfully";
      },
      error: (error) => {
        if (axios.isAxiosError(error)) {
          console.error("Axios error message:", error.message);
          console.error("Axios error response:", error.response);
          return `Error: ${error.message}`;
        } else {
          console.error("Unexpected error:", error);
          return "Unexpected error occurred.";
        }
      },
    });
  };
  return (
    <>
      <div className="w-full h-full flex p-4 justify-center items-center flex-col">
        <motion.div
          className="text-6xl font-bold"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.7,
            ease: "easeInOut",
          }}
        >
          Calibration Schedule Form
        </motion.div>

        <Form {...form}>
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            className="min-w-[1400px] px-4 py-4 flex flex-col gap-4 mt-8 p-4 bg-slate-200 dark:bg-slate-800 rounded-lg border-solid border-2 border-current"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="docNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doc No</FormLabel>
                    <FormControl>
                      <Input placeholder="Doc No" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="version"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Version No</FormLabel>
                    <FormControl>
                      <Input placeholder="Version No" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preparedBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prepared By</FormLabel>
                    <FormControl>
                      <Input placeholder="Prepared By" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reviewedBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reviewed By</FormLabel>
                    <FormControl>
                      <Input placeholder="Reviewed By" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="approvedBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Approved By</FormLabel>
                    <FormControl>
                      <Input placeholder="Approved By" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="departmentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Department Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="instrumentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instrument Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Instrument Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="instrumentNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instrument No</FormLabel>
                    <FormControl>
                      <Input placeholder="Instrument No" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="frequencyOfCalibration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency Of Calibration</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Frequency Of Calibration"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="typeOfInstrument"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type Of Instrument</FormLabel>
                    <FormControl>
                      <Input placeholder="Type Of Instrument" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastDoneAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Done At</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Last Done At"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="refNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ref No</FormLabel>
                    <FormControl>
                      <Input placeholder="Ref No" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nextDueOn"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Next Due On</FormLabel>
                    <FormControl>
                      <Input type="date" placeholder="Next Due On" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comments</FormLabel>
                    <FormControl>
                      <Input placeholder="Comments" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="mt-6 border-2 rounded-2xl w-[15rem] mx-auto text-white bg-blue-900 hover:bg-blue-600 transition duration-300 ease-in-out p-2"
            >
              {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </motion.form>
        </Form>

        <div className="mt-4">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            <Link href="/" className="underline">
              Home
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CaliberationScheduleForm;
