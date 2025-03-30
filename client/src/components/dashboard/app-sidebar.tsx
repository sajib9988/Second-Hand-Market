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

import { SquareTerminal, Users, Building, FileText, BadgeCheck, UserCog } from "lucide-react";
import Link from "next/link";
import Logo from "@/assets/svgs/Logo";
import { useUser } from "@/context/userContext";

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
  const { user } = useUser();
  const userRole = user?.role;

  // ✅ State for tracking current mode (seller or buyer)
  const [currentMode, setCurrentMode] = React.useState<"seller" | "buyer">("buyer");

  // ✅ Set navData based on role
  let navData;
  if (userRole === "admin") {
    navData = adminData; // Admin শুধুমাত্র নিজের মেনু দেখতে পাবে
  } else {
    navData = currentMode === "seller" ? userData.seller : userData.buyer;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Sidebar Header with Logo */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center">
                  <Logo />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <h2 className="font-bold text-xl">SecondHandMarketplace</h2>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* 🔹 Mode Switcher (Seller/Buyer) */}
      {userRole !== "admin" && (
        <div className="p-4">
          <button
            className={`w-full px-4 py-2 rounded-md ${currentMode === "seller" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}
            onClick={() => setCurrentMode("seller")}
          >
            Seller Mode
          </button>
          <button
            className={`w-full px-4 py-2 mt-2 rounded-md ${currentMode === "buyer" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}
            onClick={() => setCurrentMode("buyer")}
          >
            Buyer Mode
          </button>
        </div>
      )}

      {/* Main Navigation */}
      <SidebarContent>
        <SidebarMenu>
          {navData.navMain.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton asChild>
                <Link href={item.url} className="flex items-center space-x-2">
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter>
        <p className="text-center text-sm text-gray-500">© 2025 SecondHandMarketplace</p>
      </SidebarFooter>
    </Sidebar>
  );
}
