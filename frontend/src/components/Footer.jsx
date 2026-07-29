const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="w-full mt-20 relative z-10 border-t-2 border-retro-accent bg-retro-bg">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-retro-text uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <span>DESIGNED & BUILT BY</span>
          <span className="text-retro-accent font-bold">DHRUV SHARMA</span>
        </div>
        <div className="text-retro-text-secondary">
          © {year}
        </div>
      </div>
    </footer>
  )
}

export default Footer
