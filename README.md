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
