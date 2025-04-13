import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Admin Dashboard | ZunoBotics",
  description: "Admin dashboard for ZunoBotics",
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your ZunoBotics platform</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/dashboard/donations">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-bold mb-2">Donations</h2>
              <p className="text-gray-600 mb-4">Manage and track all donations</p>
              <Button variant="outline" className="w-full">
                View Donations
              </Button>
            </div>
          </Link>

          <Link href="/dashboard/projects">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-bold mb-2">Projects</h2>
              <p className="text-gray-600 mb-4">Manage student projects</p>
              <Button variant="outline" className="w-full">
                Manage Projects
              </Button>
            </div>
          </Link>

          <Link href="/dashboard/partners">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-bold mb-2">Partners</h2>
              <p className="text-gray-600 mb-4">Manage partner organizations</p>
              <Button variant="outline" className="w-full">
                Manage Partners
              </Button>
            </div>
          </Link>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline">Export Donation Data</Button>
            <Button variant="outline">Send Newsletter</Button>
            <Button variant="outline">Update Homepage</Button>
            <Button variant="outline">Site Settings</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
