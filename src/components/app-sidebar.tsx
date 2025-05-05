import * as React from "react"
import {
  BookMarked,
  Package,
  PackageOpen,
  TvMinimalPlay,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
// import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "User",
    email: "user@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Anime Pack",
      logo: PackageOpen,
      plan: "Free",
    },
    {
      name: "Anime Pack+",
      logo: PackageOpen,
      plan: "Golden",
    },
    {
      name: "Anime Pack Ultra+",
      logo: PackageOpen,
      plan: "Legendary",
    },
  ],
  navMain: [
    {
      title: "Library",
      url: "#",
      icon: BookMarked,
      isActive: true,
      items: [
        {
          title: "Liked",
          url: "/library/liked",
        },
        {
          title: "History",
          url: "/library/history",
        },
        {
          title: "Packs",
          url: "#",
        },
      ],
    },
    {
      title: "Content",
      url: "#",
      icon: TvMinimalPlay,
      isActive: false,
      items: [
        {
          title: "Home",
          url: "/",
        }
      ]
    },
  ],
  projects: [
    {
      name: "Pack",
      url: "#",
      icon: Package,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* //TODO: fix its child style to uncomment <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
