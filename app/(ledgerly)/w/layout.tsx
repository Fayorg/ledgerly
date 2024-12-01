export default function W({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`antialiased`}>{children}</body>
		</html>
	);
}
