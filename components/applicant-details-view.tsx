import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Download,
  Upload,
  Star,
  Check,
  List,
  X,
  FileText,
  AlertCircle,
  GraduationCap,
} from "lucide-react"
import DocumentPreviewModal from "./document-preview-modal"
import ReviewCard from "./review-card"
import DocumentCard from "./document-card"
import DetailedReviewModal from "./detailed-review-modal"
import { TUser } from "@/utils/types/user"
import { EDUCTATION_LEVELS, JOB_ROLES, MAX_EDUCATION_LEVEL } from "@/lib/constant"
import { formatEnglishToBangalNum } from "@/utils/formatEtoBLang"
import ApplicantReviews from "@/app/applicant/[applicantId]/Reviews"

export default function ApplicantDetailsView({ applicant }: { applicant: TUser }) {
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [isDetailedReviewOpen, setIsDetailedReviewOpen] = useState(false)

  const requiredDocuments = [
    { id: "DOC001", name: "NID Card", status: "verified", thumbnail: "/placeholder.svg?height=100&width=100" },
    { id: "DOC002", name: "Certificate", status: "pending", thumbnail: "/placeholder.svg?height=100&width=100" },
    {
      id: "DOC003",
      name: "Driving License",
      status: "not_uploaded",
      thumbnail: "/placeholder.svg?height=100&width=100",
    },
  ]

  const additionalDocuments = [
    { id: "ADD001", name: "Chairman Certificate", status: "not_uploaded" },
    { id: "ADD002", name: "Port Entry Permit", status: "verified" },
  ]

  const reviews = [
    { id: 1, employer: "Tech Co", rating: 4.5, comment: "Excellent problem-solving skills and team player." },
    {
      id: 2,
      employer: "Innovate Inc",
      rating: 4.8,
      comment: "Highly recommended. Great work ethic and communication.",
    },
  ]

  const detailedReview = {
    summary:
      "John Doe is a highly skilled and experienced software engineer with strong background in web development. His technical expertise, coupled excellent communication skills proven track record of successful project deliveries, makes him candidate for the position.",
    strengths: [
      "Extensive experience with React and Node.js",
      "Strong problem-solving skills",
      "Excellent team player with great communication skills",
      "Proven track record of delivering high-quality projects on time",
    ],
    areasForImprovement: [
      "Could benefit from more experience with cloud technologies",
      "May need to expand knowledge of mobile development frameworks",
    ],
    overallRating: 4.7,
  }

  return (
    <div className="container mx-auto p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">আবেদনকারীর বিস্তারিত তথ্য</h1>
        <div className="flex space-x-2">
          <Button onClick={() => console.log("Accepted")} className="bg-green-500 hover:bg-green-600">
            <Check className="mr-2 h-4 w-4" /> গ্রহন করুন
          </Button>
          <Button
            onClick={() => console.log("Shortlisted")}
            variant="outline"
            className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
          >
            <List className="mr-2 h-4 w-4" /> শর্টলিস্ট করুন
          </Button>
          <Button
            onClick={() => console.log("Rejected")}
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            <X className="mr-2 h-4 w-4" /> বাতিল করুন
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Professional Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-green-600">ব্যক্তিগত তথ্য</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={applicant.profilePhoto} alt="Applicant" />
                <AvatarFallback className="text-3xl">
                  {applicant.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-semibold">{applicant.name}</h2>
                <p className="text-gray-500">{JOB_ROLES[Number(applicant.role)].label}</p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <p className="flex items-center">
                <Briefcase className="mr-2 text-green-500" /> {formatEnglishToBangalNum(applicant.yearsOfExperience)} বছরের অভিজ্ঞতা
              </p>
              <p className="flex items-center">
                <GraduationCap className="mr-2 text-green-500" /> {EDUCTATION_LEVELS[Number(applicant.maxEducationLevel)].label}
              </p>
              <p className="flex items-center">
                <MapPin className="mr-2 text-green-500" /> {applicant.division}
              </p>
              {/* <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">Node.js</Badge>
                <Badge variant="secondary">Python</Badge>
              </div> */}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">যোগাযোগের তথ্য</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {applicant.email && (
                <p className="flex items-center">
                  <Mail className="mr-2 text-green-500" /> {applicant.email}
                </p>
              )}
              {applicant.phone && (
                <p className="flex items-center">
                  <Phone className="mr-2 text-green-500" /> {formatEnglishToBangalNum(applicant.phone)}
                </p>
              )}
              {applicant.division && (
                <p className="flex items-center">
                  <MapPin className="mr-2 text-green-500" /> {applicant.division + ", " + applicant.district}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Required Documents */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="text-green-600">প্রয়োজনীয় নথিপত্র</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <DocumentCard
                key="DOC001"
                document={{
                  name: "জাতীয় পরিচয়পত্র",
                  status: applicant.nidCopy ? "verified" : "not_uploaded",
                  thumbnail: applicant.nidCopy,
                }}
              />
              <DocumentCard
                key="DOC001"
                document={{
                  name: "সার্টিফিকেট",
                  status: applicant.maxEducationLevelCertificateCopy ? "verified" : "not_uploaded",
                  thumbnail: applicant.maxEducationLevelCertificateCopy,
                }}
              />
              <DocumentCard
                key="DOC001"
                document={{
                  name: "ড্রাইভিং লাইসেন্স",
                  status: applicant.drivingLicenseCopy ? "verified" : "not_uploaded",
                  thumbnail: applicant.drivingLicenseCopy,
                }}
              />
              {/* <DocumentCard /> */}
            </div>
          </CardContent>
        </Card>

        {/* Additional Documents */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="text-green-600">অতিরিক্ত নথিপত্র</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <DocumentCard
                key="DOC001"
                document={{
                  name: "চেয়ারম্যান সার্টিফিকেট",
                  status: applicant.chairmanCertificateCopy ? "verified" : "not_uploaded",
                  thumbnail: applicant.chairmanCertificateCopy,
                }}
              />
              <DocumentCard
                key="DOC001"
                document={{
                  name: "পোর্ট এন্ট্রি পারমিট",
                  status: applicant.portEntryPermitCopy ? "verified" : "not_uploaded",
                  thumbnail: applicant.portEntryPermitCopy,
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Reviews */}        {/* Additional Documents */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="text-green-600">রিভিউ</CardTitle>
          </CardHeader>
          <CardContent>
            <ApplicantReviews applicantId={applicant._id} />
          </CardContent>
        </Card>
      </div>

      {selectedDocument && (
        <DocumentPreviewModal document={selectedDocument} onClose={() => setSelectedDocument(null)} />
      )}

      <DetailedReviewModal
        isOpen={isDetailedReviewOpen}
        onClose={() => setIsDetailedReviewOpen(false)}
        review={detailedReview}
      />
    </div>
  )
}

