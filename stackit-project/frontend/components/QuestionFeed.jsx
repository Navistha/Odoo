import { Link } from "react-router-dom";
import { QuestionCard } from "./QuestionCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function QuestionFeed() {
  // Mock data for questions
  const questions = [
    {
      id: "1",
      title: "How to implement authentication in React with TypeScript?",
      excerpt: "I'm trying to set up user authentication in my React application using TypeScript. I want to use JWT tokens for session management and implement login/logout functionality. What's the best approach for this?",
      author: "john_doe",
      votes,
      answers,
      views,
      tags: ["react", "typescript", "authentication", "jwt"],
      timeAgo: "2 hours ago",
      isAnswered,
      hasAcceptedAnswer,
    },
    {
      id: "2",
      title: "Best practices for state management in large React applications",
      excerpt: "As my React application grows, I'm finding it harder to manage state effectively. Should I use Redux, Zustand, or stick with Context API? Looking for recommendations based on team size and app complexity.",
      author: "sarah_dev",
      votes,
      answers,
      views,
      tags: ["react", "state-management", "redux", "context-api"],
      timeAgo: "4 hours ago",
      isAnswered,
      hasAcceptedAnswer,
    },
    {
      id: "3",
      title: "CSS Grid vs Flexbox to use which?",
      excerpt: "I often get confused about when to use CSS Grid versus Flexbox for layouts. Can someone explain the key differences and provide examples of when each is most appropriate?",
      author: "mike_code",
      votes,
      answers,
      views,
      tags: ["css", "flexbox", "grid", "layout"],
      timeAgo: "6 hours ago",
      isAnswered,
      hasAcceptedAnswer,
    },
    {
      id: "4",
      title: "How to optimize React app performance?",
      excerpt: "My React application is becoming slow grows. What are the best techniques for optimizing performance? I've heard about React.memo, useMemo, and code splitting but not sure how to implement them effectively.",
      author: "alex_react",
      votes,
      answers,
      views,
      tags: ["react", "performance", "optimization", "memo"],
      timeAgo: "8 hours ago",
      isAnswered,
      hasAcceptedAnswer,
    },
    {
      id: "5",
      title: "Understanding TypeScript generics with practical examples",
      excerpt: "I'm struggling to understand when and how to use TypeScript generics effectively. Can someone provide some practical examples that show the benefits and common use cases?",
      author: "typescript_learner",
      votes,
      answers,
      views,
      tags: ["typescript", "generics", "types"],
      timeAgo: "12 hours ago",
      isAnswered,
      hasAcceptedAnswer,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
          <h2 className="text-xl md:text-2xl font-heading font-bold">All Questions</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            {questions.length.toLocaleString()} questions
          </p>
        </div>
        
        <Link to="/ask" className="sm:hidden">
          <Button className="w-full bg-gradient-primary hover:bg-primary-hover">
            Ask Question
          </Button>
        </Link>
      </div>

      {/* Filter Tabs */}
      <Tabs defaultValue="newest" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="newest" className="text-xs sm:text-sm">Newest</TabsTrigger>
          <TabsTrigger value="active" className="text-xs sm:text-sm">Active</TabsTrigger>
          <TabsTrigger value="unanswered" className="text-xs sm:text-sm">Unanswered</TabsTrigger>
          <TabsTrigger value="votes" className="text-xs sm:text-sm">Most Votes</TabsTrigger>
        </TabsList>

        <TabsContent value="newest" className="space-y-4 mt-6">
          {questions.map((question) => (
            <QuestionCard key={question.id} {...question} />
          ))}
        </TabsContent>

        <TabsContent value="active" className="space-y-4 mt-6">
          {questions
            .filter((q) => q.answers > 0)
            .map((question) => (
              <QuestionCard key={question.id} {...question} />
            ))}
        </TabsContent>

        <TabsContent value="unanswered" className="space-y-4 mt-6">
          {questions
            .filter((q) => q.answers === 0)
            .map((question) => (
              <QuestionCard key={question.id} {...question} />
            ))}
        </TabsContent>

        <TabsContent value="votes" className="space-y-4 mt-6">
          {[...questions]
            .sort((a, b) => b.votes - a.votes)
            .map((question) => (
              <QuestionCard key={question.id} {...question} />
            ))}
        </TabsContent>
      </Tabs>

      {/* Load More */}
      <div className="flex justify-center pt-6">
        <Button variant="outline" size="lg">
          Load More Questions
        </Button>
      </div>
    </div>
  );
}