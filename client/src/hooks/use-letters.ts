import { useQuery } from "@tanstack/react-query";
import type { Letter } from "@shared/schema";
import { staticLetters } from "@/data/letters";

export function useLetters() {
  return useQuery<Letter[]>({
    queryKey: ["letters"],
    queryFn: () => staticLetters,
  });
}

export function useLetter(id: string) {
  return useQuery<Letter>({
    queryKey: ["letters", id],
    queryFn: () => {
      const letter = staticLetters.find(l => l.id === id);
      if (!letter) throw new Error('Letter not found');
      return letter;
    },
    enabled: !!id,
  });
}
