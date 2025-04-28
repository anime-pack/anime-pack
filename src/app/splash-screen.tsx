// import { invoke } from "@tauri-apps/api/core";
import { PackageOpen } from "lucide-react";
import { useNavigate } from "react-router";

export default function SplashScreen() {
    let navigate = useNavigate();

    setTimeout(() => {  //* Must not leave this here, its just so i can view the splash screen
        navigate("/login");
    }, 3300);

  return (  // TODO: make bg image on spalsh screen work
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10" style={{ backgroundImage: `url("../assets/splash-screen.png")`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
        <PackageOpen className="size-40" />
      <h1>      
        Anime Pack
      </h1>
    </div>
  );
}