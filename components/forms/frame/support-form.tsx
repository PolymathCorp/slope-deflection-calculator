"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import type { FrameData } from "@/types/frame-types"

interface SupportFormProps {
  frameData: FrameData
  setFrameData: (data: FrameData) => void
}

export default function SupportForm({ frameData, setFrameData }: SupportFormProps) {
  const [nodeId, setNodeId] = useState("")
  const [supportType, setSupportType] = useState<"roller" | "pinned" | "fixed">("roller")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (typeof setFrameData !== "function") {
      console.error("setFrameData is not a function", setFrameData)
      return
    }

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
              <svg viewBox="0 0 24 24" width="24" height="24" className="h-8 w-8">
                <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
                <line x1="6" y1="18" x2="18" y2="18" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setSupportType("pinned")}
              className={`p-4 border-2 rounded-lg flex items-center justify-center h-16 ${
                supportType === "pinned" ? "border-blue-500" : "border-gray-200"
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

