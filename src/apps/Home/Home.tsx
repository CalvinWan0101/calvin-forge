import { ContactSection } from './ContactSection'
import { EducationSection } from './EducationSection'
import { ExperienceSection } from './ExperienceSection'
import { Hero } from './Hero'
import { ProjectsSection } from './ProjectsSection'
import { SkillsSection } from './SkillsSection'
import styled from 'styled-components'

export const Home = () => (
  <Main>
    <Hero />
    <SkillsSection />
    <ExperienceSection />
    <EducationSection />
    <ProjectsSection />
    <ContactSection />
  </Main>
)

const Main = styled.main`
  width: min(64rem, calc(100% - 3rem));
  margin: 0 auto;
  padding: 2rem 0 5rem;
  display: flex;
  flex-direction: column;
  gap: 6rem;

  @media (max-width: 720px) {
    width: min(64rem, calc(100% - 2rem));
    gap: 4.5rem;
  }
`
