import { z } from "zod";
import type { loginSchema } from "../schemas/login.schema";

export type AdminUser = {
	id: number;
	name: string;
	email: string;
	email_verified_at: string | null;
	created_at: string;
	updated_at: string;
};

export type AdminLoginCredentials = z.input<typeof loginSchema>;

export type AdminAuthResponse = {
	message: string;
	user: AdminUser;
};
