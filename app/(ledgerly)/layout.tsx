import type { Metadata } from 'next';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import '../globals.css';
import { ApplicationSidebar } from '@/components/app-sidebar';

export const metadata: Metadata = {
	title: 'Ledgerly',
	description: 'Keep track of your finances with Ledgerly',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={`antialiased`}>
				<SidebarProvider>
					<ApplicationSidebar />
					<main>
						<SidebarTrigger />
						{children}
					</main>
				</SidebarProvider>
			</body>
		</html>
	);
}
