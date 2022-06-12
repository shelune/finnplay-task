import React from "react";
import { act, render } from "@testing-library/react";
import { Header } from "./header";

describe("Header", () => {
  it("should render", () => {
    const { container } = render(
      <Header username="player1" setUser={jest.fn()} />,
    );
    expect(container).toMatchSnapshot();
  });

  it("should call logout when clicking on logout", () => {
    const mockSetUser = jest.fn();
    const { getByText } = render(
      <Header username="player1" setUser={mockSetUser} />,
    );
    act(() => {
      getByText("Logout").click();
    });
    expect(mockSetUser).toHaveBeenCalled();
  });
});
