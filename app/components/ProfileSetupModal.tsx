"use client"

import React, { useEffect, useRef, useState } from "react"
import { createClient } from "@/utils/supabase/client"

export default function ProfileSetupModal() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState("")
  const [gender, setGender] = useState("")
  const [bio, setBio] = useState("")
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [objectType, setObjectType] = useState("")
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    let mounted = true
    async function checkUser() {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!mounted) return

        if (!user) {
          setLoading(false)
          return
        }

        const completed = localStorage.getItem(`profile_completed_${user.id}`)
        if (!completed) {
          setOpen(true)
        }
      } catch (e) {
        // ignore errors client-side
      } finally {
        if (mounted) setLoading(false)
      }
    }

    checkUser()
    // subscribe to auth changes so modal can open immediately after signup
    const supabase = createClient()
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return
      if (event === "SIGNED_IN" && session?.user) {
        const completed = localStorage.getItem(`profile_completed_${session.user.id}`)
        if (!completed) setOpen(true)
      }
    })

    return () => {
      mounted = false
      try {
        data?.subscription?.unsubscribe?.()
      } catch {
        // ignore
      }
    }
  }, [])

  useEffect(() => {
    if (!photoFile) {
      setPhotoPreview(null)
      return
    }
    const url = URL.createObjectURL(photoFile)
    setPhotoPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [photoFile])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0]
    if (file) setPhotoFile(file)
  }

  function handleSave() {
    // Save profile to localStorage (frontend-only, per request)
    ;(async () => {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) return

        const payload = {
          name,
          gender,
          bio,
          photoName: photoFile?.name ?? null,
          savedAt: new Date().toISOString(),
        }
        localStorage.setItem(`profile_${user.id}`, JSON.stringify(payload))
        localStorage.setItem(`profile_completed_${user.id}`, "1")
        setOpen(false)
        // keep modal closed — this is frontend-only storage
      } catch {
        // noop
      }
    })()
  }

  if (loading) return null

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded bg-white p-6 shadow-lg text-gray-900">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Complete your profile</h3>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-700 hover:text-gray-900"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-800">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded border px-3 py-2 text-gray-900 placeholder:text-gray-400"
                  placeholder="Write your Name here"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800">What type of Inanimate object are you</label>
                <input
                  value={objectType}
                  onChange={(e) => setObjectType(e.target.value)}
                  className="mt-1 block w-full rounded border px-3 py-2 text-gray-900 placeholder:text-gray-400"
                  placeholder="e.g., Lamp, Chair, Robot"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800">Photo</label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-blue-600 bg-blue-50 px-3 py-1 rounded"
                    >
                      Choose photo
                    </button>
                    <span className="text-sm text-gray-600">{photoFile?.name ?? 'No file chosen'}</span>
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </div>
                {photoPreview && (
                  <img src={photoPreview} alt="preview" className="mt-2 h-24 w-24 object-cover rounded" />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="mt-1 block w-full rounded border px-3 py-2 text-gray-900"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-1 block w-full rounded border px-3 py-2 text-gray-900 placeholder:text-gray-400"
                  rows={3}
                  placeholder="Short description"
                />
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => setOpen(false)}
                  className="rounded px-3 py-2 text-sm border text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="rounded bg-indigo-600 px-3 py-2 text-sm text-white hover:bg-indigo-500"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
