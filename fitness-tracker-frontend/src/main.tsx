import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import store from './store'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2
    }
  }
})

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
  }).catch(function(error) {
    console.log("Service Worker registration failed:", error);
  });
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
