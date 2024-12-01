'use client';

import * as React from 'react';
import { ChevronsUpDown, GalleryVerticalEnd, Plus } from 'lucide-react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { useParams, useRouter } from 'next/navigation';

export function TeamSwitcher({ workspaces }: { workspaces: { id: string; name: string; plan: string }[] }) {
	const { workspaceId } = useParams();
	const { isMobile } = useSidebar();
	const router = useRouter();

	const [activeTeam, setActiveTeam] = React.useState(workspaces.findIndex((w) => w.id === workspaceId));

	function switchWorkspace(index: number) {
		setActiveTeam(index);
		router.push(`/w/${workspaces[index].id}`);
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
							<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
								<GalleryVerticalEnd className="size-4" />
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">{workspaces[activeTeam].name}</span>
								<span className="truncate text-xs">{workspaces[activeTeam].plan}</span>
							</div>
							<ChevronsUpDown className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" align="start" side={isMobile ? 'bottom' : 'right'} sideOffset={4}>
						<DropdownMenuLabel className="text-xs text-muted-foreground">Workspaces</DropdownMenuLabel>
						{workspaces.map((team, index) => (
							<DropdownMenuItem key={team.name} onClick={() => switchWorkspace(workspaces.findIndex((w) => w.id === team.id))} className="gap-2 p-2">
								<div className="flex size-6 items-center justify-center rounded-sm border">
									<GalleryVerticalEnd className="size-4 shrink-0" />
								</div>
								{team.name}
								<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem className="gap-2 p-2">
							<div className="flex size-6 items-center justify-center rounded-md border bg-background">
								<Plus className="size-4" />
							</div>
							<div className="font-medium text-muted-foreground">Add workspaces</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
