import React from "react";
import { act, fireEvent, render } from "@testing-library/react";
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

  it("should render empty message if no matching game found", () => {
    const { queryByText, getByText } = render(
      <GamesView
        games={mockGames}
        providers={mockProviders}
        groups={mockGameGroups}
      />,
    );
    const providerButton = getByText("Microgaming");
    const groupButton = getByText("Jackpot");
    act(() => {
      providerButton.click();
      groupButton.click();
    });
    expect(queryByText("Sorry, no matching game found.")).toMatchSnapshot();
  });

  it("should render games based on columns selected", () => {
    const { getByTestId, getByText } = render(
      <GamesView
        games={mockGames}
        providers={mockProviders}
        groups={mockGameGroups}
      />,
    );
    const columnCountButton = getByText("3");
    act(() => {
      columnCountButton.click();
    });
    expect(getByTestId("game-list")).toMatchSnapshot();
  });

  it("should render games that match the filters", async () => {
    const { getByTestId, getByText, getAllByTestId } = render(
      <GamesView
        games={mockGames}
        providers={mockProviders}
        groups={mockGameGroups}
      />,
    );

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    await act(async () => {
      const input = getByTestId("game-search-text");
      const providerButton = getByText("GameArt");
      providerButton.click();
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await fireEvent.change(input, {
        target: { value: "gon" },
      });
    });
    expect(getAllByTestId("game-box")).toHaveLength(3);
  });

  it("should accept multiple filters of the same category", () => {
    const { getByText, getAllByTestId } = render(
      <GamesView
        games={mockGames}
        providers={mockProviders}
        groups={mockGameGroups}
      />,
    );
    act(() => {
      const providerButton1 = getByText("Greentube");
      providerButton1.click();
    });

    act(() => {
      const providerButton2 = getByText("Endorphina");
      providerButton2.click();
    });
    expect(getAllByTestId("game-box")).toHaveLength(11);
  });

  it("should sort games properly", () => {
    const { getByText, getAllByTestId } = render(
      <GamesView
        games={mockGames}
        providers={mockProviders}
        groups={mockGameGroups}
      />,
    );
    act(() => {
      const sortButton = getByText("Z-A");
      sortButton.click();
    });
    expect(getAllByTestId("game-box")[0]).toHaveAttribute("title", "Zentaurus");
  });
});
