import styled, { keyframes } from 'styled-components'

export const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const Main = styled.main`
  width: min(64rem, calc(100% - 3rem));
  margin: 0 auto;
  padding: 2rem 0 5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 720px) {
    width: min(64rem, calc(100% - 2rem));
    padding-top: 1.5rem;
  }
`

export const SurfaceCard = styled.section`
  background: rgba(253, 252, 248, 0.92);
  border: 2px solid var(--border-soft);
  border-radius: 2px;
  animation: ${fadeUp} 0.7s ease 0.16s both;
`

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 900;
  letter-spacing: 0.05em;
`
