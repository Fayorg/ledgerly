"use server";

import prisma from "@/lib/prisma";
import { REGISTER_SCHEMA } from "../validation/register";
import { FormPayload } from "@/components/form/authentication-form";
import { signIn } from "@/lib/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function register(formData: FormPayload): Promise<string | void> {
    const parsedCrendential = REGISTER_SCHEMA.safeParse(formData);

    if (!parsedCrendential.success) return parsedCrendential.error.errors[0].message;
    if (await prisma.user.findUnique({ where: { email: parsedCrendential.data.email } })) return "Email already in use";

    // TODO: add salt and hash password

    try {
        await prisma.user.create({
            data: {
                email: parsedCrendential.data.email,
                password: parsedCrendential.data.password,
                name: parsedCrendential.data.name,
            }
        });

        // TODO: This is not the best way and should be changed
        const formData = new FormData();
        formData.append("email", parsedCrendential.data.email);
        formData.append("password", parsedCrendential.data.password);

        await signIn("credentials", formData);
    } catch (error) {
        // https://github.com/nextauthjs/next-auth/discussions/9389
        if(isRedirectError(error)) return;

        // TODO: log the error and report it.
        console.info("ERROR: ", error);
        return "Something went wrong";
    }
}