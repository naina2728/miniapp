import { useState } from 'react'
import './App.css'

// Types for Farcaster user data
interface FarcasterUser {
  id: string
  displayName: string
  username: string
  bio: string
  profilePicture: string
  followers: string
  following: string
}

// Placeholder data
const mockUsers: FarcasterUser[] = [
  {
    id: '1',
    displayName: 'Naina',
    username: '@naina',
    bio: 'Building the future of social media on Farcaster. Love exploring new protocols and meeting amazing people in the space!',
    profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    followers: '1.2K',
    following: '890'
  },
  {
    id: '2',
    displayName: 'Alex Chen',
    username: '@alexchen',
    bio: 'Web3 developer and crypto enthusiast. Building decentralized applications and exploring the future of the internet.',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    followers: '3.4K',
    following: '1.2K'
  },
  {
    id: '3',
    displayName: 'Sarah Kim',
    username: '@sarahkim',
    bio: 'Designer and artist. Creating beautiful experiences in the digital world. Always learning and growing.',
    profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    followers: '2.1K',
    following: '567'
  },
  {
    id: '4',
    displayName: 'Mike Johnson',
    username: '@mikejohnson',
    bio: 'Product manager and startup founder. Passionate about building products that make a difference in people\'s lives.',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    followers: '5.6K',
    following: '2.3K'
  }
]

function App() {
  const [currentUserIndex, setCurrentUserIndex] = useState(0)
  const [users, setUsers] = useState<FarcasterUser[]>(mockUsers)

  const handleSwipe = (direction: 'left' | 'right') => {
    // For now, just move to next user
    // Later this can be integrated with actual swipe logic
    if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1)
    }
  }

  const currentUser = users[currentUserIndex]

  if (users.length === 0 || currentUserIndex >= users.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No more users to show</h2>
          <p className="text-gray-600">Check back later for new profiles!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          {/* Profile Picture */}
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-100">
              <img 
                src={currentUser.profilePicture} 
                alt={currentUser.displayName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'
                }}
              />
            </div>
          </div>

          {/* Display Name */}
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">
            {currentUser.displayName}
          </h1>

          {/* Username */}
          <p className="text-gray-500 text-center mb-4">
            {currentUser.username}
          </p>

          {/* Bio */}
          <p className="text-gray-700 text-center mb-6 leading-relaxed line-clamp-3">
            {currentUser.bio}
          </p>

          {/* Stats */}
          <div className="flex justify-center space-x-8 mb-6">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">
                {currentUser.followers}
              </div>
              <div className="text-sm text-gray-500">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">
                {currentUser.following}
              </div>
              <div className="text-sm text-gray-500">Following</div>
            </div>
          </div>
        </div>

        {/* Swipe Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => handleSwipe('left')}
            className="w-16 h-16 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
          >
            <span className="text-2xl">❌</span>
          </button>
          <button
            onClick={() => handleSwipe('right')}
            className="w-16 h-16 bg-white hover:bg-pink-50 border-2 border-pink-200 rounded-full flex items-center justify-center transition-colors duration-200"
          >
            <span className="text-2xl">❤️</span>
          </button>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center mt-4">
          <div className="flex space-x-1">
            {users.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentUserIndex ? 'bg-purple-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
