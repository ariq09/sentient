'use client'

import { useState } from 'react'
import Image from 'next/image'

// ─── Color palette ─────────────────────────────────────────────────────────────
const ACCENT = '#7c6ef7'
const ACCENT2 = '#a78bfa'
const BG = '#0f0f13'
const SURFACE = '#18181f'
const SURFACE2 = '#22222d'
const BORDER = '#2a2a38'
const TEXT = '#f0f0f5'
const MUTED = '#7a7a9a'

// ─── Avatar ────────────────────────────────────────────────────────────────────
const GRADIENTS = [
    ['#7c6ef7', '#a78bfa'],
    ['#f472b6', '#fb7185'],
    ['#34d399', '#06b6d4'],
    ['#fbbf24', '#f97316'],
    ['#60a5fa', '#818cf8'],
    ['#a3e635', '#34d399'],
]

function Avatar({ name, size = 38, gi = 0, online = false }: { name: string; size?: number; gi?: number; online?: boolean }) {
    const [g1, g2] = GRADIENTS[gi % GRADIENTS.length]
    const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    return (
        <div style={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
            <div style={{
                width: size, height: size, borderRadius: '50%',
                background: `linear-gradient(135deg, ${g1}, ${g2})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: size * 0.38,
                userSelect: 'none', letterSpacing: '0.5px',
            }}>
                {initials}
            </div>
            {online && (
                <span style={{
                    position: 'absolute', bottom: 1, right: 1,
                    width: size * 0.27, height: size * 0.27,
                    borderRadius: '50%', background: '#34d399',
                    border: `2px solid ${SURFACE}`,
                }} />
            )}
        </div>
    )
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const ME = { name: 'Alex Johnson', gi: 0 }

const POSTS = [
    {
        id: 1, user: 'Sarah Kim', gi: 1, time: '2h ago',
        text: 'Just wrapped up a 3-week solo trip across Patagonia. No phone, no plans — just mountains and silence. Genuinely the most alive I\'ve felt in years. 🏔️',
        tag: 'Travel',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 60%, #f093fb 100%)',
        imageEmoji: '🏔️',
        likes: 247, comments: 38, reposts: 12, liked: false,
    },
    {
        id: 2, user: 'Marcus Lee', gi: 2, time: '4h ago',
        text: "Finally finished my home studio after 6 months. The acoustics are dialed in perfectly. Big things coming — stay tuned. 🎵",
        tag: 'Music',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 60%, #fda085 100%)',
        imageEmoji: '🎵',
        likes: 183, comments: 54, reposts: 7, liked: true,
    },
    {
        id: 3, user: 'Priya Sharma', gi: 3, time: '6h ago',
        text: 'Mango Coconut Chia Pudding recipe drop 🥭 Three ingredients, zero effort, tastes like dessert. Recipe in comments.',
        tag: 'Food',
        gradient: null,
        imageEmoji: null,
        likes: 92, comments: 21, reposts: 15, liked: false,
    },
    {
        id: 4, user: 'Tom Wright', gi: 4, time: '8h ago',
        text: 'Crossed the marathon finish line today. 26.2 miles. 6 months of 5am runs. Every single one of you who believed in me — thank you. 🏃',
        tag: 'Fitness',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #43e97b 100%)',
        imageEmoji: '🏃',
        likes: 512, comments: 87, reposts: 34, liked: false,
    },
]

const TRENDING = [
    { tag: '#Patagonia', posts: '12.4k posts' },
    { tag: '#HomeStudio', posts: '8.1k posts' },
    { tag: '#Marathon2025', posts: '31k posts' },
    { tag: '#ChiaPudding', posts: '5.6k posts' },
    { tag: '#SoloTravel', posts: '22k posts' },
]

const SUGGESTED = [
    { name: 'Lena Mueller', gi: 5, bio: 'Designer & traveler' },
    { name: 'James Park', gi: 0, bio: 'Software engineer' },
    { name: 'Yuki Tanaka', gi: 2, bio: 'Photographer' },
]

const NAV = [
    { icon: '⚡', label: 'Feed', active: true },
    { icon: '🔍', label: 'Explore' },
    { icon: '💬', label: 'Messages' },
    { icon: '🔔', label: 'Alerts' },
    { icon: '👤', label: 'Profile' },
]

// ─── Icons ─────────────────────────────────────────────────────────────────────
const HeartIcon = ({ filled }: { filled: boolean }) => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill={filled ? '#f472b6' : 'none'} stroke={filled ? '#f472b6' : 'currentColor'} strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
)
const CommentIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
)
const RepostIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="17 1 21 5 17 9" />
        <path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <polyline points="7 23 3 19 7 15" />
        <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
)
const ShareIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
)
const DotsIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
    </svg>
)
const PlusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
)
const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
)
const ImageIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
    </svg>
)
const GifIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M10 9H7a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3v-2H8" />
        <line x1="13" y1="9" x2="13" y2="15" />
        <path d="M17 9h-2v6h2" /><line x1="15" y1="12" x2="17" y2="12" />
    </svg>
)
const EmojiIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
)

// ─── Post Card ─────────────────────────────────────────────────────────────────
function PostCard({ post }: { post: typeof POSTS[0] }) {
    const [liked, setLiked] = useState(post.liked)
    const [likes, setLikes] = useState(post.likes)

    return (
        <article style={{
            background: SURFACE, borderRadius: 16, border: `1px solid ${BORDER}`,
            marginBottom: 12, overflow: 'hidden',
            transition: 'border-color 0.2s',
        }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#3a3a50')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = BORDER)}
        >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px 10px' }}>
                <Avatar name={post.user} gi={post.gi} size={42} online />
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontWeight: 700, fontSize: 14, color: TEXT }}>{post.user}</span>
                        <span style={{
                            fontSize: 11, fontWeight: 600, color: ACCENT2,
                            background: `${ACCENT}22`, padding: '2px 8px', borderRadius: 20,
                        }}>
                            {post.tag}
                        </span>
                    </div>
                    <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>{post.time}</div>
                </div>
                <button style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: MUTED, padding: 4, borderRadius: 8, display: 'flex',
                    transition: 'color 0.15s',
                }}
                    onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
                    onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
                >
                    <DotsIcon />
                </button>
            </div>

            {/* Text */}
            <div style={{ padding: '0 16px 12px', fontSize: 15, color: '#d0d0e0', lineHeight: 1.6 }}>
                {post.text}
            </div>

            {/* Image */}
            {post.gradient && (
                <div style={{
                    height: 260, background: post.gradient,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 56, marginBottom: 0,
                }}>
                    {post.imageEmoji}
                </div>
            )}

            {/* Actions */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '10px 12px', borderTop: `1px solid ${BORDER}`,
            }}>
                {/* Like */}
                <button
                    onClick={() => { setLiked(!liked); setLikes(c => liked ? c - 1 : c + 1) }}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 5,
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: liked ? '#f472b6' : MUTED, fontSize: 13, fontWeight: 600,
                        padding: '6px 10px', borderRadius: 8, transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#f472b610' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'none' }}
                >
                    <HeartIcon filled={liked} />
                    {likes.toLocaleString()}
                </button>

                {/* Comment */}
                <button style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: MUTED, fontSize: 13, fontWeight: 600,
                    padding: '6px 10px', borderRadius: 8, transition: 'all 0.15s',
                }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${ACCENT}15`; (e.currentTarget as HTMLButtonElement).style.color = ACCENT2 }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'none'; (e.currentTarget as HTMLButtonElement).style.color = MUTED }}
                >
                    <CommentIcon />
                    {post.comments}
                </button>

                {/* Repost */}
                <button style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: MUTED, fontSize: 13, fontWeight: 600,
                    padding: '6px 10px', borderRadius: 8, transition: 'all 0.15s',
                }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#34d39915'; (e.currentTarget as HTMLButtonElement).style.color = '#34d399' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'none'; (e.currentTarget as HTMLButtonElement).style.color = MUTED }}
                >
                    <RepostIcon />
                    {post.reposts}
                </button>

                <div style={{ flex: 1 }} />

                {/* Share */}
                <button style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: MUTED, padding: '6px 10px', borderRadius: 8, transition: 'all 0.15s',
                }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = TEXT }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = MUTED }}
                >
                    <ShareIcon />
                </button>
            </div>
        </article>
    )
}

// ─── Compose Box ───────────────────────────────────────────────────────────────
function ComposeBox() {
    const [text, setText] = useState('')
    const focused = text.length > 0

    return (
        <div style={{
            background: SURFACE, borderRadius: 16, border: `1px solid ${focused ? ACCENT : BORDER}`,
            padding: '14px 16px', marginBottom: 12, transition: 'border-color 0.2s',
        }}>
            <div style={{ display: 'flex', gap: 10 }}>
                <Avatar name={ME.name} gi={ME.gi} size={38} />
                <textarea
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="What's on your mind?"
                    rows={text.length > 0 ? 3 : 1}
                    style={{
                        flex: 1, background: 'none', border: 'none', outline: 'none',
                        color: TEXT, fontSize: 15, resize: 'none', fontFamily: 'inherit',
                        lineHeight: 1.5, paddingTop: 8,
                        placeholder: MUTED,
                    } as React.CSSProperties}
                />
            </div>
            {focused && (
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginTop: 12, paddingTop: 12, borderTop: `1px solid ${BORDER}`,
                }}>
                    <div style={{ display: 'flex', gap: 4 }}>
                        {[
                            { icon: <ImageIcon />, label: 'Image' },
                            { icon: <GifIcon />, label: 'GIF' },
                            { icon: <EmojiIcon />, label: 'Emoji' },
                        ].map(({ icon, label }) => (
                            <button key={label} title={label} style={{
                                display: 'flex', alignItems: 'center', gap: 5,
                                background: 'none', border: 'none', cursor: 'pointer',
                                color: MUTED, fontSize: 13, padding: '5px 8px', borderRadius: 8,
                                transition: 'all 0.15s',
                            }}
                                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = ACCENT2; (e.currentTarget as HTMLButtonElement).style.background = `${ACCENT}15` }}
                                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = MUTED; (e.currentTarget as HTMLButtonElement).style.background = 'none' }}
                            >
                                {icon}
                            </button>
                        ))}
                    </div>
                    <button style={{
                        background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`,
                        border: 'none', cursor: 'pointer', color: '#fff',
                        fontWeight: 700, fontSize: 14, padding: '8px 20px', borderRadius: 20,
                        transition: 'opacity 0.15s',
                    }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
                    >
                        Post
                    </button>
                </div>
            )}
        </div>
    )
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function FeedPage() {
    const [activeNav, setActiveNav] = useState('Feed')

    return (
        <div style={{ minHeight: '100vh', background: BG, color: TEXT, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>

            {/* ── Top Bar ── */}
            <header style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
                background: `${BG}ee`, backdropFilter: 'blur(12px)',
                borderBottom: `1px solid ${BORDER}`,
                height: 58, display: 'flex', alignItems: 'center', padding: '0 24px', gap: 16,
            }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <Image
                        src="/sentient-logo.png"
                        alt="Sentient"
                        width={32}
                        height={32}
                        style={{ objectFit: 'contain' }}
                    />
                    <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.5px' }}>sentient</span>
                </div>

                {/* Search */}
                <div style={{
                    flex: 1, maxWidth: 360, display: 'flex', alignItems: 'center',
                    background: SURFACE2, borderRadius: 12, padding: '0 12px',
                    gap: 8, height: 36, border: `1px solid ${BORDER}`,
                }}>
                    <span style={{ color: MUTED }}><SearchIcon /></span>
                    <input placeholder="Search sentient…" style={{
                        border: 'none', background: 'none', outline: 'none',
                        fontSize: 14, color: TEXT, width: '100%',
                    }} />
                </div>

                <div style={{ flex: 1 }} />

                {/* Compose button */}
                <button style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`,
                    border: 'none', cursor: 'pointer', color: '#fff',
                    fontWeight: 700, fontSize: 14, padding: '7px 16px', borderRadius: 20,
                }}>
                    <PlusIcon /> New Post
                </button>

                <Avatar name={ME.name} gi={ME.gi} size={34} />
            </header>

            {/* ── Layout ── */}
            <div style={{
                display: 'flex', maxWidth: 1100, margin: '0 auto',
                paddingTop: 74, gap: 0,
            }}>

                {/* ── Left Nav ── */}
                <nav style={{
                    width: 220, flexShrink: 0, padding: '20px 12px',
                    position: 'sticky', top: 58, height: 'calc(100vh - 58px)',
                    overflowY: 'auto',
                }}>
                    {/* User */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '10px 12px', borderRadius: 12, marginBottom: 16,
                        background: SURFACE, border: `1px solid ${BORDER}`,
                    }}>
                        <Avatar name={ME.name} gi={ME.gi} size={36} online />
                        <div>
                            <div style={{ fontWeight: 700, fontSize: 13, color: TEXT }}>{ME.name}</div>
                            <div style={{ fontSize: 11, color: MUTED }}>@alexj</div>
                        </div>
                    </div>

                    {/* Nav items */}
                    {NAV.map(({ icon, label, active }) => (
                        <button
                            key={label}
                            onClick={() => setActiveNav(label)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                                padding: '10px 12px', borderRadius: 10, marginBottom: 2,
                                background: activeNav === label ? `${ACCENT}20` : 'none',
                                border: 'none', cursor: 'pointer', textAlign: 'left',
                                color: activeNav === label ? ACCENT2 : MUTED,
                                fontWeight: activeNav === label ? 700 : 500, fontSize: 14,
                                transition: 'all 0.15s',
                            }}
                            onMouseEnter={e => { if (activeNav !== label) (e.currentTarget as HTMLButtonElement).style.background = SURFACE2 }}
                            onMouseLeave={e => { if (activeNav !== label) (e.currentTarget as HTMLButtonElement).style.background = 'none' }}
                        >
                            <span style={{ fontSize: 18 }}>{icon}</span>
                            {label}
                            {label === 'Alerts' && (
                                <span style={{
                                    marginLeft: 'auto', background: '#f472b6',
                                    color: '#fff', fontSize: 11, fontWeight: 700,
                                    padding: '1px 6px', borderRadius: 10,
                                }}>3</span>
                            )}
                        </button>
                    ))}

                    <div style={{ height: 1, background: BORDER, margin: '16px 0' }} />

                    {/* Tags */}
                    <div style={{ fontSize: 11, fontWeight: 700, color: MUTED, padding: '0 12px', marginBottom: 8, letterSpacing: 1 }}>
                        YOUR TAGS
                    </div>
                    {['#Travel', '#Music', '#Design', '#Tech'].map(tag => (
                        <button key={tag} style={{
                            display: 'block', width: '100%', textAlign: 'left',
                            padding: '7px 12px', borderRadius: 8, background: 'none',
                            border: 'none', cursor: 'pointer', color: MUTED, fontSize: 13,
                            transition: 'all 0.15s',
                        }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = ACCENT2; (e.currentTarget as HTMLButtonElement).style.background = `${ACCENT}15` }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = MUTED; (e.currentTarget as HTMLButtonElement).style.background = 'none' }}
                        >
                            {tag}
                        </button>
                    ))}
                </nav>

                {/* ── Feed ── */}
                <main style={{ flex: 1, padding: '20px 16px', minWidth: 0 }}>
                    {/* Filter tabs */}
                    <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                        {['For You', 'Following', 'Trending'].map((tab, i) => (
                            <button key={tab} style={{
                                padding: '7px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
                                background: i === 0 ? `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})` : SURFACE2,
                                color: i === 0 ? '#fff' : MUTED,
                                fontWeight: i === 0 ? 700 : 500, fontSize: 13,
                                transition: 'all 0.15s',
                            }}>
                                {tab}
                            </button>
                        ))}
                    </div>

                    <ComposeBox />

                    {POSTS.map(post => <PostCard key={post.id} post={post} />)}
                </main>

                {/* ── Right Panel ── */}
                <aside style={{
                    width: 260, flexShrink: 0, padding: '20px 12px',
                    position: 'sticky', top: 58, height: 'calc(100vh - 58px)',
                    overflowY: 'auto',
                }}>
                    {/* Trending */}
                    <div style={{
                        background: SURFACE, borderRadius: 16, border: `1px solid ${BORDER}`,
                        padding: '14px 16px', marginBottom: 16,
                    }}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: TEXT, marginBottom: 12 }}>
                            🔥 Trending
                        </div>
                        {TRENDING.map((t, i) => (
                            <div key={t.tag} style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '8px 0',
                                borderBottom: i < TRENDING.length - 1 ? `1px solid ${BORDER}` : 'none',
                                cursor: 'pointer',
                            }}
                                onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                            >
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: 13, color: ACCENT2 }}>{t.tag}</div>
                                    <div style={{ fontSize: 11, color: MUTED, marginTop: 1 }}>{t.posts}</div>
                                </div>
                                <span style={{ fontSize: 12, color: MUTED }}>#{i + 1}</span>
                            </div>
                        ))}
                    </div>

                    {/* Suggested */}
                    <div style={{
                        background: SURFACE, borderRadius: 16, border: `1px solid ${BORDER}`,
                        padding: '14px 16px',
                    }}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: TEXT, marginBottom: 12 }}>
                            ✨ Suggested
                        </div>
                        {SUGGESTED.map(s => (
                            <div key={s.name} style={{
                                display: 'flex', alignItems: 'center', gap: 10,
                                padding: '8px 0', borderBottom: `1px solid ${BORDER}`,
                            }}>
                                <Avatar name={s.name} gi={s.gi} size={36} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontWeight: 600, fontSize: 13, color: TEXT }}>{s.name}</div>
                                    <div style={{ fontSize: 11, color: MUTED, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.bio}</div>
                                </div>
                                <button style={{
                                    background: `${ACCENT}20`, border: `1px solid ${ACCENT}40`,
                                    color: ACCENT2, cursor: 'pointer', fontWeight: 700,
                                    fontSize: 12, padding: '4px 10px', borderRadius: 20,
                                    transition: 'all 0.15s', flexShrink: 0,
                                }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = ACCENT; (e.currentTarget as HTMLButtonElement).style.color = '#fff' }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = `${ACCENT}20`; (e.currentTarget as HTMLButtonElement).style.color = ACCENT2 }}
                                >
                                    Follow
                                </button>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    )
}
