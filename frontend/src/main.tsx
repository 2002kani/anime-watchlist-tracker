import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Pages/App/App.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MeineListe from './Pages/MeineListe/MeineListe.tsx'
import Favoriten from './Pages/Favoriten/Favoriten.tsx'
import { savedCardContext } from './hooks/Context.ts'
import { savedCards } from './types/index.ts'
import React from 'react'

const Root: React.FC = () => {
  const [savedCard, setSavedCard] = useState<savedCards[]>([]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    { 
      path: "/Meine-Liste",
      element: <MeineListe/>
    },
    {
      path: "/Favoriten",
      element: <Favoriten />
    }
  ]);
  
  return(
    <StrictMode>
      <savedCardContext.Provider value={{ savedCard, setSavedCard }}>
        <RouterProvider router={router} />
      </savedCardContext.Provider>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<Root />);