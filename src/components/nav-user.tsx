'use client';

import {
    BadgeCheck,
    CreditCard,
    LogOut,
    Settings,
    Sparkles,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenuButton, useSidebar } from '@/components/ui/sidebar';
import { Link } from 'react-router';
import { cn } from '@/lib/utils';

export function NavUser({
    user,
}: {
    user: {
        name: string;
        email: string;
        avatar: string;
    };
}) {
    const { isMobile, open } = useSidebar();

    return (
        <DropdownMenu>
            <div
                className={cn(
                    "flex gap-2 items-center w-full overflow-hidden",
                    open ? `flex-row` : `flex-col-reverse`
                )}>
                <DropdownMenuTrigger className="grow">
                    <SidebarMenuButton
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="rounded-lg">
                                {user.name[0].toUpperCase() +
                                    (user.name[1].toUpperCase() || '')}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-1 text-left text-sm leading-tight">
                            <span
                                className={cn(
                                    "truncate font-medium transition-all duration-300 ease-in-out",
                                open ? `opacity-100` : `opacity-0`)}>
                                {' '}
                                {user.name}
                            </span>
                        </div>
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <Link
                    to="/settings/desktop"
                    className={cn(
                        'size-8 hover:bg-sidebar-accent hover:rotate-100 transition-all duration-500 items-center flex justify-center rounded-full',
                    )}
                >
                    <Settings className="size-5" />
                </Link>
            </div>
            <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? 'bottom' : 'right'}
                align="end"
                sideOffset={4}
            >
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="rounded-lg">
                                {user.name[0].toUpperCase() +
                                    (user.name[1].toUpperCase() || '')}
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">
                                {user.name}
                            </span>
                            {/* <span className="truncate text-xs">
                                {user.email}
                            </span> */}
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link to="#" className="flex gap-2 w-full">
                        <Sparkles />
                        Upgrade to Pro
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link to="#" className="flex gap-2 w-full">
                            <BadgeCheck />
                            Account
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link to="#" className="flex gap-2 w-full">
                        <CreditCard />
                        Billing
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link to="/login" className="flex gap-2 w-full">
                    <LogOut />
                    Log out
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
