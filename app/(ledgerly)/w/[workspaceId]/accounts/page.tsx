import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Plus, WalletMinimal } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function AccountsPage({ params }: { params: Promise<{ workspaceId: string }> }) {
	const session = await auth();
	if (!session?.user || !session.user.email) {
		return redirect('/sign-in');
	}

	const { workspaceId } = await params;
	const funds = await prisma.fund.findMany({
		where: {
			workspace: {
				id: workspaceId,
				owner: {
					email: session.user.email,
				},
			},
		},
	});

	return (
		<div className="container mx-auto px-4 py-4">
			<h1 className="text-2xl font-bold">Accounts</h1>
			{funds.length === 0 ? (
				<div className="flex flex-col gap-4 items-center bg-white rounded-lg py-8 mt-4 shadow-sm">
					<WalletMinimal size={64} />
					<div className="flex flex-col items-center gap-0">
						<h3 className="text-xl font-bold">No accounts</h3>
						<p>Get started by creating a new account.</p>
					</div>
					<Button>
						<Plus /> New Account
					</Button>
				</div>
			) : (
				<>
					<div className="flex justify-between">
						<div></div>
						<Button>New Account</Button>
					</div>
					<div>
						{funds.map((fund) => (
							<div key={fund.id}>{fund.name}</div>
						))}
					</div>
				</>
			)}
		</div>
	);
}
