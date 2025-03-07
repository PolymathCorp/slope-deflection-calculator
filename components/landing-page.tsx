"use client"

import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#1a2332] flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-blue-500">Slope Deflection</span> <span className="text-white">Calculator</span>
        </h1>

        <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
          The Slope Deflection Calculator analyzes continuous beams and frames via slope deflection, calculating member
          end moments and displaying solutions step-by-step.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/beams"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-md transition-colors"
          >
            Calculate Beams
          </Link>
          <Link
            href="/frames"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-md transition-colors"
          >
            Calculate Frames
          </Link>
        </div>
      </div>
    </div>
  )
}

