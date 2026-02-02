import { Link } from "react-router-dom";
import { useDemoStore } from "@/contexts/DemoStoreContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingCart, User, LogOut, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const UserMenu = () => {
  const { user, isAuthenticated, logout, cartCount } = useDemoStore();

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild className="text-white/90 hover:text-white hover:bg-white/10">
          <Link to="/login">Sign In</Link>
        </Button>
        <Button size="sm" asChild>
          <Link to="/signup">Sign Up</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Cart Button */}
      <Button variant="ghost" size="icon" asChild className="relative text-white/90 hover:text-white hover:bg-white/10">
        <Link to="/cart">
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {cartCount}
            </Badge>
          )}
        </Link>
      </Button>

      {/* User Account Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 text-white/90 hover:text-white hover:bg-white/10">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="hidden sm:flex flex-col items-start">
              <span className="text-sm font-medium">{user?.name}</span>
              <span className="text-xs text-white/60 flex items-center gap-1">
                <Wallet className="h-3 w-3" />
                ${user?.funds.toFixed(2)}
              </span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span>{user?.name}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {user?.email}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex justify-between">
            <span className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Demo Funds
            </span>
            <span className="font-medium text-primary">
              ${user?.funds.toFixed(2)}
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/cart" className="flex items-center gap-2 cursor-pointer">
              <ShoppingCart className="h-4 w-4" />
              My Cart
              {cartCount > 0 && (
                <Badge variant="secondary" className="ml-auto">
                  {cartCount}
                </Badge>
              )}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout} className="text-destructive cursor-pointer">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
