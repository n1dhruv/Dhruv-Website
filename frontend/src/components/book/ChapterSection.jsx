export default function ChapterSection({ id, children, heightClass = 'h-[200vh]' }) {
  return (
    <div id={id} className={`w-full ${heightClass}`}>
      {children}
    </div>
  )
}
