import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { ThemeToggle } from '@/app/components/ThemeToggle'

export const dynamic = 'force-dynamic'

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

    const { data: { user } } = await supabase.auth.getUser()

    const { data: profiles } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

    const allProfiles = profiles || []
    const currentUserProfile = user ? allProfiles.find(p => p.auth_id === user.id) : null
    const otherUsers = currentUserProfile
        ? allProfiles.filter(p => p.id !== currentUserProfile.id)
        : allProfiles

    const { data: statusesData } = await supabase
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
        <div className="min-h-screen bg-[var(--app-bg)] text-[var(--app-text)] font-sans">

            {/* Top navbar */}
            <header className="sticky top-0 z-40 bg-[var(--app-bg)]/90 backdrop-blur-sm border-b border-[var(--app-border)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                    <a href="/" className="text-lg font-bold text-[#6366F1] font-display tracking-tight">
                        sentient
                    </a>
                    <div className="flex items-center gap-2">
                        {currentUserProfile && (
                            <span className="text-sm text-[var(--app-text-2)] hidden sm:block">
                                @{currentUserProfile.name}
                            </span>
                        )}
                        <ThemeToggle />
                        <form action={logoutUser}>
                            <button
                                type="submit"
                                className="text-sm text-[var(--app-text-2)] hover:text-[var(--app-text)] transition-colors px-3 py-1.5 rounded-lg hover:bg-[var(--app-elevated)]"
                            >
                                Log out
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex gap-6">

                {/* ── LEFT SIDEBAR — Current user ── */}
                <aside className="hidden lg:flex w-64 flex-shrink-0 flex-col gap-4 sticky top-20 self-start">
                    <div className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-5">
                        {currentUserProfile ? (
                            <>
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative w-16 h-16 mb-3 flex-shrink-0">
                                        <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#6366F1]/40">
                                            <img
                                                src={currentUserProfile.photo_url || ''}
                                                alt={currentUserProfile.name || 'User'}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        {currentUserProfile.icon && (
                                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[var(--app-surface)] border border-[var(--app-border)] rounded-full flex items-center justify-center p-0.5">
                                                <img src={currentUserProfile.icon} alt="icon" className="w-full h-full object-contain" />
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="font-bold text-[var(--app-text)] text-sm">@{currentUserProfile.name}</h3>
                                    <span className="text-xs text-[#6366F1] bg-[#6366F1]/10 px-2.5 py-0.5 rounded-full mt-1.5">
                                        Online
                                    </span>
                                </div>

                                <div className="mt-4 pt-4 border-t border-[var(--app-border)] space-y-1">
                                    <a
                                        href={`/myprofile/${currentUserProfile.id}`}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[var(--app-text-2)] hover:text-[var(--app-text)] hover:bg-[var(--app-elevated)] transition-colors"
                                    >
                                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                        My Profile
                                    </a>
                                    <a
                                        href="/feed"
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[var(--app-text)] bg-[var(--app-elevated)] transition-colors"
                                    >
                                        <svg className="w-4 h-4 flex-shrink-0 text-[#6366F1]" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                        </svg>
                                        Feed
                                    </a>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-4">
                                <p className="text-sm text-[var(--app-text-2)] mb-3">No profile yet.</p>
                                <a href="/pickyourprofile" className="text-sm text-[#6366F1] hover:text-[#818CF8] font-semibold transition-colors">
                                    Create one →
                                </a>
                            </div>
                        )}
                    </div>
                </aside>

                {/* ── CENTER — Main feed ── */}
                <main className="flex-1 min-w-0 flex flex-col gap-4">

                    {/* Post composer */}
                    <div className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-5">
                        <div className="flex gap-3 items-start">
                            {currentUserProfile ? (
                                <div className="w-10 h-10 rounded-full overflow-hidden border border-[var(--app-border)] flex-shrink-0">
                                    <img src={currentUserProfile.photo_url || ''} alt="You" className="w-full h-full object-cover" />
                                </div>
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-[var(--app-elevated)] border border-[var(--app-border)] flex-shrink-0" />
                            )}
                            <form action={postStatus} className="flex-1 flex flex-col gap-3">
                                <input type="hidden" name="user_id" value={currentUserProfile?.id || ''} />
                                <textarea
                                    name="status"
                                    required
                                    rows={3}
                                    placeholder={currentUserProfile ? "What's resonating with you?" : "Sign in to post a thought"}
                                    disabled={!currentUserProfile}
                                    className="w-full bg-[var(--app-elevated)] border border-[var(--app-border)] rounded-xl p-3 text-[var(--app-text)] text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent resize-none transition-all placeholder:text-[var(--app-text-3)] disabled:opacity-50"
                                />
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={!currentUserProfile}
                                        className="px-5 py-2 bg-[#6366F1] text-white text-sm font-semibold rounded-xl hover:bg-[#818CF8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        Broadcast
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Feed divider */}
                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-[var(--app-border)]" />
                        <span className="text-xs text-[var(--app-text-3)] font-medium">Recent thoughts</span>
                        <div className="flex-1 h-px bg-[var(--app-border)]" />
                    </div>

                    {/* Status cards */}
                    {statusesData && statusesData.length > 0 ? (
                        statusesData.map((statusItem: any) => (
                            <div key={statusItem.status_id} className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-5 hover:border-[#6366F1]/30 transition-colors">

                                {/* Post header */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="relative w-10 h-10 flex-shrink-0">
                                        <div className="w-full h-full rounded-full overflow-hidden border border-[var(--app-border)]">
                                            <img
                                                src={statusItem.profiles?.photo_url || ''}
                                                alt={statusItem.profiles?.name || 'User'}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        {statusItem.profiles?.icon && (
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[var(--app-surface)] border border-[var(--app-border)] rounded-full flex items-center justify-center p-0.5">
                                                <img src={statusItem.profiles.icon} alt="" className="w-full h-full object-contain" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <a
                                            href={`/myprofile/${statusItem.profiles?.id}`}
                                            className="font-semibold text-sm text-[var(--app-text)] hover:text-[#6366F1] transition-colors"
                                        >
                                            @{statusItem.profiles?.name || 'Unknown'}
                                        </a>
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
                                    <form action={postComment} className="flex gap-2 items-center">
                                        <input type="hidden" name="user_id" value={currentUserProfile?.id || ''} />
                                        <input type="hidden" name="status_id" value={statusItem.status_id} />

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
                            <p className="text-[var(--app-text-2)] text-sm">No thoughts broadcast yet. Be the first.</p>
                        </div>
                    )}
                </main>

                {/* ── RIGHT SIDEBAR — Network ── */}
                <aside className="hidden xl:flex w-64 flex-shrink-0 flex-col gap-4 sticky top-20 self-start">
                    <div className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold text-[var(--app-text)]">Network</h3>
                            <span className="text-xs bg-[#6366F1]/10 text-[#6366F1] px-2 py-0.5 rounded-full font-medium">
                                {otherUsers.length}
                            </span>
                        </div>

                        <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
                            {otherUsers.length > 0 ? (
                                otherUsers.map((profile) => (
                                    <a
                                        key={profile.id}
                                        href={`/myprofile/${profile.id}`}
                                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[var(--app-elevated)] transition-colors group"
                                    >
                                        <div className="relative w-9 h-9 flex-shrink-0">
                                            <div className="w-full h-full rounded-full overflow-hidden border border-[var(--app-border)] group-hover:border-[#6366F1]/50 transition-colors">
                                                <img
                                                    src={profile.photo_url || ''}
                                                    alt={profile.name || 'User'}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            {profile.icon && (
                                                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[var(--app-surface)] border border-[var(--app-border)] rounded-full flex items-center justify-center p-0.5">
                                                    <img src={profile.icon} alt="" className="w-full h-full object-contain" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-[var(--app-text)] truncate group-hover:text-[#6366F1] transition-colors">
                                                @{profile.name}
                                            </p>
                                            <p className="text-xs text-[var(--app-text-3)] truncate">
                                                {new Date(profile.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </a>
                                ))
                            ) : (
                                <p className="text-xs text-[var(--app-text-3)] text-center py-4">
                                    No other entities yet.
                                </p>
                            )}
                        </div>
                    </div>
                </aside>

            </div>
        </div>
    )
}
