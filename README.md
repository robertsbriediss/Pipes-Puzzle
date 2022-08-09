# Pipe Puzzle

Pipe puzzle game created with React, Typescript, Websocket, Redux. Data is retrieved from wss://hometask.eg1236.com/game-pipes/ and all actions are sent to it.

Game can be seen and played on
<https://pipes-puzzle-roberts-briedis.surge.sh/>

---

## Level passwords

1. JustWarmingUp
2. DefinitelyWarm
3. GettingTooHot
4. x
5. x
6. x

---

## Known limitations

1. When single pipe rotation happens, map request is made, so on higher level request is getting slower
    1. Possible solution is to store rotation count locally and before verify action, rotate all required pipes, but then BE and FE wouldn't be in sync.
2. Websocket on error doesn't start automatically by itself, need to refresh the page
3. Solver takes too much time to solve big puzzles
   1. Solution could be
      1. Checking next cell closest to top-left corner
      2. Checking neighbor cases when theres one possibility
      3. Checking neighbors if theres no unsolved and impossible "islands"

---

## Key design decisions made

1. Project using Typescript, to have more structured code
2. Data is requested through websocket, connected to wss://hometask.eg1236.com/game-pipes/
3. Data is saved on global store with redux, to have ability to get data from one place
4. On level completion level id is saved to local storage, to have ability to refresh page without losing completed levels
5. Auto-solver have visualization to see how solving logic works
   1. Solving logic is created in a way that it grows from starting point
6. Pipe grid is using react-virtualized package for smooth rendering

---

## Local setup

1. Clone repository

    ```bash
    git clone git@github.com:robertsbriediss/Pipes-Puzzle.git
    ```

2. Go to develop branch

    ```bash
    git checkout develop
    ```

3. Create .env file

   ```bash
   cp .env.example .env
   ```

4. Install dependencies

    ```bash
    yarn
    ```

5. Run the app in the development mode

    ```bash
    yarn start
    ```

App should be available on <http://localhost:3000>, or if 3000 port was taken then check cmd for url.

---

## Deployment

1. `yarn run build`
2. `cd build`
3. `surge`

---

## Eslint

### To run ESLinter

```bash
yarn eslint
```

### To fix ESLinter issues

```bash
yarn eslint:fix
```

---

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
