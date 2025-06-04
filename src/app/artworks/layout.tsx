export default function ArtworksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      {children}
    </div>
  )
} 