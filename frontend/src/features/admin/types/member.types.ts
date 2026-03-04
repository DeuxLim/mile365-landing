import type z from "zod";
import type { memberSchema } from "../schemas/member.schema";

export type Member = z.infer<typeof memberSchema>;
