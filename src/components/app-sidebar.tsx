import { useState } from "react";
import {
  Home,
  Bot,
  Edit3,
  MessageSquare,
  BookOpen,
  Library,
  Settings,
  Plus,
  ChevronLeft,
  BarChart3,
  Users,
  Zap,
  FileText,
  TrendingUp,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "AI Assistant", url: "/assistant", icon: Bot },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Team", url: "/team", icon: Users },
  { title: "Marketplace", url: "/marketplace", icon: BookOpen },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavClasses = (active: boolean) =>
    cn(
      "w-full justify-start gap-3 text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-smooth rounded-lg h-11",
      active && "bg-accent text-text-primary font-medium",
    );

  return (
    <Sidebar className="border-r border-border bg-surface">
      <SidebarContent className="p-4">
        {/* App Header */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-8 h-8 bg-brand-gradient rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-text-primary">
              AutoScriptor Pro
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={getNavClasses(isActive(item.url))}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
