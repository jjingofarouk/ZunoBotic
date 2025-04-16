import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Thank You | ZunoBotics",
  description: "Thank you for your donation to ZunoBotics",
}

export default function ThankYouPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Use optional chaining to safely access properties
  const sessionId = searchParams?.session_id
  const provider = searchParams?.provider as string
  const isMock = searchParams?.mock === "true"

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h1 className="mb-4 text-3xl font-bold">Thank You for Your Support!</h1>
        <p className="mb-8 text-gray-600">
          Your donation will help us democratize robotics and automation technology across Africa.
          {!isMock && " We've sent a receipt to your email."}
        </p>
        {provider === "paypal" && (
          <p className="mb-6 text-gray-600">
            Your PayPal donation has been successfully processed.
          </p>
        )}
        {isMock && (
          <div className="mb-8 rounded-md bg-blue-50 p-4 text-sm text-blue-800">
            <p>
              <strong>Preview Mode:</strong> This is a simulated donation. In production, you would be redirected to
              Stripe for payment processing.
            </p>
          </div>
        )}
        <div className="space-y-4">
          <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
            <Link href="/">Return to Homepage</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/projects">Explore Projects</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}


// import type { Metadata } from "next"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { CheckCircle } from "lucide-react"

// export const metadata: Metadata = {
//   title: "Thank You | ZunoBotics",
//   description: "Thank you for your donation to ZunoBotics",
// }

// export default function ThankYouPage({
//   searchParams,
// }: {
//   searchParams: { [key: string]: string | string[] | undefined }
// }) {
//   const sessionId = searchParams.session_id
//   const isMock = searchParams.mock === "true"

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
//       <div className="mx-auto max-w-md text-center">
//         <div className="mb-6 flex justify-center">
//           <div className="rounded-full bg-green-100 p-3">
//             <CheckCircle className="h-12 w-12 text-green-600" />
//           </div>
//         </div>
//         <h1 className="mb-4 text-3xl font-bold">Thank You for Your Support!</h1>
//         <p className="mb-8 text-gray-600">
//           Your donation will help us democratize robotics and automation technology across Africa.
//           {!isMock && " We've sent a receipt to your email."}
//         </p>
//         {isMock && (
//           <div className="mb-8 rounded-md bg-blue-50 p-4 text-sm text-blue-800">
//             <p>
//               <strong>Preview Mode:</strong> This is a simulated donation. In production, you would be redirected to
//               Stripe for payment processing.
//             </p>
//           </div>
//         )}
//         <div className="space-y-4">
//           <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
//             <Link href="/">Return to Homepage</Link>
//           </Button>
//           <Button asChild variant="outline" className="w-full">
//             <Link href="/projects">Explore Projects</Link>
//           </Button>
//         </div>
//       </div>
//     </main>
//   )
// }
