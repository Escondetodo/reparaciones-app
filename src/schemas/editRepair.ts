import { z } from "zod";
import { repairSchema } from "./repair";

export const editSchema = repairSchema.omit({
  observacionesTecnicas: true,
});

export type EditFormValues = z.infer<typeof editSchema>;
