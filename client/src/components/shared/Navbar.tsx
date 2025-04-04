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
import {  useAppSelector } from "@/redux/hook";
import { orderedProductsSelector } from "@/redux/feature/CartSlice";
import { getMyWishlist } from "@/service/wishlist";

export default function Navbar() {
  const { user, setUser } = useUser(); 
  const [menuOpen, setMenuOpen] = useState(false);
  const [dashboardLink, setDashboardLink] = useState("");
  const [wishlistCount, setWishlistCount] = useState(0);
  const router = useRouter();

  // Get cart items count from Redux
  const cartItems = useAppSelector(orderedProductsSelector);
  const cartItemsCount = cartItems.reduce((total, item) => total + item.orderQuantity, 0);

  useEffect(() => {
    if (!user) return;

    if (user.role === "admin") {
      setDashboardLink("/admin/dashboard");
    } else {
      setDashboardLink("/user/buyer/dashboard");
    }

    // Fetch wishlist data when user is logged in
    const fetchWishlist = async () => {
      try {
        const wishlistData = await getMyWishlist();
        console.log("Wishlist Data:", wishlistData); // Debugging line
        setWishlistCount(wishlistData?.data?.length);
         console.log("Wishlist Count:", wishlistData.length); // Debugging line 
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      }
    };

    fetchWishlist();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setWishlistCount(0); // Reset wishlist count on logout
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-4 px-4">
          {/* Left Side: Logo & Links */}
          <div className="flex items-center">
            <span className="text-2xl font-black flex items-center">
              <Logo />
            </span>

            <div className="hidden md:flex space-x-6 ml-6">
              <Link href="/" className="text-center">
                <Home className="w-7 h-7 mx-auto" />
                <span className="text-sm">Home</span>
              </Link>
              <Link href="/products" className="text-center">
                <ShoppingBag className="w-7 h-7 mx-auto" />
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
            {/* Wishlist Icon with Count Badge */}
            <Link href="/user/buyer/wishlist">
              <Button
                variant="outline"
                className="rounded-full p-0 w-10 h-10 flex items-center justify-center relative"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Cart Icon with Count Badge */}
            <Link href="/cart">
              <Button
                variant="outline"
                className="rounded-full p-0 w-10 h-10 flex items-center justify-center relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-2">
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
              <ShoppingBag className="w-7 h-7 mx-auto" />
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