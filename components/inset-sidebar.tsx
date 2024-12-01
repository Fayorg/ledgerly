'use client';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';

export default function InsetSidebar() {
	const { workspaceId } = useParams();
	let pathname = usePathname().split('/');
	pathname.shift();
	pathname.shift();
	pathname.shift();

	return (
		<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-white border-b border-sidebar-border">
			<div className="flex items-center gap-2 px-4">
				<SidebarTrigger className="-ml-1" />
				<Separator orientation="vertical" className="mr-2 h-4" />
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href={'/w/' + workspaceId}>Workspace</BreadcrumbLink>
						</BreadcrumbItem>
						{pathname[0] !== '' &&
							pathname.map((path, index) => {
								const href = pathname.slice(0, index + 1).join('/');
								const isLast = index === pathname.length - 1;

								return (
									<React.Fragment key={index}>
										<BreadcrumbSeparator className="hidden md:block" />
										<BreadcrumbItem>
											<BreadcrumbLink href={href}>{path.at(0)?.toUpperCase() + path.substring(1, path.length)}</BreadcrumbLink>
										</BreadcrumbItem>
										{!isLast && <BreadcrumbSeparator className="hidden md:block" />}
									</React.Fragment>
								);
							})}
					</BreadcrumbList>
				</Breadcrumb>
			</div>
		</header>
	);
}
