import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { InfoIcon } from "lucide-react"

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl md:text-3xl font-bold">Privacy Policy</CardTitle>
          <CardDescription>Last updated: {new Date().toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="border-primary/50 bg-primary/10">
            <InfoIcon className="h-5 w-5" />
            <AlertTitle className="font-medium">Coming Soon</AlertTitle>
            <AlertDescription>
              Our comprehensive privacy policy is currently being finalized. The information below is preliminary and
              will be updated soon.
            </AlertDescription>
          </Alert>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Introduction</h2>
            <p className="text-muted-foreground">
              This privacy policy outlines how we collect, use, and protect your personal information when you use our
              service. We are committed to ensuring the privacy and security of your data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Information We Collect</h2>
            <p className="text-muted-foreground">
              We collect basic information necessary to provide our services, including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Contact information (name, email)</li>
              <li>Usage data and analytics</li>
              <li>Device and browser information</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">How We Use Your Information</h2>
            <p className="text-muted-foreground">Your information helps us to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Provide and improve our services</li>
              <li>Communicate with you about updates</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Data Security</h2>
            <p className="text-muted-foreground">
              We implement appropriate security measures to protect your personal information from unauthorized access,
              alteration, or disclosure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about our privacy practices, please contact us at:
            </p>
            <p className="font-medium">ahsanjaved74@yahoo.com</p>
          </section>

          <div className="border-t pt-4 mt-6">
            <p className="text-sm text-muted-foreground italic">
              Note: This is a preliminary privacy policy for our MVP. A more comprehensive policy will be published as
              our service evolves.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

