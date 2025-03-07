"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import type { BeamData, DistributedLoad } from "@/types/beam-types"

interface DistributedLoadFormProps {
  beamData: BeamData
  setBeamData: (data: BeamData) => void
}

export default function DistributedLoadForm({ beamData, setBeamData }: DistributedLoadFormProps) {
  const [startPosition, setStartPosition] = useState<string>("")
  const [endPosition, setEndPosition] = useState<string>("")
  const [startMagnitude, setStartMagnitude] = useState<string>("")
  const [endMagnitude, setEndMagnitude] = useState<string>("")
  const [startLocation, setStartLocation] = useState<"L" | "R">("L")
  const [endLocation, setEndLocation] = useState<"L" | "R">("R")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (typeof setBeamData !== "function") {
      console.error("setBeamData is not a function", setBeamData)
      return
    }

    const newDistLoad: DistributedLoad = {
      id: (beamData.distributedLoads?.length || 0) + 1,
      startPosition: Number.parseFloat(startPosition) || 0,
      endPosition: Number.parseFloat(endPosition) || 0,
      startMagnitude: Number.parseFloat(startMagnitude) || 0,
      endMagnitude: Number.parseFloat(endMagnitude) || 0,
      startLocation: startLocation,
      endLocation: endLocation,
    }

    setBeamData({
      ...beamData,
      distributedLoads: [...(beamData.distributedLoads || []), newDistLoad],
    })

    // Reset form
    setStartPosition("")
    setEndPosition("")
    setStartMagnitude("")
    setEndMagnitude("")
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <button className="text-gray-600 hover:text-gray-900 flex items-center">
          <ArrowLeft size={16} className="mr-1" /> Back
        </button>
      </div>

      <h2 className="text-xl font-medium mb-6">Distributed Load ID: {(beamData.distributedLoads?.length || 0) + 1}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-600 mb-2">Start Position:</label>
          <div className="relative">
            <input
              type="number"
              value={startPosition}
              onChange={(e) => setStartPosition(e.target.value)}
              className="w-full p-3 pr-12 border border-gray-200 rounded-lg bg-white"
              placeholder="Enter start position"
              required
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">m</span>
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Start Location:</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setStartLocation("L")}
              className={`p-2 border-2 rounded-lg flex items-center justify-center ${
                startLocation === "L" ? "border-blue-500 bg-blue-50" : "border-gray-200"
              }`}
            >
              Left
            </button>
            <button
              type="button"
              onClick={() => setStartLocation("R")}
              className={`p-2 border-2 rounded-lg flex items-center justify-center ${
                startLocation === "R" ? "border-blue-500 bg-blue-50" : "border-gray-200"
              }`}
            >
              Right
            </button>
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Start Magnitude:</label>
          <div className="relative">
            <input
              type="number"
              value={startMagnitude}
              onChange={(e) => setStartMagnitude(e.target.value)}
              className="w-full p-3 pr-12 border border-gray-200 rounded-lg bg-white"
              placeholder="Enter start magnitude"
              required
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">kN/m</span>
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">End Position:</label>
          <div className="relative">
            <input
              type="number"
              value={endPosition}
              onChange={(e) => setEndPosition(e.target.value)}
              className="w-full p-3 pr-12 border border-gray-200 rounded-lg bg-white"
              placeholder="Enter end position"
              required
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">m</span>
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">End Location:</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setEndLocation("L")}
              className={`p-2 border-2 rounded-lg flex items-center justify-center ${
                endLocation === "L" ? "border-blue-500 bg-blue-50" : "border-gray-200"
              }`}
            >
              Left
            </button>
            <button
              type="button"
              onClick={() => setEndLocation("R")}
              className={`p-2 border-2 rounded-lg flex items-center justify-center ${
                endLocation === "R" ? "border-blue-500 bg-blue-50" : "border-gray-200"
              }`}
            >
              Right
            </button>
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">End Magnitude:</label>
          <div className="relative">
            <input
              type="number"
              value={endMagnitude}
              onChange={(e) => setEndMagnitude(e.target.value)}
              className="w-full p-3 pr-12 border border-gray-200 rounded-lg bg-white"
              placeholder="Enter end magnitude"
              required
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">kN/m</span>
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

