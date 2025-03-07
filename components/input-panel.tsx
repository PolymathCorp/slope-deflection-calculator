"use client"
import { ArrowLeft } from "lucide-react"
import type { BeamData } from "./calculator-layout"
import BeamForm from "./forms/beam-form"
import SupportForm from "./forms/support-form"
import SectionForm from "./forms/section-form"
import SettlementForm from "./forms/settlement-form"
import PointLoadForm from "./forms/point-load-form"
import DistributedLoadForm from "./forms/distributed-load-form"
import MomentForm from "./forms/moment-form"

interface InputPanelProps {
  activeInput: string | null
  setActiveInput: (input: string | null) => void
  beamData: BeamData
  setBeamData: (data: BeamData) => void
}

export default function InputPanel({ activeInput, setActiveInput, beamData, setBeamData }: InputPanelProps) {
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
  )
}

