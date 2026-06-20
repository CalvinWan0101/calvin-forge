import { FiArrowRight, FiMessageSquare } from 'react-icons/fi'
import styled, { keyframes } from 'styled-components'
import { contactMethods } from '../../data/data'
import { HomeSectionHeader } from './HomeSectionHeader'

export const ContactSection = () => (
  <Section id="contact">
    <HomeSectionHeader icon={FiMessageSquare} title="保持聯繫" />

    <SectionIntro>歡迎透過以下方式與我聯繫，無論是工作機會、技術交流，或只是打個招呼。</SectionIntro>

    <ContactGrid>
      {contactMethods.map((method) => {
        const Icon = method.icon
        const isEmail = method.href.startsWith('mailto:')

        return (
          <ContactCard
            key={method.label}
            href={method.href}
            target={isEmail ? undefined : '_blank'}
            rel={isEmail ? undefined : 'noreferrer'}
          >
            <ContactCardIcon>
              <Icon />
            </ContactCardIcon>
            <ContactCardBody>
              <ContactCardLabel>{method.label}</ContactCardLabel>
              <ContactCardValue>{method.value}</ContactCardValue>
              <ContactCardSubtext>{method.subtext}</ContactCardSubtext>
            </ContactCardBody>
            <ContactCardArrow>
              <FiArrowRight />
            </ContactCardArrow>
          </ContactCard>
        )
      })}
    </ContactGrid>
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

const SectionIntro = styled.p`
  margin: -0.75rem 0 2rem;
  max-width: 38rem;
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.9;
`

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.5rem;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`

const ContactCard = styled.a`
  position: relative;
  overflow: hidden;
  min-height: 15rem;
  padding: 1.75rem;
  border: 2px solid var(--border-soft);
  border-radius: 2px;
  background:
    linear-gradient(180deg, rgba(253, 252, 248, 0.98) 0%, rgba(247, 243, 231, 0.96) 100%),
    var(--bg-card);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: var(--accent);
    box-shadow: var(--shadow);
  }
`

const ContactCardIcon = styled.div`
  width: 2.75rem;
  height: 2.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid var(--border-soft);
  border-radius: 2px;
  font-size: 1.1rem;
  color: var(--accent);
`

const ContactCardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const ContactCardLabel = styled.div`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
`

const ContactCardValue = styled.div`
  font-size: 1rem;
  font-weight: 900;
  letter-spacing: 0.02em;
`

const ContactCardSubtext = styled.div`
  font-size: 0.8rem;
  color: var(--text-muted);
`

const ContactCardArrow = styled.div`
  margin-top: auto;
  align-self: flex-end;
  color: var(--accent);
  font-size: 1rem;
`
