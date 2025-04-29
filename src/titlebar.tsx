import { getCurrentWindow } from "@tauri-apps/api/window";
import { Expand, Minimize, X } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router";

export default function Titlebar() {
    const appWindow = getCurrentWindow();
    let location = useLocation();
    let titlebarClasses = "widith-full sticky top-0 z-10 flex h-7 gap-3 items-center justify-end bg-zinc-900"
    const absoluteTitlebarPaths = [
        "/login",
        "/",
        "/splash-screen",
    ];

    useEffect(() => {
        if (absoluteTitlebarPaths.includes(location.pathname)) {
            titlebarClasses += " fixed left-0 right-0";
        };
    })

  return (
    <div data-tauri-drag-region id="titlebar" className={titlebarClasses}>
  <div id="titlebar-minimize" className="fit-content hover:bg-zinc-700 h-full aspect-1/1 items-center flex justify-center" onClick={async () => await appWindow.minimize()}>
    <Minimize className="size-4"/>
  </div>
  <div id="titlebar-maximize" className="fit-content hover:bg-zinc-700 h-full aspect-1/1 items-center flex justify-center" onClick={async () => await appWindow.toggleMaximize()}>
    <Expand className="size-4"/>
  </div>
  <div id="titlebar-close" className="mr-1 fit-content hover:bg-zinc-700 h-full aspect-1/1 items-center flex justify-center" onClick={async () => await appWindow.close()}>
    <X className="size-4"/>
  </div>
</div>
  );
}