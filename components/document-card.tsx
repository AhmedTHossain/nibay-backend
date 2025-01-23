import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Upload, Eye, CheckCircle, AlertCircle, Clock } from "lucide-react"
import { ImagePreview } from "@/app/components/common/ImagePreview"

interface DocumentCardProps {
  document: {
    name: string
    status: "verified" | "pending" | "not_uploaded"
    thumbnail?: string
  }
  onView?: () => void
  onDownload?: () => void
  // onUpload: () => void
}

export default function DocumentCard({ document, onView, onDownload }: DocumentCardProps) {
  const getStatusBadge = () => {
    switch (document.status) {
      // case "verified":
      //   return (
      //     <Badge variant="outline" className="mb-2">
      //       <CheckCircle className="w-3 h-3 mr-1" /> Verified
      //     </Badge>
      //   )
      // case "pending":
      //   return (
      //     <Badge variant="outline" className="mb-2">
      //       <Clock className="w-3 h-3 mr-1" /> Pending
      //     </Badge>
      //   )
      case "not_uploaded":
        return (
          <Badge variant="destructive" className="mb-2">
            <AlertCircle className="w-3 h-3 mr-1" /> নেই
          </Badge>
        )
    }
  }

  return (
    <Card>
      <CardContent className="p-4 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FileText className="w-6 h-6 mr-2" />
            <h3 className="font-semibold">{document.name}</h3>
          </div>
          {getStatusBadge()}
        </div>
        <div className="flex flex-col items-center flex-1 justify-center mb-4">
          {document.thumbnail && (
            <ImagePreview src={document.thumbnail} alt={document.name} width={200} height={200} />
          )}
        </div>
        <div className="flex w-full mt-auto">
          {document.status !== "not_uploaded" && (
            <a href={`${document.thumbnail}`} className="flex justify-center px-4 py-2 shadow-md bg-emerald-500 text-white font-semibold rounded w-full hover:bg-emerald-600 transition duration-200" download>
              <Download className="w-4 h-4 mr-2" /> ডাউনলোড করুন
            </a>
          )}
        </div>
      </CardContent>
    </Card >
  )
}

