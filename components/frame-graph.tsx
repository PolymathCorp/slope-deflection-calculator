"use client"

import { useEffect, useRef } from "react"
import type { FrameData } from "@/types/frame-types"

interface FrameGraphProps {
  frameData: FrameData
}

export default function FrameGraph({ frameData }: FrameGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // If no nodes or members, show a message
    if (frameData.nodes.length === 0 || frameData.members.length === 0) {
      ctx.font = "16px Arial"
      ctx.fillStyle = "#6b7280"
      ctx.textAlign = "center"
      ctx.fillText("Add nodes and members to see the frame", canvas.width / 2, canvas.height / 2)
      return
    }

    // Find min and max coordinates to scale the drawing
    const minX = Math.min(...frameData.nodes.map((node) => node.x))
    const maxX = Math.max(...frameData.nodes.map((node) => node.x))
    const minY = Math.min(...frameData.nodes.map((node) => node.y))
    const maxY = Math.max(...frameData.nodes.map((node) => node.y))

    // Add padding
    const padding = 50
    const xRange = maxX - minX + 2
    const yRange = maxY - minY + 2

    // Calculate scale factors
    const scaleX = (canvas.width - padding * 2) / xRange
    const scaleY = (canvas.height - padding * 2) / yRange

    // Function to convert coordinates
    const transformX = (x: number) => (x - minX + 1) * scaleX + padding
    const transformY = (y: number) => canvas.height - ((y - minY + 1) * scaleY + padding) // Flip Y axis

    // Draw grid
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1

    // Draw grid lines
    for (let x = Math.floor(minX); x <= Math.ceil(maxX); x++) {
      ctx.beginPath()
      ctx.moveTo(transformX(x), padding)
      ctx.lineTo(transformX(x), canvas.height - padding)
      ctx.stroke()

      // X axis labels
      ctx.fillStyle = "#6b7280"
      ctx.textAlign = "center"
      ctx.fillText(x.toString(), transformX(x), canvas.height - padding + 15)
    }

    for (let y = Math.floor(minY); y <= Math.ceil(maxY); y++) {
      ctx.beginPath()
      ctx.moveTo(padding, transformY(y))
      ctx.lineTo(canvas.width - padding, transformY(y))
      ctx.stroke()

      // Y axis labels
      ctx.textAlign = "right"
      ctx.fillText(y.toString(), padding - 5, transformY(y) + 4)
    }

    // Draw members
    ctx.strokeStyle = "#2563eb"
    ctx.lineWidth = 2

    frameData.members.forEach((member) => {
      const nodeA = frameData.nodes.find((node) => node.id === member.nodeA)
      const nodeB = frameData.nodes.find((node) => node.id === member.nodeB)

      if (nodeA && nodeB) {
        ctx.beginPath()
        ctx.moveTo(transformX(nodeA.x), transformY(nodeA.y))
        ctx.lineTo(transformX(nodeB.x), transformY(nodeB.y))
        ctx.stroke()
      }
    })

    // Draw nodes
    ctx.fillStyle = "#2563eb"
    frameData.nodes.forEach((node) => {
      ctx.beginPath()
      ctx.arc(transformX(node.x), transformY(node.y), 6, 0, Math.PI * 2)
      ctx.fill()

      // Node label
      ctx.fillStyle = "#1f2937"
      ctx.textAlign = "center"
      ctx.fillText(`${node.id}`, transformX(node.x), transformY(node.y) - 10)
      ctx.fillStyle = "#2563eb"
    })

    // Draw supports
    frameData.supports.forEach((support) => {
      const node = frameData.nodes.find((n) => n.id === support.nodeId)
      if (!node) return

      const x = transformX(node.x)
      const y = transformY(node.y)

      ctx.fillStyle = "#ef4444"

      if (support.type === "fixed") {
        // Draw fixed support (rectangle)
        ctx.fillRect(x - 10, y - 5, 20, 10)
      } else if (support.type === "pinned") {
        // Draw pinned support (triangle)
        ctx.beginPath()
        ctx.moveTo(x, y - 10)
        ctx.lineTo(x - 10, y + 5)
        ctx.lineTo(x + 10, y + 5)
        ctx.closePath()
        ctx.fill()
      } else if (support.type === "roller") {
        // Draw roller support (circle)
        ctx.beginPath()
        ctx.arc(x, y + 5, 5, 0, Math.PI * 2)
        ctx.fill()
      }
    })

    // Draw point loads
    frameData.pointLoads.forEach((load) => {
      const node = frameData.nodes.find((n) => n.id === load.nodeId)
      if (!node) return

      const x = transformX(node.x)
      const y = transformY(node.y)

      ctx.strokeStyle = "#10b981"
      ctx.fillStyle = "#10b981"

      // Draw X component
      if (load.x !== 0) {
        const direction = load.x > 0 ? 1 : -1
        const length = Math.min(Math.abs(load.x) * 5, 30) * direction

        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + length, y)
        ctx.stroke()

        // Arrow head
        ctx.beginPath()
        ctx.moveTo(x + length, y)
        ctx.lineTo(x + length - direction * 10, y - 5)
        ctx.lineTo(x + length - direction * 10, y + 5)
        ctx.closePath()
        ctx.fill()
      }

      // Draw Y component
      if (load.y !== 0) {
        const direction = load.y > 0 ? 1 : -1
        const length = Math.min(Math.abs(load.y) * 5, 30) * direction

        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x, y - length)
        ctx.stroke()

        // Arrow head
        ctx.beginPath()
        ctx.moveTo(x, y - length)
        ctx.lineTo(x - 5, y - length + direction * 10)
        ctx.lineTo(x + 5, y - length + direction * 10)
        ctx.closePath()
        ctx.fill()
      }
    })

    // Draw moments
    frameData.moments.forEach((moment) => {
      const node = frameData.nodes.find((n) => n.id === moment.nodeId)
      if (!node) return

      const x = transformX(node.x)
      const y = transformY(node.y)

      ctx.strokeStyle = "#8b5cf6"
      ctx.fillStyle = "#8b5cf6"

      // Draw arc
      ctx.beginPath()
      ctx.arc(x, y, 15, 0, Math.PI * 1.5)
      ctx.stroke()

      // Draw arrow head
      ctx.beginPath()
      ctx.moveTo(x, y - 15)
      ctx.lineTo(x - 5, y - 20)
      ctx.lineTo(x + 5, y - 20)
      ctx.closePath()
      ctx.fill()

      // Draw magnitude
      ctx.fillText(`${moment.magnitude} kNm`, x + 20, y - 15)
    })

    // Draw distributed loads
    frameData.distributedLoads.forEach((load) => {
      const member = frameData.members.find((m) => m.id === load.memberId)
      if (!member) return

      const nodeA = frameData.nodes.find((n) => n.id === member.nodeA)
      const nodeB = frameData.nodes.find((n) => n.id === member.nodeB)
      if (!nodeA || !nodeB) return

      // Calculate points along the member
      const dx = nodeB.x - nodeA.x
      const dy = nodeB.y - nodeA.y
      const length = Math.sqrt(dx * dx + dy * dy)

      // Calculate start and end positions
      const startPos = load.startPos / 100
      const endPos = load.endPos / 100

      const startX = nodeA.x + dx * startPos
      const startY = nodeA.y + dy * startPos
      const endX = nodeA.x + dx * endPos
      const endY = nodeA.y + dy * endPos

      // Draw load arrows
      ctx.strokeStyle = "#f59e0b"
      ctx.fillStyle = "#f59e0b"

      const numArrows = 5
      for (let i = 0; i <= numArrows; i++) {
        const t = i / numArrows
        const x = startX + (endX - startX) * t
        const y = startY + (endY - startY) * t

        // Calculate magnitude at this point (linear interpolation)
        const mag = load.startMag + (load.endMag - load.startMag) * t
        const arrowLength = Math.min(Math.abs(mag) * 3, 20)

        // Draw arrow perpendicular to member
        const angle = Math.atan2(dy, dx) + Math.PI / 2
        const arrowX = transformX(x)
        const arrowY = transformY(y)

        ctx.beginPath()
        ctx.moveTo(arrowX, arrowY)
        ctx.lineTo(arrowX + Math.cos(angle) * arrowLength, arrowY - Math.sin(angle) * arrowLength)
        ctx.stroke()

        // Arrow head
        ctx.beginPath()
        ctx.moveTo(arrowX + Math.cos(angle) * arrowLength, arrowY - Math.sin(angle) * arrowLength)
        ctx.lineTo(
          arrowX + Math.cos(angle) * arrowLength - Math.cos(angle - Math.PI / 6) * 5,
          arrowY - Math.sin(angle) * arrowLength + Math.sin(angle - Math.PI / 6) * 5,
        )
        ctx.lineTo(
          arrowX + Math.cos(angle) * arrowLength - Math.cos(angle + Math.PI / 6) * 5,
          arrowY - Math.sin(angle) * arrowLength + Math.sin(angle + Math.PI / 6) * 5,
        )
        ctx.closePath()
        ctx.fill()
      }
    })
  }, [frameData])

  return (
    <div className="bg-white p-4 rounded-md border border-gray-200 mb-4">
      <h3 className="text-lg font-medium mb-2">Frame Visualization</h3>
      <canvas ref={canvasRef} width={800} height={600} className="border border-gray-200 bg-gray-50 w-full" />
    </div>
  )
}

