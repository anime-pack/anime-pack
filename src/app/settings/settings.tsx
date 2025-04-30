import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, Outlet } from "react-router";

export default function Settings() {

    return (
        <Tabs defaultValue="appearence" className="w-[97%] self-center">
      <TabsList className="grid w-full grid-cols-3 gap-0.5">
        <Link to="/settings">
            <TabsTrigger value="appearence" className="size-full">Appearence</TabsTrigger>
        </Link>
        {/* <Link to="#">
            <TabsTrigger value="account" className="size-full">Account</TabsTrigger>
        </Link> */}
        <Link to="desktop">
            <TabsTrigger value="desktop" className="size-full">Desktop</TabsTrigger>
        </Link>
        <Link to="About">
            <TabsTrigger value="about" className="size-full">About</TabsTrigger>
        </Link>
      </TabsList>
      <Outlet />
    </Tabs>
    )
}