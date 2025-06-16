import * as z from 'zod';

export const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  pincode: z.string().max(4).min(1,{ message: "pincode is required" }),
});
