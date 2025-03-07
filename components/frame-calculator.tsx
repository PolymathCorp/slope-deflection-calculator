"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import NodeForm from "./forms/frame/node-form"
import MemberForm from "./forms/frame/member-form"
import SupportForm from "./forms/frame/support-form"
import PointLoadForm from "./forms/frame/point-load-form"
import MomentForm from "./forms/frame/moment-form"
import DistributedLoadForm from "./forms/frame/distributed-load-form"
import type { FrameData } from "@/types/frame-types"

interface FrameCalculatorProps {
  onSolve: () => void
  frameData: FrameData
  setFrameData: (data: FrameData) => void
}

export default function FrameCalculator({ onSolve, frameData, setFrameData }: FrameCalculatorProps) {
  const [activeSection, setActiveSection] = useState("nodes")
  const [activeInput, setActiveInput] = useState<string | null>("nodes")

  const handleReset = () => {
    setFrameData({
      nodes: [],
      members: [],
      supports: [],
      pointLoads: [],
      moments: [],
      distributedLoads: [],
    })
  }

  const handleSolve = () => {
    // Check if we have the minimum required data
    if (frameData.nodes.length < 2) {
      alert("Please add at least 2 nodes.")
      return
    }

    if (frameData.members.length === 0) {
      alert("Please add at least one member.")
      return
    }

    if (frameData.supports.length === 0) {
      alert("Please add at least one support.")
      return
    }

    onSolve()
  }

  const renderForm = () => {
    switch (activeInput) {
      case "nodes":
        return <NodeForm frameData={frameData} setFrameData={setFrameData} />
      case "members":
        return <MemberForm frameData={frameData} setFrameData={setFrameData} />
      case "supports":
        return <SupportForm frameData={frameData} setFrameData={setFrameData} />
      case "pointLoads":
        return <PointLoadForm frameData={frameData} setFrameData={setFrameData} />
      case "moments":
        return <MomentForm frameData={frameData} setFrameData={setFrameData} />
      case "distributedLoads":
        return <DistributedLoadForm frameData={frameData} setFrameData={setFrameData} />
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select an option from the left menu</p>
          </div>
        )
    }
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left panel - Navigation */}
      <div className="w-[350px] bg-[#1a2332] text-white p-6 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-gray-400 mb-2">Model</h2>
          <nav className="flex flex-col gap-3">
            <button
              className={`py-3 px-4 rounded-md text-center border border-gray-600 transition-colors ${
                activeSection === "nodes" ? "bg-[#2563eb] border-[#2563eb]" : "hover:bg-gray-700"
              }`}
              onClick={() => {
                setActiveSection("nodes")
                setActiveInput("nodes")
              }}
            >
              Nodes
            </button>
            <button
              className={`py-3 px-4 rounded-md text-center border border-gray-600 transition-colors ${
                activeSection === "members" ? "bg-[#2563eb] border-[#2563eb]" : "hover:bg-gray-700"
              }`}
              onClick={() => {
                setActiveSection("members")
                setActiveInput("members")
              }}
            >
              Members
            </button>
            <button
              className={`py-3 px-4 rounded-md text-center border border-gray-600 transition-colors ${
                activeSection === "supports" ? "bg-[#2563eb] border-[#2563eb]" : "hover:bg-gray-700"
              }`}
              onClick={() => {
                setActiveSection("supports")
                setActiveInput("supports")
              }}
            >
              Supports
            </button>
          </nav>
        </div>

        <div>
          <h2 className="text-gray-400 mb-2">Loads</h2>
          <nav className="flex flex-col gap-3">
            <button
              className={`py-3 px-4 rounded-md text-center border border-gray-600 transition-colors ${
                activeSection === "pointLoads" ? "bg-[#2563eb] border-[#2563eb]" : "hover:bg-gray-700"
              }`}
              onClick={() => {
                setActiveSection("pointLoads")
                setActiveInput("pointLoads")
              }}
            >
              Point Loads
            </button>
            <button
              className={`py-3 px-4 rounded-md text-center border border-gray-600 transition-colors ${
                activeSection === "moments" ? "bg-[#2563eb] border-[#2563eb]" : "hover:bg-gray-700"
              }`}
              onClick={() => {
                setActiveSection("moments")
                setActiveInput("moments")
              }}
            >
              Moments
            </button>
            <button
              className={`py-3 px-4 rounded-md text-center border border-gray-600 transition-colors ${
                activeSection === "distributedLoads" ? "bg-[#2563eb] border-[#2563eb]" : "hover:bg-gray-700"
              }`}
              onClick={() => {
                setActiveSection("distributedLoads")
                setActiveInput("distributedLoads")
              }}
            >
              Distributed Loads
            </button>
          </nav>
        </div>
      </div>

      {/* Middle panel - Results */}
      <div className="flex-1 bg-white p-6 overflow-y-auto border-l border-r border-gray-200">
        <div className="flex justify-end mb-6 gap-2">
          <button
            onClick={handleSolve}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md transition-colors"
          >
            Solve
          </button>
          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-gray-500 font-mono mb-2">&gt;&gt; NODES:</h3>
            {frameData.nodes.map((node) => (
              <p key={node.id} className="font-mono">
                NODE {node.id}: X POSITION: {node.x}M ; Y POSITION: {node.y}M
              </p>
            ))}
          </div>

          {frameData.members.length > 0 && (
            <div>
              <h3 className="text-gray-500 font-mono mb-2">&gt;&gt; MEMBERS:</h3>
              {frameData.members.map((member) => (
                <p key={member.id} className="font-mono">
                  MEMBER {member.id}: NODE {member.nodeA} - NODE {member.nodeB}, {member.length}M
                </p>
              ))}
            </div>
          )}

          {frameData.supports.length > 0 && (
            <div>
              <h3 className="text-gray-500 font-mono mb-2">&gt;&gt; SUPPORTS:</h3>
              {frameData.supports.map((support) => (
                <p key={support.id} className="font-mono">
                  SUPPORT {support.id}: NODE {support.nodeId}, {support.type.toUpperCase()}
                </p>
              ))}
            </div>
          )}

          {frameData.pointLoads.length > 0 && (
            <div>
              <h3 className="text-gray-500 font-mono mb-2">&gt;&gt; POINT LOADS:</h3>
              {frameData.pointLoads.map((load) => (
                <p key={load.id} className="font-mono">
                  LOAD {load.id}: NODE {load.nodeId}, X MAG: {load.x}KN, Y MAG: {load.y}KN
                </p>
              ))}
            </div>
          )}

          {frameData.distributedLoads.length > 0 && (
            <div>
              <h3 className="text-gray-500 font-mono mb-2">&gt;&gt; DISTRIBUTED LOADS:</h3>
              {frameData.distributedLoads.map((load) => (
                <p key={load.id} className="font-mono">
                  LOAD {load.id}: MEMBER {load.memberId}, {load.startMag}KN TO {load.endMag}KN FROM {load.startPos}% TO{" "}
                  {load.endPos}%
                </p>
              ))}
            </div>
          )}

          {frameData.moments.length > 0 && (
            <div>
              <h3 className="text-gray-500 font-mono mb-2">&gt;&gt; MOMENTS:</h3>
              {frameData.moments.map((moment) => (
                <p key={moment.id} className="font-mono">
                  MOMENT {moment.id}: NODE {moment.nodeId}, {moment.magnitude}KNM
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right panel - Input forms */}
      <div className="w-[350px] bg-gray-50 p-6 overflow-y-auto">
        {activeInput && (
          <button
            onClick={() => setActiveInput(null)}
            className="flex items-center text-gray-600 mb-6 hover:text-gray-900"
          >
            <ArrowLeft size={16} className="mr-1" /> Back
          </button>
        )}

        {renderForm()}
      </div>
    </div>
  )
}

