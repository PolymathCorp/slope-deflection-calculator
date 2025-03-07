"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import BeamCalculator from "@/components/beam-calculator"
import BeamSolveView from "@/components/beam-solve-view"
import type { BeamData } from "@/types/beam-types"

export default function BeamsPage() {
  const [showSolve, setShowSolve] = useState(false)
  const [beamData, setBeamData] = useState<BeamData>({
    length: 0,
    supports: [],
    sections: [],
    settlements: [],
    pointLoads: [],
    distributedLoads: [],
    moments: [],
  })

  const handleSolve = () => {
    setShowSolve(true)
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">Slope Deflection Calculator</h1>
        <Link href="/frames" className="bg-[#1a2332] text-white px-4 py-2 rounded-md flex items-center gap-2">
          Frames <ArrowRight size={16} />
        </Link>
      </header>

      {/* Main content */}
      {showSolve ? (
        <BeamSolveView beamData={beamData} onBack={() => setShowSolve(false)} />
      ) : (
        <BeamCalculator onSolve={handleSolve} beamData={beamData} setBeamData={setBeamData} />
      )}
    </div>
  )
}

