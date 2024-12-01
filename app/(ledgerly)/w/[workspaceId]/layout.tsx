import type { Metadata } from 'next';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import '../../../globals.css';
import { ApplicationSidebar } from '@/components/app-sidebar';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import InsetSidebar from '@/components/inset-sidebar';

export const metadata: Metadata = {
	title: 'Ledgerly',
	description: 'Keep track of your finances with Ledgerly',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const session = await auth();
	if (!session?.user || !session.user.email) {
		return null;
	}

	const workspaces = await prisma.workspace.findMany({
		where: {
			owner: {
				email: session.user.email,
			},
		},
	});

	return (
		<html lang="en">
			<body className={`antialiased`}>
				<SidebarProvider>
					<ApplicationSidebar workspaces={workspaces} user={{ name: session.user.name || '', email: session.user.email || '', image: session.user.image || '' }} />
					<SidebarInset>
						<InsetSidebar />
						<main>{children}</main>
					</SidebarInset>
				</SidebarProvider>
			</body>
		</html>
	);
}
