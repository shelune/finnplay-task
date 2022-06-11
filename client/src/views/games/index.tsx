import React, { FC, memo } from "react";
import { useData } from "./data";
import { GamesView as MainComponent } from "./games";

interface Props {
  username: string;
  setUser: (user: { username: string } | null) => void;
}

export const GamesView: FC<Props> = memo(
  ({ username, setUser }) => {
    const props = useData();
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <MainComponent username={username} setUser={setUser} {...props} />;
  },
  () => true,
);
