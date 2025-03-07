"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import type { BeamData, PointLoad } from "@/types/beam-types"

interface PointLoadFormProps {
  beamData: BeamData
  setBeamData: (data: BeamData) => void
}

export default function PointLoadForm({ beamData, setBeamData }: PointLoadFormProps) {
  const [position, setPosition] = useState<string>("")
  const [magnitude, setMagnitude] = useState<string>("")
  const [location, setLocation] = useState<"L" | "M" | "R">("M")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (typeof setBeamData !== "function") {
      console.error("setBeamData is not a function", setBeamData)
      return
    }

    const newPointLoad: PointLoad = {
      id: (beamData.pointLoads?.length || 0) + 1,
      position: Number.parseFloat(position) || 0,
      magnitude: Number.parseFloat(magnitude) || 0,
      location: location,
    }

    setBeamData({
      ...beamData,
      pointLoads: [...(beamData.pointLoads || []), newPointLoad],
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

      <h2 className="text-xl font-medium mb-6">Point Load ID: {(beamData.pointLoads?.length || 0) + 1}</h2>

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
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">kN</span>
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Location:</label>
          <div className="grid grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setLocation("L")}
              className={`p-2 border-2 rounded-lg flex items-center justify-center ${
                location === "L" ? "border-blue-500 bg-blue-50" : "border-gray-200"
              }`}
            >
              Left
            </button>
            <button
              type="button"
              onClick={() => setLocation("M")}
              className={`p-2 border-2 rounded-lg flex items-center justify-center ${
                location === "M" ? "border-blue-500 bg-blue-50" : "border-gray-200"
              }`}
            >
              Middle
            </button>
            <button
              type="button"
              onClick={() => setLocation("R")}
              className={`p-2 border-2 rounded-lg flex items-center justify-center ${
                location === "R" ? "border-blue-500 bg-blue-50" : "border-gray-200"
              }`}
            >
              Right
            </button>
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

