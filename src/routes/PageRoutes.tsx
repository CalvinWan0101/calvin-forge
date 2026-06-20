import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import App from '../App'
import { NotFound } from '../apps/ErrorPage'
import { Home } from '../apps/Home'
import { Portfolio } from '../apps/Portfolio'

export const PageRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="portfolio" element={<Portfolio />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)
