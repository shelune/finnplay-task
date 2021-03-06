# Install

- Run `npm i` in both `/client` and `/server`
- In `/server` create a `.env` file and fill in `SESSION_SECRET=[random string]` like in `.sample_env` so the user session can work.

# Run in development mode

- Open a terminal in `/client` folder and run `npm run start` (or if port `3001` is occupied, change the port number in `package.json` script. Default port is `3001`)
- Do the same in `/server` folder. Default port here is `3333`.
- If backend port is changed (not `3333`), then open `package.json` file in `/client` and change the property `proxy` to reflect the correct port number used for server. For example if backend port is `50000` then it should be `"proxy": "http://localhost:50000",`

# Run tests

- In `/client` folder, run `npm run test`

# Run in production

- In `/client` folder, run `npm run build`
- In `/server` folder, run `npm run start` (like in dev mode)
- Go to `http://localhost:3333` (or whichever the port used for backend).
