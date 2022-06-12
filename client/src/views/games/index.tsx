import React, { FC, memo } from "react";
import { useData } from "./data";
import { GamesView as MainComponent } from "./games";

export const GamesView: FC = memo(
  () => {
    const props = useData();
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <MainComponent {...props} />;
  },
  () => true,
);
