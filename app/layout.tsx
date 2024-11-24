import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Ledgerly',
	description: 'Keep track of your finances with Ledgerly',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={`antialiased`}>{children}</body>
		</html>
	);
}
