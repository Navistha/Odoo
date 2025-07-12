import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { QuestionFeed } from "@/components/QuestionFeed";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block lg:w-64 shrink-0">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <QuestionFeed />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
