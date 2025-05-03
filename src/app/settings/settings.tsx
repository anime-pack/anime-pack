import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router";

export default function Settings() {
    const location = useLocation();
    const [defaultView] = location.pathname.split("/").slice(-1);

    useEffect(() => {}, [defaultView]); // TODO: bug when already at the defaultView parent path that doesnt render the sibling child, occurs only when navigating to a child path, again, via the sidebar

    return (
        <div className="flex flex-1 justify-center px-4">
        <Tabs defaultValue={defaultView} className="w-full align-top">
      <TabsList className="grid w-full grid-cols-3 gap-0.5">
        <Link to="appearence">
            <TabsTrigger value="appearence" className="size-full">Appearence</TabsTrigger>
        </Link>
        <Link to="desktop">
            <TabsTrigger value="desktop" className="size-full">Desktop</TabsTrigger>
        </Link>
        <Link to="About">
            <TabsTrigger value="about" className="size-full">About</TabsTrigger>
        </Link>
      </TabsList>
      <Outlet />
    </Tabs>
        </div>
    )
}