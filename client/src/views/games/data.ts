import { ComponentProps, useEffect, useState } from "react";
import {
  ApiGame,
  ApiGamesResponse,
  LocalGame,
  LocalGameGroup,
  LocalProvider,
} from "../../utils/types";
import type { GamesView } from "./games";
import { request } from "../../utils/client";

const gameMapper = ({
  id,
  name,
  provider,
  cover,
  coverLarge,
  date,
}: ApiGame): LocalGame => ({
  id,
  name,
  provider,
  cover,
  coverLarge,
  date: new Date(date),
});

export const useData = (): Omit<
  ComponentProps<typeof GamesView>,
  "username" | "setUser"
> => {
  const [games, setGames] = useState<LocalGame[]>([]);
  const [providers, setProviders] = useState<LocalProvider[]>([]);
  const [groups, setGroups] = useState<LocalGameGroup[]>([]);
  useEffect(() => {
    async function fetchGames() {
      const response = await request<ApiGamesResponse>("games", "GET", {}, {});
      const { data } = response;
      if (response) {
        setGames(data.games.map(gameMapper));
        setProviders(data.providers);
        setGroups(data.groups);
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchGames();
  }, []);
  return {
    games,
    providers,
    groups,
  };
};
