import { Toaster } from "sonner";
import MainPage from "./app/main";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import "./index.css";
import LoginPage from "@/app/login/page";
import Home from "./app/home/home";
import Settings from "./app/settings/settings";
import SettingsAppearence from "./app/settings/appearence";
import SettingsDesktop from "./app/settings/desktop";
import SettingsAbout from "./app/settings/about";
import HomeLibrary from "./app/library/librabry";
import LibraryLiked from "./app/library/liked";
import LibraryHistory from "./app/library/history";
import HomeAnime from "./app/home/anime";
import HomeSearch from "./app/home/search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/library",
        element: <HomeLibrary />,
        children: [
          {
            path: "/library/liked",
            element: <LibraryLiked />,
          },
          {
            path: "/library/history",
            element: <LibraryHistory />,
          },
        ],
      },
      {
        path: "/settings",
        element: <Settings />,
        children: [
          { 
            // index: true,
            path: "/settings/appearence",
            element: <SettingsAppearence />,
          },
          {
            path: "/settings/desktop",
            element: <SettingsDesktop />,
          },
          {
            path: "/settings/about",
            element: <SettingsAbout />,
          }
        ]
      },
      {
        path: "/anime/:id",
        element: <HomeAnime />,
      },
      {
        path: "/search",
        element: <HomeSearch />,
      },
    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function App() {
  const { theme } = useTheme()

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster
        position="bottom-center"
        theme={theme}
        richColors={true}
        className="toaster group"
        style={
          {
            "--normal-bg": "var(--popover)",
            "--normal-text": "var(--popover-foreground)",
            "--normal-border": "var(--border)",
          } as React.CSSProperties
        }
      />
    </ThemeProvider>
  );
}

export default App;
