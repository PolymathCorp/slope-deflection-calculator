"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import type { FrameData } from "@/types/frame-types"

interface MomentFormProps {
  frameData: FrameData
  setFrameData: (data: FrameData) => void
}

export default function MomentForm({ frameData, setFrameData }: MomentFormProps) {
  const [nodeId, setNodeId] = useState("")
  const [magnitude, setMagnitude] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (typeof setFrameData !== "function") {
      console.error("setFrameData is not a function", setFrameData)
      return
    }

    const newMoment = {
      id: frameData.moments.length + 1,
      nodeId: Number.parseInt(nodeId),
      magnitude: Number.parseFloat(magnitude) || 0,
    }

    setFrameData({
      ...frameData,
      moments: [...frameData.moments, newMoment],
    })

    // Reset form
    setNodeId("")
    setMagnitude("")
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <button className="text-gray-600 hover:text-gray-900 flex items-center">
          <ArrowLeft size={16} className="mr-1" /> Back
        </button>
      </div>

      <h2 className="text-xl font-medium mb-6">Moment ID: {frameData.moments.length + 1}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-600 mb-2">Node ID:</label>
          <select
            value={nodeId}
            onChange={(e) => setNodeId(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg bg-white appearance-none"
            required
          >
            <option value="">Select Node</option>
            {frameData.nodes.map((node) => (
              <option key={node.id} value={node.id}>
                Node {node.id}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Magnitude about Z:</label>
          <div className="relative">
            <input
              type="number"
              value={magnitude}
              onChange={(e) => setMagnitude(e.target.value)}
              className="w-full p-3 pr-16 border border-gray-200 rounded-lg bg-white"
              placeholder="Enter magnitude"
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

