import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router";

export default function HomeLibrary() {
    const location = useLocation();
    const [defaultView] = location.pathname.split("/").slice(-1);

    useEffect(() => {}); // TODO: bug when already at the defaultView parent path that doesnt render the sibling child, occurs only when navigating to a child path, again, via the sidebar

  return (
      <div className="flex flex-1 justify-center px-4 pt-4">
        <Tabs defaultValue={defaultView} className="w-full align-top">
      <TabsList className="grid w-full grid-cols-2 gap-0.5">
        <Link to="liked">
            <TabsTrigger value="liked" className="size-full">Liked</TabsTrigger>
        </Link>
        <Link to="history">
            <TabsTrigger value="history" className="size-full">History</TabsTrigger>
        </Link>
      </TabsList>
      <Outlet />
    </Tabs>
      </div>
    )
}