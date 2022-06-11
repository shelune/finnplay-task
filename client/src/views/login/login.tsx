import classNames from "classnames";
import React, { FC, useCallback, useState } from "react";

import Logo from "../../assets/images/logo.png";
import { ReactComponent as EyeIcon } from "../../assets/icons/show-password.svg";
import { request } from "../../utils/client";
import { ResponseMessages } from "../../utils/messages";
import { ApiLoginResponse } from "../../utils/types";
import css from "./login.module.scss";

type Props = {
  setUser: (user: { username: string } | null) => void;
};

export const LoginView: FC<Props> = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = useCallback(async () => {
    const response = await request<ApiLoginResponse>(
      "login",
      "POST",
      {},
      {
        username,
        password,
      },
    );
    console.log({ response });
    if (response.message === ResponseMessages.LOGIN_SUCCESS) {
      setUser(response.sessionUser);
    } else {
      // setUser(null);
      setError(response.message);
    }
  }, [password, setUser, username]);

  return (
    <div className={css.loginPage}>
      <div className={css.container}>
        <div className={css.logo}>
          <img src={Logo} alt="logo" />
        </div>
        <form
          className={css.form}
          onSubmit={(e) => {
            e.preventDefault();
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            login();
          }}
        >
          <div className={css.formControl}>
            <label
              htmlFor="username"
              className={classNames(css.label, {
                [css.isEditing]: !!username,
              })}
            >
              Login
            </label>
            <input
              className={css.textInput}
              type="text"
              value={username}
              id="username"
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className={css.formControl}>
            <label
              htmlFor="password"
              className={classNames(css.label, {
                [css.isEditing]: !!password,
              })}
            >
              Password
            </label>
            <input
              className={css.textInput}
              type={showPassword ? "text" : "password"}
              value={password}
              id="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <span
              aria-label="show password"
              role="button"
              tabIndex={0}
              onKeyDown={() => {}}
              onClick={() => setShowPassword(!showPassword)}
              className={classNames(css.showPassword, {
                [css.isActive]: showPassword,
              })}
            >
              <EyeIcon />
            </span>
          </div>
          {error && <div className={css.formHelper}>{error}</div>}
          <div className={css.formFunctions}>
            <button
              type="submit"
              className={css.submitButton}
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                login();
              }}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
