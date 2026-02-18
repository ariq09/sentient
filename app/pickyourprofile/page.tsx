'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

export default function PickYourProfilePage() {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [selectedObject, setSelectedObject] = useState<string>('')
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    bio: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const objectOptions = [
    { id: 'lamp', name: 'Lamp', icon: '💡' },
    { id: 'phone', name: 'Phone', icon: '📱' },
    { id: 'computer', name: 'Computer', icon: '💻' },
    { id: 'watch', name: 'Watch', icon: '⌚' },
    { id: 'plant', name: 'Plant', icon: '🌱' },
    { id: 'book', name: 'Book', icon: '📚' },
    { id: 'camera', name: 'Camera', icon: '📷' },
    { id: 'speaker', name: 'Speaker', icon: '🔊' },
  ]

  const interestOptions = [
    'Technology',
    'Art',
    'Music',
    'Gaming',
    'Sports',
    'Travel',
    'Food',
    'Fashion',
    'Nature',
    'Reading',
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // TODO: Add logic to save profile data including photo, object, and interests
      console.log('Profile data:', {
        ...formData,
        selectedObject,
        selectedInterests,
        photo: photoPreview,
      })
      // window.location.href = '/home'
    } catch (error) {
      console.error('Error saving profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Complete Your Profile</h1>
          <p className="text-lg text-gray-600">Let us know more about you to personalize your experience</p>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Photo Upload Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Photo</h2>
            <div className="flex flex-col items-center gap-6">
              {/* Photo Preview */}
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-200 bg-gray-100 flex items-center justify-center flex-shrink-0">
                {photoPreview ? (
                  <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                  </svg>
                )}
              </div>

              {/* Upload Button */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Upload Photo
              </button>
              <p className="text-sm text-gray-500">JPG, PNG or GIF (max 5MB)</p>
            </div>
          </div>

          {/* Basic Info Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
            <div className="space-y-5">
              <div className="relative">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="absolute inset-y-0 left-4 top-9 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 pl-11 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="John Doe"
                />
              </div>

              <div className="relative">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="absolute inset-y-0 left-4 top-9 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 9.5a1.5 1.5 0 11-3 0v-.5h-2v.5a1.5 1.5 0 11-3 0v-.5H8v.5a1.5 1.5 0 11-3 0v-.5H2v.5A1.5 1.5 0 012 11h.5v2H2a2 2 0 002 2h1.5v2.5H5a2 2 0 002 2h1.5V16H10v2.5h1.5a2 2 0 002-2h-.5v-2H16a2 2 0 002-2v-2h.5a1.5 1.5 0 001.5-1.5v-.5z"></path>
                  </svg>
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 pl-11 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="johndoe"
                />
              </div>

              <div className="relative">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <div className="absolute top-10 left-4 flex items-start pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3.5 pl-11 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
          </div>

          {/* Choose Object Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">What Inanimate Object Do You Want to Be?</h2>
            <p className="text-gray-600 mb-6">Choose an object that represents your personality</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {objectOptions.map((obj) => (
                <button
                  key={obj.id}
                  type="button"
                  onClick={() => setSelectedObject(obj.id)}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${
                    selectedObject === obj.id
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <span className="text-4xl">{obj.icon}</span>
                  <span className="text-sm font-semibold text-gray-900">{obj.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Interests Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">What Do You Like?</h2>
            <p className="text-gray-600 mb-6">Select all that apply</p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-4 py-3 rounded-lg border-2 font-medium transition-all duration-300 text-center ${
                    selectedInterests.includes(interest)
                      ? 'border-blue-500 bg-blue-100 text-blue-900'
                      : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-xl blur opacity-60"></div>
            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full px-4 py-4 rounded-xl bg-white text-blue-600 font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed border border-blue-200"
            >
              <span className="text-black">
                {isLoading ? 'Saving Your Profile...' : 'Complete Profile & Continue'}
              </span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
