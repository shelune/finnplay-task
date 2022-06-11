export type BaseApiResponse = {
  message: string;
};

export interface ApiGamesResponse extends BaseApiResponse {
  games: string[];
}

export type ApiLoginResponse = BaseApiResponse;
