import { useState } from "react";
import { useGetPokemons } from "../../queries";
import { getImgSrc } from "../../service";
import styles from "./styles.module.scss";

function PokemonCardsSkeleton() {
  return (
    <>
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className={styles.pokemonCardSkeleton}>
          <div className={styles.pokemonCardSkeletonImg} />
          <div className={styles.pokemonCardSkeletonName} />
        </div>
      ))}
    </>
  );
}

interface PokemonCardProps {
  pokemon: {
    name: string;
    url: string;
  };
}

function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className={styles.pokemonCard}>
      <img className={styles.pokemonCardImg} src={getImgSrc(pokemon)} />
      <span>{pokemon.name}</span>
    </div>
  );
}

export function Pokemons() {
  const [page, setPage] = useState(1);

  const query = useGetPokemons({ page });

  if (!query.isLoading && !query.data) {
    return <div>Something went wrong</div>;
  }

  const handleNextPage = () => {
    setPage((page) => page + 1);
  };

  const handlePreviousPage = () => {
    setPage((page) => page - 1);
  };

  return (
    <div className={styles.page}>
      <div className={styles.pokemonList}>
        {query.isLoading ? (
          <PokemonCardsSkeleton />
        ) : (
          query.data.results.map((pokemon) => (
            <PokemonCard key={pokemon.url} pokemon={pokemon} />
          ))
        )}
      </div>
      <div className={styles.pageControls}>
        <button
          disabled={query.isLoading || query.data.previous === null}
          onClick={handlePreviousPage}
        >
          Previous
        </button>
        {page}
        <button
          disabled={query.isLoading || query.data.next === null}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
