import { motion } from "framer-motion";
import { Heart, Music, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeHeroProps {
  onEnter: () => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
}

export default function WelcomeHero({ onEnter, audioEnabled, onToggleAudio }: WelcomeHeroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-warm-cream via-gentle-peach to-soft-gold relative overflow-hidden" data-testid="welcome-section">
      {/* Floating decorative elements */}
      <motion.div 
        className="absolute top-20 left-20 w-16 h-16 bg-soft-coral rounded-full opacity-20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-32 right-32 w-12 h-12 bg-sage-green rounded-full opacity-30"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/4 w-8 h-8 bg-soft-gold rounded-full opacity-25"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      
      <div className="text-center max-w-4xl mx-auto px-6">
        {/* Welcome image */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <img 
            src="/kumpulkelas.jpeg" 
            alt="Lagi kumpul kelas" 
            className="rounded-full mx-auto w-64 h-64 object-cover shadow-2xl border-12 border-white"
            data-testid="welcome-image"
          />
        </motion.div>
        
        <motion.h1 
          className="font-playfair text-6xl md:text-7xl font-bold text-deep-charcoal mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          data-testid="welcome-title"
        >
          Halo kaka-kaka!
        </motion.h1>
        
        <motion.p 
          className="font-serif text-xl md:text-2xl text-medium-brown mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          data-testid="welcome-description"
        >
          i've prepared something very special for you all - a collection of heartfelt letters from me.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <Button 
            onClick={onEnter}
            className="bg-soft-coral hover:bg-soft-coral/80 text-white font-sans font-semibold px-12 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            data-testid="button-enter"
          >
            <Heart className="mr-3 h-5 w-5" />
            Open Your Letters
          </Button>
        </motion.div>
        
        {/* Music toggle */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <Button
            variant="ghost"
            onClick={onToggleAudio}
            className="text-medium-brown hover:text-soft-coral transition-colors duration-300"
            data-testid="button-music-toggle"
          >
            {audioEnabled ? <Music className="mr-2 h-4 w-4" /> : <VolumeX className="mr-2 h-4 w-4" />}
            <span>{audioEnabled ? 'Music On' : 'Music Off'}</span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
