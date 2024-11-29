'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PlanSelector from '../plan-selector';
import React, { FormEvent } from 'react';
import { getDefaultPlan, Plan } from '@/lib/plans';
import { Button } from '@/components/ui/button';
import { Icons } from '../icons';
import { INIT_WORKSPACE } from '@/lib/validation/workspace';
import { useToast } from '@/hooks/use-toast';
import { createWorkspace } from '@/lib/actions/workspace';
import { ZodError } from 'zod';
import { useRouter } from 'next/navigation';

export type InitWorkspacePayload = { name: string; plan: Plan };

export function InitWorkspaceForm() {
	const toastTitle = 'Uh oh! Something went wrong.';

	const [payload, setPayload] = React.useState<InitWorkspacePayload>({ plan: getDefaultPlan(), name: '' } as InitWorkspacePayload);
	const [isPending, setPending] = React.useState<boolean>(false);

	const { toast } = useToast();
	const router = useRouter();

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		setPending(true);

		const validation = INIT_WORKSPACE.safeParse({ ...payload, plan: payload.plan.name });
		if (!validation.success) {
			toast({ variant: 'destructive', title: toastTitle, description: validation.error.errors[0].message });
			console.error('Validation error', validation.error);
			setPending(false);
			return;
		}

		const workspace = await createWorkspace(validation.data);
		console.log('Workspace', workspace);
		if (workspace instanceof ZodError) {
			toast({ variant: 'destructive', title: toastTitle, description: workspace.errors[0].message });
			setPending(false);
			return;
		}

		router.push('/');
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="grid gap-2">
				<div className="grid gap-1">
					<Label className="pl-1" htmlFor="name">
						Workspace Name
					</Label>
					<Input id="name" name="name" required placeholder="Name" type="text" autoCapitalize="words" autoComplete="name" autoCorrect="off" disabled={isPending} value={payload.name} onChange={(e) => setPayload((prev) => ({ ...prev, name: e.target.value }))} />
				</div>
				<div className="grid gap-1">
					<Label className="pl-1" htmlFor="name">
						Select plan
					</Label>
					<PlanSelector plan={payload.plan} onPlanChange={(plan) => setPayload((prev) => ({ ...prev, plan: plan }))} disabled={isPending} />
				</div>

				<Button disabled={isPending}>
					{false && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
					Next
				</Button>
			</div>
		</form>
	);
}
