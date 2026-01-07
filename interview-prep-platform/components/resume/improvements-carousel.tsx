"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Copy, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface BulletRewrite {
  original: string
  improved: string
  reason: string
}

interface ImprovementsCarouselProps {
  bullets: BulletRewrite[]
}

export function ImprovementsCarousel({ bullets }: ImprovementsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const current = bullets[currentIndex]

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <span className="w-8 h-8 bg-emerald-600/20 text-emerald-400 rounded-full flex items-center justify-center text-sm font-bold">
            ✨
          </span>
          Suggested Improvements
        </h3>
        <p className="text-sm text-muted-foreground">
          {currentIndex + 1} / {bullets.length}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <Card className="overflow-hidden border-border/50 bg-gradient-to-br from-background to-emerald-600/5">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Original */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Original Bullet
                  </p>
                  <div className="bg-muted/40 border-l-4 border-muted rounded-lg p-4">
                    <p className="text-foreground italic">{`"${current.original}"`}</p>
                  </div>
                </div>

                {/* Improved */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">Improved Bullet</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(current.improved, currentIndex)}
                      className="h-7 px-2 text-xs"
                    >
                      {copiedIndex === currentIndex ? (
                        <>
                          <Check className="w-3 h-3 mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="bg-emerald-600/20 border border-emerald-600/30 rounded-lg p-4">
                    <p className="text-foreground font-medium">{`"${current.improved}"`}</p>
                  </div>
                </div>

                {/* Reason */}
                <div className="bg-indigo-600/10 border border-indigo-600/20 rounded-lg p-4">
                  <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">
                    Why this improvement
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{current.reason}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="flex gap-2">
          {bullets.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-primary w-8" : "bg-border w-2 hover:bg-primary/50"
              }`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentIndex(Math.min(bullets.length - 1, currentIndex + 1))}
          disabled={currentIndex === bullets.length - 1}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
