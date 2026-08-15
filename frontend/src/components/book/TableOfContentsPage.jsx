'use client'

export default function TableOfContentsPage({ chapters }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="p-8 md:p-12 w-full h-full flex flex-col">
      <h2 className="font-heading text-3xl font-bold mb-8 text-[#2c3e50] border-b-2 border-[#e67e22] pb-2">Table of Contents</h2>
      
      <div className="flex flex-col gap-6 flex-grow">
        {chapters.map((chapter, i) => (
          <div 
            key={chapter.id}
            className="flex items-end cursor-pointer group"
            onClick={() => scrollTo(chapter.id)}
          >
            <span className="font-sans text-lg font-medium text-[#2c3e50] group-hover:text-[#e67e22] transition-colors">{chapter.title}</span>
            <div className="flex-grow border-b-2 border-dotted border-[#bdc3c7] mx-4 mb-1 group-hover:border-[#e67e22] transition-colors" />
            <span className="font-sans font-bold text-[#e67e22]">{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
