import { FiMapPin, FiUser } from 'react-icons/fi'
import styled, { keyframes } from 'styled-components'
import { profile, seal } from '../../../data/data'

export const Hero = () => (
  <HeroSection id="home">
    <HeroText>
      <Badge>
        <PingDot />
        {profile.badge}
      </Badge>
      <Name>{profile.name}</Name>
      <Meta>
        <MetaItem>
          <MetaIcon>
            <FiMapPin />
          </MetaIcon>
          {profile.location}
        </MetaItem>
        <MetaItem>
          <MetaIcon>
            <FiUser />
          </MetaIcon>
          {profile.birthYear}
        </MetaItem>
      </Meta>
    </HeroText>

    <AvatarCluster>
      <AvatarFrame>
        <Avatar src={profile.avatar} alt="Calvin Wan" />
      </AvatarFrame>
      <AvatarSeal aria-hidden="true">
        <AvatarSealImage src={seal} alt="" />
      </AvatarSeal>
    </AvatarCluster>
  </HeroSection>
)

const ping = keyframes`
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
`

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

const HeroSection = styled.section`
  scroll-margin-top: 5.5rem;
  animation: ${fadeUp} 0.7s ease both;
  min-height: calc(100vh - 6rem);
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  padding-top: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`

const HeroText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;

  @media (min-width: 768px) {
    align-items: flex-start;
    text-align: left;
  }
`

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--accent);
  color: var(--accent);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  border-radius: 2px;
  background: rgba(253, 252, 248, 0.72);
`

const PingDot = styled.span`
  position: relative;
  display: inline-flex;
  width: 0.5rem;
  height: 0.5rem;

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 999px;
    background: var(--accent);
  }

  &::before {
    animation: ${ping} 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
    opacity: 0.75;
  }
`

const Name = styled.h1`
  margin: 0.5rem 0;
  font-size: clamp(3rem, 8vw, 4.5rem);
  font-weight: 900;
  letter-spacing: 0.2em;
  color: var(--accent);
`

const Meta = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding-top: 1.5rem;
  margin-top: 0.5rem;
  border-top: 1px solid var(--border-soft);
  font-size: 0.875rem;
  font-weight: 700;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`

const MetaItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`

const MetaIcon = styled.span`
  color: var(--accent);
  font-size: 1.2rem;
`

const AvatarCluster = styled.div`
  position: relative;
  display: grid;
  place-items: center;
`

const AvatarFrame = styled.div`
  position: relative;
  z-index: 1;
  width: 11rem;
  height: 11rem;
  padding: 0.55rem;
  border: 4px solid var(--accent);
  border-radius: 50%;
  box-shadow: var(--shadow);
  background:
    radial-gradient(circle at 30% 30%, rgba(140, 46, 46, 0.18), transparent 45%),
    var(--bg-card);

  @media (min-width: 768px) {
    width: 15rem;
    height: 15rem;
  }
`

const AvatarSeal = styled.div`
  position: absolute;
  right: -0.15rem;
  bottom: -0.1rem;
  z-index: 2;
  width: 3.2rem;
  height: 3.2rem;
  padding: 0.2rem;
  border: 2px solid var(--accent);
  background: var(--bg-card);
  box-shadow: 0 10px 18px rgba(140, 46, 46, 0.12);

  @media (min-width: 768px) {
    right: -0.2rem;
    bottom: -0.15rem;
    width: 4rem;
    height: 4rem;
    padding: 0.24rem;
  }
`

const AvatarSealImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  opacity: 0.94;

  @media (min-width: 768px) {
    opacity: 0.96;
  }
`

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`
