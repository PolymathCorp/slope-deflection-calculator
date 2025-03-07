export type FrameData = {
  nodes: Node[]
  members: Member[]
  supports: Support[]
  pointLoads: PointLoad[]
  moments: Moment[]
  distributedLoads: DistributedLoad[]
}

export type Node = {
  id: number
  x: number
  y: number
}

export type Member = {
  id: number
  nodeA: number
  nodeB: number
  length: number
}

export type Support = {
  id: number
  nodeId: number
  type: "fixed" | "pinned" | "roller"
}

export type PointLoad = {
  id: number
  nodeId: number
  x: number
  y: number
}

export type Moment = {
  id: number
  nodeId: number
  magnitude: number
}

export type DistributedLoad = {
  id: number
  memberId: number
  startMag: number
  endMag: number
  startPos: number
  endPos: number
}

