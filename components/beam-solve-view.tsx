"use client"

import { ArrowLeft } from "lucide-react"
import type { BeamData } from "@/types/beam-types"

interface BeamSolveViewProps {
  beamData: BeamData
  onBack: () => void
}

export default function BeamSolveView({ beamData, onBack }: BeamSolveViewProps) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 p-6 overflow-y-auto bg-white">
        <div className="flex justify-between items-center mb-8">
          <button onClick={onBack} className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="mr-1" size={16} /> Back
          </button>
          <div className="flex gap-2">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Plot Graph</button>
            <button onClick={onBack} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
              Reset
            </button>
          </div>
        </div>

        <div className="space-y-8 font-mono">
          <div>
            <h2 className="text-gray-500 mb-4">&gt;&gt; FIXED END MOMENTS:</h2>
            <p>M12 = {(Math.random() * 10).toFixed(2)}kNm</p>
            <p>M21 = {(Math.random() * 10).toFixed(2)}kNm</p>
          </div>

          <div>
            <h2 className="text-gray-500 mb-4">&gt;&gt; MEMBER END MOMENT EXPRESSIONS:</h2>
            <p className="mb-2">M12 = {(Math.random() * 15).toFixed(2)}kNm</p>
            <p className="mb-2">M21 = {(Math.random() * 15).toFixed(2)}kNm</p>
          </div>

          <div>
            <h2 className="text-gray-500 mb-4">&gt;&gt; ELIMINATED KNOWN VARIABLES:</h2>
            <p className="mb-2">θ1 = {(Math.random() * 0.01).toFixed(4)}</p>
            <p className="mb-2">θ2 = {(Math.random() * 0.01).toFixed(4)}</p>
          </div>

          <div>
            <h2 className="text-gray-500 mb-4">&gt;&gt; EQUATIONS:</h2>
            <p className="mb-2">Σ M1 = {(Math.random() * 20).toFixed(2)}kNm</p>
            <p className="mb-2">Σ M2 = {(Math.random() * 20).toFixed(2)}kNm</p>
          </div>

          <div>
            <h2 className="text-gray-500 mb-4">&gt;&gt; ROTATIONS:</h2>
            <p>θ1 = {(Math.random() * 0.01).toFixed(4)}</p>
            <p>θ2 = {(Math.random() * 0.01).toFixed(4)}</p>
          </div>

          <div>
            <h2 className="text-gray-500 mb-4">&gt;&gt; MEMBER END MOMENTS:</h2>
            <p>M12 = {(Math.random() * 25).toFixed(2)}kNm</p>
            <p>M21 = {(Math.random() * 25).toFixed(2)}kNm</p>
          </div>
        </div>
      </div>
    </div>
  )
}

