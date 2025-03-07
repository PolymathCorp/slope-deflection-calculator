"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import BeamForm from "@/components/forms/beam-form"
import SupportForm from "@/components/forms/support-form"
import SectionForm from "@/components/forms/section-form"
import SettlementForm from "@/components/forms/settlement-form"
import PointLoadForm from "@/components/forms/point-load-form"
import DistributedLoadForm from "@/components/forms/distributed-load-form"
import MomentForm from "@/components/forms/moment-form"

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

export default function CalculatorPage() {
  const [activeSection, setActiveSection] = useState("beam")
  const [activeInput, setActiveInput] = useState<string | null>("beam")
  const [beamData, setBeamData] = useState<BeamData>({
    length: 0,
    supports: [],
    sections: [],
    settlements: [],
    pointLoads: [],
    distributedLoads: [],
    moments: [],
  })
  const [showSolveResults, setShowSolveResults] = useState(false)

  const handleSolve = () => {
    // Check if we have the minimum required data
    if (beamData.length === 0 || beamData.supports.length === 0) {
      alert("Please add beam length and at least one support before solving.")
      return
    }

    // In a real application, this would perform calculations
    console.log("Solving with data:", beamData)

    // Show solve results
    setShowSolveResults(true)
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
    setShowSolveResults(false)
  }

  // Function to render the appropriate form component
  const renderFormComponent = () => {
    switch (activeInput) {
      case "beam":
        return <BeamForm beamData={beamData} setBeamData={setBeamData} />
      case "support":
        return <SupportForm beamData={beamData} setBeamData={setBeamData} />
      case "section":
        return <SectionForm beamData={beamData} setBeamData={setBeamData} />
      case "settlement":
        return <SettlementForm beamData={beamData} setBeamData={setBeamData} />
      case "pointLoad":
        return <PointLoadForm beamData={beamData} setBeamData={setBeamData} />
      case "moment":
        return <MomentForm beamData={beamData} setBeamData={setBeamData} />
      case "distributedLoad":
        return <DistributedLoadForm beamData={beamData} setBeamData={setBeamData} />
      default:
        return null
    }
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
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel - Navigation */}
        <div className="w-[350px] bg-[#1a2332] text-white p-6 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-gray-400 mb-2">Model</h2>
            <nav className="flex flex-col gap-3">
              <button
                className={`py-3 px-4 rounded-md text-center border border-gray-600 transition-colors ${
                  activeSection === "beam" ? "bg-[#2563eb] border-[#2563eb] text-white" : "hover:bg-gray-700"
                }`}
                onClick={() => {
                  setActiveSection("beam")
                  setActiveInput("beam")
                }}
              >
                Beam
              </button>
              <button
                className={`py-3 px-4 rounded-md text-center border border-gray-600 transition-colors ${
                  activeSection === "supports" ? "bg-[#2563eb] border-[#2563eb] text-white" : "hover:bg-gray-700"
                }`}
                onClick={() => {
                  setActiveSection("supports")
                  setActiveInput("support")
                }}
              >
                Supports
              </button>
              <button
                className={`py-3 px-4 rounded-md text-center border border-gray-600 transition-colors ${
                  activeSection === "sections" ? "bg-[#2563eb] border-[#2563eb] text-white" : "hover:bg-gray-700"
                }`}
                onClick={() => {
                  setActiveSection("sections")
                  setActiveInput("section")
                }}
              >
                Sections
              </button>
              <button
                className={`py-3 px-4 rounded-md text-center border border-gray-600 transition-colors ${
                  activeSection === "settlement" ? "bg-[#2563eb] border-[#2563eb] text-white" : "hover:bg-gray-700"
                }`}
                onClick={() => {
                  setActiveSection("settlement")
                  setActiveInput("settlement")
                }}
              >
                Settlement
              </button>
            </nav>
          </div>

          <div>
            <h2 className="text-gray-400 mb-2">Loads</h2>
            <nav className="flex flex-col gap-3">
              <button
                className={`py-3 px-4 rounded-md text-center border border-gray-600 transition-colors ${
                  activeSection === "pointLoads" ? "bg-[#2563eb] border-[#2563eb] text-white" : "hover:bg-gray-700"
                }`}
                onClick={() => {
                  setActiveSection("pointLoads")
                  setActiveInput("pointLoad")
                }}
              >
                Point Loads
              </button>
              <button
                className={`py-3 px-4 rounded-md text-center border border-gray-600 transition-colors ${
                  activeSection === "moments" ? "bg-[#2563eb] border-[#2563eb] text-white" : "hover:bg-gray-700"
                }`}
                onClick={() => {
                  setActiveSection("moments")
                  setActiveInput("moment")
                }}
              >
                Moments
              </button>
              <button
                className={`py-3 px-4 rounded-md text-center border border-gray-600 transition-colors ${
                  activeSection === "distributedLoads"
                    ? "bg-[#2563eb] border-[#2563eb] text-white"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => {
                  setActiveSection("distributedLoads")
                  setActiveInput("distributedLoad")
                }}
              >
                Distributed Loads
              </button>
            </nav>
          </div>
        </div>

        {/* Middle panel - Results */}
        <div className="flex-1 bg-white p-6 overflow-y-auto border-l border-r border-gray-200">
          <div className="flex justify-end mb-6 gap-2">
            <button
              onClick={handleSolve}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md transition-colors"
            >
              Solve
            </button>
            <button
              onClick={handleReset}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors"
            >
              Reset
            </button>
          </div>

          {showSolveResults && (
            <div className="font-mono whitespace-pre-wrap mb-6">
              <h3>&gt;&gt; SOLUTION:</h3>
              <p>Fixed End Moments:</p>
              <p>M12 = {(Math.random() * 10).toFixed(2)}kNm</p>
              <p>M21 = {(Math.random() * 10).toFixed(2)}kNm</p>
              <p>Member End Moments:</p>
              <p>M12 = {(Math.random() * 15).toFixed(2)}kNm</p>
              <p>M21 = {(Math.random() * 15).toFixed(2)}kNm</p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <h3 className="text-gray-500 font-mono mb-2">&gt;&gt; BEAM LENGTH:</h3>
              {beamData.length > 0 && <p className="font-mono">{beamData.length}m</p>}
            </div>

            {beamData.supports.length > 0 && (
              <div>
                <h3 className="text-gray-500 font-mono mb-2">&gt;&gt; SUPPORT:</h3>
                {beamData.supports.map((support) => (
                  <p key={support.id} className="font-mono">
                    SUPPORT {support.id}: {support.type.toUpperCase()} AT {support.position}M
                  </p>
                ))}
              </div>
            )}

            {beamData.sections.length > 0 && (
              <div>
                <h3 className="text-gray-500 font-mono mb-2">&gt;&gt; SECTIONS:</h3>
                {beamData.sections.map((section) => (
                  <p key={section.id} className="font-mono">
                    SECTION {section.id}: SPAN {section.spanId}, E={section.youngsModulus} MPa, I=
                    {section.momentOfInertia} mm⁴
                  </p>
                ))}
              </div>
            )}

            {beamData.settlements.length > 0 && (
              <div>
                <h3 className="text-gray-500 font-mono mb-2">&gt;&gt; SETTLEMENTS:</h3>
                {beamData.settlements.map((settlement) => (
                  <p key={settlement.id} className="font-mono">
                    SETTLEMENT AT SUPPORT {settlement.supportId}: {settlement.value}mm
                  </p>
                ))}
              </div>
            )}

            {beamData.pointLoads.length > 0 && (
              <div>
                <h3 className="text-gray-500 font-mono mb-2">&gt;&gt; POINT LOADS:</h3>
                {beamData.pointLoads.map((load) => (
                  <p key={load.id} className="font-mono">
                    POINT LOAD {load.magnitude}KN AT {load.position}M
                  </p>
                ))}
              </div>
            )}

            {beamData.distributedLoads.length > 0 && (
              <div>
                <h3 className="text-gray-500 font-mono mb-2">&gt;&gt; DISTRIBUTED LOADS:</h3>
                {beamData.distributedLoads.map((load) => (
                  <p key={load.id} className="font-mono">
                    DISTRIBUTED LOAD {load.id}: {load.startMagnitude}KN TO {load.endMagnitude}KN FROM{" "}
                    {load.startPosition}M TO {load.endPosition}M
                  </p>
                ))}
              </div>
            )}

            {beamData.moments.length > 0 && (
              <div>
                <h3 className="text-gray-500 font-mono mb-2">&gt;&gt; MOMENTS:</h3>
                {beamData.moments.map((moment) => (
                  <p key={moment.id} className="font-mono">
                    MOMENT {moment.magnitude}KNM AT {moment.position}M
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right panel - Input forms */}
        <div className="w-[350px] bg-gray-50 p-6 overflow-y-auto">{renderFormComponent()}</div>
      </div>
    </div>
  )
}

