'use server';
 
import { InvalidCrendentials, signIn } from '@/lib/auth';
import { AuthError } from 'next-auth';
 
export async function authenticate(prevState: string | undefined, formData: FormData ) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            if(error instanceof InvalidCrendentials) {
                return "Incorrect email or password";
            }

            return "Something went wrong";
        }
        throw error;
    }
}