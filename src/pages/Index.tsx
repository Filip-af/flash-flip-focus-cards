
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center animate-fade-in pt-10">
      <Card className="w-full max-w-xl text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-4xl font-bold tracking-tight">Welcome to Flashcardify</CardTitle>
          <CardDescription className="text-muted-foreground text-lg pt-2">
            The simple and beautiful way to study and master new topics.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4 p-6">
          <Button asChild size="lg" className="flex-1">
            <Link to="/add">
              Add New Cards
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="flex-1">
            <Link to="/review">
              Review Your Deck
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
