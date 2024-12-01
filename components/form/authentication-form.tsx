'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { register } from '@/lib/actions/register';
import { LOGIN_SCHEMA, REGISTER_SCHEMA } from '@/lib/validation/auth';
import { useRouter } from 'next/navigation';
import { log } from 'console';
import { login } from '@/lib/actions/login';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
	signup?: boolean;
}

export type FormPayload = { signup: boolean; email: string; password: string; name: string; repeatPassword: string };

export function UserAuthForm({ className, signup = false, ...props }: UserAuthFormProps) {
	const { toast } = useToast();
	const toastTitle = 'Uh oh! Something went wrong.';

	const router = useRouter();

	const [payload, setPayload] = React.useState<FormPayload>({ signup } as FormPayload);
	const [isPending, setIsPending] = React.useState<boolean>(false);

	async function handleRegistration(e: React.FormEvent) {
		e.preventDefault();
		setIsPending(true);

		// TODO: password must match some criteria

		const result = REGISTER_SCHEMA.safeParse(payload);
		if (!result.success) {
			toast({ variant: 'destructive', title: toastTitle, description: result.error.errors[0].message });
			setIsPending(false);
			return;
		}

		const errorMessage = await register({ ...payload });
		if (errorMessage) {
			toast({ variant: 'destructive', title: toastTitle, description: errorMessage });
			setIsPending(false);
			return;
		}

		router.push('/');

		setIsPending(false);
	}

	async function handleLogin(e: React.FormEvent) {
		e.preventDefault();
		setIsPending(true);

		const result = LOGIN_SCHEMA.safeParse(payload);
		if (!result.success) {
			toast({ variant: 'destructive', title: toastTitle, description: result.error.errors[0].message });
			setIsPending(false);
			return;
		}

		const errorMessage = await login({ ...payload });
		if (errorMessage) {
			toast({ variant: 'destructive', title: toastTitle, description: errorMessage });
			setIsPending(false);
			return;
		}

		router.push('/');

		setIsPending(false);
	}

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<form onSubmit={signup ? handleRegistration : handleLogin}>
				<div className="grid gap-2">
					{signup && (
						<div className="grid gap-1">
							<Label className="sr-only" htmlFor="name">
								Name
							</Label>
							<Input id="name" name="name" required placeholder="Full Name" type="text" autoCapitalize="words" autoComplete="name" autoCorrect="off" disabled={isPending} value={payload?.name || ''} onChange={(e) => setPayload((prev) => ({ ...prev, name: e.target.value } as FormPayload))} />
						</div>
					)}
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="email">
							Email
						</Label>
						<Input id="email" name="email" required placeholder="name@example.com" type="email" autoCapitalize="none" autoComplete="email" autoCorrect="off" disabled={isPending} value={payload?.email || ''} onChange={(e) => setPayload((prev) => ({ ...prev, email: e.target.value } as FormPayload))} />
					</div>
					{signup ? (
						<>
							<div className="grid gap-1">
								<Label className="sr-only" htmlFor="password">
									Password
								</Label>
								<Input id="password" required placeholder="Password" type="password" autoCapitalize="none" autoComplete="new-password" autoCorrect="off" disabled={isPending} value={payload?.password || ''} onChange={(e) => setPayload((prev) => ({ ...prev, password: e.target.value } as FormPayload))} />
							</div>
							<div className="grid gap-1">
								<Label className="sr-only" htmlFor="repeat-password">
									Repeat Password
								</Label>
								<Input id="repeat-password" required placeholder="Repeat password" type="password" autoCapitalize="none" autoComplete="new-password" autoCorrect="off" disabled={isPending} value={payload?.repeatPassword || ''} onChange={(e) => setPayload((prev) => ({ ...prev, repeatPassword: e.target.value } as FormPayload))} />
							</div>
						</>
					) : (
						<div className="grid gap-1">
							<Label className="sr-only" htmlFor="password">
								Password
							</Label>
							<Input id="password" name="password" required placeholder="Password" type="password" autoCapitalize="none" autoComplete="current-password" autoCorrect="off" disabled={isPending} value={payload?.password || ''} onChange={(e) => setPayload((prev) => ({ ...prev, password: e.target.value } as FormPayload))} />
						</div>
					)}
					<Button disabled={isPending}>
						{isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
						{signup ? 'Sign Up' : 'Sign In'} with Email
					</Button>
				</div>
			</form>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">Or continue with</span>
				</div>
			</div>
			<Button variant="outline" type="button" disabled={isPending}>
				{isPending ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <Icons.gitHub className="mr-2 h-4 w-4" />} GitHub
			</Button>
		</div>
	);
}
