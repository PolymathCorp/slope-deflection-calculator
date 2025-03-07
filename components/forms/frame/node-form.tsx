"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import type { FrameData } from "@/types/frame-types"

interface NodeFormProps {
  frameData: FrameData
  setFrameData: (data: FrameData) => void
}

export default function NodeForm({ frameData, setFrameData }: NodeFormProps) {
  const [xPosition, setXPosition] = useState("")
  const [yPosition, setYPosition] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (typeof setFrameData !== "function") {
      console.error("setFrameData is not a function", setFrameData)
      return
    }

    const newNode = {
      id: frameData.nodes.length + 1,
      x: Number.parseFloat(xPosition) || 0,
      y: Number.parseFloat(yPosition) || 0,
    }

    setFrameData({
      ...frameData,
      nodes: [...frameData.nodes, newNode],
    })

    // Reset form
    setXPosition("")
    setYPosition("")
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <button className="text-gray-600 hover:text-gray-900 flex items-center">
          <ArrowLeft size={16} className="mr-1" /> Back
        </button>
      </div>

      <h2 className="text-xl font-medium mb-6">Node ID: {frameData.nodes.length + 1}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-600 mb-2">X Position:</label>
          <div className="relative">
            <input
              type="number"
              value={xPosition}
              onChange={(e) => setXPosition(e.target.value)}
              className="w-full p-3 pr-12 border border-gray-200 rounded-lg bg-white"
              placeholder="Enter X position"
              required
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">M</span>
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Y Position:</label>
          <div className="relative">
            <input
              type="number"
              value={yPosition}
              onChange={(e) => setYPosition(e.target.value)}
              className="w-full p-3 pr-12 border border-gray-200 rounded-lg bg-white"
              placeholder="Enter Y position"
              required
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">M</span>
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

