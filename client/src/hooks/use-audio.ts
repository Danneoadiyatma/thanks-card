import { useState, useCallback, useEffect } from "react";

type SoundType = 'transition' | 'letterOpen' | 'letterTurn' | 'hover' | 'click';

export function useAudio() {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [backgroundMusic, setBackgroundMusic] = useState<HTMLAudioElement | null>(null);

  // Initialize background music
  useEffect(() => {
    const audio = new Audio('/background-music.mp3'); // Put your music file in client/public/
    audio.loop = true;
    audio.volume = 0.8; // Gentle volume
    setBackgroundMusic(audio);
  }, []);

  const toggleAudio = useCallback(() => {
    setAudioEnabled(prev => {
      const newState = !prev;
      if (newState && backgroundMusic) {
        backgroundMusic.play().catch(e => console.log('Music play failed:', e));
      } else if (backgroundMusic) {
        backgroundMusic.pause();
      }
      return newState;
    });
  }, [backgroundMusic]);

  const playSound = useCallback((type: SoundType) => {
    if (!audioEnabled) return;

    // Create audio context for web audio API sounds
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const createTone = (frequency: number, duration: number, volume: number = 0.1) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      };

      // Different sounds for different actions
      switch (type) {
        case 'transition':
          createTone(523.25, 0.3, 0.05); // C5
          break;
        case 'letterOpen':
          createTone(659.25, 0.4, 0.06); // E5
          setTimeout(() => createTone(783.99, 0.3, 0.04), 150); // G5
          break;
        case 'letterTurn':
          createTone(440, 0.2, 0.04); // A4
          break;
        case 'hover':
          createTone(880, 0.1, 0.03); // A5
          break;
        case 'click':
          createTone(1046.5, 0.1, 0.04); // C6
          break;
        default:
          break;
      }
    } catch (error) {
      // Fallback - just log the sound type if audio context fails
      console.log(`Playing ${type} sound`);
    }
  }, [audioEnabled]);

  return {
    audioEnabled,
    toggleAudio,
    playSound,
  };
}