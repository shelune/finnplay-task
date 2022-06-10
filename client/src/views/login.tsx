import classNames from "classnames";
import React, { FC } from "react";

import Logo from "../assets/images/logo.png";
import css from "./login.module.scss";

export const LoginView: FC = () => {
  console.log("login view");
  return (
    <div className={css.container}>
      <div className={css.logo}>
        <img src={Logo} alt="logo" />
      </div>
      <form className={css.form}>
        <div className={css.formControl}>
          <label
            htmlFor="username"
            className={classNames(css.label, {
              [css.isEditing]: false,
            })}
          >
            Login
            <input
              className={css.textInput}
              type="text"
              value=""
              id="username"
              name="username"
            />
          </label>
        </div>
        <div className={css.formControl}>
          <label
            htmlFor="password"
            className={classNames(css.label, {
              [css.isEditing]: false,
            })}
          >
            Password
            <input
              className={css.textInput}
              type="text"
              value=""
              id="password"
              name="password"
            />
          </label>
        </div>
        <div className={css.formSubmit}>
          <button type="button" className={css.submitButton} onClick={() => {}}>
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};
