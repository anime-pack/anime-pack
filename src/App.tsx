// import { invoke } from "@tauri-apps/api/core";
import { Toaster } from "sonner";
import MainPage from "./app/main";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import "./index.css";
import LoginPage from "@/app/login/page";
import SplashScreen from "@/app/splash-screen";
import Home from "./app/home/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashScreen />,
  },
  {
    path: "/main",
    element: <MainPage />,
    children: [
      { index: true, element: <Home />}
    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
  }
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
