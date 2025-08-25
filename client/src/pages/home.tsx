import { useState } from "react";
import WelcomeHero from "@/components/welcome-hero";
import LetterGallery from "@/components/letter-gallery";
import LetterReader from "@/components/letter-reader";
import FooterActions from "@/components/footer-actions";
import { useLetters } from "@/hooks/use-letters";
import { useAudio } from "@/hooks/use-audio";

export default function Home() {
  const [currentView, setCurrentView] = useState<'welcome' | 'gallery' | 'reading'>('welcome');
  const [currentLetterId, setCurrentLetterId] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [highContrast, setHighContrast] = useState(false);
  
  const { data: letters = [], isLoading } = useLetters();
  const { audioEnabled, toggleAudio, playSound } = useAudio();

  const showGallery = () => {
    setCurrentView('gallery');
    playSound('transition');
  };

  const showLetter = (letterId: string) => {
    setCurrentLetterId(letterId);
    setCurrentView('reading');
    playSound('letterOpen');
  };

  const showGalleryFromReading = () => {
    setCurrentView('gallery');
    setCurrentLetterId(null);
    playSound('transition');
  };

  const navigateToLetter = (direction: 'next' | 'prev') => {
    if (!currentLetterId || letters.length === 0) return;
    
    const currentIndex = letters.findIndex(letter => letter.id === currentLetterId);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = currentIndex < letters.length - 1 ? currentIndex + 1 : 0;
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : letters.length - 1;
    }
    
    setCurrentLetterId(letters[newIndex].id);
    playSound('letterTurn');
  };

  const currentLetter = currentLetterId ? letters.find(l => l.id === currentLetterId) : null;
  const currentLetterIndex = currentLetter ? letters.findIndex(l => l.id === currentLetter.id) : -1;

  const increaseFontSize = () => {
    setFontSize(prev => prev === 'normal' ? 'large' : 'normal');
  };

  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-cream" data-testid="loading-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-soft-coral mx-auto mb-4"></div>
          <p className="font-serif text-xl text-medium-brown">Loading your letters...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen ${fontSize === 'large' ? 'text-lg' : ''} ${highContrast ? 'high-contrast' : ''}`}
      data-testid="home-page"
    >
      {currentView === 'welcome' && (
        <WelcomeHero 
          onEnter={showGallery}
          audioEnabled={audioEnabled}
          onToggleAudio={toggleAudio}
        />
      )}
      
      {currentView === 'gallery' && (
        <LetterGallery 
          letters={letters}
          onLetterClick={showLetter}
        />
      )}
      
      {currentView === 'reading' && currentLetter && (
        <LetterReader 
          letter={currentLetter}
          currentIndex={currentLetterIndex}
          totalLetters={letters.length}
          onBack={showGalleryFromReading}
          onNavigate={navigateToLetter}
        />
      )}
      
      {currentView !== 'welcome' && (
        <FooterActions 
          audioEnabled={audioEnabled}
          onToggleAudio={toggleAudio}
          onIncreaseFontSize={increaseFontSize}
          onToggleHighContrast={toggleHighContrast}
          fontSize={fontSize}
          highContrast={highContrast}
        />
      )}
    </div>
  );
}
