import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

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

  // Fetch profile data
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !profile) {
    redirect('/pickyourprofile')
  }

  const profileData: Profile = profile

  // Fetch all profiles to determine the current user (securely tracking tokens)
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profilesData } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
  const allProfiles = profilesData || []
  const currentUserProfile = user ? allProfiles.find(p => p.auth_id === user.id) : null

  // Fetch statuses written specifically by this user, including all comments
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
          {/* Profile Photo */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-200 mb-6 flex-shrink-0">
              <img
                src={profileData.photo_url}
                alt={profileData.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Username and Icon */}
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold text-gray-900">@{profileData.name}</h1>
              {profileData.icon && (
                <div className="w-10 h-10 flex-shrink-0">
                  <img
                    src={profileData.icon}
                    alt="Selected Icon"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>
          </div>




          {/* Join Date */}
          <div className="border-t border-gray-200 pt-6 mt-6 text-center">
            <p className="text-sm text-gray-500">
              Joined {new Date(profileData.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <a
            href="/feed"
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 text-center"
          >
            Go to Feed
          </a>
        </div>

        {/* User Statuses Area */}
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
            <span>Recent Broadcasts</span>
            <span className="bg-indigo-100 text-indigo-700 text-sm px-3 py-1 rounded-full">{statusesData?.length || 0}</span>
          </h2>
          <div className="space-y-5">
            {statusesData && statusesData.length > 0 ? (
              statusesData.map((statusItem: any) => (
                <div key={statusItem.status_id} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-3 border-b border-gray-50 pb-3">
                    <div className="flex items-center gap-2">
                      {profileData.icon && (
                        <div className="w-5 h-5 flex-shrink-0">
                          <img src={profileData.icon} alt="icon" className="w-full h-full object-contain" />
                        </div>
                      )}
                      <span className="text-sm font-bold text-gray-800">@{profileData.name}</span>
                    </div>
                    <span suppressHydrationWarning className="text-xs font-semibold text-gray-400">
                      {new Date(statusItem.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{statusItem.status}</p>
                  
                  {/* Comments Section for Profile View */}
                  <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col gap-3">
                    {/* Add Comment Form */}
                    <form action={postProfileComment} className="flex gap-2 items-center mb-3">
                        <input type="hidden" name="user_id" value={currentUserProfile?.id || ''} />
                        <input type="hidden" name="status_id" value={statusItem.status_id} />
                        <input type="hidden" name="profile_id" value={id} />
                        
                        <div className="relative w-8 h-8 flex-shrink-0 rounded-full border border-gray-200 overflow-hidden">
                            {currentUserProfile && (
                                <img src={currentUserProfile.photo_url || ''} alt="You" className="w-full h-full object-cover" />
                            )}
                        </div>
                        
                        <input 
                            type="text" 
                            name="comment" 
                            required 
                            placeholder="Write a comment..." 
                            disabled={!currentUserProfile}
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-full py-2 px-4 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all disabled:opacity-50"
                        />
                        <button 
                            type="submit" 
                            disabled={!currentUserProfile}
                            className="px-4 py-2 bg-blue-50 text-blue-600 text-xs font-bold rounded-full hover:bg-blue-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Reply
                        </button>
                    </form>

                    {/* Render Existing Comments */}
                    {statusItem.comments && statusItem.comments.sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()).map((comment: any) => (
                        <div key={comment.comment_id} className="flex gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100">
                            <div className="relative w-8 h-8 flex-shrink-0 rounded-full border border-gray-200 overflow-hidden">
                                <img
                                    src={comment.profiles?.photo_url || ''}
                                    alt={comment.profiles?.name || 'User'}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-xs text-gray-800">@{comment.profiles?.name || 'Unknown'}</span>
                                    <span suppressHydrationWarning className="text-[10px] text-gray-400">{new Date(comment.created_at).toLocaleString()}</span>
                                </div>
                                <p className="text-gray-600 text-xs mt-0.5 leading-relaxed">
                                    {comment.comment}
                                </p>
                            </div>
                        </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl opacity-40">💭</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">No broadcasts yet</h3>
                <p className="text-gray-500 text-sm">When this user shares a sentient thought, it will appear here safely.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
