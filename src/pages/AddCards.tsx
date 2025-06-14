
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDeckStore } from '@/store/deckStore';
import { toast } from 'sonner';

const jsonExample = `[
  { 
    "question": "What is the capital of France?", 
    "answer": "Paris" 
  },
  { 
    "question": "What is the largest bone?", 
    "answer": "Femur" 
  }
]`;

const AddCards = () => {
  const { addCard, addCardsBulk } = useDeckStore();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [jsonInput, setJsonInput] = useState('');

  const handleAddSingle = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && answer.trim()) {
      addCard({ question, answer });
      toast.success('Flashcard added!');
      setQuestion('');
      setAnswer('');
    } else {
      toast.error('Both question and answer are required.');
    }
  };

  const handleAddBulk = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const cards = JSON.parse(jsonInput);
      if (Array.isArray(cards) && cards.every(c => c.question && c.answer)) {
        addCardsBulk(cards);
        toast.success(\`\${cards.length} flashcards added!\`);
        setJsonInput('');
      } else {
        throw new Error('Invalid JSON format.');
      }
    } catch (error) {
      toast.error('Invalid JSON. Please check the format and try again.');
      console.error(error);
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Flashcards</h1>
      <Tabs defaultValue="single" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="single">Add One by One</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Add (JSON)</TabsTrigger>
        </TabsList>
        <TabsContent value="single" className="pt-4">
          <form onSubmit={handleAddSingle} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Question</Label>
              <Input
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g., What is React?"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="answer">Answer</Label>
              <Input
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="e.g., A JavaScript library for building user interfaces."
              />
            </div>
            <Button type="submit" className="w-full">Add Card</Button>
          </form>
        </TabsContent>
        <TabsContent value="bulk" className="pt-4">
          <form onSubmit={handleAddBulk} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="json-input">JSON Data</Label>
              <p className="text-sm text-muted-foreground">Paste an array of flashcard objects.</p>
              <pre className="mt-2 p-3 bg-muted rounded-md text-xs overflow-x-auto">
                <code>{jsonExample}</code>
              </pre>
              <Textarea
                id="json-input"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows={10}
                placeholder={jsonExample.replace(/"/g, '\\"')}
              />
            </div>
            <Button type="submit" className="w-full">Add Cards from JSON</Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AddCards;
