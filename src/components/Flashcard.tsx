
import { useState, useEffect } from 'react';

interface FlashcardProps {
  question: string;
  answer: string;
  cardKey: number;
}

const FlashcardComponent = ({ question, answer, cardKey }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
  }, [cardKey]);

  return (
    <div
      className={`flip-card w-full h-64 cursor-pointer ${isFlipped ? 'flipped' : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="flip-card-inner shadow-lg">
        <div className="flip-card-front bg-card text-card-foreground">
          <p className="text-2xl font-semibold text-center p-4">{question}</p>
        </div>
        <div className="flip-card-back bg-primary text-primary-foreground">
          <p className="text-2xl font-semibold text-center p-4">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FlashcardComponent;
