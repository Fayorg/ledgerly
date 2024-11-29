'use client';

import { SidebarHeader, Sidebar, SidebarContent, SidebarGroup, SidebarFooter } from '@/components/ui/sidebar';
import { TeamSwitcher } from '@/components/workspace-switcher';

export function ApplicationSidebar() {
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<TeamSwitcher workspaces={[{ name: 'Testing', plan: 'FREE' }]} />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup />
			</SidebarContent>
			<SidebarFooter></SidebarFooter>
		</Sidebar>
	);
}
