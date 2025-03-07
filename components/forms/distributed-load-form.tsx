"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import type { FrameData } from "../frame-calculator"

interface DistributedLoadFormProps {
  frameData: FrameData
  setFrameData: (data: FrameData) => void
}

export default function DistributedLoadForm({ frameData, setFrameData }: DistributedLoadFormProps) {
  const [memberId, setMemberId] = useState("")
  const [startXMag, setStartXMag] = useState("")
  const [endXMag, setEndXMag] = useState("")
  const [startYMag, setStartYMag] = useState("")
  const [endYMag, setEndYMag] = useState("")
  const [startPos, setStartPos] = useState("")
  const [endPos, setEndPos] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newDistLoad = {
      id: frameData.distributedLoads.length + 1,
      memberId: Number.parseInt(memberId),
      startMag: Number.parseFloat(startXMag) || 0,
      endMag: Number.parseFloat(endXMag) || 0,
      startPos: Number.parseFloat(startPos) || 0,
      endPos: Number.parseFloat(endPos) || 100,
    }

    setFrameData({
      ...frameData,
      distributedLoads: [...frameData.distributedLoads, newDistLoad],
    })

    // Reset form
    setMemberId("")
    setStartXMag("")
    setEndXMag("")
    setStartYMag("")
    setEndYMag("")
    setStartPos("")
    setEndPos("")
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <button className="text-gray-600 hover:text-gray-900 flex items-center">
          <ArrowLeft size={16} className="mr-1" /> Back
        </button>
      </div>

      <h2 className="text-xl font-medium mb-6">Distributed Load ID: {frameData.distributedLoads.length + 1}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-600 mb-2">Member ID:</label>
          <select
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg bg-white appearance-none"
            required
          >
            <option value="">Select Member</option>
            {frameData.members.map((member) => (
              <option key={member.id} value={member.id}>
                Member {member.id}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Start X-Mag:</label>
          <div className="relative">
            <input
              type="number"
              value={startXMag}
              onChange={(e) => setStartXMag(e.target.value)}
              className="w-full p-3 pr-16 border border-gray-200 rounded-lg bg-white"
              placeholder="Enter start X magnitude"
              required
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">kN/m</span>
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">End X-Mag:</label>
          <div className="relative">
            <input
              type="number"
              value={endXMag}
              onChange={(e) => setEndXMag(e.target.value)}
              className="w-full p-3 pr-16 border border-gray-200 rounded-lg bg-white"
              placeholder="Enter end X magnitude"
              required
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">kN/m</span>
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Start Position:</label>
          <div className="relative">
            <input
              type="number"
              value={startPos}
              onChange={(e) => setStartPos(e.target.value)}
              className="w-full p-3 pr-8 border border-gray-200 rounded-lg bg-white"
              placeholder="Enter start position"
              min="0"
              max="100"
              required
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">%</span>
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">End Position:</label>
          <div className="relative">
            <input
              type="number"
              value={endPos}
              onChange={(e) => setEndPos(e.target.value)}
              className="w-full p-3 pr-8 border border-gray-200 rounded-lg bg-white"
              placeholder="Enter end position"
              min="0"
              max="100"
              required
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">%</span>
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

