"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const DownloadUserData = () => {
  const { toast } = useToast()
  const [isDownloading, setIsDownloading] = useState(false)
  const [dataType, setDataType] = useState<string>("all")
  const [format, setFormat] = useState<string>("json")

  const handleDownload = () => {
    setIsDownloading(true)

    // Simulate API call
    setTimeout(() => {
      setIsDownloading(false)

      toast({
        title: "Data Export Started",
        description: "Your data export has been initiated. You will receive an email with a download link shortly.",
      })

      // In a real implementation, this would trigger a backend process to prepare the data export
      console.log(`Downloading ${dataType} data in ${format} format`)
    }, 1500)
  }

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
      <div className="flex items-start">
        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mr-4">
          <Download className="h-5 w-5 text-blue-600 dark:text-blue-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Download Your Data</h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            You can download all your personal data or specific categories in various formats.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Data Type</label>
          <Select value={dataType} onValueChange={setDataType}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select data type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Data</SelectItem>
              <SelectItem value="profile">Profile Information</SelectItem>
              <SelectItem value="rides">Ride History</SelectItem>
              <SelectItem value="payments">Payment Information</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Format</label>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="pdf">PDF Report</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          className="w-full bg-green-nexus-600 hover:bg-green-nexus-700"
          onClick={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? "Preparing Download..." : "Download My Data"}
        </Button>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          For large data exports, we'll email you a secure download link
        </p>
      </div>
    </div>
  )
}

export default DownloadUserData
