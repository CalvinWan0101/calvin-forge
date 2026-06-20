import { FiBookOpen } from 'react-icons/fi'
import styled, { keyframes } from 'styled-components'
import { education } from '../../data/data'
import { HomeSectionHeader } from './HomeSectionHeader'

export const EducationSection = () => (
  <Section id="education">
    <HomeSectionHeader icon={FiBookOpen} title="教育背景" />

    <Timeline>
      {education.map((entry) => (
        <TimelineItem key={`${entry.title}-${entry.period}`}>
          <TimelineDot $active={entry.active} $compact={entry.compact}>
            <TimelineInner $active={entry.active} $compact={entry.compact} />
          </TimelineDot>
          <TimelineCard $active={entry.active} $compact={entry.compact}>
            {entry.company ? <Company $active={entry.active}>{entry.company}</Company> : null}
            <TimelineTitle $compact={entry.compact}>{entry.title}</TimelineTitle>
            <Period $compact={entry.compact}>{entry.period}</Period>
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

const TimelineDot = styled.div<{ $active?: boolean; $compact?: boolean }>`
  position: absolute;
  left: ${props => (props.$compact ? '0.5rem' : '0')};
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => (props.$compact ? '1.5rem' : '2.5rem')};
  height: ${props => (props.$compact ? '1.5rem' : '2.5rem')};
  margin-top: ${props => (props.$compact ? '0.35rem' : '0.25rem')};
  border: 2px solid ${props => (props.$active ? 'var(--accent)' : 'var(--text-muted)')};
  border-radius: 2px;
  background: var(--bg);
`

const TimelineInner = styled.div<{ $active?: boolean; $compact?: boolean }>`
  width: ${props => (props.$compact ? '0.5rem' : '0.75rem')};
  height: ${props => (props.$compact ? '0.5rem' : '0.75rem')};
  background: ${props => (props.$active ? 'var(--accent)' : 'var(--text-muted)')};
`

const TimelineCard = styled.div<{ $active?: boolean; $compact?: boolean }>`
  width: ${props => (props.$compact ? 'calc(100% - 2.5rem)' : 'calc(100% - 3.5rem)')};
  margin-left: ${props => (props.$compact ? '2.5rem' : '3.5rem')};
  padding: ${props => (props.$compact ? '0.55rem 1rem' : '1.25rem 1.5rem')};
  display: flex;
  flex-direction: ${props => (props.$compact ? 'row' : 'column')};
  align-items: ${props => (props.$compact ? 'baseline' : 'flex-start')};
  justify-content: ${props => (props.$compact ? 'space-between' : 'flex-start')};
  gap: ${props => (props.$compact ? '1rem' : '0')};
  background: ${props => (props.$compact ? 'transparent' : 'rgba(253, 252, 248, 0.92)')};
  border: ${props => {
    if (props.$compact) return 'none'
    return props.$active ? '2px solid var(--accent)' : '1px solid rgba(62, 50, 44, 0.15)'
  }};
  border-radius: 2px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${props => (props.$compact ? '0.35rem' : '0')};
  }
`

const Company = styled.div<{ $active?: boolean }>`
  color: ${props => (props.$active ? 'var(--accent)' : 'var(--text-muted)')};
  font-weight: 700;
  letter-spacing: 0.1em;
`

const TimelineTitle = styled.h3<{ $compact?: boolean }>`
  margin: ${props => (props.$compact ? '0' : '0.25rem 0 0')};
  font-size: ${props => (props.$compact ? '0.875rem' : '1.125rem')};
  font-weight: ${props => (props.$compact ? 700 : 900)};
  opacity: ${props => (props.$compact ? 0.7 : 1)};
`

const Period = styled.div<{ $compact?: boolean }>`
  display: inline-block;
  margin: 0;
  padding-bottom: 0;
  border-bottom: none;
  font-size: ${props => (props.$compact ? '0.75rem' : '0.875rem')};
  font-weight: 700;
  opacity: ${props => (props.$compact ? 0.45 : 0.8)};
  white-space: ${props => (props.$compact ? 'nowrap' : 'normal')};
`
