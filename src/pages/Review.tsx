
import { Link } from 'react-router-dom';
import { useDeckStore } from '@/store/deckStore';
import FlashcardComponent from '@/components/Flashcard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';

const Review = () => {
  const { cards, currentCardIndex, nextCard, prevCard, deleteCard } = useDeckStore();

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center animate-fade-in pt-10">
        <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
                <CardTitle>No Cards to Review</CardTitle>
                <CardDescription>
                You haven't added any flashcards yet. Add some to get started!
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild>
                    <Link to="/add">Add Flashcards</Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  const handleDelete = () => {
    deleteCard(currentCardIndex);
    toast.success('Flashcard deleted!');
  };

  const currentCard = cards[currentCardIndex];

  return (
    <div className="flex flex-col items-center gap-6 animate-fade-in">
      <h1 className="text-3xl font-bold">Review Deck</h1>
      <div className="w-full max-w-2xl relative">
        <FlashcardComponent
          key={currentCardIndex}
          cardKey={currentCardIndex}
          question={currentCard.question}
          answer={currentCard.answer}
        />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon" className="absolute top-2 right-2" aria-label="Delete Card">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                flashcard from your deck.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <p className="text-muted-foreground font-medium">
        Card {currentCardIndex + 1} of {cards.length}
      </p>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={prevCard} aria-label="Previous Card">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={nextCard} aria-label="Next Card">
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Review;
