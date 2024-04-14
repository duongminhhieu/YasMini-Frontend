import { Outlet } from 'react-router-dom'
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'

export default function App() {
  return (
    <>
        <AppHeader />
    
        <div>
            <Outlet />
        </div>
        
        <AppFooter />
    </>
  )
}
