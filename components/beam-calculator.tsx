"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import BeamForm from "./forms/beam/beam-form"
import SupportForm from "./forms/beam/support-form"
import SectionForm from "./forms/beam/section-form"
import SettlementForm from "./forms/beam/settlement-form"
import PointLoadForm from "./forms/beam/point-load-form"
import DistributedLoadForm from "./forms/beam/distributed-load-form"
import MomentForm from "./forms/beam/moment-form"
import type { BeamData } from "@/types/beam-types"

interface BeamCalculatorProps {
  onSolve: () => void
  beamData: BeamData
  setBeamData: (data: BeamData) => void
}

export default function BeamCalculator({ onSolve, beamData, setBeamData }: BeamCalculatorProps) {
  const [activeSection, setActiveSection] = useState<string>("beam")
  const [activeInput, setActiveInput] = useState<string | null>("beam")

  const handleSolve = () => {
    // Check if we have the minimum required data
    if (beamData.length === 0) {
      alert("Please add beam length before solving.")
      return
    }

    if (beamData.supports.length === 0) {
      alert("Please add at least one support before solving.")
      return
    }

    onSolve()
  }

  const handleReset = () => {
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

  const renderForm = () => {
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
      case "distributedLoad":
        return <DistributedLoadForm beamData={beamData} setBeamData={setBeamData} />
      case "moment":
        return <MomentForm beamData={beamData} setBeamData={setBeamData} />
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select an option from the left menu</p>
          </div>
        )
    }
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left panel - Navigation */}
      <div className="w-[350px] bg-[#1a2332] text-white p-6 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-gray-400 mb-2">Model</h2>
          <nav className="flex flex-col gap-3">
            <button
              className={`py-3 px-4 rounded-md text-center border border-gray-600 transition-colors ${
                activeSection === "beam" ? "bg-[#2563eb] border-[#2563eb]" : "hover:bg-gray-700"
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
                activeSection === "supports" ? "bg-[#2563eb] border-[#2563eb]" : "hover:bg-gray-700"
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
                activeSection === "sections" ? "bg-[#2563eb] border-[#2563eb]" : "hover:bg-gray-700"
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
                activeSection === "settlement" ? "bg-[#2563eb] border-[#2563eb]" : "hover:bg-gray-700"
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
                activeSection === "pointLoads" ? "bg-[#2563eb] border-[#2563eb]" : "hover:bg-gray-700"
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
                activeSection === "moments" ? "bg-[#2563eb] border-[#2563eb]" : "hover:bg-gray-700"
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
                activeSection === "distributedLoads" ? "bg-[#2563eb] border-[#2563eb]" : "hover:bg-gray-700"
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

        <div className="space-y-6">
          <div>
            <h3 className="text-gray-500 font-mono mb-2">&gt;&gt; BEAM LENGTH:</h3>
            {beamData.length > 0 && <p className="font-mono">{beamData.length}m</p>}
          </div>

          {beamData.supports.length > 0 && (
            <div>
              <h3 className="text-gray-500 font-mono mb-2">&gt;&gt; SUPPORTS:</h3>
              {beamData.supports.map((support) => (
                <p key={support.id} className="font-mono">
                  SUPPORT {support.id}: {support.type.toUpperCase()} AT {support.position}M ({support.location})
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
                  {section.coefficientEIz && `, EIz=${section.coefficientEIz}`}
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
                  POINT LOAD {load.magnitude}KN AT {load.position}M ({load.location})
                </p>
              ))}
            </div>
          )}

          {beamData.distributedLoads.length > 0 && (
            <div>
              <h3 className="text-gray-500 font-mono mb-2">&gt;&gt; DISTRIBUTED LOADS:</h3>
              {beamData.distributedLoads.map((load) => (
                <p key={load.id} className="font-mono">
                  DISTRIBUTED LOAD {load.id}: {load.startMagnitude}KN/m TO {load.endMagnitude}KN/m FROM{" "}
                  {load.startPosition}M ({load.startLocation}) TO {load.endPosition}M ({load.endLocation})
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
      <div className="w-[350px] bg-gray-50 p-6 overflow-y-auto">
        {activeInput && (
          <button
            onClick={() => setActiveInput(null)}
            className="flex items-center text-gray-600 mb-6 hover:text-gray-900"
          >
            <ArrowLeft size={16} className="mr-1" /> Back
          </button>
        )}

        {renderForm()}
      </div>
    </div>
  )
}

