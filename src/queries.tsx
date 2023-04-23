import { useQuery } from "@tanstack/react-query";
import { listPokemons } from "./service";

export interface UseGetPokemonsProps {
  page: number;
}

export function useGetPokemons({ page }: UseGetPokemonsProps) {
  return useQuery({
    queryKey: ["pokemon", "list", page],
    queryFn: () => listPokemons(page),
  });
}
