import AnimatedSection from './AnimatedSection'

export default function SectionHeading({
  title,
  gradientWord,
  subtitle,
  align = 'center',
}) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left'

  const renderTitle = () => {
    if (!gradientWord) return title
    const parts = title.split(gradientWord)
    return (
      <>
        {parts[0]}
        <span className="bg-gradient-to-r from-amber to-coral bg-clip-text text-transparent">
          {gradientWord}
        </span>
        {parts[1]}
      </>
    )
  }

  return (
    <AnimatedSection className={`${alignClass} mb-12 md:mb-16`}>
      <h2 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-text-primary mb-4 md:mb-6">
        {renderTitle()}
      </h2>
      {subtitle && (
        <p className="font-body text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </AnimatedSection>
  )
}
