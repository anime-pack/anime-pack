import * as React from "react"
import {
  AlignJustify,
  BookMarked,
  PackageOpen,
  Settings2,
  TvMinimalPlay,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
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
    {
      title: "My Library",
      url: "#",
      icon: BookMarked,
      isActive: false,
      items: [
        {
          title: "Liked",
          url: "/library/liked",
        },
        {
          title: "History",
          url: "/library/history",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      isActive: false,
      items: [
        {
          title: "Appearence",
          url: "/settings/appearence",
        },
        {
          title: "Desktop",
          url: "/settings/desktop",
        },
        {
          title: "About",
          url: "/settings/about",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Other...",
      url: "#",
      icon: AlignJustify,
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
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
