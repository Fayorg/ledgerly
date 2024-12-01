'use server';
 
import { FormPayload } from '@/components/form/authentication-form';
import { signIn } from '@/lib/auth';
import { LOGIN_SCHEMA } from '../validation/auth';
import prisma from '../prisma';
import { isRedirectError } from 'next/dist/client/components/redirect';
 
// export async function authenticate(prevState: string | undefined, formData: FormData ) {
//     try {
//         await signIn('credentials', formData);
//     } catch (error) {
//         if (error instanceof AuthError) {
//             if(error instanceof InvalidCrendentials) {
//                 return "Incorrect email or password";
//             }

//             return "Something went wrong";
//         }
//         throw error;
//     }
// }

export async function login(formData: FormPayload): Promise<string | void> {
    const parsedCrendential = LOGIN_SCHEMA.safeParse(formData);

    if (!parsedCrendential.success) return parsedCrendential.error.errors[0].message;

    try {
        // TODO: This is not the best way and should be changed
        const formData = new FormData();
        formData.append("email", parsedCrendential.data.email);
        formData.append("password", parsedCrendential.data.password);

        await signIn("credentials", formData);
    } catch (error) {
        // https://github.com/nextauthjs/next-auth/discussions/9389
        if(isRedirectError(error)) return;

        // TODO: log the error and report it.
        return "Something went wrong";
    }
}