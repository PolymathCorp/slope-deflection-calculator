"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import type { FrameData } from "../frame-calculator"

interface MemberFormProps {
  frameData: FrameData
  setFrameData: (data: FrameData) => void
}

export default function MemberForm({ frameData, setFrameData }: MemberFormProps) {
  const [nodeA, setNodeA] = useState("")
  const [nodeB, setNodeB] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!nodeA || !nodeB) {
      alert("Please select both nodes")
      return
    }

    if (nodeA === nodeB) {
      alert("Please select different nodes")
      return
    }

    const nodeAObj = frameData.nodes.find((node) => node.id === Number.parseInt(nodeA))
    const nodeBObj = frameData.nodes.find((node) => node.id === Number.parseInt(nodeB))

    if (!nodeAObj || !nodeBObj) {
      alert("Selected nodes not found")
      return
    }

    // Calculate length between nodes
    const dx = nodeAObj.x - nodeBObj.x
    const dy = nodeAObj.y - nodeBObj.y
    const length = Math.sqrt(dx * dx + dy * dy)

    const newMember = {
      id: frameData.members.length + 1,
      nodeA: Number.parseInt(nodeA),
      nodeB: Number.parseInt(nodeB),
      length: Number.parseFloat(length.toFixed(2)),
    }

    setFrameData({
      ...frameData,
      members: [...frameData.members, newMember],
    })

    // Reset form
    setNodeA("")
    setNodeB("")
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <button className="text-gray-600 hover:text-gray-900 flex items-center">
          <ArrowLeft size={16} className="mr-1" /> Back
        </button>
      </div>

      <h2 className="text-xl font-medium mb-6">Member ID: {frameData.members.length + 1}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-600 mb-2">Node A:</label>
          <select
            value={nodeA}
            onChange={(e) => setNodeA(e.target.value)}
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
          <label className="block text-gray-600 mb-2">Node B:</label>
          <select
            value={nodeB}
            onChange={(e) => setNodeB(e.target.value)}
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

