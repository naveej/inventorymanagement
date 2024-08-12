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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner"; // Import sonnar
import { motion } from "framer-motion";

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
  documentTitle: z.string().min(1, { message: "Document Title is required." }),
  refNo: z.string().min(1, { message: "Reference No is required." }),
  versionNo: z.string().min(1, { message: "Version No is required." }),
  area: z.enum(["Internal", "External"], {
    required_error: "Area is required.",
  }),
  typeOfDocument: z.enum(["Document", "Record"], {
    required_error: "Type of Document is required.",
  }),
  effectiveDate: z.string().min(1, { message: "Effective Date is required." }),
  responsibility: z.string().min(1, { message: "Responsibility is required." }),
  mediumOfStorage: z
    .string()
    .min(1, { message: "Medium of Storage is required." }),
  placeOfStorage: z
    .string()
    .min(1, { message: "Place of Storage is required." }),
  retentionPeriod: z
    .string()
    .min(1, { message: "Retention Period is required." }),
});

const DocumentedInformationForm = () => {
  // Set up the form using useForm and zodResolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      docNo: "IAD001",
      version: "01",
      preparedBy: "Dr Pavana Kumara B - Head-IQAC",
      reviewedBy: "Dr Prakash Pinto - Dean MBA",
      approvedBy: "Dr Rio D'Souza - Principal",
      departmentName: "",
      documentTitle: "",
      refNo: "",
      versionNo: "",
      area: "Internal",
      typeOfDocument: "Document",
      effectiveDate: "",
      responsibility: "",
      mediumOfStorage: "",
      placeOfStorage: "",
      retentionPeriod: "",
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
      documentTitle: values.documentTitle,
      refNo: values.refNo,
      versionNo: values.versionNo,
      area: values.area,
      typeOfDocument: values.typeOfDocument,
      effectiveDate: values.effectiveDate,
      responsibility: values.responsibility,
      mediumOfStorage: values.mediumOfStorage,
      placeOfStorage: values.placeOfStorage,
      retentionPeriod: values.retentionPeriod,
    };

    console.log("Client before Send", formData);
    const promise = axios.post(
      "/api/post/create/documentedInformation",
      formData
    );

    toast.promise(promise, {
      loading: "Loading...",
      success: (result) => {
        console.log("Result", result);
        return "Form submitted successfully!";
      },
      error: (error) => {
        if (axios.isAxiosError(error)) {
          console.error("Axios error message:", error.message);
          console.error("Axios error response:", error.response);
          return `Error: ${error.message}`;
        } else {
          console.error("Unexpected error:", error);
        }
      },
    });
  };

  return (
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
        List of Documented Information Form
      </motion.div>

      <Form {...form}>
        <motion.form
          onSubmit={form.handleSubmit(onSubmit)}
          className="min-w-[680px] px-4 py-4 flex flex-col gap-4 mt-8 p-4 rounded-lg border-solid border-2 border-current"
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
              name="documentTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Document Title" {...field} />
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
                  <FormLabel>Reference No</FormLabel>
                  <FormControl>
                    <Input placeholder="Reference No" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="versionNo"
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
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an area" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Internal">Internal</SelectItem>
                      <SelectItem value="External">External</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="typeOfDocument"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type of Document</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type of document" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Document">Document</SelectItem>
                      <SelectItem value="Record">Record</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="effectiveDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Effective Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Effective Date"
                      {...field}
                    />
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
              name="mediumOfStorage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medium of Storage</FormLabel>
                  <FormControl>
                    <Input placeholder="Medium of Storage" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="placeOfStorage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Place of Storage</FormLabel>
                  <FormControl>
                    <Input placeholder="Place of Storage" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="retentionPeriod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Retention Period</FormLabel>
                  <FormControl>
                    <Input placeholder="Retention Period" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="mt-6 border-2 rounded-2xl  w-1/2 mx-auto text-white bg-blue-900 hover:bg-blue-600 transition duration-300 ease-in-out p-2"
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </motion.form>
      </Form>

      <div className="mt-4">
        <Link href="/" className="underline">
          Home
        </Link>
      </div>
    </div>
  );
};

export default DocumentedInformationForm;
