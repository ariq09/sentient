import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { revalidatePath } from 'next/cache'

const postStatus = async (formData: FormData) => {
    'use server'
    const statusText = formData.get('status')
    const userId = formData.get('user_id')

    if (!statusText || !userId) return

    const supabaseClient = await createClient()
    await supabaseClient.from('statuses').insert({
        status_id: Date.now(),
        status: statusText.toString(),
        user_id: parseInt(userId.toString(), 10)
    })
    
    revalidatePath('/feed')
}

const postComment = async (formData: FormData) => {
    'use server'
    const commentText = formData.get('comment')
    const statusId = formData.get('status_id')
    const userId = formData.get('user_id')

    if (!commentText || !statusId || !userId) return

    const supabaseClient = await createClient()
    await supabaseClient.from('comments').insert({
        status_id: parseInt(statusId.toString(), 10),
        user_id: parseInt(userId.toString(), 10),
        comment: commentText.toString()
    })
    
    revalidatePath('/feed')
}

const logoutUser = async () => {
    'use server'
    const supabaseClient = await createClient()
    await supabaseClient.auth.signOut()
    redirect('/')
}

export default async function FeedPage() {
    const supabase = await createClient()

    // Fetch logged-in user if exists
    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Fetch all profiles from the database, ordered by newest first
    const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

    // Fallback if profiles table is empty or error
    const allProfiles = profiles || []

    // Heuristic: We treat the latest created profile as the 'current' user's profile
    // In a production app, you would add a `user_id` column to public.profiles linking to auth.users.id
    const currentUserProfile = allProfiles.length > 0 ? allProfiles[0] : null
    const otherUsers = allProfiles.length > 1 ? allProfiles.slice(1) : []

    // Fetch all statuses and their related comments
    const { data: statusesData, error: statusesError } = await supabase
        .from('statuses')
        .select(`
            *,
            profiles:user_id (
                id,
                name,
                photo_url,
                icon
            ),
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
        .order('created_at', { ascending: false })

    return (
        <div className="min-h-screen bg-[#070b19] text-gray-100 flex justify-center overflow-x-hidden relative">
            {/* Dynamic Background Blurs */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none z-0"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none z-0"></div>

            <div className="w-full max-w-7xl flex flex-col md:flex-row gap-6 p-6 z-10">

                {/* LEFT COMPONENT / CURRENT USER PROFILE */}
                <aside className="w-full md:w-1/4 flex flex-col gap-6">
                    <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center transform transition-all duration-500 hover:scale-[1.02] hover:bg-white/10">
                        {currentUserProfile ? (
                            <>
                                <div className="relative w-32 h-32 rounded-full overflow-hidden border-[3px] border-blue-400 mb-4 shadow-[0_0_20px_rgba(96,165,250,0.5)]">
                                    <img
                                        src={currentUserProfile.photo_url || ''}
                                        alt={currentUserProfile.name || 'User'}
                                        className="w-full h-full object-cover"
                                    />
                                    {currentUserProfile.icon && (
                                        <div className="absolute bottom-0 right-0 bg-gray-900 border-2 border-blue-400 w-10 h-10 rounded-full flex items-center justify-center p-1.5 shadow-lg">
                                            <img
                                                src={currentUserProfile.icon}
                                                alt="icon"
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    )}
                                </div>
                                <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-1">
                                    @{currentUserProfile.name}
                                </h2>
                                <div className="px-3 py-1 bg-blue-500/10 text-blue-300 text-xs font-semibold rounded-full mt-2 ring-1 ring-blue-500/30">
                                    Logged In ✨
                                </div>
                                <form action={logoutUser} className="mt-4">
                                    <button 
                                        type="submit" 
                                        className="text-white/60 text-xs font-medium hover:text-white transition-colors border border-white/10 rounded-full px-4 py-1.5 hover:bg-white/10 shadow-sm"
                                    >
                                        Log Out
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="py-8 text-white/50 text-sm">
                                No profile found.
                                <br />
                                <a href="/pickyourprofile" className="text-blue-400 underline mt-2 inline-block hover:text-blue-300">Create one</a>
                            </div>
                        )}
                    </div>
                </aside>

                {/* CENTER COMPONENT / MAIN FEED */}
                <main className="w-full md:w-2/4 flex flex-col gap-6">
                    <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl">
                        <h3 className="text-xl font-bold mb-4 text-white/80">Express your Sentient Thoughts</h3>
                        <form action={postStatus} className="flex flex-col gap-3">
                            <input type="hidden" name="user_id" value={currentUserProfile?.id || ''} />
                            <textarea
                                name="status"
                                required
                                rows={3}
                                placeholder="What's resonating with you?"
                                className="w-full bg-black/20 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none transition-all placeholder:text-white/30"
                            ></textarea>
                            <button 
                                type="submit" 
                                disabled={!currentUserProfile}
                                className="self-end px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-[0_0_15px_rgba(147,51,234,0.5)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Broadcast
                            </button>
                        </form>
                    </div>

                    {/* Dynamic Post Cards */}
                    {statusesData && statusesData.length > 0 ? (
                        statusesData.map((statusItem: any) => (
                            <div key={statusItem.status_id} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 shadow-xl flex flex-col gap-4 transform transition-all hover:bg-white/10 hover:shadow-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-12 h-12 rounded-full border-2 border-white/10 overflow-hidden">
                                        <img
                                            src={statusItem.profiles?.photo_url || ''}
                                            alt={statusItem.profiles?.name || 'User'}
                                            className="w-full h-full object-cover"
                                        />
                                        {statusItem.profiles?.icon && (
                                            <div className="absolute bottom-[-2px] right-[-2px] bg-[#070b19] rounded-full w-4 h-4 p-0.5 flex items-center justify-center">
                                                <img src={statusItem.profiles.icon} alt="icon" className="w-full h-full object-contain" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm">@{statusItem.profiles?.name || 'Unknown'}</h4>
                                        <p suppressHydrationWarning className="text-xs text-white/40">{new Date(statusItem.created_at).toLocaleString()}</p>
                                    </div>
                                </div>
                                <p className="text-white/80 leading-relaxed text-sm whitespace-pre-wrap">
                                    {statusItem.status}
                                </p>

                                {/* Comments Section */}
                                <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
                                    {/* Add Comment Form */}
                                    <form action={postComment} className="flex gap-2 items-center mb-3">
                                        <input type="hidden" name="user_id" value={currentUserProfile?.id || ''} />
                                        <input type="hidden" name="status_id" value={statusItem.status_id} />
                                        
                                        <div className="relative w-8 h-8 flex-shrink-0 rounded-full border border-white/10 overflow-hidden">
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
                                            className="flex-1 bg-black/20 border border-white/10 rounded-full py-2 px-4 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-white/30 disabled:opacity-50"
                                        />
                                        <button 
                                            type="submit" 
                                            disabled={!currentUserProfile}
                                            className="px-4 py-2 bg-white/10 text-white text-xs font-bold rounded-full hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Post
                                        </button>
                                    </form>

                                    {/* Render Existing Comments Below */}
                                    {statusItem.comments && statusItem.comments.sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()).map((comment: any) => (
                                        <div key={comment.comment_id} className="flex gap-3 bg-black/10 rounded-xl p-3 border border-white/5">
                                            <div className="relative w-8 h-8 flex-shrink-0 rounded-full border border-white/10 overflow-hidden">
                                                <img
                                                    src={comment.profiles?.photo_url || ''}
                                                    alt={comment.profiles?.name || 'User'}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-xs">@{comment.profiles?.name || 'Unknown'}</span>
                                                    <span suppressHydrationWarning className="text-[10px] text-white/40">{new Date(comment.created_at).toLocaleString()}</span>
                                                </div>
                                                <p className="text-white/70 text-xs mt-0.5 leading-relaxed">
                                                    {comment.comment}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10 text-white/50 bg-white/5 rounded-3xl border border-white/10">
                            No statuses have been broadcasted yet. Start the conversation!
                        </div>
                    )}
                </main>

                {/* RIGHT COMPONENT / OTHER USERS LIST */}
                <aside className="w-full md:w-1/4 flex flex-col gap-6">
                    <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl">
                        <h3 className="text-lg font-bold mb-5 flex items-center justify-between">
                            <span>Network</span>
                            <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-md">{otherUsers.length}</span>
                        </h3>

                        <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                            {otherUsers.length > 0 ? (
                                otherUsers.map((profile) => (
                                    <a
                                        key={profile.id}
                                        href={`/myprofile/${profile.id}`}
                                        className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/10 transition-colors group cursor-pointer border border-transparent hover:border-white/5"
                                    >
                                        <div className="relative w-12 h-12 rounded-full border-2 border-white/10 overflow-hidden group-hover:border-purple-400 transition-colors">
                                            <img
                                                src={profile.photo_url || ''}
                                                alt={profile.name || 'User'}
                                                className="w-full h-full object-cover"
                                            />
                                            {profile.icon && (
                                                <div className="absolute bottom-[-2px] right-[-2px] bg-[#070b19] rounded-full w-4 h-4 p-0.5 flex items-center justify-center">
                                                    <img src={profile.icon} alt="icon" className="w-full h-full object-contain" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col overflow-hidden">
                                            <span className="font-semibold text-sm truncate text-white group-hover:text-purple-300 transition-colors">
                                                @{profile.name}
                                            </span>
                                            <span className="text-xs text-white/40 truncate">
                                                Joined {new Date(profile.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </a>
                                ))
                            ) : (
                                <div className="text-center py-6 text-white/40 text-sm">
                                    No other entities detected in the network yet.
                                </div>
                            )}
                        </div>
                    </div>
                </aside>

            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
        </div>
    )
}
