import { z } from "zod";
import { repairSchema } from "./repair.model";

export const editSchema = repairSchema.omit({
  observacionesTecnicas: true,
});

export type EditFormValues = z.infer<typeof editSchema>;
