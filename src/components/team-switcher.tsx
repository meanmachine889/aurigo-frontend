"use client";

import * as React from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { ChevronsUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function TeamSwitcher({
  teams,
  onTeamSelect,
}: {
  teams: { name: string; logo: React.ElementType; plan: string; id?: string }[];
  onTeamSelect?: (team: { name: string; logo: React.ElementType; plan: string; id?: string }) => void;
}) {
  const { isMobile } = useSidebar();
  const router = useRouter(); // Initialize the router
  const [activeTeam, setActiveTeam] = React.useState(() => {
    // Check for saved team in localStorage
    const savedTeamId = localStorage.getItem("activeTeamId");
    return teams.find((team) => team.id === savedTeamId) || teams[0];
  });

  const handleTeamSelect = (team: { name: string; logo: React.ElementType; plan: string; id?: string }) => {
    setActiveTeam(team);
    // Save the selected team's ID to localStorage
    if (team.id) {
      localStorage.setItem("activeTeamId", team.id);
    }
    if (onTeamSelect) {
      onTeamSelect(team);
    }

    // Navigate to the team's specific URL (e.g., `/team/:id`)
    if (team.id) {
      router.push(`/dashboard/${team.id}`);
    }
  };

  React.useEffect(() => {
    // Ensure the active team is updated when teams are loaded or changed
    if (!activeTeam && teams.length > 0) {
      const savedTeamId = localStorage.getItem("activeTeamId");
      const savedTeam = teams.find((team) => team.id === savedTeamId);
      if (savedTeam) {
        setActiveTeam(savedTeam);
      } else {
        setActiveTeam(teams[0]);
      }
    }
  }, [teams]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <activeTeam.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{activeTeam.name}</span>
                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">Projects</DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => handleTeamSelect(team)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <team.logo className="size-4 shrink-0" />
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
