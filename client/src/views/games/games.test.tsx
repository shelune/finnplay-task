import React from "react";
import { render } from "@testing-library/react";
import {
  mockGameGroups,
  mockGames,
  mockProviders,
} from "../../__mock__/games.mock";
import { GamesView } from "./games";

describe("GamesView", () => {
  it("should render", () => {
    const { container } = render(
      <GamesView
        games={mockGames}
        providers={mockProviders}
        groups={mockGameGroups}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
