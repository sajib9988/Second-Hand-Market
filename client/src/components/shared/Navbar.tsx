"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@/context/userContext";
import { ShoppingCart, LogOut, LogIn, Heart, Home, ShoppingBag } from "lucide-react";  
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "@/assets/svgs/Logo";
import { logout } from "@/service/AuthService";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, setUser } = useUser();
  console.log("user", user);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dashboardLink, setDashboardLink] = useState("");
  const router = useRouter();
  
  useEffect(() => {
    if (!user) return;

    if (user.role === "admin") {
      setDashboardLink("/admin/dashboard");
    } else {
      setDashboardLink("/user/buyer/dashboard");
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.push('/login'); // Redirect after logout
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-4 px-4">
          {/* Left Side: Logo & Links */}
          <div className="flex items-center">
            <span  className="text-2xl font-black flex items-center">
              <Logo /> {/* Logo without the text "Your Shop" */}
            </span>

            <div className="hidden md:flex space-x-6 ml-6">
              {/* Home Icon with Name */}
              <Link href="/" className="text-center">
                <Home className="w-7 h-7 mx-auto" /> {/* Increased Home Icon Size */}
                <span className="text-sm">Home</span>
              </Link>
              {/* Products Icon with Name */}
              <Link href="/products" className="text-center">
                <ShoppingBag className="w-7 h-7 mx-auto" /> {/* Products Icon */}
                <span className="text-sm">Products</span>
              </Link>
            </div>
          </div>

          {/* Search Bar - Center */}
          <div className="hidden md:block flex-grow max-w-md mx-4">
            <input
              type="text"
              placeholder="Search for products"
              className="w-full border border-gray-300 rounded-full py-2 px-5"
            />
          </div>

          {/* Right Side: Cart, Dashboard & Auth */}
          <div className="flex items-center space-x-3">
            {/* Wishlist Icon */}
            <Button variant="outline" className="rounded-full p-0 w-10 h-10 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </Button>

            {/* Cart Icon */}
            <Link href="/cart">
              <Button variant="outline" className="rounded-full p-0 w-10 h-10 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-2">
                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="rounded-full p-0 h-10 w-10">
                      <Avatar>
                        <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} />
                        <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/user/profile" className="w-full">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={dashboardLink} className="w-full">Dashboard</Link>
                    </DropdownMenuItem>
                     <DropdownMenuSeparator />
                    <DropdownMenuItem className="bg-red-500 text-white hover:bg-red-600" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link href="/login">
                <Button className="rounded-full">
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Login</span>
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-gray-100 p-4 flex flex-col space-y-2">
            <Link href="/products" className="text-center hover:text-blue-600">
              <ShoppingBag className="w-7 h-7 mx-auto" /> {/* Products Icon for mobile */}
              <span className="text-sm">Products</span>
            </Link>
            <input
              type="text"
              placeholder="Search for products"
              className="w-full border border-gray-300 rounded-full py-2 px-5 my-2"
            />
            {user && <Link href={dashboardLink} className="hover:text-blue-600">Dashboard</Link>}
            {user ? (
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded text-left">Logout</button>
            ) : (
              <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded block text-center">Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
