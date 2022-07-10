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

1. Pipe grid map is requested in one call, so the higher level size is quite huge, its affecting smooth render.
    1. Possible solution is to split grid in chunks or create pagination loading
2. When single pipe rotations happens, map request is made and map grid data is fetched (same issue as 1.)
    1. Possible solution is to store rotation count locally and before verify action, rotate all required pipes, but then BE and FE wouldn't be in sync.
3. Websocket on error doesn't start automatically by itself, need to refresh the page
4. Auto-solver solves only 70-100%, to make it 100%, need to add 3rd stage which will go through all unsolved pipes and loop through all possible cases

---

## Key design decisions made

1. Project using Typescript, to have more structured code
2. Data is requested through websocket, connected to wss://hometask.eg1236.com/game-pipes/
3. Data is saved on global store with redux, to have ability to get data from one place
4. On level completion level id is saved to local storage, to have ability to refresh page without losing completed levels
5. Auto-solver splitter in stages
   1. Solve 100% straight away known cells, like some grid border cells, '╋' and those cell neighbors
   2. Solve cells by checking neighbor cells

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
