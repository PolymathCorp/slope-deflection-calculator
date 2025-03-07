"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import NavigationMenu from "./navigation-menu"
import ResultsPanel from "./results-panel"
import InputPanel from "./input-panel"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

// Define types for our calculation data
export type BeamData = {
  length: number
  supports: Support[]
  sections: Section[]
  settlements: Settlement[]
  pointLoads: PointLoad[]
  distributedLoads: DistributedLoad[]
  moments: Moment[]
}

export type Support = {
  id: number
  type: "roller" | "pin" | "fixed"
  position: number
  location: "L" | "M" | "R"
  settlement?: number
}

export type Section = {
  id: number
  spanId: number
  momentOfInertia: number // Iz
  youngsModulus: number // E
  coefficientEIz?: number
}

export type Settlement = {
  id: number
  supportId: number
  value: number // in mm
}

export type PointLoad = {
  id: number
  position: number
  magnitude: number // in kN
  location: "L" | "M" | "R"
}

export type DistributedLoad = {
  id: number
  startPosition: number
  endPosition: number
  startMagnitude: number // in kN/m
  endMagnitude: number // in kN/m
  startLocation: "L" | "R"
  endLocation: "L" | "R"
}

export type Moment = {
  id: number
  position: number
  magnitude: number // in kN·m
}

export default function CalculatorLayout() {
  const searchParams = useSearchParams()
  const calculationType = searchParams.get("type") || "beams"

  const [activeSection, setActiveSection] = useState<string>("beam")
  const [activeInput, setActiveInput] = useState<string | null>(null)
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
    // Implement solving logic here
    console.log("Solving with data:", beamData)
    // In a real application, this would perform calculations and update results
  }

  const handleReset = () => {
    // Reset calculation data
    setBeamData({
      length: 0,
      supports: [],
      sections: [],
      settlements: [],
      pointLoads: [],
      distributedLoads: [],
      moments: [],
    })
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">Slope Deflection Calculator</h1>
        <Link
          href={`/calculator?type=${calculationType === "beams" ? "frames" : "beams"}`}
          className="bg-[#1a2332] text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          Frames <ArrowRight size={16} />
        </Link>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel - Navigation */}
        <NavigationMenu
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          setActiveInput={setActiveInput}
        />

        {/* Middle panel - Results */}
        <ResultsPanel beamData={beamData} onSolve={handleSolve} onReset={handleReset} />

        {/* Right panel - Input forms */}
        <InputPanel
          activeInput={activeInput}
          setActiveInput={setActiveInput}
          beamData={beamData}
          setBeamData={setBeamData}
        />
      </div>
    </div>
  )
}

