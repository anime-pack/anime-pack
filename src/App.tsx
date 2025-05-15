import { Toaster } from 'sonner';
import MainPage from './app/main';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { ThemeProvider, useTheme } from '@/components/theme-provider';
import './index.css';
import LoginPage from '@/app/login/page';
import Home from './app/home/home';
import Settings from './app/settings/settings';
import HomeLibrary from './app/library/library';
import LibraryLiked from './app/library/liked';
import LibraryHistory from './app/library/history';
import Anime from './app/home/anime';
import HomeSearch from './app/home/search';
import LibraryPacks from './app/library/packs';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
        children: [
            { index: true, element: <Home /> },
            {
                path: '/library',
                element: <HomeLibrary />,
                children: [
                    {
                        path: '/library/liked',
                        element: <LibraryLiked />,
                    },
                    {
                        path: '/library/history',
                        element: <LibraryHistory />,
                    },
                    {
                        path: '/library/packs',
                        element: <LibraryPacks />,
                    },
                ],
            },
            {
                path: '/settings',
                element: <Settings />,
            },
            {
                path: '/anime',
                element: <Anime />,
            },
            {
                path: '/search',
                element: <HomeSearch />,
            },
        ],
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
]);

function App() {
    // TODO: refactor all frontend to VueJs
    const { theme } = useTheme();

    return (
        <ThemeProvider>
            <RouterProvider router={router} />
            <Toaster
                position="bottom-right"
                theme={theme}
                richColors={true}
                visibleToasts={5}
                className="toaster group"
                style={
                    {
                        '--normal-bg': 'var(--popover)',
                        '--normal-text': 'var(--popover-foreground)',
                        '--normal-border': 'var(--border)',
                    } as React.CSSProperties
                }
            />
        </ThemeProvider>
    );
}

export default App;
