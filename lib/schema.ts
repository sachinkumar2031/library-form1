import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  cabin: z.string().min(1, "Cabin is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .max(10, "Maximum 10 digit is allowed"),
  aadharCard: z.string().min(1, "Aadhar Card is required"),
  paymentProof: z.string().min(1, "Payment Proof is required"),
});
