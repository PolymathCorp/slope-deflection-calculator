"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import type { FrameData } from "@/types/frame-types"

interface PointLoadFormProps {
  frameData: FrameData
  setFrameData: (data: FrameData) => void
}

export default function PointLoadForm({ frameData, setFrameData }: PointLoadFormProps) {
  const [loadType, setLoadType] = useState<"node" | "member">("node")
  const [nodeId, setNodeId] = useState("")
  const [xMagnitude, setXMagnitude] = useState("")
  const [yMagnitude, setYMagnitude] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (typeof setFrameData !== "function") {
      console.error("setFrameData is not a function", setFrameData)
      return
    }

    const newPointLoad = {
      id: frameData.pointLoads.length + 1,
      nodeId: Number.parseInt(nodeId),
      x: Number.parseFloat(xMagnitude) || 0,
      y: Number.parseFloat(yMagnitude) || 0,
    }

    setFrameData({
      ...frameData,
      pointLoads: [...frameData.pointLoads, newPointLoad],
    })

    // Reset form
    setNodeId("")
    setXMagnitude("")
    setYMagnitude("")
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <button className="text-gray-600 hover:text-gray-900 flex items-center">
          <ArrowLeft size={16} className="mr-1" /> Back
        </button>
      </div>

      <h2 className="text-xl font-medium mb-6">Point Load ID: {frameData.pointLoads.length + 1}</h2>

      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => setLoadType("node")}
          className={`flex-1 py-2 px-4 rounded ${
            loadType === "node" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          Node
        </button>
        <button
          type="button"
          onClick={() => setLoadType("member")}
          className={`flex-1 py-2 px-4 rounded ${
            loadType === "member" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          Member
        </button>
      </div>

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
          <label className="block text-gray-600 mb-2">X Magnitude:</label>
          <div className="relative">
            <input
              type="number"
              value={xMagnitude}
              onChange={(e) => setXMagnitude(e.target.value)}
              className="w-full p-3 pr-16 border border-gray-200 rounded-lg bg-white"
              placeholder="Enter X magnitude"
              required
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">kN/m</span>
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Y Magnitude:</label>
          <div className="relative">
            <input
              type="number"
              value={yMagnitude}
              onChange={(e) => setYMagnitude(e.target.value)}
              className="w-full p-3 pr-16 border border-gray-200 rounded-lg bg-white"
              placeholder="Enter Y magnitude"
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

