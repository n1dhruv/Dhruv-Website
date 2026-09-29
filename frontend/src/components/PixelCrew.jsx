'use client';

const CREW = [
  {
    name: 'Luffy',
    title: 'Captain',
    src: '/sprites/luffy-pixel.gif',
    visibility: 'flex', // Always visible
  },
  {
    name: 'Zoro',
    title: 'Swordsman',
    src: '/sprites/zoro.gif',
    visibility: 'flex', // Always visible
  },
  {
    name: 'Sanji',
    title: 'Cook',
    src: '/sprites/sanji.gif',
    visibility: 'flex', // Always visible
  },
  {
    name: 'Shanks',
    title: 'Yonko',
    src: '/sprites/shanks-pixel.gif',
    visibility: 'flex', // Always visible
  },
  {
    name: 'Usopp',
    title: 'Sniper',
    src: '/sprites/usopp-pixel.gif',
    visibility: 'flex', // Always visible
  },
  {
    name: 'Chopper',
    title: 'Doctor',
    src: '/sprites/chopper-pixel.gif',
    visibility: 'hidden min-[380px]:flex', // Hidden on <380px
  },
  {
    name: 'Nami',
    title: 'Navigator',
    src: '/sprites/nami-pixel.gif',
    visibility: 'hidden min-[480px]:flex', // Hidden on <480px
  },
  {
    name: 'Nico Robin',
    title: 'Archaeologist',
    src: '/sprites/nicorobin-pixel.gif',
    visibility: 'hidden sm:flex', // Hidden on <640px
  },
  {
    name: 'Franky',
    title: 'Shipwright',
    src: '/sprites/franky-pixel.gif',
    visibility: 'hidden md:flex', // Hidden on <768px (removed first from right)
  },
];

export default function PixelCrew() {
  return (
    <div className="w-full relative z-10 select-none p-0 m-0 leading-none">
      {/* Grounded sprite row — characters standing directly on the footer divider line */}
      <div className="w-full max-w-4xl mx-auto px-4 flex items-end justify-center gap-1.5 min-[380px]:gap-2 sm:gap-2.5 md:gap-3.5 -mb-[1px]">
        {CREW.map((char) => (
          <div
            key={char.name}
            className={`group relative flex-col items-center shrink-0 cursor-pointer p-0 m-0 leading-none ${char.visibility}`}
          >
            {/* Pop-up Name Tag on Hover */}
            <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none absolute -top-7 px-2 py-0.5 rounded font-mono text-[10px] tracking-wider text-snow bg-black/90 border border-lilac/40 shadow-sm backdrop-blur-sm whitespace-nowrap z-20">
              {char.name}
            </span>

            {/* Pixel Sprite GIF: sized responsively, grounded to bottom line */}
            <img
              src={char.src}
              alt={char.name}
              draggable={false}
              className="w-9 h-9 min-[380px]:w-10 min-[380px]:h-10 min-[480px]:w-11 min-[480px]:h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 block object-contain [image-rendering:pixelated] transition-transform duration-200 ease-out group-hover:-translate-y-1.5 m-0 p-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
