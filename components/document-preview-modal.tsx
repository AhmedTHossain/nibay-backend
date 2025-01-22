import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, CheckCircle, AlertCircle, Clock } from "lucide-react"

interface DocumentPreviewModalProps {
  document: {
    id: string
    name: string
    status: "verified" | "pending" | "not_uploaded"
    thumbnail?: string
  }
  onClose: () => void
}

export default function DocumentPreviewModal({ document, onClose }: DocumentPreviewModalProps) {
  if (!document) return null

  const getStatusBadge = () => {
    switch (document.status) {
      // case "verified":
      //   return (
      //     <Badge variant="success">
      //       <CheckCircle className="w-3 h-3 mr-1" /> Verified
      //     </Badge>
      //   )
      // case "pending":
      //   return (
      //     <Badge variant="warning">
      //       <Clock className="w-3 h-3 mr-1" /> Pending
      //     </Badge>
      //   )
      case "not_uploaded":
        return (
          <Badge variant="destructive">
            <AlertCircle className="w-3 h-3 mr-1" /> Not Uploaded
          </Badge>
        )
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{document.name}</span>
            {getStatusBadge()}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center">
          <img
            src={document.thumbnail || "/placeholder.svg"}
            alt={document.name}
            className="w-full h-auto max-h-[400px] object-contain mb-4"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => console.log(`Downloading ${document.name}`)}>
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

