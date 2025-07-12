import { useState } from "react";
import { ArrowLeft, Bold, Italic, List, Link as LinkIcon, Image, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { useAuth } from "../contexts/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { questionsAPI, tagsAPI } from "../lib/api";
import { toast } from "@/hooks/use-toast";

export default function AskQuestion() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Fetch available tags
  const { data: availableTags } = useQuery({
    queryKey: ['tags'],
    queryFn: tagsAPI.getTags,
  });

  const popularTags = availableTags?.slice(0, 8).map(tag => tag.name) || 
    ["react", "javascript", "typescript", "css", "html", "node.js", "python", "java"];

  // Create question mutation
  const createQuestionMutation = useMutation({
    mutationFn: questionsAPI.createQuestion,
    onSuccess: (data) => {
      toast({
        title: "Question posted!",
        description: "Your question has been posted successfully.",
      });
      navigate(`/questions/${data.id}`);
    },
    onError: (error) => {
      toast({
        title: "Failed to post question",
        description: error.response?.data?.detail || "Please try again.",
        variant: "destructive",
      });
    },
  });

  const addTag = (tag) => {
    if (tag.trim() && !tags.includes(tag.trim()) && tags.length < 5) {
      setTags([...tags, tag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to ask a question.",
        variant: "destructive",
      });
      return;
    }

    if (!title.trim() || !description.trim() || tags.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields and add at least one tag.",
        variant: "destructive",
      });
      return;
    }

    const questionData = {
      title: title.trim(),
      body: description.trim(),
      tags: tags.map(tag => ({ name: tag })),
    };

    createQuestionMutation.mutate(questionData);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Questions
          </Button>
        </Link>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-2">Ask a Question</h1>
          <p className="text-muted-foreground">
            Get help from the community by asking a clear, detailed question.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Question Title</CardTitle>
              <p className="text-sm text-muted-foreground">
                Be specific and imagine you're asking a question to another person
              </p>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="e.g. How to implement authentication in React?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg"
                maxLength={150}
              />
              <p className="text-xs text-muted-foreground mt-2">
                {title.length}/150 characters
              </p>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Description</CardTitle>
              <p className="text-sm text-muted-foreground">
                Include all the information someone would need to answer your question
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Rich Text Toolbar */}
              <div className="flex flex-wrap gap-1 p-2 border rounded-md bg-muted/30">
                <Button type="button" variant="ghost" size="sm">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm">
                  <Italic className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-1"></div>
                <Button type="button" variant="ghost" size="sm">
                  <List className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm">
                  <LinkIcon className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm">
                  <Image className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-1"></div>
                <Button type="button" variant="ghost" size="sm">
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm">
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm">
                  <AlignRight className="h-4 w-4" />
                </Button>
              </div>

              <Textarea
                placeholder="Describe your problem in detail. Include what you've tried and any error messages..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={12}
                className="resize-none"
              />
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Use Markdown for formatting</span>
                <span>{description.length} characters</span>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tags</CardTitle>
              <p className="text-sm text-muted-foreground">
                Add up to 5 tags to describe what your question is about
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Current Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => removeTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              )}

              {/* Add Tags */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g. react, javascript"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag(currentTag);
                      }
                    }}
                    disabled={tags.length >= 5}
                  />
                  <Button
                    type="button"
                    onClick={() => addTag(currentTag)}
                    disabled={!currentTag.trim() || tags.length >= 5}
                  >
                    Add
                  </Button>
                </div>

                {/* Popular Tags */}
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Popular tags:</Label>
                  <div className="flex flex-wrap gap-2">
                    {popularTags
                      .filter(tag => !tags.includes(tag))
                      .slice(0, 6)
                      .map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                          onClick={() => addTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex items-center justify-between pt-6">
            <div className="text-sm text-muted-foreground">
              By posting your question, you agree to our terms of service
            </div>
            <div className="flex gap-3">
              <Button type="button" variant="outline">
                Save Draft
              </Button>
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90"
                disabled={!title.trim() || !description.trim() || tags.length === 0 || createQuestionMutation.isPending}
              >
                {createQuestionMutation.isPending ? "Posting..." : "Post Question"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}