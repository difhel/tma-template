# Telegram Mini App Template (React + Typescript + Vite)
## How to ...
### Get user data
```tsx
import { useInitData } from './components/service/GlobalStateProvider/context'

function App() {
  const { firstName } = useInitData().user || {};

  return (
    <>
      Hello, {firstName}!
    </>
  )
}

export default App
```
### Use global state
1. Update `GlobalState` type with your new data in [/src/util/types.ts](./src/util/types.ts). You can use a helper type `ReactState<T>` for storing getter and setter of the value.
```diff
+export type CounterState = number;

export type GlobalState = {
+    counter?: ReactState<CounterState>;
};
```
2. Update `useInitGlobalState` hook in [/src/components/service/GlobalStateProvider/context.ts](./src/components/service/GlobalStateProvider/context.ts) to populate the added field with a default value or to load it (e.g. from `localStorage`, `useState` or any other store).

This hook will be called on application startup to initialize the global state.
```diff
export const useInitGlobalState = () => {
+    const [counter, setCounter] = useState<CounterState>(0); // default value
    return useMemo(() => {
        return {
+            counter: {
+                value: counter,
+                setter: setCounter,
            },
        } satisfies Required<GlobalState> as Required<GlobalState>;
+    }, [counter]); // add all global state fields into the dependency list
}
```
3. **(Optional)** Create React hooks that will make it easier for you to work with this global state field.
```ts
export const useCounter = () => {
    const context = useContext(AppContext);
    const { value, setter } = context.counter!; // use "!" because all hooks are called after the global state initialization

    const click = useCallback(() => setter(value => value + 1), [setter]);

    return {
        clicks: value,
        click,
    };
};
```
4. Use it in your miniapp!
```diff
- import { useInitData } from './components/service/GlobalStateProvider/context'
+ import { useCounter, useInitData } from './components/service/GlobalStateProvider/context'

 function App() {
+   const { clicks, click } = useCounter();
    const { firstName } = useInitData().user || {};

    return (
      <>
-      Hello, {firstName}!
+      <button onClick={click}>
+         {firstName} clicked {clicks} times.
+       </button>
      </>
   )
 }

 export default App
```
### How to import assets
- from source:
```ts
import reactLogo from './assets/react.svg'
```
- from public:
```ts
import viteLogo from '/vite.svg'
```

### Change favicon
Replace `/public/favicon.png` file with your own.
