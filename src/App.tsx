import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Pokemons } from "./components/Pokemons/index";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Pokemons />
    </QueryClientProvider>
  );
}
