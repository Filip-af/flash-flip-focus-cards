
import { useState } from 'react';
import { useDeckStore } from '@/store/deckStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PlusCircle, Trash2, Eye, FilePlus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
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
import { useNavigate } from 'react-router-dom';

const Decks = () => {
  const { decks, addDeck, deleteDeck, setActiveDeck } = useDeckStore();
  const [newDeckName, setNewDeckName] = useState('');
  const navigate = useNavigate();

  const handleAddDeck = () => {
    if (newDeckName.trim()) {
      addDeck(newDeckName.trim());
      toast.success(`Deck "${newDeckName.trim()}" created!`);
      setNewDeckName('');
    } else {
      toast.error('Deck name cannot be empty.');
    }
  };
  
  const handleReview = (deckId: string) => {
    setActiveDeck(deckId);
    navigate('/review');
  };

  const handleAddCards = (deckId: string) => {
    setActiveDeck(deckId);
    navigate('/add');
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Decks</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2" />
              New Deck
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Deck</DialogTitle>
              <DialogDescription>
                Give your new deck a name. You can add flashcards to it later.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input 
                id="name" 
                value={newDeckName} 
                onChange={(e) => setNewDeckName(e.target.value)} 
                placeholder="e.g., JavaScript Fundamentals"
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" onClick={handleAddDeck}>Create Deck</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {decks.length === 0 ? (
        <Card className="text-center py-10">
          <CardHeader>
            <CardTitle>No Decks Found</CardTitle>
            <CardDescription>
              Create your first deck to get started!
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {decks.map((deck) => (
            <Card key={deck.id}>
              <CardHeader>
                <CardTitle>{deck.name}</CardTitle>
                <CardDescription>{deck.cards.length} cards</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleReview(deck.id)}>
                        <Eye className="mr-2 h-4 w-4" /> Review
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleAddCards(deck.id)}>
                        <FilePlus className="mr-2 h-4 w-4" /> Add Cards
                    </Button>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the "{deck.name}" deck and all its cards. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => {
                        deleteDeck(deck.id);
                        toast.success(`Deck "${deck.name}" deleted.`);
                      }}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Decks;
