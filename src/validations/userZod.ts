/* eslint-disable prettier/prettier */
import { z } from "zod";

export const userSchema = z.object({
  Email: z.string().email("Email erroneo"),
  Password: z.string().min(6, "Minimo 6 caracteres"),
});
