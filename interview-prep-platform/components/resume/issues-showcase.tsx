"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, ChevronDown, Lightbulb } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Issue {
  issue: string
  why_it_matters: string
  suggestion: string
}

interface IssuesShowcaseProps {
  issues: Issue[]
}

export const IssuesShowcase = ({ issues }: IssuesShowcaseProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <AlertCircle className="w-6 h-6 text-rose-500" />
        <h3 className="text-2xl font-bold text-foreground">Key Areas for Improvement</h3>
        <span className="ml-auto bg-rose-600/20 text-rose-300 px-3 py-1 rounded-full text-sm font-semibold">
          {issues.length} issues
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {issues.map((issue, index) => (
          <Card
            key={index}
            className="overflow-hidden border-border/50 hover:border-rose-600/50 transition-all cursor-pointer group bg-gradient-to-br from-background to-rose-600/5"
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
          >
            <CardContent className="p-6">
              <button className="w-full text-left">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-sm leading-tight group-hover:text-rose-400 transition-colors">
                      {issue.issue}
                    </h4>
                  </div>
                  <motion.div animate={{ rotate: expandedIndex === index ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 space-y-3 pt-4 border-t border-border/50"
                  >
                    <div>
                      <p className="text-xs font-semibold text-rose-500/80 uppercase tracking-wider mb-2">
                        Why it matters
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{issue.why_it_matters}</p>
                    </div>
                    <div className="bg-indigo-600/20 border border-indigo-600/30 rounded-lg p-4">
                      <div className="flex gap-2 items-start">
                        <Lightbulb className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-foreground leading-relaxed">{issue.suggestion}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
