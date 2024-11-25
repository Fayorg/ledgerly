'use server';
 
import { InvalidCrendentials, signIn } from '@/lib/auth';
import { AuthError } from 'next-auth';
 
export async function authenticate(prevState: string | undefined, formData: FormData ) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            console.info(error);
            console.info(error.type);
            if(error instanceof InvalidCrendentials) {
                return "Custom error handled";
            }
            // switch (error.type) {
            // case 'CredentialsSignin':
            //     return 'Invalid credentials.';
            // default:
            //     return 'Something went wrong.';
            // }
            return "Invalid Credentials";
        }
        throw error;
    }
}