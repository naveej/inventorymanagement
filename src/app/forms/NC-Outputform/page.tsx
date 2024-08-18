"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner"; // Import sonnar
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

// Define the form schema using zod
const formSchema = z.object({
  docNo: z.string().min(1, { message: "Doc No is required." }),
  version: z.string().min(1, { message: "Version No is required." }),
  preparedBy: z.string().min(1, { message: "Prepared By is required." }),
  reviewedBy: z.string().min(1, { message: "Reviewed By is required." }),
  approvedBy: z.string().min(1, { message: "Approved By is required." }),
  departmentName: z.string().min(1, { message: "Department Name required." }),
  ncDetails: z.string().min(1, { message: "NC Details are required." }),
  reason: z.string().min(1, { message: "Reason is required." }),
  actionTaken: z.string().min(1, { message: "Action Taken is required." }),
  responsibility: z.string().min(1, { message: "Responsibility is required." }),
  ncApprovedBy: z.string().min(1, { message: "Approved By is required." }),
  targetDate: z.string().min(1, { message: "Target Date is required." }),
  status: z.string().min(1, { message: "Status is required." }),
  comments: z.string().min(1, { message: "Comments are required." }),
});

const NCOutputform = () => {
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
      departmentName: data?.metadata?.departmentName ?? "",
      ncDetails: data?.ncDetails || "",
      reason: data?.reason || "",
      actionTaken: data?.actionTaken || "",
      responsibility: data?.responsibility || "",
      ncApprovedBy: data?.ncApprovedBy || "",
      targetDate: data?.targetDate || "",
      status: data?.status || "",
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
      ncDetails: values.ncDetails,
      reason: values.reason,
      actionTaken: values.actionTaken,
      responsibility: values.responsibility,
      ncApprovedBy: values.ncApprovedBy,
      targetDate: values.targetDate,
      status: values.status,
      comments: values.comments,
    };

    console.log("Client before Send", formData);
    let promise;
    if(!data){
    promise = axios.post("/api/post/create/ncOutput", formData);}
    else{
      promise = axios.post("/api/post/update/ncOutput", {...formData, _id:data._id});
    }
    form.reset();
    toast.promise(promise, {
      loading: "Loading...",
      success: (result) => {
        console.log("Result", result);
        router.push('/dashboard/ncOutput');
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
          NC Output Form
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
                name="ncDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NC Details</FormLabel>
                    <FormControl>
                      <Input placeholder="NC Details" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason</FormLabel>
                    <FormControl>
                      <Input placeholder="Reason" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="actionTaken"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Action Taken</FormLabel>
                    <FormControl>
                      <Input placeholder="Action Taken" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="responsibility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Responsibility</FormLabel>
                    <FormControl>
                      <Input placeholder="Responsibility" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ncApprovedBy"
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
                name="targetDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Date</FormLabel>
                    <FormControl>
                      <Input type="date" placeholder="Target Date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1 px-2 py-2"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Approved" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Approved
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Pending" />
                          </FormControl>
                          <FormLabel className="font-normal">Pending</FormLabel>
                        </FormItem>
                      </RadioGroup>
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

export default NCOutputform;
