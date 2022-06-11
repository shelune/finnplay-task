import classNames from "classnames";
import React, { FC, useCallback, useState } from "react";

import Logo from "../../assets/images/logo.png";
import { request } from "../../utils/client";
import css from "./games.module.scss";

type Props = {
  setIsAuth: (isAuth: boolean) => void;
};

export const GamesView: FC<Props> = ({ setIsAuth }) => {
  const logout = useCallback(async () => {
    const response = await request("logout", "DELETE", {}, {});
    setIsAuth(false);
    return response;
  }, [setIsAuth]);

  return (
    <div className={css.gamesPage}>
      <div className={css.container}>
        <div className={css.logo}>
          <img src={Logo} alt="logo" />
        </div>
        <div
          role="button"
          tabIndex={0}
          onKeyDown={() => {}}
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            logout();
          }}
        >
          logged in
        </div>
      </div>
    </div>
  );
};
