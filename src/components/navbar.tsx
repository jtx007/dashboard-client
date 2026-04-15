import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

import { Link } from "react-router";
import { Dock, DockIcon } from "./ui/dock";
import { AuroraText } from "./ui/aurora-text";

export function Navbar() {
  return (
    <Dock className="gap-8 px-6 py-3">
      <div className="mr-auto flex min-w-0 shrink items-center">
        <h1 className="text-xl text-left">
          Cool<AuroraText speed={4}>Dashboard</AuroraText>Bro
        </h1>
      </div>
      <DockIcon>
        <Link to="/">Home</Link>
      </DockIcon>
      <DockIcon>
        <Link to="/dashboard">Dashboard</Link>
      </DockIcon>
      <DockIcon>
        <Link to="/login">Login</Link>
      </DockIcon>
      <DockIcon>
        <AnimatedThemeToggler />
      </DockIcon>
    </Dock>
  );
}
