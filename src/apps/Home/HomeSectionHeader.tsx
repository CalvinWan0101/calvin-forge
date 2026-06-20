import type { IconType } from 'react-icons'
import styled from 'styled-components'

type HomeSectionHeaderProps = {
  icon: IconType
  title: string
}

export const HomeSectionHeader = ({ icon: Icon, title }: HomeSectionHeaderProps) => (
  <SectionHeader>
    <SectionIcon>
      <Icon />
    </SectionIcon>
    <SectionTitle>{title}</SectionTitle>
  </SectionHeader>
)

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-soft);
`

const SectionIcon = styled.span`
  color: var(--accent);
  font-size: 1.5rem;
  display: inline-flex;
`

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: 0.15em;
`
