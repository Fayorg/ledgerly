"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function register(prevState: string | undefined, formData: FormData) {
    const parsedCredentials = z
        .object({ email: z.string().email(), password: z.string().min(8), name: z.string().min(2).max(50) })
        .safeParse(Object.fromEntries(formData.entries()));

    if (!parsedCredentials.success) return "Invalid email or password";
    if (formData.get("password") !== formData.get("repeatPassword")) return "Passwords do not match";
    if (await prisma.user.findUnique({ where: { email: parsedCredentials.data.email } })) return "Email already in use";

    // TODO: add salt and hash password

    try {
        await prisma.user.create({
            data: {
                email: parsedCredentials.data.email,
                password: parsedCredentials.data.password,
                name: parsedCredentials.data.name,
            }
        });
    } catch (error) {
        console.error(error);
        return "Something went wrong";
    } finally {
        redirect("/sign-in");
    }
}