"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
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
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  React.useEffect(() => {
    if (user?.role !== "admin") {
      const newPath = selectedRole === "buyer" ? "/user/buyer/dashboard" : "/user/seller/dashboard";
      router.push(newPath);
    }
  }, [selectedRole, user?.role, router]);

  let navData = user?.role === "admin" ? adminData : userData[selectedRole];

  return (
    <Sidebar>
      <SidebarHeader className="py-1">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/">
              <div className="flex items-center justify-center">
                <Logo />
              </div>
            </Link>
          </SidebarMenuItem>

          {/* 🔹 Role Toggler - Switch Button */}
          {user?.role !== "admin" && (
  <SidebarMenuItem className="mt-3 flex items-center justify-center">
    <div
      className={`relative w-32 h-10 flex items-center bg-green-500 rounded-full cursor-pointer transition-all duration-300 shadow-sm`}
      onClick={() => setSelectedRole(selectedRole === "buyer" ? "seller" : "buyer")}
    >
      {/* Buyer Text */}
      <span className={`absolute left-4 text-sm font-bold z-10 transition-all duration-300 ${
        selectedRole === "buyer" ? "text-green-800" : "text-white opacity-80"
      }`}>
        Buyer
      </span>
      
      {/* Seller Text */}
      <span className={`absolute right-4 text-sm font-bold z-10 transition-all duration-300 ${
        selectedRole === "seller" ? "text-green-800" : "text-white opacity-80"
      }`}>
        Seller
      </span>
      
      {/* Sliding Indicator */}
      <div
        className={`absolute top-1 bottom-1 w-16 bg-white rounded-full transition-all duration-300 transform shadow-md ${
          selectedRole === "seller" ? "right-1" : "left-1"
        }`}
      ></div>
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