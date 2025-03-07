"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import type { BeamData, Section } from "@/app/calculator/page"

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

    // Ensure setBeamData is a function
    if (typeof setBeamData !== "function") {
      console.error("setBeamData is not a function", setBeamData)
      return
    }

    const newSection: Section = {
      id: (beamData?.sections?.length || 0) + 1,
      spanId: (beamData?.sections?.length || 0) + 1,
      momentOfInertia: Number.parseFloat(momentOfInertia) || 0,
      youngsModulus: Number.parseFloat(youngsModulus) || 0,
      coefficientEIz: coefficientEIz ? Number.parseFloat(coefficientEIz) : undefined,
    }

    setBeamData({
      ...beamData,
      sections: [...(beamData?.sections || []), newSection],
    })

    // Reset form
    setMomentOfInertia("")
    setYoungsModulus("")
    setCoefficientEIz("")
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <button className="text-gray-600 hover:text-gray-900 flex items-center">
          <ArrowLeft size={16} className="mr-1" /> Back
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-6">For Span: {(beamData?.sections?.length || 0) + 1}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-600 mb-2">Moment of Inertia (Iz):</label>
          <div className="relative">
            <input
              type="number"
              value={momentOfInertia}
              onChange={(e) => setMomentOfInertia(e.target.value)}
              className="w-full p-2 pr-12 border rounded-md"
              placeholder="Enter moment of inertia"
              required
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">mm⁴</span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2">Young's Modulus (E):</label>
          <div className="relative">
            <input
              type="number"
              value={youngsModulus}
              onChange={(e) => setYoungsModulus(e.target.value)}
              className="w-full p-2 pr-12 border rounded-md"
              placeholder="Enter Young's modulus"
              required
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">MPa</span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2">Coefficient of EIz:</label>
          <input
            type="number"
            value={coefficientEIz}
            onChange={(e) => setCoefficientEIz(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter coefficient (optional)"
          />
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

