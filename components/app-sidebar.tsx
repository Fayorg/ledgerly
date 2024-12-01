'use client';

import { SidebarHeader, Sidebar, SidebarContent, SidebarGroup, SidebarFooter, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar';
import { TeamSwitcher } from '@/components/workspace-switcher';
import { Workspace } from '@prisma/client';
import { CircleGauge, WalletMinimal, ChevronRight, Settings2, ChevronsUpDown, BadgeCheck, Bell, LogOut } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { logout } from '@/lib/actions/logout';

const NAVIGATION_MAIN = [
	{
		title: 'Dashboard',
		url: '#',
		icon: CircleGauge,
		isActive: true,
		items: [
			{
				title: 'View',
				url: '#',
			},
			{
				title: 'Transactions',
				url: '#',
			},
			{
				title: 'Comparison',
				url: '#',
			},
		],
	},
	{
		title: 'Accounts',
		url: '/accounts',
		icon: WalletMinimal,
		items: [
			{
				title: 'Accounts',
				url: '/accounts',
			},
			{
				title: 'Account types',
				url: '#',
			},
			{
				title: 'Linked accounts',
				url: '#',
			},
		],
	},
	{
		title: 'Settings',
		url: '#',
		icon: Settings2,
		items: [
			{
				title: 'General',
				url: '#',
			},
			{
				title: 'Collaboration',
				url: '#',
			},
			{
				title: 'Billing',
				url: '#',
			},
		],
	},
];

export function ApplicationSidebar({ workspaces, user }: { workspaces: Workspace[]; user: { name: string; email: string; image: string } }) {
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<TeamSwitcher workspaces={workspaces} />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Platform</SidebarGroupLabel>
					<SidebarMenu>
						{NAVIGATION_MAIN.map((item) => (
							<Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
								<SidebarMenuItem>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton tooltip={item.title}>
											{item.icon && <item.icon />}
											<span>{item.title}</span>
											<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
										</SidebarMenuButton>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<SidebarMenuSub>
											{item.items?.map((subItem) => (
												<SidebarMenuSubItem key={subItem.title}>
													<SidebarMenuSubButton asChild>
														<a href={subItem.url}>
															<span>{subItem.title}</span>
														</a>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									</CollapsibleContent>
								</SidebarMenuItem>
							</Collapsible>
						))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
									<Avatar className="h-8 w-8 rounded-lg">
										<AvatarImage src={user.image} alt={user.name} />
										<AvatarFallback className="rounded-lg">{user.name.split(' ').length >= 2 ? user.name.split(' ')[0].at(0) || '' + user.name.split(' ')[1].at(0) || '' : user.name.at(0)}</AvatarFallback>
									</Avatar>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-semibold">{user.name}</span>
										<span className="truncate text-xs">{user.email}</span>
									</div>
									<ChevronsUpDown className="ml-auto size-4" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side="bottom" align="end" sideOffset={4}>
								<DropdownMenuLabel className="p-0 font-normal">
									<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
										<Avatar className="h-8 w-8 rounded-lg">
											<AvatarImage src={user.image} alt={user.name} />
											<AvatarFallback className="rounded-lg">{user.name.split(' ').length >= 2 ? user.name.split(' ')[0].at(0) || '' + user.name.split(' ')[1].at(0) || '' : user.name.at(0)}</AvatarFallback>
										</Avatar>
										<div className="grid flex-1 text-left text-sm leading-tight">
											<span className="truncate font-semibold">{user.name}</span>
											<span className="truncate text-xs">{user.email}</span>
										</div>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem>
										<BadgeCheck />
										Account
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Bell />
										Notifications
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={async () => {
										await logout();
									}}
								>
									<LogOut />
									Log out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
