import React, { useEffect, useState } from "react";

import { request } from "./utils/client";
import { ApiLoginResponse } from "./utils/types";
import { GamesView } from "./views/games";
import { LoginView } from "./views/login/login";

function App() {
  const [user, setUser] = useState<{ username: string } | null>();

  useEffect(() => {
    async function checkIsAuth() {
      const response = await request<ApiLoginResponse>(
        "isAuth",
        "GET",
        {},
        null,
      );
      if (response.sessionUser) {
        setUser(response.sessionUser);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    checkIsAuth();
  }, []);

  return (
    <div className="App">
      {!user ? (
        <LoginView setUser={setUser} />
      ) : (
        <GamesView username={user.username} setUser={setUser} />
      )}
    </div>
  );
}

export default App;
