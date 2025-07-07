
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store.tsx'
import "./core/theme/background.css"
import "./core/theme/scrollbar.css"

createRoot(document.getElementById('root')!).render(

  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  
)
