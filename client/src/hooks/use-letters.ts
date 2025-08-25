import { useQuery } from "@tanstack/react-query";
import type { Letter } from "@shared/schema";

export function useLetters() {
  return useQuery<Letter[]>({
    queryKey: ["/api/letters"],
  });
}

export function useLetter(id: string) {
  return useQuery<Letter>({
    queryKey: ["/api/letters", id],
    enabled: !!id,
  });
}
