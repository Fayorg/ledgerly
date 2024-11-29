import '../globals.css';
import { Toaster } from '@/components/ui/toaster';

export default function AuthenticationLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={`antialiased`}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
