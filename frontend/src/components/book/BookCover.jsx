export default function BookCover() {
  return (
    <div className="w-full h-full bg-[#2c3e50] text-[#ecf0f1] p-8 md:p-12 flex flex-col items-center justify-center border-l-8 border-[#1a252f] shadow-[inset_15px_0_30px_rgba(0,0,0,0.6)] relative overflow-hidden">
      {/* Subtle cloth texture overlay */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/linen.png')] mix-blend-overlay pointer-events-none" />
      
      <div className="relative z-10 border-2 md:border-4 border-[#e67e22] p-6 md:p-10 text-center flex flex-col items-center justify-center w-full h-full max-w-md mx-auto bg-[#2c3e50]/80 backdrop-blur-sm">
         <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-[#e67e22]">Dhruv<br/>Sharma</h1>
         <div className="w-24 h-1 bg-[#e67e22] mb-8" />
         <p className="font-sans text-sm md:text-base uppercase tracking-[0.2em] text-[#bdc3c7]">
           Field Notes of a
           <br/>
           Backend & AI Engineer
         </p>
      </div>
      
      <div className="absolute bottom-8 text-xs md:text-sm font-sans tracking-[0.3em] text-[#e67e22]/80 animate-pulse">
        SCROLL TO OPEN
      </div>
    </div>
  )
}
