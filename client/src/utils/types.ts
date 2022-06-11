export type ApiGame = {
  id: number;
  name: string;
  provider: number;
  cover: string;
  coverLarge: string;
  date: string;
};

export type ApiProvider = {
  id: number;
  name: string;
  logo: string;
};

export type ApiGameGroup = {
  id: number;
  name: string;
  games: number[];
};

export type BaseApiResponse = {
  message: string;
};

export interface ApiGamesResponse extends BaseApiResponse {
  data: {
    games: ApiGame[];
    providers: ApiProvider[];
    groups: ApiGameGroup[];
  };
}

export interface ApiLoginResponse extends BaseApiResponse {
  sessionUser: {
    username: string;
  };
}

export interface LocalGame extends Omit<ApiGame, "date"> {
  date: Date;
}

export type LocalProvider = ApiProvider;

export type LocalGameGroup = ApiGameGroup;
