'use client'

import { useState } from 'react'
import AuthLayout from '@/app/components/AuthLayout'

export default function PickYourProfilePage() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    bio: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // TODO: Add logic to save profile data
      // Then redirect to /home
      console.log('Profile data:', formData)
      // window.location.href = '/home'
    } catch (error) {
      console.error('Error saving profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Complete Your Profile"
      subtitle={
        <>
          Let us know more about you to personalize your experience
        </>
      }
    >
      <form className="mt-8 space-y-5 group" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="relative">
            <label htmlFor="fullName" className="sr-only">
              Full Name
            </label>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" fill="currentColor" viewBox="0 0 20 20">
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
              className="relative block w-full px-4 py-3.5 pl-11 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm hover:border-gray-300"
              placeholder="Full Name"
            />
          </div>

          <div className="relative">
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" fill="currentColor" viewBox="0 0 20 20">
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
              className="relative block w-full px-4 py-3.5 pl-11 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm hover:border-gray-300"
              placeholder="Username"
            />
          </div>

          <div className="relative">
            <label htmlFor="bio" className="sr-only">
              Bio
            </label>
            <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
              </svg>
            </div>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              className="relative block w-full px-4 py-3.5 pl-11 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm hover:border-gray-300 resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>

        <div className="relative pt-2">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-xl blur opacity-60 group-hover:opacity-80 transition-all duration-300"></div>
          <button
            type="submit"
            disabled={isLoading}
            className="relative w-full px-4 py-3.5 rounded-xl bg-white text-blue-600 font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn border border-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 text-black">
              {isLoading ? 'Saving...' : 'Continue'}
            </span>
            <svg className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}
