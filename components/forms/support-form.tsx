"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import type { FrameData } from "../frame-calculator"

interface SupportFormProps {
  frameData: FrameData
  setFrameData: (data: FrameData) => void
}

export default function SupportForm({ frameData, setFrameData }: SupportFormProps) {
  const [nodeId, setNodeId] = useState("")
  const [supportType, setSupportType] = useState<"roller" | "pin" | "fixed">("roller")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newSupport = {
      id: frameData.supports.length + 1,
      nodeId: Number.parseInt(nodeId),
      type: supportType,
    }

    setFrameData({
      ...frameData,
      supports: [...frameData.supports, newSupport],
    })

    // Reset form
    setNodeId("")
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <button className="text-gray-600 hover:text-gray-900 flex items-center">
          <ArrowLeft size={16} className="mr-1" /> Back
        </button>
      </div>

      <h2 className="text-xl font-medium mb-6">Support ID: {frameData.supports.length + 1}</h2>

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
          <label className="block text-gray-600 mb-2">Support Type:</label>
          <div className="grid grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setSupportType("roller")}
              className={`p-4 border-2 rounded-lg flex items-center justify-center h-16 ${
                supportType === "roller" ? "border-blue-500" : "border-gray-200"
              }`}
            >
              <img src="/roller-support.svg" alt="Roller" className="h-8 w-8" />
            </button>
            <button
              type="button"
              onClick={() => setSupportType("pin")}
              className={`p-4 border-2 rounded-lg flex items-center justify-center h-16 ${
                supportType === "pin" ? "border-blue-500" : "border-gray-200"
              }`}
            >
              <img src="/pinned-support.svg" alt="Pin" className="h-8 w-8" />
            </button>
            <button
              type="button"
              onClick={() => setSupportType("fixed")}
              className={`p-4 border-2 rounded-lg flex items-center justify-center h-16 ${
                supportType === "fixed" ? "border-blue-500" : "border-gray-200"
              }`}
            >
              <img src="/fixed-support.svg" alt="Fixed" className="h-8 w-8" />
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

