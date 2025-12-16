"use client";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Loader2, Mail, Phone, Table, Upload, User, X } from "lucide-react";
import { Input } from "./ui/input";
import { z } from "zod";
import { formSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { uploadFileToS3 } from "@/lib/s3";
import Image from "next/image";

import { isNumber, isValidInput } from "@/lib/validation";
import { toast } from "sonner";

type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cabin: "",
      email: "",
      name: "",
      phone: "",
      aadharCard: "",
      paymentProof: "",
    },
  });

  const handleImageUpload = async (
    field: "image1" | "image2",
    file: File | null
  ) => {
    if (file) {
      console.log(file, "file");
      const res = await uploadFileToS3(file);
      console.log(res, "Res");
      if (field === "image1") {
        form.setValue("aadharCard", res?.url, { shouldValidate: true });
        if (fileInputRef1.current) fileInputRef1.current.value = "";
      }
      if (field === "image2") {
        form.setValue("paymentProof", res?.url, { shouldValidate: true });
        if (fileInputRef2.current) fileInputRef2.current.value = "";
      }
    } else {
    }
  };

  const removeImage = (field: "image1" | "image2") => {
    if (field === "image1") {
      form.setValue("aadharCard", "");
      if (fileInputRef1.current) fileInputRef1.current.value = "";
    }
    if (field === "image2") {
      form.setValue("paymentProof", "");
      if (fileInputRef2.current) fileInputRef2.current.value = "";
    }
  };

  const onSubmit = async (values: FormData) => {
    try {
      setSubmitting(true);
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res?.status === 200) {
        toast("Registration Successful", {
          description: "We've sent the details to your registered email!",
          position: "top-center",
        });
        form.reset();
        setSubmitting(false);
        if (fileInputRef1.current) fileInputRef1.current.value = "";
        if (fileInputRef2.current) fileInputRef2.current.value = "";
      }
    } catch (error) {
      console.error(error);
      setSubmitting(false);
      if (fileInputRef1.current) fileInputRef1.current.value = "";
      if (fileInputRef2.current) fileInputRef2.current.value = "";
    }
  };
  return (
    <div className="xl:w-3/5 p-4 sm:p-6 lg:p-8 xl:p-12 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
          Self Study <span className="text-orange-400">Library</span>
        </h2>
        <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
          Fill out the form below to begin your enrollment process.
        </p>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Name and Inquiry Type */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-gray-300">Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          className="bg-gray-800 border-gray-700 text-white pl-10 focus:border-orange-400 focus:ring-orange-400 h-11"
                          placeholder="Enter your name"
                          {...field}
                          onChange={(e) => {
                            if (isValidInput(e.target.value)) {
                              field.onChange(e);
                            }
                          }}
                          maxLength={30}
                        />
                      </div>
                    </FormControl>
                    <div className="min-h-[8px]">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cabin"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-gray-300">
                      Cabin Alloted
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Table className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          className="bg-gray-800 border-gray-700 text-white pl-10 focus:border-orange-400 focus:ring-orange-400 h-11"
                          placeholder="Enter Cabin Alloted"
                          {...field}
                          onChange={(e) => {
                            if (isNumber(e.target.value)) {
                              field.onChange(e);
                            }
                          }}
                          maxLength={2}
                        />
                      </div>
                    </FormControl>
                    <div className="min-h-[8px]">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-gray-300">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          className="bg-gray-800 border-gray-700 text-white pl-10 focus:border-orange-400 focus:ring-orange-400 h-11"
                          placeholder="Email Address"
                          {...field}
                          onChange={(e) => {
                            if (isValidInput(e.target.value)) {
                              field.onChange(e);
                            }
                          }}
                        />
                      </div>
                    </FormControl>
                    <div className="min-h-[8px]">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-gray-300">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          className="bg-gray-800 border-gray-700 text-white pl-10 focus:border-orange-400 focus:ring-orange-400 h-11"
                          placeholder="Phone Number"
                          {...field}
                          onChange={(e) => {
                            if (isNumber(e.target.value)) {
                              field.onChange(e);
                            }
                          }}
                          maxLength={10}
                        />
                      </div>
                    </FormControl>
                    <div className="min-h-[8px]">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Image Upload Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="aadharCard"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-gray-300">Aadhar Card</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          ref={fileInputRef1}
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageUpload(
                              "image1",
                              e.target.files?.[0] || null
                            )
                          }
                          className="hidden"
                          id="image1-upload"
                        />
                        <label
                          htmlFor="image1-upload"
                          className="flex items-center justify-center w-full h-28 bg-gray-800 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-orange-400 transition-colors"
                        >
                          {field.value ? (
                            <div className="relative w-full h-full">
                              <img
                                src={
                                  field.value ||
                                  "/placeholder.svg?height=112&width=200"
                                }
                                alt="Aadhar Card Preview"
                                className="w-full h-full object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  removeImage("image1");
                                }}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <div className="text-center">
                              <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                              <p className="text-xs text-gray-400">
                                Click to upload
                              </p>
                            </div>
                          )}
                        </label>
                      </div>
                    </FormControl>
                    <div className="min-h-[8px]">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentProof"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-gray-300">
                      Payment Proof
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          ref={fileInputRef2}
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageUpload(
                              "image2",
                              e.target.files?.[0] || null
                            )
                          }
                          className="hidden"
                          id="image2-upload"
                        />
                        <label
                          htmlFor="image2-upload"
                          className="flex items-center justify-center w-full h-28 bg-gray-800 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-orange-400 transition-colors"
                        >
                          {field.value ? (
                            <div className="relative w-full h-full">
                              <img
                                src={
                                  field.value ||
                                  "/placeholder.svg?height=112&width=200"
                                }
                                alt="Payment Proof Preview"
                                className="w-full h-full object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  removeImage("image2");
                                }}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <div className="text-center">
                              <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                              <p className="text-xs text-gray-400">
                                Click to upload
                              </p>
                            </div>
                          )}
                        </label>
                      </div>
                    </FormControl>
                    <div className="min-h-[8px]">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* QR Code Display */}
            <div className="space-y-2">
              <label className="block text-sm text-gray-300">
                Payment QR Code
              </label>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex flex-col sm:flex-row items-center gap-4">
                <Image
                  src="/qr.jpeg"
                  alt="Payment QR Code"
                  width={140}
                  height={140}
                  className="w-28 h-28 sm:w-36 sm:h-36 object-contain rounded-xl bg-white p-2"
                />
                <div className="text-center sm:text-left">
                  <p className="text-white font-medium text-sm sm:text-base">
                    Scan to Pay
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">
                    Use this QR code to make a secure and instant payment using
                    any UPI app
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-start sm:justify-end pt-4">
              <Button
                className="w-full sm:w-48 bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors text-sm sm:text-base"
                type="submit"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;
