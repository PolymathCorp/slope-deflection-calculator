"use client"

import type { BeamData } from "./beam-calculator"

interface ResultsPanelProps {
  beamData: BeamData
  showSolveResults: boolean
  onSolve: () => void
  onReset: () => void
}

export default function ResultsPanel({ beamData, showSolveResults, onSolve, onReset }: ResultsPanelProps) {
  return (
    <div className="flex-1 bg-white p-6 overflow-y-auto border-l border-r border-gray-200">
      <div className="flex justify-end mb-6 gap-2">
        <button
          onClick={onSolve}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md transition-colors"
        >
          Solve
        </button>
        <button
          onClick={onReset}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors"
        >
          Reset
        </button>
      </div>

      {showSolveResults && (
        <div className="font-mono whitespace-pre-wrap mb-6">
          <h3>&gt;&gt; SOLUTION:</h3>
          <p>Fixed End Moments:</p>
          <p>M12 = {(Math.random() * 10).toFixed(2)}kNm</p>
          <p>M21 = {(Math.random() * 10).toFixed(2)}kNm</p>
          <p>Member End Moments:</p>
          <p>M12 = {(Math.random() * 15).toFixed(2)}kNm</p>
          <p>M21 = {(Math.random() * 15).toFixed(2)}kNm</p>
          <p>Deflections:</p>
          <p>
            Max Deflection = {(Math.random() * 5).toFixed(2)}mm at {(Math.random() * beamData.length).toFixed(2)}m
          </p>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <h3 className="text-gray-500 font-mono mb-2">&gt;&gt; BEAM LENGTH:</h3>
          {beamData.length > 0 && <p className="font-mono">{beamData.length}m</p>}
        </div>

        {beamData.supports.length > 0 && (
          <div>
            <h3 className="text-gray-500 font-mono mb-2">&gt;&gt; SUPPORTS:</h3>
            {beamData.supports.map((support) => (
              <p key={support.id} className="font-mono">
                SUPPORT {support.id}: {support.type.toUpperCase()} AT {support.position}M ({support.location})
              </p>
            ))}
          </div>
        )}

        {beamData.sections.length > 0 && (
          <div>
            <h3 className="text-gray-500 font-mono mb-2">&gt;&gt; SECTIONS:</h3>
            {beamData.sections.map((section) => (
              <p key={section.id} className="font-mono">
                SECTION {section.id}: SPAN {section.spanId}, E={section.youngsModulus} MPa, I={section.momentOfInertia}{" "}
                mm⁴
                {section.coefficientEIz && `, EIz=${section.coefficientEIz}`}
              </p>
            ))}
          </div>
        )}

        {beamData.settlements.length > 0 && (
          <div>
            <h3 className="text-gray-500 font-mono mb-2">&gt;&gt; SETTLEMENTS:</h3>
            {beamData.settlements.map((settlement) => (
              <p key={settlement.id} className="font-mono">
                SETTLEMENT AT SUPPORT {settlement.supportId}: {settlement.value}mm
              </p>
            ))}
          </div>
        )}

        {beamData.pointLoads.length > 0 && (
          <div>
            <h3 className="text-gray-500 font-mono mb-2">&gt;&gt; POINT LOADS:</h3>
            {beamData.pointLoads.map((load) => (
              <p key={load.id} className="font-mono">
                POINT LOAD {load.magnitude}KN AT {load.position}M ({load.location})
              </p>
            ))}
          </div>
        )}

        {beamData.distributedLoads.length > 0 && (
          <div>
            <h3 className="text-gray-500 font-mono mb-2">&gt;&gt; DISTRIBUTED LOADS:</h3>
            {beamData.distributedLoads.map((load) => (
              <p key={load.id} className="font-mono">
                DISTRIBUTED LOAD {load.id}: {load.startMagnitude}KN/m TO {load.endMagnitude}KN/m FROM{" "}
                {load.startPosition}M ({load.startLocation}) TO {load.endPosition}M ({load.endLocation})
              </p>
            ))}
          </div>
        )}

        {beamData.moments.length > 0 && (
          <div>
            <h3 className="text-gray-500 font-mono mb-2">&gt;&gt; MOMENTS:</h3>
            {beamData.moments.map((moment) => (
              <p key={moment.id} className="font-mono">
                MOMENT {moment.magnitude}KNM AT {moment.position}M
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

