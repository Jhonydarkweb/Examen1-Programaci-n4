import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router'
import Navbar from './Navbar'
import Footer from './Footer'
import Home from './Home'
import CarParts from './CarParts'
import '../App.css'

const rootRoute = createRootRoute({
  component: function RootLayout() {
    return (
      <div className="app-shell">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    )
  },
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: CarParts,
})

const routeTree = rootRoute.addChildren([indexRoute, cartRoute])

export const router = createRouter({
  routeTree,
})
