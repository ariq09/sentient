'use client'

import { useState, useRef } from 'react'
import { ThemeToggle } from '@/app/components/ThemeToggle'

export default function PickYourProfilePage() {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [selectedObject, setSelectedObject] = useState<string>('')
  const [formData, setFormData] = useState({ username: '' })
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const objectOptions = [
    { id: 'lamp',   name: 'Lamp',   icon: '/bulb.svg' },
    { id: 'plant',  name: 'Plant',  icon: '/plant.svg' },
    { id: 'book',   name: 'Book',   icon: '/book.svg' },
    { id: 'camera', name: 'Camera', icon: '/camera.svg' },
    { id: 'window', name: 'Window', icon: '/window.svg' },
    { id: 'globe',  name: 'Globe',  icon: '/globe.svg' },
    { id: 'file',   name: 'File',   icon: '/file.svg' },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPhotoPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.username || !photoPreview) {
      alert('Please fill in your username and upload a photo.')
      return
    }
    if (!selectedObject) {
      alert('Please choose an object to become.')
      return
    }

    setIsLoading(true)

    try {
      const selectedOption = objectOptions.find(opt => opt.id === selectedObject)
      const iconValue = selectedOption ? selectedOption.icon : null

      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          image: photoPreview,
          icon: iconValue,
        }),
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error || 'Failed to save profile')

      window.location.href = `/myprofile/${data.profileId}`
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred while saving your profile')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--app-bg)] py-12 px-4 font-sans">

      {/* Background glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#6366F1]/8 blur-[140px] rounded-full pointer-events-none" />

      {/* Theme toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <a href="/" className="text-[#6366F1] font-bold text-lg font-display">sentient</a>
          <h1 className="text-3xl font-bold text-[var(--app-text)] mt-4 mb-2 font-display">
            Become your object
          </h1>
          <p className="text-[var(--app-text-2)] text-sm">
            Set up your profile — choose who you are from the other side of the shelf.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Photo Upload */}
          <div className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-6">
            <h2 className="text-base font-semibold text-[var(--app-text)] mb-5">Profile photo</h2>
            <div className="flex items-center gap-6">
              <div
                className="w-24 h-24 rounded-full overflow-hidden border-2 border-[var(--app-border)] bg-[var(--app-elevated)] flex items-center justify-center flex-shrink-0 cursor-pointer hover:border-[#6366F1] transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-10 h-10 text-[var(--app-text-3)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div>
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
                  className="px-5 py-2.5 bg-[var(--app-elevated)] border border-[var(--app-border)] text-[var(--app-text)] text-sm font-medium rounded-xl hover:border-[#6366F1] hover:text-[#6366F1] transition-colors"
                >
                  Upload photo
                </button>
                <p className="text-xs text-[var(--app-text-3)] mt-2">JPG, PNG or GIF · max 5 MB</p>
              </div>
            </div>
          </div>

          {/* Username */}
          <div className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-6">
            <h2 className="text-base font-semibold text-[var(--app-text)] mb-5">Your identity</h2>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[var(--app-text-2)] mb-1.5">
                Username <span className="text-[#6366F1]">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-[var(--app-text-3)] text-sm pointer-events-none">@</span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full pl-8 pr-4 py-3 rounded-xl bg-[var(--app-elevated)] border border-[var(--app-border)] text-[var(--app-text)] placeholder:text-[var(--app-text-3)] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all text-sm"
                  placeholder="chairlin"
                />
              </div>
            </div>
          </div>

          {/* Object selection */}
          <div className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-6">
            <h2 className="text-base font-semibold text-[var(--app-text)] mb-1.5">What do you want to be?</h2>
            <p className="text-sm text-[var(--app-text-2)] mb-5">Choose the object that represents you.</p>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
              {objectOptions.map((obj) => (
                <button
                  key={obj.id}
                  type="button"
                  onClick={() => setSelectedObject(obj.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                    selectedObject === obj.id
                      ? 'border-[#6366F1] bg-[#6366F1]/10 shadow-md shadow-[#6366F1]/10'
                      : 'border-[var(--app-border)] bg-[var(--app-elevated)] hover:border-[#6366F1]/50'
                  }`}
                >
                  <img src={obj.icon} alt={obj.name} className="w-8 h-8 object-contain" />
                  <span className={`text-xs font-medium ${selectedObject === obj.id ? 'text-[#6366F1]' : 'text-[var(--app-text-2)]'}`}>
                    {obj.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 rounded-2xl bg-[#6366F1] text-white font-semibold text-base hover:bg-[#818CF8] transition-colors shadow-lg shadow-[#6366F1]/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving your profile...' : 'Complete profile & enter'}
          </button>

        </form>
      </div>
    </div>
  )
}
