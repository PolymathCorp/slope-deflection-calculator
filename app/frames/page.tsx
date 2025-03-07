"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import FrameCalculator from "@/components/frame-calculator"
import FrameSolveView from "@/components/frame-solve-view"
import type { FrameData } from "@/types/frame-types"

export default function FramesPage() {
  const [showSolve, setShowSolve] = useState(false)
  const [frameData, setFrameData] = useState<FrameData>({
    nodes: [],
    members: [],
    supports: [],
    pointLoads: [],
    moments: [],
    distributedLoads: [],
  })

  const handleSolve = () => {
    setShowSolve(true)
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">Slope Deflection Calculator</h1>
        <Link href="/beams" className="bg-[#1a2332] text-white px-4 py-2 rounded-md flex items-center gap-2">
          Beams <ArrowLeft size={16} />
        </Link>
      </header>

      {/* Main content */}
      {showSolve ? (
        <FrameSolveView frameData={frameData} onBack={() => setShowSolve(false)} />
      ) : (
        <FrameCalculator onSolve={handleSolve} frameData={frameData} setFrameData={setFrameData} />
      )}
    </div>
  )
}

