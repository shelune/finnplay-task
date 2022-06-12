# How to run project in development mode (not config for production build yet)

- Open a terminal in `/client` folder and run `PORT=[port] npm run start` where `[port]` is an unoccupied port number, e.g. `PORT=3001 npm run start`
- Open a terminal in `/server` folder and run `PORT=[port] npm run start` where `[port]` is an unoccupied port number, e.g. `PORT=3333 npm run start`
- Open `package.json` file in `/client` and change the property `proxy` to reflect the correct port number used for server. For example if backend port is 3333 then it should be `"proxy": "http://localhost:3333",`

# Run tests

- In `/client` folder, run `npm run test`
