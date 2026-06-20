import { FiTrendingUp } from 'react-icons/fi'
import styled from 'styled-components'
import { fadeUp } from './shared'

export const Hero = () => (
  <HeroSection>
    <HeroCopy>
      <Badge>
        <BadgeIcon>
          <FiTrendingUp />
        </BadgeIcon>
        投資紀錄
      </Badge>
      <Title>投資旅程：VT</Title>
      <TitleMeta>Vanguard Total World Stock Index ETF</TitleMeta>
      <Description>長期被動投資策略的記錄，專注於全球分散配置與持續成長。</Description>
    </HeroCopy>
  </HeroSection>
)

const HeroSection = styled.section`
  padding-top: 1rem;
  animation: ${fadeUp} 0.7s ease both;
`

const HeroCopy = styled.div`
  max-width: 38rem;
`

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid var(--accent);
  border-radius: 2px;
  color: var(--accent);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  background: rgba(253, 252, 248, 0.72);
`

const BadgeIcon = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  font-size: 0.875rem;
`

const Title = styled.h1`
  margin: 0 0 0.75rem;
  font-size: clamp(1.75rem, 5vw, 2.5rem);
  font-weight: 900;
  letter-spacing: 0.05em;
`

const TitleMeta = styled.div`
  margin: -0.2rem 0 0.75rem;
  color: rgba(62, 50, 44, 0.58);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
`

const Description = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.8;
  color: var(--text-muted);
`
