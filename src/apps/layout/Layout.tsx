import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { AnalyticsTracker } from './components/AnalyticsTracker'
import { BackgroundAudio } from './components/BackgroundAudio'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'

export const Layout = () => {
  return (
    <LayoutShell>
      <Navbar />
      <Outlet />
      <Footer />
      <AnalyticsTracker />
      <BackgroundAudio />
    </LayoutShell>
  )
}

const LayoutShell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`
