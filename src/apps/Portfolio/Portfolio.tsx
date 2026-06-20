import { Hero } from './Section/Hero'
import { PurchaseChart } from './Section/PurchaseChart'
import { PurchaseHistory } from './Section/PurchaseHistory'
import { QuoteStrip } from './Section/QuoteStrip'
import { Main } from './Section/shared'
import { SummaryCards } from './Section/SummaryCards'

export const Portfolio = () => (
  <Main>
    <Hero />
    <QuoteStrip />
    <SummaryCards />
    <PurchaseChart />
    <PurchaseHistory />
  </Main>
)
