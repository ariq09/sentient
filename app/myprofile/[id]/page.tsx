import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { ThemeToggle } from '@/app/components/ThemeToggle'

export const dynamic = 'force-dynamic'

const postProfileComment = async (formData: FormData) => {
  'use server'
  const commentText = formData.get('comment')
  const statusId = formData.get('status_id')
  const userId = formData.get('user_id')
  const profileId = formData.get('profile_id')

  if (!commentText || !statusId || !userId || !profileId) return

  const supabaseClient = await createClient()
  await supabaseClient.from('comments').insert({
    status_id: parseInt(statusId.toString(), 10),
    user_id: parseInt(userId.toString(), 10),
    comment: commentText.toString()
  })

  revalidatePath(`/myprofile/${profileId.toString()}`)
}

interface Profile {
  id: string
  name: string
  photo_url: string
  icon: string | null
  created_at: string
}

export default async function MyProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const supabase = await createClient()

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !profile) redirect('/pickyourprofile')

  const profileData: Profile = profile

  const { data: { user } } = await supabase.auth.getUser()
  const { data: profilesData } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
  const allProfiles = profilesData || []
  const currentUserProfile = user ? allProfiles.find(p => p.auth_id === user.id) : null

  const { data: statusesData } = await supabase
    .from('statuses')
    .select(`
        *,
        comments (
            *,
            profiles:user_id (
                id,
                name,
                photo_url,
                icon
            )
        )
    `)
    .eq('user_id', id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-[var(--app-bg)] text-[var(--app-text)] font-sans">

      {/* Top navbar */}
      <header className="sticky top-0 z-40 bg-[var(--app-bg)]/90 backdrop-blur-sm border-b border-[var(--app-border)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/feed" className="text-[var(--app-text-2)] hover:text-[var(--app-text)] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </a>
            <a href="/" className="text-lg font-bold text-[#6366F1] font-display tracking-tight">
              sentient
            </a>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">

        {/* Profile header card */}
        <div className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl overflow-hidden mb-6">

          {/* Gradient cover */}
          <div className="h-28 bg-gradient-to-r from-[#6366F1]/30 via-[#818CF8]/20 to-[#A5B4FC]/10" />

          {/* Avatar + info */}
          <div className="px-6 pb-6">
            <div className="flex items-end gap-4 -mt-10 mb-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-[var(--app-surface)] flex-shrink-0">
                <img
                  src={profileData.photo_url}
                  alt={profileData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {profileData.icon && (
                <div className="w-8 h-8 mb-1 flex-shrink-0">
                  <img src={profileData.icon} alt="Object icon" className="w-full h-full object-contain" />
                </div>
              )}
            </div>

            <h1 className="text-2xl font-bold text-[var(--app-text)] font-display mb-1">
              @{profileData.name}
            </h1>
            <p className="text-sm text-[var(--app-text-2)]">
              Joined {new Date(profileData.created_at).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </p>

            <div className="mt-4">
              <a
                href="/feed"
                className="inline-flex items-center gap-2 px-5 py-2 bg-[#6366F1] text-white text-sm font-semibold rounded-xl hover:bg-[#818CF8] transition-colors"
              >
                Back to Feed
              </a>
            </div>
          </div>
        </div>

        {/* Broadcasts */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-base font-semibold text-[var(--app-text)]">Broadcasts</h2>
            <span className="text-xs bg-[#6366F1]/10 text-[#6366F1] px-2.5 py-0.5 rounded-full font-medium">
              {statusesData?.length || 0}
            </span>
          </div>

          <div className="space-y-4">
            {statusesData && statusesData.length > 0 ? (
              statusesData.map((statusItem: any) => (
                <div
                  key={statusItem.status_id}
                  className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-5 hover:border-[#6366F1]/30 transition-colors"
                >
                  {/* Post header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full overflow-hidden border border-[var(--app-border)] flex-shrink-0">
                      <img src={profileData.photo_url} alt={profileData.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[var(--app-text)]">@{profileData.name}</p>
                      <p suppressHydrationWarning className="text-xs text-[var(--app-text-3)]">
                        {new Date(statusItem.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Post body */}
                  <p className="text-[var(--app-text)] text-sm leading-relaxed whitespace-pre-wrap mb-5">
                    {statusItem.status}
                  </p>

                  {/* Comments */}
                  <div className="border-t border-[var(--app-border)] pt-4 flex flex-col gap-3">

                    {/* Comment input */}
                    <form action={postProfileComment} className="flex gap-2 items-center">
                      <input type="hidden" name="user_id" value={currentUserProfile?.id || ''} />
                      <input type="hidden" name="status_id" value={statusItem.status_id} />
                      <input type="hidden" name="profile_id" value={id} />

                      {currentUserProfile && (
                        <div className="w-7 h-7 rounded-full overflow-hidden border border-[var(--app-border)] flex-shrink-0">
                          <img src={currentUserProfile.photo_url || ''} alt="You" className="w-full h-full object-cover" />
                        </div>
                      )}

                      <input
                        type="text"
                        name="comment"
                        required
                        placeholder="Reply..."
                        disabled={!currentUserProfile}
                        className="flex-1 bg-[var(--app-elevated)] border border-[var(--app-border)] rounded-full py-2 px-4 text-xs text-[var(--app-text)] focus:outline-none focus:ring-1 focus:ring-[#6366F1] transition-all placeholder:text-[var(--app-text-3)] disabled:opacity-40"
                      />
                      <button
                        type="submit"
                        disabled={!currentUserProfile}
                        className="px-3 py-2 bg-[var(--app-elevated)] border border-[var(--app-border)] text-[var(--app-text-2)] text-xs font-semibold rounded-full hover:border-[#6366F1] hover:text-[#6366F1] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Reply
                      </button>
                    </form>

                    {/* Existing comments */}
                    {statusItem.comments &&
                      [...statusItem.comments]
                        .sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                        .map((comment: any) => (
                          <div key={comment.comment_id} className="flex gap-3 bg-[var(--app-elevated)] rounded-xl p-3">
                            <div className="w-7 h-7 rounded-full overflow-hidden border border-[var(--app-border)] flex-shrink-0">
                              <img
                                src={comment.profiles?.photo_url || ''}
                                alt={comment.profiles?.name || 'User'}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="font-semibold text-xs text-[var(--app-text)]">@{comment.profiles?.name || 'Unknown'}</span>
                                <span suppressHydrationWarning className="text-[10px] text-[var(--app-text-3)]">
                                  {new Date(comment.created_at).toLocaleString()}
                                </span>
                              </div>
                              <p className="text-xs text-[var(--app-text-2)] leading-relaxed">{comment.comment}</p>
                            </div>
                          </div>
                        ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-12 text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--app-elevated)] flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💭</span>
                </div>
                <p className="text-[var(--app-text-2)] text-sm">No broadcasts from this object yet.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
