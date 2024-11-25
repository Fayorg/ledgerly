'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActionState } from 'react';
import { authenticate } from '@/lib/actions/authentication';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<form action={formAction}>
				<div className="grid gap-2">
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="email">
							Email
						</Label>
						<Input id="email" placeholder="name@example.com" type="email" autoCapitalize="none" autoComplete="email" autoCorrect="off" disabled={isPending} />
					</div>
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="password">
							Password
						</Label>
						<Input id="password" placeholder="Password" type="password" autoCapitalize="none" autoComplete="new-password" autoCorrect="off" disabled={isPending} />
					</div>
					<Button disabled={isPending}>
						{isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
						Sign In with Email
					</Button>
				</div>
				<div>
					{/* TODO: Use popup instead */}
					<p>{errorMessage}</p>
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
