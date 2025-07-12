import { Bell, Search, User, Menu, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoginModal } from "./LoginModal";

export function Header() {
  // Mock notification count
  const notificationCount = 3;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">S</span>
              </div>
              <h1 className="text-xl font-heading font-bold">StackIt</h1>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4 md:mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search questions, tags, or users..."
                className="pl-10 bg-muted/50 border-0 focus:bg-background text-sm md:text-base"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Ask Question Button */}
            <Link to="/ask">
              <Button className="hidden sm:flex bg-gradient-primary hover:bg-primary-hover text-sm">
                <Plus className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Ask Question</span>
              </Button>
            </Link>

            {/* Mobile Ask Button */}
            <Link to="/ask" className="sm:hidden">
              <Button size="icon" className="bg-gradient-primary hover:bg-primary-hover">
                <Plus className="h-4 w-4" />
              </Button>
            </Link>

            {/* Notifications */}
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4 md:h-5 md:w-5" />
                {notificationCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </div>

            {/* User Menu */}
            
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </LoginModal>
          </div>
        </div>
      </div>
    </header>
  );
}