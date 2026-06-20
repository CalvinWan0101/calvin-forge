import { FiArrowUpRight } from 'react-icons/fi'
import styled from 'styled-components'
import { summaryCards } from '../portfolioModel'
import { fadeUp } from './shared'

export const SummaryCards = () => (
  <CardsGrid>
    {summaryCards.map((card) => (
      <SummaryCard key={card.label}>
        <SummaryLabel>{card.label}</SummaryLabel>
        <SummaryValue>
          {card.value}
          <SummaryUnit $active={card.active}>
            {card.active ? <FiArrowUpRight /> : null}
            {card.unit}
          </SummaryUnit>
        </SummaryValue>
      </SummaryCard>
    ))}
  </CardsGrid>
)

const CardsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  animation: ${fadeUp} 0.7s ease 0.08s both;
`

const SummaryCard = styled.article`
  padding: 1.5rem;
  background: rgba(253, 252, 248, 0.92);
  border: 2px solid var(--border-soft);
  border-radius: 2px;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    border-color: var(--accent);
    transform: translateY(-4px);
    box-shadow: var(--shadow);
  }
`

const SummaryLabel = styled.div`
  margin-bottom: 0.6rem;
  color: var(--text-muted);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`

const SummaryValue = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.4rem;
  font-size: 1.75rem;
  font-weight: 900;
  letter-spacing: -0.02em;
`

const SummaryUnit = styled.span<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  color: ${({ $active }) => ($active ? 'var(--accent)' : 'var(--text-muted)')};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`
