"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import type { BeamData, Support } from "@/types/beam-types"

interface SupportFormProps {
  beamData: BeamData
  setBeamData: (data: BeamData) => void
}

export default function SupportForm({ beamData, setBeamData }: SupportFormProps) {
  const [position, setPosition] = useState<string>("")
  const [supportType, setSupportType] = useState<"roller" | "pin" | "fixed">("roller")
  const [location, setLocation] = useState<"L" | "M" | "R">("M")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (typeof setBeamData !== "function") {
      console.error("setBeamData is not a function", setBeamData)
      return
    }

    const newSupport: Support = {
      id: (beamData.supports?.length || 0) + 1,
      type: supportType,
      position: Number.parseFloat(position) || 0,
      location: location,
    }

    setBeamData({
      ...beamData,
      supports: [...(beamData.supports || []), newSupport],
    })

    // Reset form
    setPosition("")
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <button className="text-gray-600 hover:text-gray-900 flex items-center">
          <ArrowLeft size={16} className="mr-1" /> Back
        </button>
      </div>

      <h2 className="text-xl font-medium mb-6">Support ID: {(beamData.supports?.length || 0) + 1}</h2>

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
          <label className="block text-gray-600 mb-2">Support Type:</label>
          <div className="grid grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setSupportType("roller")}
              className={`p-4 border-2 rounded-lg flex items-center justify-center h-16 ${
                supportType === "roller" ? "border-blue-500" : "border-gray-200"
              }`}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" className="h-8 w-8">
                <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
                <line x1="6" y1="18" x2="18" y2="18" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setSupportType("pin")}
              className={`p-4 border-2 rounded-lg flex items-center justify-center h-16 ${
                supportType === "pin" ? "border-blue-500" : "border-gray-200"
              }`}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" className="h-8 w-8">
                <polygon points="12,6 6,18 18,18" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setSupportType("fixed")}
              className={`p-4 border-2 rounded-lg flex items-center justify-center h-16 ${
                supportType === "fixed" ? "border-blue-500" : "border-gray-200"
              }`}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" className="h-8 w-8">
                <rect x="6" y="6" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" />
                <line x1="3" y1="6" x2="3" y2="18" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
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

