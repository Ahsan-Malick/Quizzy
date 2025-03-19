import { AlertCircle, ArrowRight } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Button } from "../Button"
import { useStore } from "../../store/store";
import { useNavigate } from "react-router-dom";


export default function DuplicateEmailError() {
  const navigate = useNavigate();
  const email = useStore((state) => state.userDetail?.email);
  const directToDashboard = () => {
    navigate("/welcome");
  }
  return (
    <Alert variant="destructive" className="max-w-md mx-auto mt-10">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle className="mb-2">Subscription Error</AlertTitle>
      <AlertDescription className="space-y-3">
        <p>
          The email address <span className="font-semibold">{email}</span> is already associated with an active
          subscription.
        </p>
        <div className="flex items-center justify-between">
          <p className="text-sm text-red-800">Please use a different email.</p>
          <Button
            variant="outline"
            size="sm"
            className="bg-white text-red-600 border-red-600 hover:bg-red-50"
            onClick={directToDashboard}
          >
            Go to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}

