import { motion } from "framer-motion";
import LetterCard from "./letter-card";
import type { Letter } from "@shared/schema";

interface LetterGalleryProps {
  letters: Letter[];
  onLetterClick: (letterId: string) => void;
}

export default function LetterGallery({ letters, onLetterClick }: LetterGalleryProps) {
  return (
    <section className="min-h-screen py-16 px-6" data-testid="gallery-section">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-playfair text-5xl font-bold text-deep-charcoal mb-4" data-testid="text-gallery-title">
            Ucapan Tengkyu
          </h2>
          <p className="font-serif text-xl text-medium-brown" data-testid="text-letter-count">
            {letters.length} letters by nyototod
          </p>
        </motion.div>

        {/* Letters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {letters.map((letter, index) => (
            <motion.div
              key={letter.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <LetterCard 
                letter={letter}
                onClick={() => onLetterClick(letter.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Navigation hint */}
        <motion.div 
          className="text-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="font-serif text-medium-brown text-lg" data-testid="text-interaction-hint">
            <span className="text-soft-coral mr-2">👆</span>
            sorry kalo lag, pake hostingan gratisan wkwk. sama maap kalo surat nya template
          </p>
        </motion.div>
      </div>
    </section>
  );
}
