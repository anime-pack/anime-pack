import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Titlebar from "@/titlebar"
import { useEffect, useState } from "react"
import { Link, Outlet, useLocation } from "react-router"
import SearchBar from "./searchBar"

export default function MainPage() {
  let location = useLocation();
  let [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

  const pathMap: Record<string, string> = {
    home: "/",
    settings: "/settings",
    login: "/login",
  }

  useEffect(() => {
    let updatedBreadcrumbs = location.pathname.split("/").filter((crumb) => crumb !== "");
    switch (updatedBreadcrumbs[0]) {
      case "settings":
        if (updatedBreadcrumbs.length < 2) {
          updatedBreadcrumbs = updatedBreadcrumbs.concat(["appearence"]);
        }
        break;
      default:
        updatedBreadcrumbs = ["home"].concat(updatedBreadcrumbs);
        break;
    };

    setBreadcrumbs(updatedBreadcrumbs);
  }, [location.pathname]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="">
      <Titlebar />
        <header className="flex relative h-13 shrink-0 items-center gap-2 justify-between transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => {
                  if (index === 0) {
                    return (
                      <BreadcrumbItem key={crumb}>
                        {!(breadcrumbs.length > 1) ?
                          <BreadcrumbPage>
                            {crumb.at(0)?.toUpperCase() + crumb.slice(1)}
                          </BreadcrumbPage>
                        :
                        <BreadcrumbLink href="#">
                          <Link to={pathMap[crumb] || `/${crumb}`}>
                            {crumb.at(0)?.toUpperCase() + crumb.slice(1)}
                          </Link>
                        </BreadcrumbLink>
                        }
                      </BreadcrumbItem>
                    )
                  };
                  if (index === breadcrumbs.length - 1 && breadcrumbs.length > 0) {
                    return (
                      <>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                          <BreadcrumbPage>
                            {crumb.at(0)?.toUpperCase() + crumb.slice(1)}
                          </BreadcrumbPage>
                        </BreadcrumbItem>
                      </>
                    )
                  };
                  return (
                    <>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem key={crumb}>
                        <BreadcrumbLink href="#">
                          <Link to={pathMap[crumb] || `/${crumb}`}>
                            {crumb.at(0)?.toUpperCase() + crumb.slice(1)}
                          </Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    </>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <SearchBar />
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
