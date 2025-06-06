import { AppSidebar } from '@/components/app-sidebar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import Titlebar from '@/titlebar';
import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import SearchBar from './searchBar';
import { HotKeys } from 'react-hotkeys';

export default function MainPage() {
    let location = useLocation();
    let [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);
    const inptRef = useRef<HTMLInputElement>(null);

    const searchHotkeyMap = {
        focusSearchBar: 'ctrl+k',
    };

    const searchHotkeyHandler = {
        focusSearchBar: () => {
            console.log('KEY! !', inptRef.current);
            inptRef.current?.focus();
        },
    };

    const pathMap: Record<string, string> = {
        home: '/',
        settings: '#',
        login: '/login',
        library: '#',
        anime: '#',
    };

    useEffect(() => {
        let updatedBreadcrumbs = location.pathname
            .split('/')
            .filter((crumb) => crumb !== '');
        switch (updatedBreadcrumbs[0]) {
            case 'settings':
                if (updatedBreadcrumbs.length < 2) {
                    updatedBreadcrumbs = updatedBreadcrumbs.concat([
                        'appearence',
                    ]);
                }
                break;
            default:
                updatedBreadcrumbs = ['home'].concat(updatedBreadcrumbs);
                if (updatedBreadcrumbs.includes('anime')) {
                    updatedBreadcrumbs = updatedBreadcrumbs.slice(0, 2);
                }
                break;
        }

        setBreadcrumbs(updatedBreadcrumbs);
    }, [location.pathname]);

    return (
        <SidebarProvider>
            <HotKeys
                keyMap={searchHotkeyMap}
                handlers={searchHotkeyHandler}
                className="flex min-h-svh w-full"
            >
                <AppSidebar />
                <SidebarInset className="h-screen overflow-hidden">
                    <Titlebar />
                    <header className="flex sticky h-13 shrink-0 items-center gap-2 justify-between transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 h-4"
                            />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    {breadcrumbs.map((crumb, index) => {
                                        if (index === 0) {
                                            return (
                                                <BreadcrumbItem key={crumb}>
                                                    {!(
                                                        breadcrumbs.length > 1
                                                    ) ? (
                                                        <BreadcrumbPage>
                                                            {crumb
                                                                .at(0)
                                                                ?.toUpperCase() +
                                                                crumb.slice(1)}
                                                        </BreadcrumbPage>
                                                    ) : (
                                                        <BreadcrumbLink href="#">
                                                            <Link
                                                                to={
                                                                    pathMap[
                                                                        crumb
                                                                    ] ||
                                                                    `/${crumb}`
                                                                }
                                                            >
                                                                {crumb
                                                                    .at(0)
                                                                    ?.toUpperCase() +
                                                                    crumb.slice(
                                                                        1
                                                                    )}
                                                            </Link>
                                                        </BreadcrumbLink>
                                                    )}
                                                </BreadcrumbItem>
                                            );
                                        }
                                        if (
                                            index === breadcrumbs.length - 1 &&
                                            breadcrumbs.length > 0
                                        ) {
                                            return (
                                                <>
                                                    <BreadcrumbSeparator className="hidden md:block" />
                                                    <BreadcrumbItem>
                                                        <BreadcrumbPage>
                                                            {crumb
                                                                .at(0)
                                                                ?.toUpperCase() +
                                                                crumb.slice(1)}
                                                        </BreadcrumbPage>
                                                    </BreadcrumbItem>
                                                </>
                                            );
                                        }
                                        return (
                                            <>
                                                <BreadcrumbSeparator className="hidden md:block" />
                                                <BreadcrumbItem key={crumb}>
                                                    <BreadcrumbLink href="#">
                                                        <Link
                                                            to={
                                                                pathMap[
                                                                    crumb
                                                                ] || `/${crumb}`
                                                            }
                                                        >
                                                            {crumb
                                                                .at(0)
                                                                ?.toUpperCase() +
                                                                crumb.slice(1)}
                                                        </Link>
                                                    </BreadcrumbLink>
                                                </BreadcrumbItem>
                                            </>
                                        );
                                    })}
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        <SearchBar />{' '}
                        {/* //TODO: make searchbar focusable by the ctrl+k hotkey */}
                    </header>
                    <hr />
                    <div className="flex-1 w-full min-h-0 overflow-y-auto">
                        {/* //! Adding ScrollArea here creates a massive overflow due the carousel component */}
                        <Outlet />
                    </div>
                </SidebarInset>
            </HotKeys>
        </SidebarProvider>
    );
}
