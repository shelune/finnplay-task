import React, { useCallback, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { request } from "./utils/client";
import { ResponseMessages } from "./utils/messages";
import { LoginView } from "./views/login";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const login = useCallback(async () => {
    const response = await request(
      "login",
      "POST",
      {},
      {
        username: "player1",
        password: "player1",
      },
    );
    if (response.message === ResponseMessages.LOGIN_SUCCESS) {
      setIsAuth(true);
    }
    return response;
  }, []);

  const logout = useCallback(async () => {
    const response = await request("logout", "DELETE", {}, {});
    setIsAuth(false);
    return response;
  }, []);

  useEffect(() => {
    async function checkIsAuth() {
      const response = await request("isAuth", "GET", {}, null);
      if (response.sessionUser) {
        setIsAuth(true);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    checkIsAuth();
  }, []);
  return (
    <div className="App">
      <LoginView />
    </div>
  );
}

export default App;
