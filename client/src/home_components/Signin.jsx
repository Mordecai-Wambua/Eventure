// Sign In & Create Event Button on Navigation Bar
import { Button } from "@/components/ui/button";


export default function SignIn() {
  return (
    <div className="flex space-x-6 min-w-fit">
        <h1 className="mt-2">Sign In</h1>
        <Button>Create an event</Button>
    </div>
  )
}
