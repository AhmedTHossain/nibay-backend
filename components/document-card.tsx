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
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FileText className="w-6 h-6 mr-2 text-green-500" />
            <h3 className="font-semibold">{document.name}</h3>
          </div>
          {getStatusBadge()}
        </div>
        <div className="flex flex-col items-end h-full gap-4">
          {document.thumbnail && (
            // <img
            //   src={document.thumbnail || "/placeholder.svg"}
            //   alt={document.name}
            //   className="w-full h-32 object-cover rounded-md mb-4"
            // />
            <ImagePreview src={document.thumbnail} alt={document.name} width={1024} height={1024} />
          )}
          <div className="flex w-full">
            {document.status !== "not_uploaded" && (
              <>
                {/* <Button variant="outline" size="sm" onClick={onView} className="flex-1">
                <Eye className="w-4 h-4 mr-2" /> View
                </Button> */}
                <Button variant="outline" size="sm" onClick={onDownload} className="flex-1">
                  <Download className="w-4 h-4 mr-2" /> Download
                </Button>
              </>
            )}
            {/* {document.status === "not_uploaded" && (
            <Button variant="outline" size="sm" onClick={onUpload} className="flex-1">
            <Upload className="w-4 h-4 mr-2" /> Upload
            </Button>
            )} */}
          </div>
        </div>
      </CardContent>
    </Card >
  )
}

