import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface DetailedReviewModalProps {
  isOpen: boolean
  onClose: () => void
  review: {
    summary: string
    strengths: string[]
    areasForImprovement: string[]
    overallRating: number
  }
}

export default function DetailedReviewModal({ isOpen, onClose, review }: DetailedReviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-700">Detailed Review</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Summary</h3>
            <p>{review.summary}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Strengths</h3>
            <ul className="list-disc pl-5">
              {review.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Areas for Improvement</h3>
            <ul className="list-disc pl-5">
              {review.areasForImprovement.map((area, index) => (
                <li key={index}>{area}</li>
              ))}
            </ul>
          </div>
          <div className="flex items-center">
            <h3 className="text-lg font-semibold mr-2">Overall Rating:</h3>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-lg font-bold">{review.overallRating.toFixed(1)}</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

