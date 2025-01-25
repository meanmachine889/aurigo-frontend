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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { jwtDecode } from "jwt-decode";
import { Button } from "./ui/button";

export const decodeToken = () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return null;
    }
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const items = [
  {
    title: "Home",
    url: "/dashboard/",
    icon: Home,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [teams, setTeams] = useState<{ name: string; logo: any; plan: string; id?: string }[]>([]);
  const [activeTeam, setActiveTeam] = useState<{ name: string; logo: any; plan: string; id?: string } | null>(null);
  const [areas, setAreas] = useState<any[]>([]); // For dynamically generated areas
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const decodedToken = decodeToken();
    if (decodedToken) {
      setUserData({
        name: (decodedToken as any).name || "Unknown User",
        email: (decodedToken as any).email || "No Email",
      });
    }

    const fetchTeams = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/project/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const projects = Array.isArray(data) ? data : data.projects;

          if (!Array.isArray(projects)) {
            throw new Error("Invalid data structure: expected an array of projects");
          }

          const formattedTeams = projects.map((project: any, index: number) => ({
            name: project.name,
            logo: [GalleryVerticalEnd, AudioWaveform, Command][index % 3],
            plan: "",
            id: project._id,
          }));

          setTeams(formattedTeams);

          // Check for a saved active team in localStorage
          const savedTeamId = localStorage.getItem("activeTeamId");
          const savedTeam = formattedTeams.find((team) => team.id === savedTeamId);
          setActiveTeam(savedTeam || formattedTeams[0]); // Default to the first team if no saved team
        } else {
          console.error("Failed to fetch teams");
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    if (activeTeam) {
      const fetchAreas = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/project/${activeTeam.id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          });

          if (response.ok) {
            const projectData = await response.json();

            const formattedAreas = [
              {
                title: "Financials",
                icon: Wallet,
                tasks: projectData.project.area.map((area: any, index: number) => ({
                  title: area.name,
                  url: `/dashboard/area/${activeTeam.id}-${area._id}`,
                  icon: [Utensils, GalleryVerticalEnd, Home][index % 3],
                })),
              },
              {
                title: "Tasks",
                icon: SquareCheckBig,
                tasks: projectData.project.area.map((area: any, index: number) => ({
                  title: area.name,
                  url: `/dashboard/tasks/${activeTeam.id}-${area._id}`,
                  icon: [Utensils, GalleryVerticalEnd, Home][index % 3],
                })),
              },
              {
                title: "Updates",
                icon: Command,
                tasks: projectData.project.area.map((area: any, index: number) => ({
                  title: area.name,
                  url: `/dashboard/updates/${activeTeam.id}-${area._id}`,
                  icon: [Utensils, GalleryVerticalEnd, Home][index % 3],
                })),
              },
            ];

            setAreas(formattedAreas);
          } else {
            console.error("Failed to fetch areas");
          }
        } catch (error) {
          console.error("Error fetching areas:", error);
        }
      };

      fetchAreas();
    }
  }, [activeTeam]);

  if (loading || teams.length === 0) {
    return <div>Loading...</div>;
  }

  const data = {
    user: {
      name: userData.name,
      email: userData.email,
      avatar: "",
    },
    teams: teams,
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <TeamSwitcher
          teams={data.teams}
          onTeamSelect={(team) => {
            setActiveTeam(team);
            localStorage.setItem("activeTeamId", team.id || ""); // Persist active team
          }}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Button onClick={() => router.push(`${item.url}/${activeTeam!.id}`)} variant="ghost" className="w-fit">
                      <item.icon />
                      <span>{item.title}</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <NavMain items={areas} />
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
