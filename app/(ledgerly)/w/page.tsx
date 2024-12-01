import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function WPage() {
	const session = await auth();
	if (!session?.user || !session.user.email) {
		return null;
	}

	const workspace = await prisma.workspace.findFirst({
		where: {
			owner: {
				email: session.user.email,
			},
		},
	});
	if (!workspace) {
		redirect('/init/workspace');
	}

	redirect('/w/' + workspace.id + '/');
}
