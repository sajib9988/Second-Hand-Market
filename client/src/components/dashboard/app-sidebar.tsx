"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  SquareTerminal,
  Users,
  Building,
  FileText,
  BadgeCheck,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import Logo from "@/assets/svgs/Logo";
import { useUser } from "@/context/userContext";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

const adminData = {
  navMain: [
    { title: "Dashboard", url: "/admin/dashboard", icon: SquareTerminal },
    { title: "User Management", url: "/admin/user-management", icon: Users },
    { title: "Profile", url: "/admin/profile", icon: UserCog },
  ],
};

const userData = {
  seller: {
    navMain: [
      { title: "Dashboard", url: "/user/seller/dashboard", icon: SquareTerminal },
      { title: "Manage Listings", url: "/user/seller/manage-listings", icon: Building },
      { title: "Sales History", url: "/user/seller/sales-history", icon: FileText },
      { title: "Profile", url: "/user/seller/profile", icon: UserCog },
    ],
  },
  buyer: {
    navMain: [
      { title: "Dashboard", url: "/user/buyer/dashboard", icon: SquareTerminal },
      { title: "Wishlist", url: "/user/buyer/wishlist", icon: BadgeCheck },
      { title: "Purchase History", url: "/user/buyer/purchase-history", icon: FileText },
      { title: "Profile", url: "/user/buyer/profile", icon: UserCog },
    ],
  },
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [selectedRole, setSelectedRole] = React.useState<"buyer" | "seller">("buyer");
  const { user } = useUser();
  
  let navData = user?.role === "admin" ? adminData : userData[selectedRole];
  
  return (
    <Sidebar >
      <SidebarHeader className="py-1">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="sm" asChild>
              <Link href="/">
                <div className="flex items-center justify-center">
                  <Logo />
                </div>
             
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* 🔹 Role Toggler - Compact Design */}
          {user?.role !== "admin" && (
            <SidebarMenuItem className="mt-0">
              <div className="flex gap-1 w-full mt-2">
                <SidebarMenuButton
                  size="sm"
                  className={`cursor-pointer text-xs py-1 ${
                    selectedRole === "buyer" 
                      ? "bg-sidebar-accent text-black font-medium border-2 border-black" 
                      : "text-slate-700"
                  }`}
                  onClick={() => setSelectedRole("buyer")}
                >
                  Buyer
                </SidebarMenuButton>
                <SidebarMenuButton
                  size="sm"
                  className={`cursor-pointer text-xs py-1 ${
                    selectedRole === "seller" 
                      ? "bg-sidebar-accent text-black font-medium border-2 border-black" 
                      : "text-slate-700"
                  }`}
                  onClick={() => setSelectedRole("seller")}
                >
                  Seller
                </SidebarMenuButton>
              </div>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="py-0">
        {navData && <NavMain items={navData.navMain} />}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}