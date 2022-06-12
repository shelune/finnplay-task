import React, { FC, useCallback } from "react";

import { request } from "../utils/client";
import css from "./header.module.scss";
import Logo from "../assets/images/logo.png";
import { ReactComponent as ProfileIcon } from "../assets/icons/profile.svg";

type Props = {
  setUser: (user: { username: string } | null) => void;
  username: string;
};

export const Header: FC<Props> = ({ setUser, username }) => {
  const logout = useCallback(async () => {
    await request("logout", "DELETE", {}, {});
  }, []);

  return (
    <div className={css.header}>
      <div className={css.headerContainer}>
        <div className={css.logo}>
          <img src={Logo} alt="logo" />
        </div>
        <div className={css.user}>
          <div className={css.username}>{username}</div>
          <div className={css.logout}>
            <ProfileIcon className={css.logoutIcon} />
            <a
              href="#0"
              className={css.logoutLink}
              onClick={(e) => {
                e.preventDefault();
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                logout();
                setUser(null);
              }}
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
