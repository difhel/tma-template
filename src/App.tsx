import { useCounter, useInitData } from './components/service/GlobalStateProvider/context'

function App() {
  const { clicks, click } = useCounter();
  const { firstName } = useInitData().user || {};

  return (
    <>
      <button onClick={click}>
        {firstName} clicked {clicks} times.
      </button>
    </>
  )
}

export default App
