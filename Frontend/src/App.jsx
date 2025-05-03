import { useState } from 'react'
import AppRoutes from './routes/AppRoutes'
import { store } from './redux/store'
import { Provider } from 'react-redux'

function App() {
  const [ count, setCount ] = useState(0)

  return (

    <Provider store={store}>
      <AppRoutes />
    </Provider>
  )
}

export default App
