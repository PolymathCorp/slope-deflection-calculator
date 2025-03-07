"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import type { BeamData, Moment } from "@/types/beam-types"

interface MomentFormProps {
  beamData: BeamData
  setBeamData: (data: BeamData) => void
}

export default function MomentForm({ beamData, setBeamData }: MomentFormProps) {
  const [position, setPosition] = useState<string>("")
  const [magnitude, setMagnitude] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (typeof setBeamData !== "function") {
      console.error("setBeamData is not a function", setBeamData)
      return
    }

    const newMoment: Moment = {
      id: (beamData.moments?.length || 0) + 1,
      position: Number.parseFloat(position) || 0,
      magnitude: Number.parseFloat(magnitude) || 0,
    }

    setBeamData({
      ...beamData,
      moments: [...(beamData.moments || []), newMoment],
    })

    // Reset form
    setPosition("")
    setMagnitude("")
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <button className="text-gray-600 hover:text-gray-900 flex items-center">
          <ArrowLeft size={16} className="mr-1" /> Back
        </button>
      </div>

      <h2 className="text-xl font-medium mb-6">Moment ID: {(beamData.moments?.length || 0) + 1}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-600 mb-2">Position:</label>
          <div className="relative">
            <input
              type="number"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full p-3 pr-12 border border-gray-200 rounded-lg bg-white"
              placeholder="Enter position"
              required
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">m</span>
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Magnitude:</label>
          <div className="relative">
            <input
              type="number"
              value={magnitude}
              onChange={(e) => setMagnitude(e.target.value)}
              className="w-full p-3 pr-12 border border-gray-200 rounded-lg bg-white"
              placeholder="Enter magnitude"
              required
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">kN·m</span>
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

