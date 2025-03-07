"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import type { BeamData, Settlement } from "@/types/beam-types"

interface SettlementFormProps {
  beamData: BeamData
  setBeamData: (data: BeamData) => void
}

export default function SettlementForm({ beamData, setBeamData }: SettlementFormProps) {
  const [supportId, setSupportId] = useState<string>("")
  const [value, setValue] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (typeof setBeamData !== "function") {
      console.error("setBeamData is not a function", setBeamData)
      return
    }

    const newSettlement: Settlement = {
      id: (beamData.settlements?.length || 0) + 1,
      supportId: Number.parseInt(supportId) || 1,
      value: Number.parseFloat(value) || 0,
    }

    setBeamData({
      ...beamData,
      settlements: [...(beamData.settlements || []), newSettlement],
    })

    // Reset form
    setSupportId("")
    setValue("")
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <button className="text-gray-600 hover:text-gray-900 flex items-center">
          <ArrowLeft size={16} className="mr-1" /> Back
        </button>
      </div>

      <h2 className="text-xl font-medium mb-6">Settlement ID: {(beamData.settlements?.length || 0) + 1}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-600 mb-2">Support ID:</label>
          <select
            value={supportId}
            onChange={(e) => setSupportId(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg bg-white appearance-none"
            required
          >
            <option value="">Select Support</option>
            {beamData.supports.map((support) => (
              <option key={support.id} value={support.id}>
                Support {support.id}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Settlement Value:</label>
          <div className="relative">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full p-3 pr-12 border border-gray-200 rounded-lg bg-white"
              placeholder="Enter settlement value"
              required
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">mm</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
        >
          Add
        </button>
      </form>
    </div>
  )
}

