import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
      title={siteConfig.title}
  )
}
