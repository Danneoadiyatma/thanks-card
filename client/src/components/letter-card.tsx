import { motion } from "framer-motion";
import { Inbox, Heart, Star, Camera, Leaf, Gift } from "lucide-react";
import type { Letter } from "@shared/schema";

interface LetterCardProps {
  letter: Letter;
  onClick: () => void;
}

const getLetterIcon = (author: string) => {
  // Simple icon assignment based on author name
  const icons = [Inbox, Heart, Star, Camera, Leaf, Gift];
  const index = author.length % icons.length;
  return icons[index];
};

export default function LetterCard({ letter, onClick }: LetterCardProps) {
  const IconComponent = getLetterIcon(letter.author);

  return (
    <motion.div
      className="letter-card bg-white rounded-3xl p-8 shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl"
      onClick={onClick}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      data-testid={`card-letter-${letter.id}`}
    >
      <div className="mb-6">
        {letter.imageUrl ? (
          <img 
            src={letter.imageUrl}
            alt={`Letter from ${letter.author}`}
            className="w-full h-48 object-cover rounded-xl"
            loading="lazy"
            data-testid={`img-letter-${letter.id}`}
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-gentle-peach to-soft-gold rounded-xl flex items-center justify-center">
            <IconComponent className="w-16 h-16 text-soft-coral" />
          </div>
        )}
      </div>
      
      <div className="text-center">
        <h3 className="font-playfair text-2xl font-semibold text-deep-charcoal mb-2" data-testid={`text-letter-title-${letter.id}`}>
          {letter.title}
        </h3>
        
        <p className="font-serif text-medium-brown mb-3" data-testid={`text-letter-date-${letter.id}`}>
          {new Date(letter.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
        
        <p className="font-serif text-sm text-gray-600 italic mb-4" data-testid={`text-letter-preview-${letter.id}`}>
          "{letter.preview}"
        </p>
        
        <div className="flex justify-center items-center text-soft-coral">
          <IconComponent className="mr-2 h-4 w-4" />
          <span className="font-sans text-sm">Tap to open</span>
          {letter.isFavorite && (
            <Heart className="ml-2 h-4 w-4 fill-current text-soft-coral" />
          )}
        </div>
      </div>
    </motion.div>
  );
}
