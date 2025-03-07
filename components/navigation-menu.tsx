"use client"

interface NavigationMenuProps {
  activeSection: string
  setActiveSection: (section: string) => void
  setActiveInput: (input: string | null) => void
}

export default function NavigationMenu({ activeSection, setActiveSection, setActiveInput }: NavigationMenuProps) {
  const handleSectionClick = (section: string) => {
    setActiveSection(section)

    // Set the appropriate input form based on the section
    switch (section) {
      case "beam":
        setActiveInput("beam")
        break
      case "supports":
      case "support":
        setActiveInput("support")
        break
      case "sections":
        setActiveInput("section")
        break
      case "settlement":
        setActiveInput("settlement")
        break
      case "pointLoads":
        setActiveInput("pointLoad")
        break
      case "moments":
        setActiveInput("moment")
        break
      case "distributedLoads":
        setActiveInput("distributedLoad")
        break
      default:
        setActiveInput(null)
    }
  }

  return (
    <div className="w-[350px] bg-[#1a2332] text-white p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-gray-400 mb-2">Model</h2>
        <nav className="flex flex-col gap-3">
          <button
            className={`py-3 px-4 rounded-md text-center border border-gray-600 transition-colors ${activeSection === "beam" ? "bg-[#2563eb] border-[#2563eb] text-white" : "hover:bg-gray-700"}`}
            onClick={() => handleSectionClick("beam")}
          >
            Beam
          </button>
          <button
            className={`py-3 px-4 rounded-md text-center border border-gray-600 transition-colors ${activeSection === "supports" ? "bg-[#2563eb] border-[#2563eb] text-white" : "hover:bg-gray-700"}`}
            onClick={() => handleSectionClick("supports")}
          >
            Supports
          </button>
          <button
            className={`py-3 px-4 rounded-md text-center border border-gray-600 transition-colors ${activeSection === "sections" ? "bg-[#2563eb] border-[#2563eb] text-white" : "hover:bg-gray-700"}`}
            onClick={() => handleSectionClick("sections")}
          >
            Sections
          </button>
          <button
            className={`py-3 px-4 rounded-md text-center border border-gray-600 transition-colors ${activeSection === "settlement" ? "bg-[#2563eb] border-[#2563eb] text-white" : "hover:bg-gray-700"}`}
            onClick={() => handleSectionClick("settlement")}
          >
            Settlement
          </button>
        </nav>
      </div>

      <div>
        <h2 className="text-gray-400 mb-2">Loads</h2>
        <nav className="flex flex-col gap-3">
          <button
            className={`py-3 px-4 rounded-md text-center border border-gray-600 transition-colors ${activeSection === "pointLoads" ? "bg-[#2563eb] border-[#2563eb] text-white" : "hover:bg-gray-700"}`}
            onClick={() => handleSectionClick("pointLoads")}
          >
            Point Loads
          </button>
          <button
            className={`py-3 px-4 rounded-md text-center border border-gray-600 transition-colors ${activeSection === "moments" ? "bg-[#2563eb] border-[#2563eb] text-white" : "hover:bg-gray-700"}`}
            onClick={() => handleSectionClick("moments")}
          >
            Moments
          </button>
          <button
            className={`py-3 px-4 rounded-md text-center border border-gray-600 transition-colors ${activeSection === "distributedLoads" ? "bg-[#2563eb] border-[#2563eb] text-white" : "hover:bg-gray-700"}`}
            onClick={() => handleSectionClick("distributedLoads")}
          >
            Distributed Loads
          </button>
        </nav>
      </div>
    </div>
  )
}

