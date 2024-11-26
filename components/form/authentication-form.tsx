'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActionState } from 'react';
import { authenticate } from '@/lib/actions/authentication';
import { useToast } from '@/hooks/use-toast';
import { register } from '@/lib/actions/register';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
	signup?: boolean;
}

export function UserAuthForm({ className, signup = false, ...props }: UserAuthFormProps) {
	const { toast } = useToast();

	const [errorMessage, formAction, isPending] = useActionState(signup ? register : authenticate, undefined);

	React.useEffect(() => {
		if (errorMessage) {
			toast({ variant: 'destructive', title: 'Uh oh! Something went wrong.', description: errorMessage });
		}
	}, [errorMessage]);

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<form action={formAction}>
				<div className="grid gap-2">
					{signup && (
						<div className="grid gap-1">
							<Label className="sr-only" htmlFor="name">
								Name
							</Label>
							<Input id="name" name="name" required placeholder="Full Name" type="text" autoCapitalize="words" autoComplete="name" autoCorrect="off" disabled={isPending} />
						</div>
					)}
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="email">
							Email
						</Label>
						<Input id="email" name="email" required placeholder="name@example.com" type="email" autoCapitalize="none" autoComplete="email" autoCorrect="off" disabled={isPending} />
					</div>
					{signup ? (
						<>
							<div className="grid gap-1">
								<Label className="sr-only" htmlFor="password">
									Password
								</Label>
								<Input id="password" name="password" required placeholder="Password" type="password" autoCapitalize="none" autoComplete="new-password" autoCorrect="off" disabled={isPending} />
							</div>
							<div className="grid gap-1">
								<Label className="sr-only" htmlFor="repeat-password">
									Repeat Password
								</Label>
								<Input id="repeat-password" name="repeatPassword" required placeholder="Repeat password" type="password" autoCapitalize="none" autoComplete="new-password" autoCorrect="off" disabled={isPending} />
							</div>
						</>
					) : (
						<div className="grid gap-1">
							<Label className="sr-only" htmlFor="password">
								Password
							</Label>
							<Input id="password" name="password" required placeholder="Password" type="password" autoCapitalize="none" autoComplete="current-password" autoCorrect="off" disabled={isPending} />
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
