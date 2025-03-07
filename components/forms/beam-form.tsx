"use client"

import type React from "react"

import { useState } from "react"
import type { BeamData } from "../calculator-layout"

interface BeamFormProps {
  beamData: BeamData
  setBeamData: (data: BeamData) => void
}

export default function BeamForm({ beamData, setBeamData }: BeamFormProps) {
  const [length, setLength] = useState<string>(beamData.length.toString())

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setBeamData({
      ...beamData,
      length: Number.parseFloat(length) || 0,
    })
  }

  return (
    <div>
      <h2 className="text-xl font-medium mb-6">Beam Length</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="relative">
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full p-3 pr-12 border border-gray-300 rounded-md"
              placeholder="Enter length"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">m</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-3 rounded-md transition-colors"
        >
          Add
        </button>
      </form>
    </div>
  )
}

