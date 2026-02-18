"use client"

import React, { useEffect, useRef, useState } from "react"
import { createClient } from "@/utils/supabase/client"

const ACCENT = '#38bdf8'
const SURFACE = '#0a0f14'
const BORDER = '#0e2233'
const MUTED = '#4a7a9b'
const TEXT = '#f0f8ff'

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
    ; (async () => {
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
          objectType,
          photoName: photoFile?.name ?? null,
          savedAt: new Date().toISOString(),
        }
        localStorage.setItem(`profile_${user.id}`, JSON.stringify(payload))
        localStorage.setItem(`profile_completed_${user.id}`, "1")
        setOpen(false)
      } catch {
        // noop
      }
    })()
  }

  if (loading || !open) return null

  const inputStyle: React.CSSProperties = {
    width: '100%', background: '#050e18', border: `1px solid ${BORDER}`,
    borderRadius: 10, padding: '10px 14px', color: TEXT, fontSize: 14,
    outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 12, fontWeight: 600,
    color: MUTED, marginBottom: 6, letterSpacing: 0.3,
    textTransform: 'uppercase',
  }

  return (
    /* Backdrop */
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 16,
    }}>
      {/* Modal card */}
      <div style={{
        width: '100%', maxWidth: 480,
        background: SURFACE,
        border: `1px solid ${BORDER}`,
        borderRadius: 20,
        padding: '28px 28px 24px',
        boxShadow: `0 0 0 1px ${ACCENT}22, 0 24px 60px rgba(0,0,0,0.6)`,
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
      }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: ACCENT,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15,
              }}>✨</div>
              <span style={{ fontWeight: 900, fontSize: 16, color: TEXT, letterSpacing: '-0.3px' }}>
                sentient<span style={{ color: ACCENT }}>.</span>
              </span>
            </div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: TEXT }}>
              Set up your object
            </h2>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: MUTED }}>
              Tell the world what kind of object you are 🌍
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: MUTED, fontSize: 18, lineHeight: 1, padding: 4,
              borderRadius: 6, transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
            onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
          >✕</button>
        </div>

        {/* Avatar preview + upload */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: '#050e18', border: `2px dashed ${BORDER}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden', flexShrink: 0,
          }}>
            {photoPreview
              ? <img src={photoPreview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <span style={{ fontSize: 28 }}>📷</span>
            }
          </div>
          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={{
                background: `${ACCENT}18`, border: `1px solid ${ACCENT}44`,
                color: ACCENT, cursor: 'pointer', fontWeight: 600,
                fontSize: 13, padding: '7px 16px', borderRadius: 20,
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { const b = e.currentTarget; b.style.background = ACCENT; b.style.color = '#000' }}
              onMouseLeave={e => { const b = e.currentTarget; b.style.background = `${ACCENT}18`; b.style.color = ACCENT }}
            >
              Upload photo
            </button>
            <div style={{ fontSize: 11, color: MUTED, marginTop: 5 }}>
              {photoFile?.name ?? 'JPG, PNG or GIF · max 5MB'}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
          </div>
        </div>

        {/* Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          <div>
            <label style={labelStyle}>Your name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Cuppa Joe, Chairles..."
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = ACCENT)}
              onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
            />
          </div>

          <div>
            <label style={labelStyle}>What type of object are you?</label>
            <input
              value={objectType}
              onChange={e => setObjectType(e.target.value)}
              placeholder="e.g. Lamp, Chair, Mug, Umbrella..."
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = ACCENT)}
              onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
            />
          </div>

          <div>
            <label style={labelStyle}>Gender</label>
            <select
              value={gender}
              onChange={e => setGender(e.target.value)}
              style={{ ...inputStyle, cursor: 'pointer' }}
              onFocus={e => (e.currentTarget.style.borderColor = ACCENT)}
              onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
            >
              <option value="" style={{ background: '#0a0f14' }}>Select...</option>
              <option value="male" style={{ background: '#0a0f14' }}>Male</option>
              <option value="female" style={{ background: '#0a0f14' }}>Female</option>
              <option value="other" style={{ background: '#0a0f14' }}>Other</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Bio</label>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="A short description of your object's personality..."
              rows={3}
              style={{ ...inputStyle, resize: 'none', lineHeight: 1.5 }}
              onFocus={e => (e.currentTarget.style.borderColor = ACCENT)}
              onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
            />
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10, marginTop: 22, justifyContent: 'flex-end' }}>
          <button
            onClick={() => setOpen(false)}
            style={{
              background: 'none', border: `1px solid ${BORDER}`,
              color: MUTED, cursor: 'pointer', fontWeight: 600,
              fontSize: 13, padding: '9px 20px', borderRadius: 20,
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { const b = e.currentTarget; b.style.borderColor = MUTED; b.style.color = TEXT }}
            onMouseLeave={e => { const b = e.currentTarget; b.style.borderColor = BORDER; b.style.color = MUTED }}
          >
            Skip for now
          </button>
          <button
            onClick={handleSave}
            style={{
              background: ACCENT, border: 'none',
              color: '#000', cursor: 'pointer', fontWeight: 700,
              fontSize: 13, padding: '9px 24px', borderRadius: 20,
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Let&apos;s go ✨
          </button>
        </div>
      </div>
    </div>
  )
}
