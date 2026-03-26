import { ReactNode } from 'react'
import { Squares } from "./squares-background"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen overflow-hidden bg-black relative">
      <div className="absolute inset-0 z-10">
        <Squares
          direction="diagonal"
          speed={0.5}
          squareSize={40}
          borderColor="#333"
          hoverFillColor="#222"
        />
      </div>
      <header className="fixed top-0 left-0 right-0 z-30 px-8 md:px-16 py-5 flex items-center">
        <span className="text-white font-bold text-2xl tracking-widest uppercase">oa</span>
      </header>
      <div className="relative z-20 h-full">
        {children}
      </div>
    </div>
  )
}