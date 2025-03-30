"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@/context/userContext";
import { ShoppingCart, LogOut, LogIn, SwitchCamera, Heart } from "lucide-react";
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

export default function Navbar() {
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSellerMode, setIsSellerMode] = useState(false);
  const [dashboardLink, setDashboardLink] = useState("");

  useEffect(() => {
    if (!user) return;

    if (user.role === "admin") {
      setDashboardLink("/admin/dashboard");
    } else {
      // User can switch between seller and buyer mode
      setDashboardLink(isSellerMode ? "/user/seller/dashboard" : "/user/buyer/dashboard");
    }
  }, [user, isSellerMode]);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-4 px-4">
          {/* Left Side: Logo & Links */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-black flex items-center">
              {typeof Logo === 'function' ? <Logo /> : null}
              <span className="ml-2">SecondHandMarket</span>
            </Link>

            <div className="hidden md:flex space-x-6 ml-6">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <Link href="/products" className="hover:text-blue-600">Products</Link>
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
                {/* Seller / Buyer Mode Toggle Button */}
                {user.role !== "admin" && (
                  <Button
                    onClick={() => setIsSellerMode(!isSellerMode)}
                    variant="outline"
                    size="sm"
                    className="rounded-full flex items-center space-x-1"
                  >
                    <SwitchCamera className="w-4 h-4 mr-1" />
                    <span className="hidden md:inline">{isSellerMode ? "Seller Mode" : "Buyer Mode"}</span>
                  </Button>
                )}

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
                    <DropdownMenuItem>
                      <Link href="/create-shop" className="w-full">Create Shop</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="bg-red-500 text-white hover:bg-red-600" onClick={logout}>
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
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/products" className="hover:text-blue-600">Products</Link>
            
            {/* Mobile Search */}
            <input
              type="text"
              placeholder="Search for products"
              className="w-full border border-gray-300 rounded-full py-2 px-5 my-2"
            />

            {user && <Link href={dashboardLink} className="hover:text-blue-600">Dashboard</Link>}

            {user && user.role !== "admin" && (
              <button 
                onClick={() => setIsSellerMode(!isSellerMode)}
                className="text-left hover:text-blue-600"
              >
                {isSellerMode ? "Switch to Buyer" : "Switch to Seller"}
              </button>
            )}

            {user ? (
              <button  className="bg-red-500 text-white px-4 py-2 rounded text-left">Logout</button>
            ) : (
              <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded block text-center">Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
} 