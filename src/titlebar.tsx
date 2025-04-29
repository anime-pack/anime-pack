import { getCurrentWindow } from "@tauri-apps/api/window";
import { Expand, Minimize, Minus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { useSidebar } from "./components/ui/sidebar";

export default function Titlebar() {
    const appWindow = getCurrentWindow();
    let location = useLocation();
    const { open } = useSidebar();
    let [isMaximized, setIsMaximized] = useState(false);
    let [titlebarClasses, setTitlebarClasses] = useState("widith-full sticky top-0 z-10 flex h-7 gap-3 items-center bg-zinc-900")
    const absoluteTitlebarPaths = [
      "/",
      "/login",
    ];

    useEffect(() => {
        const checkMaximized = async () => {
            const maximized = await appWindow.isMaximized();
            setIsMaximized(maximized);
        };
      const updateClasses = () => {
            let newClasses = "widith-full sticky top-0 z-10 flex h-7 gap-3 items-center bg-zinc-900";
            
            if (absoluteTitlebarPaths.includes(location.pathname)) {
                newClasses += " absolute left-0 right-0";
            }
            
            newClasses += open ? " justify-end" : " justify-between";
            
            setTitlebarClasses(newClasses);
        };

        checkMaximized();
        updateClasses();
    }, [open, location.pathname]);

  return (
    <div data-tauri-drag-region id="titlebar" className={titlebarClasses}>
      {!open && <span className="hover:text-blue-500 font-bold transition-colors px-1.5 animate-in fade-in-5"><Link to="/">Anime Pack</Link></span>}
      <div className="flex items-center h-full">
        <div id="titlebar-minimize" className="fit-content hover:bg-zinc-700 h-full aspect-1/1 items-center flex justify-center" onClick={async () => await appWindow.minimize()}>
          <Minus className="size-4"/>
        </div>
        <div id="titlebar-maximize" className="fit-content hover:bg-zinc-700 h-full aspect-1/1 items-center flex justify-center" onClick={async () => await appWindow.toggleMaximize()}>
          {isMaximized ? <Minimize className="size-4" /> : <Expand className="size-4"/>}
        </div>
        <div id="titlebar-close" className="fit-content hover:bg-red-500 h-full aspect-1/1 items-center flex justify-center" onClick={async () => await appWindow.close()}>
          <X className="size-4"/>
        </div>
      </div>
</div>
  );
}