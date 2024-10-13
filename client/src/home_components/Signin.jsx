import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export default function SignIn() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    console.log('Sign In CLicked!');
    navigate('/login'); // Navigate to the login page on click
  };

  const handleCreateEvent = () => {
    // logic for creating an event here
    console.log('Create Event clicked');
    navigate('./login')
  };

  return (
    <div className="flex items-center space-x-6 min-w-fit">
      <Button onClick={handleSignIn}>Sign In</Button>
      <Button onClick={handleCreateEvent}>Create an event</Button>
    </div>
  );
}
