import { ArrowUp, ArrowDown, MessageCircle, Eye, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";



export function QuestionCard({
  id,
  title,
  excerpt,
  author,
  votes,
  answers,
  views,
  tags,
  timeAgo,
  isAnswered = false,
  hasAcceptedAnswer = false,
}) {
  return (
    <Card className="transition-all duration-200 hover:shadow-medium border-l-4 border-l-transparent hover:border-l-primary">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Vote and Stats Section */}
          <div className="flex sm:flex-col items-center sm:items-center space-x-6 sm:space-x-0 sm:space-y-3 min-w-[60px] order-2 sm:order-1">
            {/* Votes */}
            <div className="flex sm:flex-col items-center space-x-2 sm:space-x-0 sm:space-y-1">
              <Button variant="ghost" size="sm" className="h-6 w-6 sm:h-8 sm:w-8 p-0 hover:text-vote-up">
                <ArrowUp className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <span className={`font-semibold text-sm ${votes > 0 ? 'text-vote-up'  < 0 ? 'text-vote-down' : 'text-vote-neutral'}`}>
                {votes}
              </span>
              <Button variant="ghost" size="sm" className="h-6 w-6 sm:h-8 sm:w-8 p-0 hover:text-vote-down">
                <ArrowDown className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>

            {/* Answers */}
            <div className={`flex sm:flex-col items-center p-2 rounded-md text-xs ${
              hasAcceptedAnswer 
                ? 'bg-success text-success-foreground' 
                 > 0 
                  ? 'bg-warning text-warning-foreground' 
                  : 'bg-muted text-muted-foreground'
            }`}>
              <span className="font-semibold">{answers}</span>
              <span className="ml-1 sm:ml-0">answer{answers !== 1 ? 's' : ''}</span>
            </div>

            {/* Views */}
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Eye className="h-3 w-3" />
              {views}</span>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 space-y-3 order-1 sm:order-2">
            {/* Title */}
            <Link to={`/questions/${id}`}>
              <h3 className="text-base md:text-lg font-semibold text-card-foreground hover:text-primary cursor-pointer transition-colors">
                {title}
              </h3>
            </Link>

            {/* Excerpt */}
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
              {excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Meta Info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <MessageCircle className="h-3 w-3" />
                  {answers} answers</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  {timeAgo}</span>
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                asked by</span>
                <span className="font-medium text-primary hover:underline cursor-pointer">
                  {author}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}