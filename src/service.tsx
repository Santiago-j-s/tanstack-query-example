const baseUrl = "https://pokeapi.co/api/v2";

const githubSpriteUrl = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
export const pageSize = 40;

export interface PokemonResult {
  name: string;
  url: string;
}

export interface ListResults<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

export function getImgSrc(pokemon: PokemonResult) {
  const id = parseInt(
    pokemon.url.split("https://pokeapi.co/api/v2/pokemon/")[1],
    10
  );

  return githubSpriteUrl(id);
}

export async function listPokemons(
  page: number
): Promise<ListResults<PokemonResult>> {
  const params = new URLSearchParams({
    limit: pageSize.toString(),
    offset: `${pageSize * (page - 1)}`,
  });

  try {
    const response = await fetch(`${baseUrl}/pokemon?${params}`);

    if (!response.ok) {
      throw new Error(`Error fetching pokemon list: ${response.statusText}`);
    }

    return response.json();
  } catch (err: unknown) {
    console.error(`Unknown error fetching pokemon list:`, err);
    throw err;
  }
}
