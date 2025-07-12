import { Link } from "react-router-dom";
import { QuestionCard } from "./QuestionCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { questionsAPI } from "../lib/api";
import { Skeleton } from "@/components/ui/skeleton";

export function QuestionFeed() {
  const { data: questions, isLoading, error } = useQuery({
    queryKey: ['questions'],
    queryFn: () => questionsAPI.getQuestions(),
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border rounded-lg p-6">
              <Skeleton className="h-6 w-3/4 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <div className="flex gap-2 mb-4">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-14" />
              </div>
              <Skeleton className="h-4 w-48" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load questions. Please try again.</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  const questionsList = questions?.results || questions || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-heading font-bold">All Questions</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            {questionsList.length.toLocaleString()} questions
          </p>
        </div>
        
        <Link to="/ask" className="sm:hidden">
          <Button className="w-full bg-primary hover:bg-primary/90">
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
          {questionsList.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No questions yet. Be the first to ask!</p>
              <Link to="/ask">
                <Button className="bg-primary hover:bg-primary/90">
                  Ask the First Question
                </Button>
              </Link>
            </div>
          ) : (
            questionsList.map((question) => (
              <QuestionCard 
                key={question.id} 
                id={question.id}
                title={question.title}
                excerpt={question.body.substring(0, 200) + (question.body.length > 200 ? '...' : '')}
                author={question.author}
                votes={0} // Backend doesn't have votes on questions yet
                answers={question.answers?.length || 0}
                views={0} // Backend doesn't track views yet
                tags={question.tags?.map(tag => tag.name) || []}
                timeAgo={new Date(question.created_at).toLocaleDateString()}
                isAnswered={question.answers?.length > 0}
                hasAcceptedAnswer={question.answers?.some(answer => answer.is_accepted) || false}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-4 mt-6">
          {questionsList
            .filter((q) => q.answers?.length > 0)
            .map((question) => (
              <QuestionCard 
                key={question.id} 
                id={question.id}
                title={question.title}
                excerpt={question.body.substring(0, 200) + (question.body.length > 200 ? '...' : '')}
                author={question.author}
                votes={0}
                answers={question.answers?.length || 0}
                views={0}
                tags={question.tags?.map(tag => tag.name) || []}
                timeAgo={new Date(question.created_at).toLocaleDateString()}
                isAnswered={question.answers?.length > 0}
                hasAcceptedAnswer={question.answers?.some(answer => answer.is_accepted) || false}
              />
            ))}
        </TabsContent>

        <TabsContent value="unanswered" className="space-y-4 mt-6">
          {questionsList
            .filter((q) => !q.answers?.length)
            .map((question) => (
              <QuestionCard 
                key={question.id} 
                id={question.id}
                title={question.title}
                excerpt={question.body.substring(0, 200) + (question.body.length > 200 ? '...' : '')}
                author={question.author}
                votes={0}
                answers={0}
                views={0}
                tags={question.tags?.map(tag => tag.name) || []}
                timeAgo={new Date(question.created_at).toLocaleDateString()}
                isAnswered={false}
                hasAcceptedAnswer={false}
              />
            ))}
        </TabsContent>

        <TabsContent value="votes" className="space-y-4 mt-6">
          {questionsList.map((question) => (
            <QuestionCard 
              key={question.id} 
              id={question.id}
              title={question.title}
              excerpt={question.body.substring(0, 200) + (question.body.length > 200 ? '...' : '')}
              author={question.author}
              votes={0}
              answers={question.answers?.length || 0}
              views={0}
              tags={question.tags?.map(tag => tag.name) || []}
              timeAgo={new Date(question.created_at).toLocaleDateString()}
              isAnswered={question.answers?.length > 0}
              hasAcceptedAnswer={question.answers?.some(answer => answer.is_accepted) || false}
            />
          ))}
        </TabsContent>
      </Tabs>

      {/* Load More */}
      {questionsList.length > 0 && (
        <div className="flex justify-center pt-6">
          <Button variant="outline" size="lg">
            Load More Questions
          </Button>
        </div>
      )}
    </div>
  );
}