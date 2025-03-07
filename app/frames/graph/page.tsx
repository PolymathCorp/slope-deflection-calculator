"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import FrameGraph from "@/components/frame-graph"
import type { FrameData } from "@/types/frame-types"

export default function GraphPage() {
  const router = useRouter()
  const [frameData, setFrameData] = useState<FrameData>({
    nodes: [],
    members: [],
    supports: [],
    pointLoads: [],
    moments: [],
    distributedLoads: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Try to get frame data from localStorage
    const storedData = localStorage.getItem("frameData")
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        setFrameData(parsedData)
      } catch (error) {
        console.error("Error parsing frame data:", error)
      }
    }
    setIsLoading(false)
  }, [])

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">Slope Deflection Calculator</h1>
        <Link href="/beams" className="bg-[#1a2332] text-white px-4 py-2 rounded-md flex items-center gap-2">
          Beams <ArrowLeft size={16} />
        </Link>
      </header>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto bg-white">
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => router.back()} className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="mr-1" size={16} /> Back
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading graph data...</p>
          </div>
        ) : frameData.nodes.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p>No frame data available. Please go back and solve a frame first.</p>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Frame Graph Visualization</h2>
            <FrameGraph frameData={frameData} />
          </div>
        )}
      </div>
    </div>
  )
}

