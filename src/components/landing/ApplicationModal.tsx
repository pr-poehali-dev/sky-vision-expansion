import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Icon from '@/components/ui/icon'

const API_URL = 'https://functions.poehali.dev/774f357a-bf4a-4554-85fc-989a0c17ec8b'

interface ApplicationModalProps {
  open: boolean
  onClose: () => void
}

export default function ApplicationModal({ open, onClose }: ApplicationModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })
      if (res.ok) {
        setStatus('success')
        setName('')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const handleClose = () => {
    setStatus('idle')
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            className="relative z-10 w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
            >
              <Icon name="X" size={20} />
            </button>

            {status === 'success' ? (
              <div className="flex flex-col items-center text-center py-6 gap-4">
                <div className="w-14 h-14 rounded-full bg-[#FF4D00]/10 flex items-center justify-center">
                  <Icon name="Check" size={28} className="text-[#FF4D00]" />
                </div>
                <h3 className="text-2xl font-bold text-white">Заявка отправлена!</h3>
                <p className="text-neutral-400">Мы свяжемся с вами в ближайшее время.</p>
                <Button
                  onClick={handleClose}
                  className="mt-2 bg-[#FF4D00] text-black hover:bg-[#FF4D00]/90"
                >
                  Закрыть
                </Button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-white mb-1">Оставить заявку</h3>
                <p className="text-neutral-400 text-sm mb-6">Заполните форму, и мы свяжемся с вами.</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name" className="text-neutral-300">Имя</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Ваше имя"
                      required
                      className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-[#FF4D00]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email" className="text-neutral-300">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-[#FF4D00]"
                    />
                  </div>
                  {status === 'error' && (
                    <p className="text-red-400 text-sm">Что-то пошло не так. Попробуйте ещё раз.</p>
                  )}
                  <Button
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-[#FF4D00] text-black hover:bg-[#FF4D00]/90 font-semibold"
                  >
                    {status === 'loading' ? 'Отправляем...' : 'Отправить заявку'}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
