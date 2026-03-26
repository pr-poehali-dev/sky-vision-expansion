import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { SectionProps } from "@/types"

export default function Section({ id, title, subtitle, content, isActive, showButton, buttonText, courses, onButtonClick }: SectionProps) {
  const visible = { opacity: 1, y: 0 }
  const hidden = { opacity: 0, y: 30 }

  return (
    <section id={id} className="relative h-screen w-full snap-start flex flex-col justify-center p-8 md:p-16 lg:p-24 overflow-hidden">
      {subtitle && (
        <motion.div
          className="mb-8"
          initial={hidden}
          animate={isActive ? visible : hidden}
          transition={{ duration: 0.5 }}
        >
          {subtitle}
        </motion.div>
      )}
      <motion.h2
        className="text-4xl md:text-6xl lg:text-[5rem] xl:text-[6rem] font-bold leading-[1.1] tracking-tight max-w-4xl text-white"
        initial={hidden}
        animate={isActive ? visible : hidden}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        {title}
      </motion.h2>
      {content && (
        <motion.p
          className="text-lg md:text-xl max-w-2xl mt-4 text-neutral-400"
          initial={hidden}
          animate={isActive ? visible : hidden}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {content}
        </motion.p>
      )}
      {courses && (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 max-w-5xl"
          initial={hidden}
          animate={isActive ? visible : hidden}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          {courses.map((course, i) => (
            <motion.div
              key={course.title}
              className="border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm rounded-xl p-4 flex flex-col gap-2 hover:border-neutral-600 transition-colors group"
              initial={hidden}
              animate={isActive ? visible : hidden}
              transition={{ duration: 0.4, delay: 0.25 + i * 0.07 }}
            >
              <Badge variant="outline" className="text-[#FF4D00] border-[#FF4D00] w-fit text-xs">
                {course.tag}
              </Badge>
              <p className="text-white font-semibold text-sm leading-snug">{course.title}</p>
              <p className="text-neutral-500 text-xs leading-relaxed flex-1">{course.description}</p>
              <button
                onClick={onButtonClick}
                className="mt-1 text-xs text-[#FF4D00] border border-[#FF4D00] rounded-lg py-1.5 px-3 hover:bg-[#FF4D00] hover:text-black transition-colors w-full"
              >
                Записаться
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
      {showButton && (
        <motion.div
          initial={hidden}
          animate={isActive ? visible : hidden}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-8"
        >
          <Button
            variant="outline"
            size="lg"
            className="text-[#FF4D00] bg-transparent border-[#FF4D00] hover:bg-[#FF4D00] hover:text-black transition-colors"
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        </motion.div>
      )}
    </section>
  )
}