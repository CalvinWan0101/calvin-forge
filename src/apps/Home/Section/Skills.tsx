import { FiCode } from 'react-icons/fi'
import styled, { keyframes } from 'styled-components'
import { skills } from '../../../data/data'
import { Header } from './Header'

export const Skills = () => (
  <Section id="skills">
    <Header icon={FiCode} title="技藝專長" />

    <SkillsGrid>
      {skills.map((skill) => {
        const SkillIcon = skill.icon

        return (
          <SkillCard key={skill.title}>
            <Corner>{skill.corner}</Corner>
            <SkillIconWrap>
              <SkillIcon />
            </SkillIconWrap>
            <CardTitle>{skill.title}</CardTitle>
            <PlainList>
              {skill.items.map((item) => (
                <ListItem key={item}>{item}</ListItem>
              ))}
            </PlainList>
          </SkillCard>
        )
      })}
    </SkillsGrid>
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

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`

const SkillCard = styled.article`
  position: relative;
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

const Corner = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--accent);
  border-left: 1px solid var(--border-soft);
  border-bottom: 1px solid var(--border-soft);
  background: var(--bg);
`

const SkillIconWrap = styled.span`
  display: inline-flex;
  margin-bottom: 1rem;
  color: var(--accent);
  font-size: 2rem;
`

const CardTitle = styled.h3`
  margin: 0 0 1rem;
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: 0.05em;
`

const PlainList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
`

const ListItem = styled.li`
  font-size: 0.875rem;
  font-weight: 500;
`
