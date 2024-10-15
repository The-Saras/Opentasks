"use client"
import { useState } from "react"
import Link from "next/link"
import { Home, User, ChevronRight, Menu, X } from "lucide-react"

interface Organization {
  id: string
  name: string
}

interface SidebarProps {
  organizations: Organization[]
}

export default function Sidebar({ organizations = [] }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      
      <button
        className="md:hidden fixed z-50 top-4 left-4 p-2 bg-gray-800 text-white rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static min-h-screen flex flex-col justify-between
        `}
      >
        
        <div>
          
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Open Tasks</h2>
            <nav className="space-y-2">
              <Link
                href="/"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Home className="mr-3 h-5 w-5" />
                Home
              </Link>
              <Link
                href="/tasks"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <User className="mr-3 h-5 w-5" />
                Personal Tasks
              </Link>
            </nav>
          </div>

          
          <div className="overflow-y-auto px-3">
            <h3 className="mb-2 px-4 text-sm font-semibold text-gray-500">Organizations</h3>
            <nav className="space-y-1">
              {organizations.map((org) => (
                <Link
                  key={org.id}
                  href={`/org/${org.id}`}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <ChevronRight className="mr-3 h-4 w-4" />
                  {org.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        
        <div className="p-6">
          <Link
            href="/settings"
            className="block w-full px-4 py-2 text-center text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            Settings
          </Link>
        </div>
      </aside>
    </>
  )
}
