import { Contact } from './Section/Contact'
import { Education } from './Section/Education'
import { Experience } from './Section/Experience'
import { Hero } from './Section/Hero'
import { Projects } from './Section/Projects'
import { Skills } from './Section/Skills'
import styled from 'styled-components'

export const Home = () => (
  <Main>
    <Hero />
    <Skills />
    <Experience />
    <Education />
    <Projects />
    <Contact />
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
