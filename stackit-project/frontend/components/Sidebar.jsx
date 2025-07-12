import { Home, HelpCircle, Tags, Users, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Sidebar() {
  const navigation = [
    { icon, label: "Home", active },
    { icon, label: "Questions", badge: "2.1k" },
    { icon, label: "Tags" },
    { icon, label: "Users" },
    { icon, label: "Badges" },
  ];

  const trendingTags = [
    { name: "react", count },
    { name: "javascript", count },
    { name: "typescript", count },
    { name: "nextjs", count },
    { name: "tailwind", count },
  ];

  const topUsers = [
    { name: "john_doe", reputation, avatar: "JD" },
    { name: "sarah_dev", reputation, avatar: "SD" },
    { name: "mike_code", reputation, avatar: "MC" },
  ];

  return (
    <aside className="w-64 space-y-6">
      {/* Navigation */}
      
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Navigation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {navigation.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? "secondary" : "ghost"}
              className="w-full justify-start"
              size="sm"
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
              {item.badge && (
                <Badge variant="outline" className="ml-auto">
                  {item.badge}
                </Badge>
              )}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Trending Tags */}
      
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
            <TrendingUp className="mr-2 h-4 w-4" />
            Trending Tags
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {trendingTags.map((tag) => (
            <div key={tag.name} className="flex items-center justify-between">
              <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors">
                {tag.name}
              </Badge>
              <span className="text-xs text-muted-foreground">{tag.count}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Users */}
      
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Top Contributors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topUsers.map((user, index) => (
            <div key={user.name} className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-primary text-primary-foreground text-xs font-semibold">
                {user.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-card-foreground truncate hover:text-primary cursor-pointer">
                  {user.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user.reputation.toLocaleString()} rep
                </p>
              </div>
              <div className="text-xs text-primary font-semibold">
                #{index + 1}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </aside>
  );
}