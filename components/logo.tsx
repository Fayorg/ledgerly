import Image from 'next/image';

export function Ledgerly() {
	return (
		<div className="relative w-full aspect-square">
			<Image src="/logo.webp" alt="Ledgerly" fill />
		</div>
	);
}
