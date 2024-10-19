import { Smile } from 'lucide-react';

function SendInvites() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-400 p-10">
      <div className="bg-white p-10 rounded-full shadow-lg mb-6">
        <Smile size={100} color="#4A90E2" />
      </div>
      <h2 className="text-3xl font-bold text-white">Feature Coming Soon</h2>
    </div>
  );
}

export default SendInvites;
