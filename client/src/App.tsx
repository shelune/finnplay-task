import React, { useEffect, useState } from "react";

import { request } from "./utils/client";
import { GamesView } from "./views/games/games";
import { LoginView } from "./views/login/login";

function App() {
  const [isAuth, setIsAuth] = useState(false);

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
      {!isAuth ? (
        <LoginView setIsAuth={setIsAuth} />
      ) : (
        <GamesView setIsAuth={setIsAuth} />
      )}
    </div>
  );
}

export default App;
