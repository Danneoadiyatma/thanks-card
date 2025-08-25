import { SearchCode, Palette, Volume2, VolumeX, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FooterActionsProps {
  audioEnabled: boolean;
  onToggleAudio: () => void;
  onIncreaseFontSize: () => void;
  onToggleHighContrast: () => void;
  fontSize: 'normal' | 'large';
  highContrast: boolean;
}

export default function FooterActions({ 
  audioEnabled, 
  onToggleAudio, 
  onIncreaseFontSize, 
  onToggleHighContrast,
  fontSize,
  highContrast
}: FooterActionsProps) {
  const showHelp = () => {
    alert("How to use:\n\n• Click on letters to read them\n• Use arrow buttons to navigate between letters\n• Click the heart to favorite letters\n• Use accessibility options below for better viewing\n• Press Escape while reading to go back to the gallery");
  };

  return (
    <footer className="bg-white border-t border-gray-200 py-8 px-6" data-testid="footer-actions">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          
          {/* Accessibility Options */}
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              onClick={onIncreaseFontSize}
              className="flex items-center text-medium-brown hover:text-soft-coral transition-colors duration-300"
              data-testid="button-font-size"
            >
              <SearchCode className="mr-2 h-4 w-4" />
              <span className="font-sans">
                {fontSize === 'large' ? 'Normal Text' : 'Larger Text'}
              </span>
            </Button>
            
            <Button
              variant="ghost"
              onClick={onToggleHighContrast}
              className="flex items-center text-medium-brown hover:text-soft-coral transition-colors duration-300"
              data-testid="button-high-contrast"
            >
              <Palette className="mr-2 h-4 w-4" />
              <span className="font-sans">
                {highContrast ? 'Normal Colors' : 'High Contrast'}
              </span>
            </Button>
          </div>

          {/* Settings */}
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              onClick={onToggleAudio}
              className="flex items-center text-medium-brown hover:text-soft-coral transition-colors duration-300"
              data-testid="button-audio-toggle"
            >
              {audioEnabled ? (
                <Volume2 className="mr-2 h-4 w-4" />
              ) : (
                <VolumeX className="mr-2 h-4 w-4" />
              )}
              <span className="font-sans">
                {audioEnabled ? 'Sound On' : 'Sound Off'}
              </span>
            </Button>
            
            <Button
              variant="ghost"
              onClick={showHelp}
              className="flex items-center text-medium-brown hover:text-soft-coral transition-colors duration-300"
              data-testid="button-help"
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              <span className="font-sans">Help</span>
            </Button>
          </div>
        </div>
        
        <div className="text-center mt-6 pt-6 border-t border-gray-100">
          <p className="font-serif text-medium-brown" data-testid="text-footer-message">
            made with <span className="text-soft-coral mx-1">🔥</span> for kakak-kakak fl
          </p>
        </div>
      </div>
    </footer>
  );
}
