"use client"

import { Home, Inbox, Calendar, Search, Settings } from "lucide-react"

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
} from "@/common/components/ui/sidebar"

// menu items
const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "About",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Projects",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Achievements",
        url: "#",
        icon: Search,
    },
    {
        title: "Contacts",
        url: "#",
        icon: Settings,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            {/* HEADER */}
            <SidebarHeader className="p-4 text-lg font-semibold">
                My App
            </SidebarHeader>

            {/* CONTENT */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon className="mr-2 h-4 w-4" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>

                </SidebarGroup>
            </SidebarContent>

            {/* FOOTER */}
            <SidebarFooter className="p-4 text-sm text-muted-foreground">
                © 2026 My App
            </SidebarFooter>
        </Sidebar>
    )
}