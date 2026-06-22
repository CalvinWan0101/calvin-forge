import { useRef, useState } from 'react'
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
  FiFolder,
  FiImage,
  FiMonitor,
} from 'react-icons/fi'
import styled, { keyframes } from 'styled-components'
import { projects } from '../../../data/data'
import { Header } from './Header'

export const Projects = () => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState<'previous' | 'next'>('next')
  const touchStartX = useRef<number | null>(null)
  const activeProject = projects[activeProjectIndex]
  const HostIcon = activeProject.hostIcon

  const showPreviousProject = () => {
    setSlideDirection('previous')
    setActiveProjectIndex((currentIndex) => (
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1
    ))
  }

  const showNextProject = () => {
    setSlideDirection('next')
    setActiveProjectIndex((currentIndex) => (
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1
    ))
  }

  const showProject = (projectIndex: number) => {
    if (projectIndex === activeProjectIndex) {
      return
    }

    setSlideDirection(projectIndex > activeProjectIndex ? 'next' : 'previous')
    setActiveProjectIndex(projectIndex)
  }

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null
  }

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) {
      return
    }

    const touchEndX = event.changedTouches[0]?.clientX
    if (touchEndX === undefined) {
      touchStartX.current = null
      return
    }

    const swipeDistance = touchEndX - touchStartX.current
    touchStartX.current = null

    if (Math.abs(swipeDistance) < 50) {
      return
    }

    if (swipeDistance > 0) {
      showPreviousProject()
      return
    }

    showNextProject()
  }

  return (
    <Section id="projects">
      <Header icon={FiMonitor} title="我的專案" />

      <ProjectsCarousel aria-roledescription="carousel" aria-label="專案展示">
        <CarouselButton
          type="button"
          onClick={showPreviousProject}
          aria-label="上一個專案"
        >
          <FiChevronLeft />
        </CarouselButton>

        <CarouselViewport
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <ProjectCard
            key={activeProject.name}
            $direction={slideDirection}
            href={activeProject.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`前往 ${activeProject.name}`}
          >
            <ProjectMedia>
              {activeProject.desktopImageUrl ? (
                <ProjectPicture>
                  <ProjectImage
                    src={activeProject.desktopImageUrl}
                    alt={activeProject.imageAlt ?? activeProject.name}
                  />
                </ProjectPicture>
              ) : (
                <ProjectPlaceholder>
                  <PlaceholderIcon>
                    <FiImage />
                  </PlaceholderIcon>
                  <PlaceholderLabel>
                    <FiFolder />
                    {activeProject.name}
                  </PlaceholderLabel>
                </ProjectPlaceholder>
              )}

              <ProjectArrow>
                <FiArrowRight />
              </ProjectArrow>
            </ProjectMedia>

            <ProjectBody>
              <ProjectTop>
                <ProjectName>{activeProject.name}</ProjectName>
                <ProjectHost>
                  <HostIcon />
                  {activeProject.host}
                </ProjectHost>
              </ProjectTop>

              <ProjectDescription>{activeProject.description}</ProjectDescription>

              <ProjectFooter>
                <ProjectTags>
                  {activeProject.tags.map((tag) => (
                    <ProjectTag key={tag}>{tag}</ProjectTag>
                  ))}
                </ProjectTags>

                <ProjectLinkHint>
                  <FiExternalLink />
                  檢視原始碼
                </ProjectLinkHint>
              </ProjectFooter>
            </ProjectBody>
          </ProjectCard>

          <ProjectDots aria-label="選擇專案">
            {projects.map((project, index) => (
              <ProjectDot
                key={project.name}
                type="button"
                $active={index === activeProjectIndex}
                onClick={() => showProject(index)}
                aria-label={`顯示 ${project.name}`}
                aria-current={index === activeProjectIndex}
              />
            ))}
          </ProjectDots>
        </CarouselViewport>

        <CarouselButton
          type="button"
          onClick={showNextProject}
          aria-label="下一個專案"
        >
          <FiChevronRight />
        </CarouselButton>
      </ProjectsCarousel>
    </Section>
  )
}

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

const slideFromPrevious = keyframes`
  from {
    opacity: 0;
    transform: translateX(-48px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const slideFromNext = keyframes`
  from {
    opacity: 0;
    transform: translateX(48px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const Section = styled.section`
  scroll-margin-top: 5.5rem;
  animation: ${fadeUp} 0.7s ease both;
`

const ProjectsCarousel = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 720px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`

const CarouselViewport = styled.div`
  position: relative;
  flex: 1;
  min-width: 0;

  @media (max-width: 720px) {
    grid-column: 1 / -1;
  }
`

const CarouselButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 3rem;
  height: 3rem;
  border: 1px solid rgba(140, 46, 46, 0.2);
  border-radius: 999px;
  background: rgba(253, 252, 248, 0.92);
  color: var(--accent);
  cursor: pointer;
  font-size: 1.4rem;
  box-shadow: 0 14px 28px rgba(62, 50, 44, 0.08);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    border-color: rgba(140, 46, 46, 0.5);
    box-shadow: 0 18px 34px rgba(62, 50, 44, 0.12);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 3px solid rgba(140, 46, 46, 0.18);
    outline-offset: 3px;
  }

  @media (max-width: 720px) {
    display: none;
  }
`

const ProjectCard = styled.a<{ $direction: 'previous' | 'next' }>`
  position: relative;
  display: flex;
  overflow: hidden;
  min-height: 320px;
  border: 2px solid var(--border-soft);
  border-radius: 2px;
  background: linear-gradient(180deg, rgba(253, 252, 248, 0.96), rgba(250, 246, 236, 0.96));
  box-shadow: 0 20px 40px rgba(62, 50, 44, 0.08);
  animation: ${({ $direction }) => (
    $direction === 'previous' ? slideFromPrevious : slideFromNext
  )} 0.32s ease both;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 4px;
    background: var(--accent);
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.25s ease;
  }

  &:hover {
    border-color: rgba(140, 46, 46, 0.45);
    box-shadow: 0 26px 50px rgba(62, 50, 44, 0.12);
    transform: translateY(-4px);
  }

  &:hover::before {
    transform: scaleY(1);
  }

  @media (max-width: 720px) {
    flex-direction: column;
  }
`

const ProjectMedia = styled.div`
  position: relative;
  align-self: flex-start;
  flex-shrink: 0;
  width: 320px;
  aspect-ratio: 1 / 1;
  border-right: 1px solid var(--border-soft);
  background:
    radial-gradient(circle at top, rgba(140, 46, 46, 0.12), transparent 45%),
    linear-gradient(180deg, #f3eddd 0%, #ebe0cb 100%);

  @media (max-width: 720px) {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-right: 0;
    border-bottom: 1px solid var(--border-soft);
  }
`

const ProjectPicture = styled.picture`
  display: block;
  width: 100%;
  height: 100%;
`

const ProjectImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  opacity: 0.92;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;

  ${ProjectCard}:hover & {
    opacity: 1;
    transform: scale(1.03);
  }
`

const ProjectPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  width: 100%;
  height: 100%;
  padding: 2rem;
`

const PlaceholderIcon = styled.div`
  color: rgba(140, 46, 46, 0.45);
  font-size: 2rem;
`

const PlaceholderLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(62, 50, 44, 0.7);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`

const ProjectArrow = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid rgba(140, 46, 46, 0.18);
  border-radius: 999px;
  background: rgba(253, 252, 248, 0.88);
  color: var(--accent);
  opacity: 0;
  transform: translateX(-4px);
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;

  ${ProjectCard}:hover & {
    opacity: 1;
    transform: translateX(0);
  }
`

const ProjectBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.75rem;
`

const ProjectTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`

const ProjectName = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 900;
  letter-spacing: 0.03em;
`

const ProjectHost = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.25rem 0.6rem;
  border: 1px solid var(--border-soft);
  border-radius: 2px;
  color: var(--accent);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  svg {
    font-size: 0.85rem;
  }
`

const ProjectDescription = styled.p`
  margin: 0;
  color: var(--text-muted);
  font-size: 0.92rem;
  line-height: 1.85;
`

const ProjectFooter = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-top: auto;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const ProjectTag = styled.span`
  padding: 0.24rem 0.65rem;
  border: 1px solid var(--border-soft);
  border-radius: 2px;
  color: rgba(62, 50, 44, 0.74);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
`

const ProjectLinkHint = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  white-space: nowrap;
`

const ProjectDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.55rem;
  margin-top: 1rem;
`

const ProjectDot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? '1.6rem' : '0.55rem')};
  height: 0.55rem;
  border: 0;
  border-radius: 999px;
  background: ${({ $active }) => ($active ? 'var(--accent)' : 'rgba(140, 46, 46, 0.22)')};
  cursor: pointer;
  transition:
    background 0.2s ease,
    width 0.2s ease;

  &:focus-visible {
    outline: 3px solid rgba(140, 46, 46, 0.18);
    outline-offset: 3px;
  }
`
