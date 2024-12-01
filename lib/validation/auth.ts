import { z } from "zod";

export const REGISTER_SCHEMA = z
		.object({
			email: z.string().email({ message: 'Invalid email format' }),
			password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
			name: z.string().min(1, { message: 'Name cannot be empty' }).max(50, { message: 'Name must be less than 50 characters' }),
			repeatPassword: z.string(),
		})
		.superRefine((data, ctx) => {
			if (data.password !== data.repeatPassword) {
				ctx.addIssue({ path: ['repeatPassword'], message: 'Passwords do not match', code: 'custom' });
			}
		});

export const LOGIN_SCHEMA = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    password: z.string().min(8, { message: 'Incorrect password or email' }),
});