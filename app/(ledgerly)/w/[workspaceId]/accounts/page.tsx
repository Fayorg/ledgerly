import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function AccountsPage() {
	const session = await auth();
	if (!session?.user || !session.user.email) {
		return redirect('/sign-in');
	}

	const funds = await prisma.fund.findMany({
		where: {
			workspace: {
				owner: {
					email: session.user.email,
				},
			},
		},
	});

	return (
		<div className="container bg-red-500 mx-auto px-4">
			{funds.map((funds) => (
				<div key={workspace.id}>{workspace.name}</div>
			))}
		</div>
	);
}
