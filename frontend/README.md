# OpenJio Frontend

## Contents

- [Project structure](#project-structure)
- [Key packages used](#key-packages-used)
- [React hooks exposed](#react-hooks-exposed-by-the-app)

## Project structure

The current project structure is as shown below:

```bash
frontend
├─public/
└─src/
  │ index.tsx
  │ App.tsx
  │ service-worker.ts
  ├─app/
  ├─assets/
  ├─components/
  ├─constants/
  ├─contexts/
  ├─interfaces/
  ├─reducers/
  ├─routes/
  ├─services/
  └─utils/
```

### Rules when creating a new React component

This project creates a new folder for each component in its most sensible parent directory.

- For example, a component such as `loading` that is used by multiple other components/routes should exist in the `components/` folder.
- A component that is only used by a single other component should exist in the folder of the parent component, either as an individual file or as a subfolder, if the component is complex.

  - E.g. `dashboard/PieChart.tsx`, `login/LoginForm`, etc.

- Components wrapped by React Router's `<Route>` object should be contained in the `routes/` folder.

A typical component folder should look like this:

```bash
component
│ Component.tsx  # A stateless/function component
│ Component.css  # The styles for the component with the same name
| ComponentContainer.tsx  # The stateful component for the stateless component it contains
| index.ts  # A single line file that exports the top level component for use.
```

Grouping the components this way allows for easy refactoring of components without having to change all imports for other components that uses the refactored component, since one just needs to update the exported component in `index.ts`.

> The bare minimum that a component folder should contain is `Component.tsx` and `index.ts`. The rest are optional.

### `app/` directory

Contains:

- `AuthenticatedApp.tsx`, which contains routes accessible to authenticated users.
- `UnauthenticatedApp.tsx`, which contains publicly accessible routes.
- `store.tsx`, for Redux store.

### `assets/` directory

Contains animations, images, and general scss folders.

### `components/` directory

Contains components that are used by more than 1 (or 2) components.

### `constants/` directory

Contains constants that are used throughout the application.

### `contexts/` directory

Contains contexts providing React hooks and providers that can be used by React components.

### `interfaces/` directory

Contains interfaces used in the application.

### `reducers/` directory

Contains reducers used in the application. [Redux Toolkit](https://redux-toolkit.js.org/) is used as the redux library of choice.

### `routes/` directory

Contains folders containing components that are wrapped by React Router's `<Route>` in `src/app/AuthenticatedApp` or `src/app/UnauthenticatedApp`.

### `services/` directory

Contains helper services that interface directly with the backend API.

### `utils/` directory

Contain helper functions and data for usage around the application.

## Key packages used

This is to help increase familiarity with the various parts of our app.

### `@reduxjs/toolkit`, `react-redux`, `redux`, `redux-persist`

`redux` is a state management library for JavaScript, and `react-redux` is the official React bindings for Redux, i.e. Redux adapted for React.

`@reduxjs/toolkit` is the official, opinionated, batteries-included toolset for efficient Redux development, i.e. it enables ease of using Redux without the need for a lot of boilerplate code.

Unfortunately, Redux does not store state past a session, i.e. once you refresh, it's gone. This is why we use `redux-persist`, which persists the Redux store for us across sessions.

### `axios`

A powerful HTTP client, i.e. helps us to make HTTP requests to our backend API.

### `react-router-dom`

Enables routing within the app, e.g. `/home` will now lead me to a different page from `/login`.

### `typescript`

Allows for types in JavaScript. Makes your life so much better.

### `eslint`, `prettier`

> These are devDependencies, i.e. they are not bundled in the final production build.

These two dependencies are a linter and formatter respectively, and they help us to ensure that everyone's code follow a certain style and formatting.

### `husky`, `lint-staged`, `pretty-quick`

> These are devDependencies, i.e. they are not bundled in the final production build.

`husky` enables us to make better use of git hooks, i.e. automated commands that run whenever we try to commit, push and more. We will be using it to do code style checks whenever someone tries to commit.

`lint-staged` enables us to target only the files we have changed and staged, i.e. we don't have to check the entire project when only 1 file was changed.

`pretty-quick` helps to run `prettier` on changed files.

## React hooks exposed by the app

These hooks are exported from the various `contexts/*Context.tsx` files in the `contexts` folder.

### useAuth

Useful authentication functions.

```tsx
import { useAuth } from "contexts/AuthContext";
```

Contains:

- `data`: The current user logged in.
- `login(username: string, password: string)`: Used to log in to the app.
- `signup(username: string, password: string, name:string)`: Used to sign up with the app.
- `logout()`: Log out of the application.

#### Usage of `useAuth`

```tsx
const { logout } = useAuth()

<IonButton onClick={logout} />
```

### useUser

Retrieve user information.

```tsx
import { useUser } from "contexts/UserContext";
```

#### Usage of `useUser`

```tsx
// App.tsx
const App = () => {
  const { user } = useUser();

  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};
```

### useCache

> To be added.

Handles app versioning. Refer to [Versioning and cache busting](#versioning-and-cache-busting) for more information.

```tsx
import { useCache } from "contexts/CacheContext";
```

Contains:

- `isLatestVersion`: A boolean value denoting whether the cached app on the user's side is the latest version.
- `refreshCacheAndReload()`: Clears the user's cache and reloads the page to refetch the latest app.

#### Usage of `useCache`

```tsx
// App.tsx
const App = () => {
  const { isLatestVersion, refreshCacheAndReload } = useCache();

  return {!isLatestVersion && <Alert okHandler={refreshCacheAndReload}>};
};
```
