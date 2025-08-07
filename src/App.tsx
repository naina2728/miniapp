import { useState, useEffect } from 'react'
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

// API Key - replace with your actual API key
const API_KEY = '6E39A0C6-29C7-4835-8A32-EEC773059A6F'

// Transform API response to match our interface
const transformApiUser = (apiUser: any): FarcasterUser => {
  const user = apiUser.user
  return {
    id: user.fid.toString(),
    displayName: user.display_name || 'Anonymous',
    username: `@${user.username}`,
    bio: user.profile?.bio?.text || 'No bio available',
    profilePicture: user.pfp_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
    followers: user.follower_count ? user.follower_count.toLocaleString() : '0',
    following: user.following_count ? user.following_count.toLocaleString() : '0'
  }
}

function App() {
  const [currentUserIndex, setCurrentUserIndex] = useState(0)
  const [users, setUsers] = useState<FarcasterUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch users from API
  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const url = 'https://api.neynar.com/v2/farcaster/followers/reciprocal/?fid=3&limit=80'
      const options = {
        method: 'GET', 
        headers: {
          'x-api-key': API_KEY
        }
      }

      const response = await fetch(url, options)
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.users && Array.isArray(data.users)) {
        const transformedUsers = data.users.map(transformApiUser)
        setUsers(transformedUsers)
      } else {
        setUsers([])
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      setError('Failed to load users. Please try again later.')
      // Fallback to empty array
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSwipe = (direction: 'left' | 'right') => {
    // For now, just move to next user
    // Later this can be integrated with actual swipe logic
    if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading users...</h2>
          <p className="text-gray-600">Fetching profiles from Farcaster</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchUsers}
            className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // No users state
  if (users.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No users found</h2>
          <p className="text-gray-600">No reciprocal followers available at the moment.</p>
        </div>
      </div>
    )
  }

  // End of users state
  if (currentUserIndex >= users.length) {
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

  const currentUser = users[currentUserIndex]

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
        {/* <div className="flex justify-center mt-4">
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
        </div> */}
      </div>
    </div>
  )
}

export default App
