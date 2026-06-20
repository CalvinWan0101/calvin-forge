import { FiBriefcase } from 'react-icons/fi'
import styled, { keyframes } from 'styled-components'
import { experiences } from '../../../data/data'
import { Header } from './Header'

export const Experience = () => (
  <Section id="experience">
    <Header icon={FiBriefcase} title="過往經歷" />

    <Timeline>
      {experiences.map((entry) => (
        <TimelineItem key={`${entry.title}-${entry.period}`}>
          <TimelineDot $active={entry.active}>
            <TimelineInner $active={entry.active} />
          </TimelineDot>
          <TimelineCard $active={entry.active} $hasItems={Boolean(entry.items?.length)}>
            {entry.company ? <Company $active={entry.active}>{entry.company}</Company> : null}
            <TimelineTitle>{entry.title}</TimelineTitle>
            <Period $hasItems={Boolean(entry.items?.length)}>{entry.period}</Period>
            {entry.items ? (
              <TimelineList>
                {entry.items.map((item) => (
                  <TimelineListItem key={item} $active={entry.active}>
                    {item}
                  </TimelineListItem>
                ))}
              </TimelineList>
            ) : null}
          </TimelineCard>
        </TimelineItem>
      ))}
    </Timeline>
  </Section>
)

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Section = styled.section`
  scroll-margin-top: 5.5rem;
  animation: ${fadeUp} 0.7s ease both;
`

const PlainList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
`

const Timeline = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 1.25rem;
    width: 2px;
    background: var(--border-soft);
    transform: translateX(-50%);
  }
`

const TimelineItem = styled.article`
  position: relative;
  display: flex;
  align-items: flex-start;
`

const TimelineDot = styled.div<{ $active?: boolean }>`
  position: absolute;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  margin-top: 0.25rem;
  border: 2px solid ${props => (props.$active ? 'var(--accent)' : 'var(--text-muted)')};
  border-radius: 2px;
  background: var(--bg);
`

const TimelineInner = styled.div<{ $active?: boolean }>`
  width: 0.75rem;
  height: 0.75rem;
  background: ${props => (props.$active ? 'var(--accent)' : 'var(--text-muted)')};
`

const TimelineCard = styled.div<{ $active?: boolean; $hasItems?: boolean }>`
  width: calc(100% - 3.5rem);
  margin-left: 3.5rem;
  padding: ${props => (props.$hasItems ? '1.5rem' : '1.25rem 1.5rem')};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0;
  background: rgba(253, 252, 248, 0.92);
  border: ${props => (props.$active ? '2px solid var(--accent)' : '1px solid rgba(62, 50, 44, 0.15)')};
  border-radius: 2px;
`

const Company = styled.div<{ $active?: boolean }>`
  color: ${props => (props.$active ? 'var(--accent)' : 'var(--text-muted)')};
  font-weight: 700;
  letter-spacing: 0.1em;
`

const TimelineTitle = styled.h3`
  margin: 0.25rem 0 0;
  font-size: 1.125rem;
  font-weight: 900;
  opacity: 1;
`

const Period = styled.div<{ $hasItems?: boolean }>`
  display: inline-block;
  margin: ${props => (props.$hasItems ? '0.75rem 0 1rem' : '0.75rem 0 0')};
  padding-bottom: ${props => (props.$hasItems ? '0.5rem' : '0')};
  border-bottom: ${props => (props.$hasItems ? '1px solid var(--border-soft)' : 'none')};
  font-size: 0.875rem;
  font-weight: 700;
  opacity: 0.8;
  white-space: normal;
`

const TimelineList = styled(PlainList)`
  gap: 0.5rem;
`

const TimelineListItem = styled.li<{ $active?: boolean }>`
  position: relative;
  padding-left: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.75;

  &::before {
    content: '';
    position: absolute;
    top: 0.72rem;
    left: 0;
    width: 6px;
    height: 6px;
    background: ${props => (props.$active ? 'var(--accent)' : 'var(--text-muted)')};
  }
`
