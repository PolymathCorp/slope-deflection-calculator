"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import type { BeamData, Section } from "@/types/beam-types"

interface SectionFormProps {
  beamData: BeamData
  setBeamData: (data: BeamData) => void
}

export default function SectionForm({ beamData, setBeamData }: SectionFormProps) {
  const [momentOfInertia, setMomentOfInertia] = useState<string>("")
  const [youngsModulus, setYoungsModulus] = useState<string>("")
  const [coefficientEIz, setCoefficientEIz] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (typeof setBeamData !== "function") {
      console.error("setBeamData is not a function", setBeamData)
      return
    }

    const newSection: Section = {
      id: (beamData.sections?.length || 0) + 1,
      spanId: (beamData.sections?.length || 0) + 1,
      momentOfInertia: Number.parseFloat(momentOfInertia) || 0,
      youngsModulus: Number.parseFloat(youngsModulus) || 0,
      coefficientEIz: coefficientEIz ? Number.parseFloat(coefficientEIz) : undefined,
    }

    setBeamData({
      ...beamData,
      sections: [...(beamData.sections || []), newSection],
    })

    // Reset form
    setMomentOfInertia("")
    setYoungsModulus("")
    setCoefficientEIz("")
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <button className="text-gray-600 hover:text-gray-900 flex items-center">
          <ArrowLeft size={16} className="mr-1" /> Back
        </button>
      </div>

      <h2 className="text-xl font-medium mb-6">For Span: {(beamData.sections?.length || 0) + 1}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-600 mb-2">Moment of Inertia (Iz):</label>
          <div className="relative">
            <input
              type="number"
              value={momentOfInertia}
              onChange={(e) => setMomentOfInertia(e.target.value)}
              className="w-full p-3 pr-12 border border-gray-200 rounded-lg bg-white"
              placeholder="Enter moment of inertia"
              required
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">mm⁴</span>
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Young's Modulus (E):</label>
          <div className="relative">
            <input
              type="number"
              value={youngsModulus}
              onChange={(e) => setYoungsModulus(e.target.value)}
              className="w-full p-3 pr-12 border border-gray-200 rounded-lg bg-white"
              placeholder="Enter Young's modulus"
              required
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">MPa</span>
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Coefficient of EIz (optional):</label>
          <input
            type="number"
            value={coefficientEIz}
            onChange={(e) => setCoefficientEIz(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg bg-white"
            placeholder="Enter coefficient (optional)"
          />
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

