
import { Link, useNavigate } from 'react-router-dom';
import { useDeckStore } from '@/store/deckStore';
import FlashcardComponent from '@/components/Flashcard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Trash2, Trash } from 'lucide-react';
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
  const { decks, activeDeckId, nextCard, prevCard, deleteCard, deleteAllCards } = useDeckStore();
  const navigate = useNavigate();

  const activeDeck = decks.find(deck => deck.id === activeDeckId);

  if (!activeDeck) {
    return (
      <div className="flex flex-col items-center justify-center text-center animate-fade-in pt-10">
        <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
                <CardTitle>No Deck Selected</CardTitle>
                <CardDescription>
                  Please select a deck to review from the home page.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild>
                    <Link to="/">Go to Decks</Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  if (activeDeck.cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center animate-fade-in pt-10">
        <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
                <CardTitle>No Cards to Review in "{activeDeck.name}"</CardTitle>
                <CardDescription>
                You haven't added any flashcards to this deck yet.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <Button onClick={() => navigate('/add')}>Add Flashcards</Button>
                <Button variant="outline" onClick={() => navigate('/')}>Choose Another Deck</Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  const handleDelete = () => {
    deleteCard(activeDeck.currentCardIndex);
    toast.success('Flashcard deleted!');
  };

  const handleDeleteAll = () => {
    deleteAllCards();
    toast.success('All flashcards in this deck have been deleted.');
  };

  const currentCard = activeDeck.cards[activeDeck.currentCardIndex];

  return (
    <div className="flex flex-col items-center gap-6 animate-fade-in">
      <h1 className="text-3xl font-bold">Reviewing: {activeDeck.name}</h1>
      <div className="w-full max-w-2xl relative">
        <FlashcardComponent
          key={activeDeck.currentCardIndex}
          cardKey={activeDeck.currentCardIndex}
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
        Card {activeDeck.currentCardIndex + 1} of {activeDeck.cards.length}
      </p>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={prevCard} aria-label="Previous Card">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={nextCard} aria-label="Next Card">
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-8 border-t pt-6 w-full max-w-2xl flex justify-center">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <Trash className="mr-2 h-4 w-4" />
              Delete All Cards in Deck
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete all cards?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete all flashcards in the "{activeDeck.name}" deck. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteAll}>Delete All</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Review;
