import '../globals.css';

export default function AuthenticationLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={`antialiased`}>
				{/* <div className="container flex justify-center items-center">{children}</div> */}
				{children}
			</body>
		</html>
	);
}
