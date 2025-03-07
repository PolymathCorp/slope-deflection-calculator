export type BeamData = {
  length: number
  supports: Support[]
  sections: Section[]
  settlements: Settlement[]
  pointLoads: PointLoad[]
  distributedLoads: DistributedLoad[]
  moments: Moment[]
}

export type Support = {
  id: number
  type: "roller" | "pin" | "fixed"
  position: number
  location: "L" | "M" | "R"
  settlement?: number
}

export type Section = {
  id: number
  spanId: number
  momentOfInertia: number // Iz
  youngsModulus: number // E
  coefficientEIz?: number
}

export type Settlement = {
  id: number
  supportId: number
  value: number // in mm
}

export type PointLoad = {
  id: number
  position: number
  magnitude: number // in kN
  location: "L" | "M" | "R"
}

export type DistributedLoad = {
  id: number
  startPosition: number
  endPosition: number
  startMagnitude: number // in kN/m
  endMagnitude: number // in kN/m
  startLocation: "L" | "R"
  endLocation: "L" | "R"
}

export type Moment = {
  id: number
  position: number
  magnitude: number // in kN·m
}

