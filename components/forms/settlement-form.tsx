"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import type { BeamData, Settlement } from "@/app/calculator/page"

interface SettlementFormProps {
  beamData: BeamData
  setBeamData: (data: BeamData) => void
}

export default function SettlementForm({ beamData, setBeamData }: SettlementFormProps) {
  const [value, setValue] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Ensure setBeamData is a function
    if (typeof setBeamData !== "function") {
      console.error("setBeamData is not a function", setBeamData)
      return
    }

    const newSettlement: Settlement = {
      id: (beamData?.settlements?.length || 0) + 1,
      supportId: (beamData?.settlements?.length || 0) + 1,
      value: Number.parseFloat(value) || 0,
    }

    setBeamData({
      ...beamData,
      settlements: [...(beamData?.settlements || []), newSettlement],
    })

    // Reset form
    setValue("")
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <button className="text-gray-600 hover:text-gray-900 flex items-center">
          <ArrowLeft size={16} className="mr-1" /> Back
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-6">For Support: {(beamData?.settlements?.length || 0) + 1}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-600 mb-2">Settlement:</label>
          <div className="relative">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full p-2 pr-12 border rounded-md"
              placeholder="Enter settlement"
              required
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">mm</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md transition-colors"
        >
          Add
        </button>
      </form>
    </div>
  )
}

