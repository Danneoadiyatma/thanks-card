import { motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Letter } from "@shared/schema";

interface LetterReaderProps {
  letter: Letter;
  currentIndex: number;
  totalLetters: number;
  onBack: () => void;
  onNavigate: (direction: 'next' | 'prev') => void;
}

export default function LetterReader({ 
  letter, 
  currentIndex, 
  totalLetters, 
  onBack, 
  onNavigate 
}: LetterReaderProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const favoriteMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("PATCH", `/api/letters/${letter.id}/favorite`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/letters"] });
      toast({
        title: letter.isFavorite ? "Removed from favorites" : "Added to favorites",
        description: letter.isFavorite ? "This letter is no longer favorited" : "This letter has been added to your favorites",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update favorite status",
        variant: "destructive",
      });
    },
  });

  const handleFavorite = () => {
    favoriteMutation.mutate();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: letter.title,
        text: letter.preview,
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(`${letter.title}\n\n${letter.preview}`);
      toast({
        title: "Copied to clipboard",
        description: "Letter preview has been copied to your clipboard",
      });
    }
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => (
      paragraph.trim() && (
        <p key={index} className="font-serif mb-4">
          {paragraph.trim()}
        </p>
      )
    ));
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-warm-cream to-gentle-peach py-16 px-6" data-testid="reading-section">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Header */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center text-medium-brown hover:text-soft-coral transition-colors duration-300 text-lg"
            data-testid="button-back-to-gallery"
          >
            <ArrowLeft className="mr-3 h-5 w-5" />
            Back to Letters
          </Button>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => onNavigate('prev')}
              disabled={totalLetters <= 1}
              className="text-medium-brown hover:text-soft-coral transition-colors duration-300"
              data-testid="button-prev-letter"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <span className="font-sans text-medium-brown" data-testid="text-letter-position">
              Letter {currentIndex + 1} of {totalLetters}
            </span>
            <Button
              variant="ghost"
              onClick={() => onNavigate('next')}
              disabled={totalLetters <= 1}
              className="text-medium-brown hover:text-soft-coral transition-colors duration-300"
              data-testid="button-next-letter"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </motion.div>

        {/* Letter Content */}
        <motion.div 
          className="bg-white rounded-3xl shadow-2xl p-12 md:p-16 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          data-testid="letter-content"
        >
          {/* Decorative corner elements */}
          <div className="absolute top-6 left-6 w-4 h-4 border-l-2 border-t-2 border-soft-coral rounded-tl-lg"></div>
          <div className="absolute top-6 right-6 w-4 h-4 border-r-2 border-t-2 border-soft-coral rounded-tr-lg"></div>
          <div className="absolute bottom-6 left-6 w-4 h-4 border-l-2 border-b-2 border-soft-coral rounded-bl-lg"></div>
          <div className="absolute bottom-6 right-6 w-4 h-4 border-r-2 border-b-2 border-soft-coral rounded-br-lg"></div>

          {/* Letter Header */}
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-deep-charcoal mb-4" data-testid="text-letter-title">
              {letter.title}
            </h2>
            <p className="font-serif text-xl text-medium-brown" data-testid="text-letter-date">
              {new Date(letter.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Letter Body */}
          <div className="space-y-6 text-lg leading-relaxed text-deep-charcoal mb-12" data-testid="text-letter-content">
            {formatContent(letter.content)}
          </div>

          {/* Letter Actions */}
          <div className="flex justify-center space-x-6">
            <Button
              onClick={handleFavorite}
              disabled={favoriteMutation.isPending}
              className={`${
                letter.isFavorite 
                  ? 'bg-soft-coral text-white' 
                  : 'bg-gray-100 text-medium-brown hover:bg-soft-coral hover:text-white'
              } font-sans font-medium px-8 py-3 rounded-full transition-all duration-300`}
              data-testid="button-favorite"
            >
              <Heart className={`mr-2 h-4 w-4 ${letter.isFavorite ? 'fill-current' : ''}`} />
              {letter.isFavorite ? 'Favorited' : 'Favorite'}
            </Button>
            
            <Button
              onClick={handleShare}
              className="bg-sage-green hover:bg-sage-green/80 text-white font-sans font-medium px-8 py-3 rounded-full transition-all duration-300"
              data-testid="button-share"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </motion.div>

        {/* Letter Navigation */}
        <motion.div 
          className="flex justify-between items-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button
            onClick={() => onNavigate('prev')}
            disabled={totalLetters <= 1}
            className="bg-white hover:bg-gray-50 text-medium-brown font-sans font-medium px-8 py-4 rounded-full transition-all duration-300 shadow-lg disabled:opacity-50"
            data-testid="button-prev-letter-bottom"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous Letter
          </Button>
          
          <Button
            onClick={() => onNavigate('next')}
            disabled={totalLetters <= 1}
            className="bg-white hover:bg-gray-50 text-medium-brown font-sans font-medium px-8 py-4 rounded-full transition-all duration-300 shadow-lg disabled:opacity-50"
            data-testid="button-next-letter-bottom"
          >
            Next Letter
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
