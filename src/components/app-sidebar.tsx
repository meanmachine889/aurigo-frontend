"use client";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Home,
  SquareCheckBig,
  Utensils,
  Wallet,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard/",
    icon: Home,
  },
];

const Areas = [
  {
    title: "Financials",
    icon: Wallet,
    tasks: [
      {
        title: "Kitchen",
        icon: Utensils,
        url : "/dashboard/area/1",
      },
      {
        title: "Living Room",
        icon: GalleryVerticalEnd,
        url : "/dashboard/area/2",
      },
      {
        title: "Bedroom",
        icon: Home,
        url : "/dashboard/area/3",
      },
    ],
  },
  {
    title: "Tasks",
    icon: SquareCheckBig,
    tasks: [
      {
        title: "Kitchen",
        icon: Utensils,
        url : "/dashboard/tasks/1",
      },
      {
        title: "Living Room",
        icon: GalleryVerticalEnd,
        url : "/dashboard/tasks/2",
      },
      {
        title: "Bedroom",
        icon: Home,
        url : "/dashboard/tasks/3",
      },
    ],
  },
  {
    title:"Updates",
    icon: Command,
    tasks: [
      {
        title: "Kitchen",
        icon: Utensils,
        url : "/dashboard/updates/1",
      },
      {
        title: "Living Room",
        icon: GalleryVerticalEnd,
        url : "/dashboard/updates/2",
      },
      {
        title: "Bedroom",
        icon: Home,
        url : "/dashboard/updates/3",
      },
    ],
  }
];

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
};

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <NavMain items={Areas} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
