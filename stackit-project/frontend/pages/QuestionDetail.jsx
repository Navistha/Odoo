import { useState } from "react";
import { ArrowUp, ArrowDown, Check, MessageCircle, Share, Bookmark, Flag, Clock, Eye, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Header } from "@/components/Header";

export default function QuestionDetail() {
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [answerText, setAnswerText] = useState("");

  // Mock question data
  const question = {
    id: "1",
    title: "How to implement authentication in React with TypeScript?",
    content: `I'm trying to set up user authentication in my React application using TypeScript. I want to use JWT tokens for session management and implement login/logout functionality.

Here's what I've tried so far:

\`\`\`typescript
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider.FC<{ children.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Login logic here
  const login = async (email, password) => {
    // API call to authenticate
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
\`\`\`

The issue I'm facing is with TypeScript types and proper token storage. What's the best approach for this?`,
    author: "john_doe",
    authorReputation,
    votes,
    views,
    tags: ["react", "typescript", "authentication", "jwt"],
    timeAgo: "2 hours ago",
    isBookmarked,
  };

  // Mock answers
  const answers = [
    {
      id: "1",
      content: `Here's a comprehensive approach to implementing authentication in React with TypeScript:

## 1. Set up your types first

\`\`\`typescript



\`\`\`

## 2. Create a secure token storage utility

\`\`\`typescript
const TOKEN_KEY = 'auth-token';

export const tokenStorage = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token) => localStorage.setItem(TOKEN_KEY, token),
  remove: () => localStorage.removeItem(TOKEN_KEY),
};
\`\`\`

## 3. Implement the AuthContext with proper error handling

Your approach is on the right track! The main improvements would be:
- Add proper error handling
- Implement token refresh logic
- Use secure HTTP-only cookies if possible
- Add proper TypeScript types for all functions

This should give you a solid foundation for authentication in your React TypeScript app.`,
      author: "sarah_dev",
      authorReputation,
      votes,
      timeAgo: "1 hour ago",
      isAccepted,
    },
    {
      id: "2",
      content: `I'd also recommend using a library like \`react-query\` or \`swr\` for handling the authentication state and API calls. It makes the code much cleaner and handles caching automatically.

Here's a simple example:

\`\`\`typescript
import { useQuery, useMutation } from 'react-query';

const useAuth = () => {
  const { data, isLoading } = useQuery('auth', fetchCurrentUser);
  
  const loginMutation = useMutation(loginUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('auth');
    },
  });

  return {
    user,
    isLoading,
    login.mutate,
    isLoggingIn.isLoading,
  };
};
\`\`\`

This approach separates concerns better and makes testing easier.`,
      author: "mike_code",
      authorReputation,
      votes,
      timeAgo: "45 minutes ago",
      isAccepted,
    },
  ];

  const handleVote = (type: 'up' | 'down') => {
    if (userVote === type) {
      setUserVote(null);
    } else {
      setUserVote(type);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back Button */}
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Questions
          </Button>
        </Link>

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Question */}
            
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <h1 className="text-2xl font-heading font-bold leading-tight">
                      {question.title}
                    </h1>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        Asked {question.timeAgo}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        {question.views} views</span>
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {question.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              
                <div className="flex gap-4">
                  {/* Vote Section */}
                  <div className="flex flex-col items-center space-y-2 min-w-[60px]">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`h-10 w-10 p-0 ${userVote === 'up' ? 'text-vote-up' : 'hover:text-vote-up'}`}
                      onClick={() => handleVote('up')}
                    >
                      <ArrowUp className="h-6 w-6" />
                    </Button>
                    
                    <span className={`font-bold text-lg ${
                      userVote === 'up' ? 'text-vote-up' : 
                      userVote === 'down' ? 'text-vote-down' : 
                      'text-vote-neutral'
                    }`}>
                      {question.votes + (userVote === 'up' ? 1  === 'down' ? -1 )}
                    </span>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`h-10 w-10 p-0 ${userVote === 'down' ? 'text-vote-down' : 'hover:text-vote-down'}`}
                      onClick={() => handleVote('down')}
                    >
                      <ArrowDown className="h-6 w-6" />
                    </Button>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <div className="prose prose-gray max-w-none">
                      <div className="whitespace-pre-wrap text-card-foreground leading-relaxed">
                        {question.content}
                      </div>
                    </div>

                    {/* Author Info */}
                    <div className="flex justify-end">
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">
                          asked {question.timeAgo}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {question.author.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          
                            <div className="font-medium text-sm text-primary">
                              {question.author}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {question.authorReputation.toLocaleString()} reputation
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Answers Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-heading font-semibold">
                  {answers.length} Answer{answers.length !== 1 ? 's' : ''}
                </h2>
              </div>

              {answers.map((answer) => (
                <Card key={answer.id} className={answer.isAccepted ? 'border-success' : ''}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Vote Section */}
                      <div className="flex flex-col items-center space-y-2 min-w-[60px]">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-vote-up">
                          <ArrowUp className="h-5 w-5" />
                        </Button>
                        <span className="font-semibold text-vote-neutral">{answer.votes}</span>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-vote-down">
                          <ArrowDown className="h-5 w-5" />
                        </Button>
                        {answer.isAccepted && (
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-success text-success-foreground">
                            <Check className="h-5 w-5" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-4">
                        <div className="prose prose-gray max-w-none">
                          <div className="whitespace-pre-wrap text-card-foreground leading-relaxed">
                            {answer.content}
                          </div>
                        </div>

                        {/* Author Info */}
                        <div className="flex justify-end">
                          <div className="bg-muted/50 p-3 rounded-lg">
                            <div className="text-xs text-muted-foreground mb-1">
                              answered {answer.timeAgo}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">
                                  {answer.author.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              
                                <div className="font-medium text-sm text-primary">
                                  {answer.author}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {answer.authorReputation.toLocaleString()} reputation
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Answer Form */}
            
              
                <h3 className="text-lg font-semibold">Your Answer</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Write your answer here..."
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  rows={8}
                  className="resize-none"
                />
                
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Use Markdown for formatting
                  </p>
                  <Button 
                    className="bg-gradient-primary hover:bg-primary-hover"
                    disabled={!answerText.trim()}
                  >
                    Post Your Answer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block w-80 space-y-6">
            
              
                <h3 className="font-semibold">Related Questions</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Best practices for JWT token storage in React",
                  "How to handle token refresh in React applications",
                  "TypeScript interfaces for authentication context",
                ].map((question, index) => (
                  <div key={index} className="text-sm">
                    <a href="#" className="text-primary hover:underline leading-relaxed">
                      {question}
                    </a>
                  </div>
                ))}
              </CardContent>
            </Card>

            
              
                <h3 className="font-semibold">Question Stats</h3>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Asked</span>
                  {question.timeAgo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Viewed</span>
                  {question.views} times</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active</span>
                  1 hour ago</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}