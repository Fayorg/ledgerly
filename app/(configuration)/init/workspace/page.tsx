import { InitWorkspaceForm } from '@/components/form/init-workspace';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function InitWorkspacePage() {
	const session = await auth();
	if (!session?.user) redirect('/sign-in');

	const hasWorkspace: boolean = !!(await prisma.workspace.findFirst({
		where: {
			userId: session.user.id,
		},
	}));
	if (hasWorkspace) redirect('/');

	return (
		<div className="container mx-auto">
			<div className="flex flex-col items-center min-h-screen px-2 pt-6">
				<div className="border-b-2 pb-2 border-gray-300">
					<h1 className="text-3xl font-bold">Let's start by creating a Workspace.</h1>
					<p className="text-gray-700">A Workspace can contain multiple accounts, it can also be shared with other user.</p>
				</div>

				<div className="pt-4 w-full">
					<InitWorkspaceForm />
				</div>
			</div>
		</div>
	);
}
