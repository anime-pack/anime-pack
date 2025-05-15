import { getCurrentWindow } from '@tauri-apps/api/window';
import { Expand, Minimize, Minus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { invoke } from '@tauri-apps/api/core';

export default function AltTitlebar() {
    const appWindow = getCurrentWindow();
    let location = useLocation();
    let [isMaximized, setIsMaximized] = useState(false);
    let [titlebarClasses, setTitlebarClasses] = useState(
        'widith-full sticky top-0 z-10 flex h-7 gap-3 items-center bg-zinc-900'
    );
    const absoluteTitlebarPaths = ['/', '/login'];

    useEffect(() => {
        const checkMaximized = async () => {
            const maximized = await appWindow.isMaximized();
            setIsMaximized(maximized);
        };
        const updateClasses = () => {
            let newClasses =
                'widith-full sticky top-0 z-10 flex h-7 gap-3 items-center bg-muted/50 justify-between';

            if (absoluteTitlebarPaths.includes(location.pathname)) {
                newClasses += ' absolute left-0 right-0';
            }

            setTitlebarClasses(newClasses);
        };

        checkMaximized();
        updateClasses();
    }, [location.pathname, isMaximized]);

    appWindow.once('tauri://resize', async () => {
        setIsMaximized(await appWindow.isMaximized());
    });

    return (
        <div data-tauri-drag-region id="titlebar" className={titlebarClasses}>
                <span className="hover:text-primary font-bold transition-colors slide-in-from-left duration-300 px-1.5 animate-in fade-in-5">
                    <Link to="/">Anime Pack</Link>
                </span>
            <div className="flex items-center h-full">
                <div
                    id="titlebar-minimize"
                    className="fit-content hover:bg-zinc-700 h-full aspect-1/1 items-center flex justify-center"
                    onClick={() =>
                        invoke('window_mmc', {
                            windowLabel: appWindow.label,
                            action: 'minimize',
                        })
                    }
                >
                    <Minus className="size-4" />
                </div>
                <div
                    id="titlebar-maximize"
                    className="fit-content hover:bg-zinc-700 h-full aspect-1/1 items-center flex justify-center"
                    onClick={() => {
                        console.log('here');
                        invoke('window_mmc', {
                            windowLabel: appWindow.label,
                            action: isMaximized ? 'unmaximize' : 'maximize',
                        });
                        setIsMaximized(isMaximized ? false : true);
                    }}
                >
                    {isMaximized ? (
                        <Minimize className="size-4" />
                    ) : (
                        <Expand className="size-4" />
                    )}
                </div>
                <div
                    id="titlebar-close"
                    className="fit-content hover:bg-red-500 h-full aspect-1/1 items-center flex justify-center"
                    onClick={() =>
                        invoke('window_mmc', {
                            windowLabel: appWindow.label,
                            action: 'close',
                        })
                    }
                >
                    <X className="size-4" />
                </div>
            </div>
        </div>
    );
}
