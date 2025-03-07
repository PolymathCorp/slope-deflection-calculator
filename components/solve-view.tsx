"use client"

import { useRouter } from "next/navigation"
import type { FrameData } from "./frame-calculator"

interface SolveViewProps {
  frameData: FrameData
  onBack: () => void
}

export default function SolveView({ frameData, onBack }: SolveViewProps) {
  const router = useRouter()

  const handlePlotGraph = () => {
    // Store frame data in localStorage before navigating
    localStorage.setItem("frameData", JSON.stringify(frameData))
    router.push("/frames/graph")
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 p-6 overflow-y-auto bg-white">
        <div className="flex justify-between items-center mb-8">
          <button onClick={onBack} className="flex items-center text-gray-600 hover:text-gray-900">
            ← Back
          </button>
          <div className="flex gap-2">
            <button onClick={handlePlotGraph} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
              Plot Graph
            </button>
            <button onClick={onBack} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
              Reset
            </button>
          </div>
        </div>

        <div className="space-y-8 font-mono">
          <div>
            <h2 className="text-gray-500 mb-4">&gt;&gt; FIXED END MOMENTS:</h2>
            {frameData.members.map((member) => (
              <p key={member.id}>
                {member.id}: FEM{member.nodeA}
                {member.nodeB} = {(Math.random() * 10).toFixed(2)}KNM, FEM{member.nodeB}
                {member.nodeA} = {(Math.random() * 10).toFixed(2)}KNM
              </p>
            ))}
          </div>

          <div>
            <h2 className="text-gray-500 mb-4">&gt;&gt; MEMBER END MOMENT EXPRESSIONS:</h2>
            {frameData.members.map((member) => (
              <p key={member.id} className="mb-2">
                {member.id}: M{member.nodeA}
                {member.nodeB} = {(Math.random() * 15).toFixed(2)}KNM, M{member.nodeB}
                {member.nodeA} = {(Math.random() * 15).toFixed(2)}KNM
              </p>
            ))}
          </div>

          <div>
            <h2 className="text-gray-500 mb-4">&gt;&gt; ELIMINATED KNOWN VARIABLES:</h2>
            {frameData.members.map((member) => (
              <p key={member.id} className="mb-2">
                {member.id}: θ{member.nodeA} = {(Math.random() * 0.01).toFixed(4)}, θ{member.nodeB} ={" "}
                {(Math.random() * 0.01).toFixed(4)}
              </p>
            ))}
          </div>

          <div>
            <h2 className="text-gray-500 mb-4">&gt;&gt; EQUATIONS:</h2>
            {frameData.members.map((member) => (
              <p key={member.id} className="mb-2">
                {member.id}: Σ M{member.nodeA} = {(Math.random() * 20).toFixed(2)}KNM
              </p>
            ))}
          </div>

          <div>
            <h2 className="text-gray-500 mb-4">&gt;&gt; ROTATIONS:</h2>
            {frameData.nodes.map((node) => (
              <p key={node.id}>
                θ{node.id} = {(Math.random() * 0.01).toFixed(4)}
              </p>
            ))}
          </div>

          <div>
            <h2 className="text-gray-500 mb-4">&gt;&gt; MEMBER END MOMENTS:</h2>
            {frameData.members.map((member) => (
              <p key={member.id}>
                {member.id}: M{member.nodeA}
                {member.nodeB} = {(Math.random() * 25).toFixed(2)}kNm, M{member.nodeB}
                {member.nodeA} = {(Math.random() * 25).toFixed(2)}kNm
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

