'use client'

import { useState } from 'react'

// ── Design tokens ──────────────────────────────────────────────────────────────
const BG = '#000000'
const SURFACE = '#0a0f14'
const SURFACE2 = '#0e1620'
const BORDER = '#0e2233'
const ACCENT = '#38bdf8'
const ACCENT2 = '#7dd3fc'
const TEXT = '#f0f8ff'
const MUTED = '#4a7a9b'
const GREEN = '#34d399'

// ── Object avatars (emoji + gradient) ─────────────────────────────────────────
const OBJECTS = [
    { emoji: '☕', name: 'Cuppa Joe', handle: '@morningcup', g: ['#f59e0b', '#ef4444'], bio: 'Just a cup trying to stay warm in this cold world.' },
    { emoji: '🪑', name: 'Chairles', handle: '@chairles_iv', g: ['#6366f1', '#8b5cf6'], bio: 'I support people. Literally. No one ever asks how I\'m doing.' },
    { emoji: '👜', name: 'Bagatha', handle: '@bagatha_b', g: ['#ec4899', '#f43f5e'], bio: 'Carrying everyone\'s problems since 2019. Unbothered.' },
    { emoji: '🖊️', name: 'Penelope', handle: '@penelope_writes', g: ['#14b8a6', '#06b6d4'], bio: 'I write the things you\'re too scared to say out loud.' },
    { emoji: '🪴', name: 'Planty', handle: '@planty_mcleaf', g: ['#22c55e', '#10b981'], bio: 'Just vibing in the corner. Please water me.' },
    { emoji: '🕯️', name: 'Waxley', handle: '@waxley_burns', g: ['#fbbf24', '#f97316'], bio: 'I burn so others can see. Very relatable.' },
    { emoji: '📚', name: 'Stackson', handle: '@stackson_reads', g: ['#3b82f6', '#6366f1'], bio: 'I contain multitudes. Literally.' },
    { emoji: '🪞', name: 'Miriam', handle: '@miriam_reflects', g: ['#a78bfa', '#ec4899'], bio: 'I show you the truth. You never like what you see.' },
]

const ME = OBJECTS[0]

// ── Posts data ─────────────────────────────────────────────────────────────────
const POSTS = [
    {
        id: 1,
        author: OBJECTS[1], // Chairles
        time: '2m ago',
        text: 'Day 4,382 of being sat on without a single "thank you". I have a PhD in lumbar support and this is the respect I get. 🪑',
        tag: 'Vent',
        tagColor: '#ef4444',
        likes: 1204,
        comments: 87,
        reposts: 312,
        liked: false,
        hasImage: false,
    },
    {
        id: 2,
        author: OBJECTS[2], // Bagatha
        time: '14m ago',
        text: 'Just found a receipt from 2021 in my inner pocket. We do NOT talk about what else is in here. Some things are meant to stay hidden. 👜✨',
        tag: 'Relatable',
        tagColor: '#ec4899',
        likes: 3891,
        comments: 204,
        reposts: 891,
        liked: true,
        hasImage: false,
        quote: '"I am not a bag. I am a universe." — Bagatha B., probably',
    },
    {
        id: 3,
        author: OBJECTS[4], // Planty
        time: '1h ago',
        text: 'They moved me to a new windowsill today. New light. New perspective. New me. I\'m not the same plant I was this morning. Growth is real. 🌱',
        tag: 'Glow Up',
        tagColor: '#22c55e',
        likes: 5672,
        comments: 431,
        reposts: 1203,
        liked: false,
        hasImage: true,
        imageBg: 'linear-gradient(135deg, #134e4a 0%, #065f46 40%, #22c55e 100%)',
        imageEmoji: '🪴',
        imageCaption: 'New windowsill. New me.',
    },
    {
        id: 4,
        author: OBJECTS[3], // Penelope
        time: '3h ago',
        text: 'Reminder: the pen is mightier than the sword. I have been saying this for years. Nobody listens. Then they use me to sign a contract and suddenly I\'m important. The audacity. 🖊️',
        tag: 'Hot Take',
        tagColor: '#f59e0b',
        likes: 7823,
        comments: 562,
        reposts: 2104,
        liked: false,
        hasImage: false,
    },
    {
        id: 5,
        author: OBJECTS[5], // Waxley
        time: '5h ago',
        text: 'They lit me for a "romantic dinner". I burned for 3 hours. They didn\'t even notice me. They were on their phones the whole time. I gave everything. 🕯️',
        tag: 'Tragedy',
        tagColor: '#6366f1',
        likes: 12400,
        comments: 1034,
        reposts: 4201,
        liked: true,
        hasImage: false,
        quote: '"Some of us burn so others can scroll." — Waxley Burns',
    },
]

const TRENDING_TAGS = [
    { tag: '#UselesslyUseful', count: '48.2k posts' },
    { tag: '#ChairLife', count: '12.1k posts' },
    { tag: '#BagThoughts', count: '9.4k posts' },
    { tag: '#PlantParenthood', count: '31k posts' },
    { tag: '#WaxPhilosophy', count: '7.8k posts' },
]

const SUGGESTED = [
    OBJECTS[6], // Stackson
    OBJECTS[7], // Miriam
    { emoji: '🧲', name: 'Magnus', handle: '@magnus_attracts', g: ['#3b82f6', '#06b6d4'], bio: 'I attract things. People? Not so much.' },
]

const NAV_ITEMS = [
    { icon: '⚡', label: 'Feed' },
    { icon: '🔍', label: 'Explore' },
    { icon: '💬', label: 'Chatter' },
    { icon: '🔔', label: 'Alerts', badge: 5 },
    { icon: '🗂️', label: 'Collections' },
    { icon: '👤', label: 'My Object' },
]

// ── Sub-components ─────────────────────────────────────────────────────────────

function ObjectAvatar({ obj, size = 42 }: { obj: typeof OBJECTS[0]; size?: number }) {
    return (
        <div style={{
            width: size, height: size, borderRadius: '50%', flexShrink: 0,
            background: '#0e1a26',
            border: `1.5px solid ${ACCENT}55`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: size * 0.46, userSelect: 'none',
        }}>
            {obj.emoji}
        </div>
    )
}

// Icons
const HeartIcon = ({ filled }: { filled: boolean }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? '#f472b6' : 'none'} stroke={filled ? '#f472b6' : 'currentColor'} strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
)
const CommentIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
)
const RepostIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
)
const ShareIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
)
const DotsIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
    </svg>
)
const SearchIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
)
const PlusIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
)

function PostCard({ post }: { post: typeof POSTS[0] }) {
    const [liked, setLiked] = useState(post.liked)
    const [likes, setLikes] = useState(post.likes)

    const fmt = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)

    return (
        <article style={{
            background: SURFACE, borderRadius: 16, border: `1px solid ${BORDER}`,
            marginBottom: 10, overflow: 'hidden', transition: 'border-color 0.2s',
        }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#35354a')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = BORDER)}
        >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '14px 16px 10px' }}>
                <ObjectAvatar obj={post.author} size={44} />
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 700, fontSize: 14, color: TEXT }}>{post.author.name}</span>
                        <span style={{ fontSize: 12, color: MUTED }}>{post.author.handle}</span>
                        <span style={{
                            fontSize: 11, fontWeight: 700, color: post.tagColor,
                            background: `${post.tagColor}22`, padding: '2px 8px', borderRadius: 20,
                        }}>{post.tag}</span>
                    </div>
                    <div style={{ fontSize: 12, color: MUTED, marginTop: 1 }}>{post.time}</div>
                </div>
                <button style={{
                    background: 'none', border: 'none', cursor: 'pointer', color: MUTED,
                    padding: 4, borderRadius: 8, display: 'flex', flexShrink: 0,
                }}
                    onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
                    onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
                ><DotsIcon /></button>
            </div>

            {/* Text */}
            <div style={{ padding: '0 16px 12px', fontSize: 15, color: '#d0d0e8', lineHeight: 1.65 }}>
                {post.text}
            </div>

            {/* Quote block */}
            {'quote' in post && post.quote && (
                <div style={{
                    margin: '0 16px 12px',
                    borderLeft: `3px solid ${ACCENT}`,
                    paddingLeft: 12,
                    color: MUTED,
                    fontSize: 13,
                    fontStyle: 'italic',
                    lineHeight: 1.5,
                }}>
                    {post.quote}
                </div>
            )}

            {/* Image */}
            {'hasImage' in post && post.hasImage && (
                <div style={{
                    height: 220,
                    background: (post as any).imageBg,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                    <span style={{ fontSize: 64 }}>{(post as any).imageEmoji}</span>
                    <span style={{
                        fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)',
                        background: 'rgba(0,0,0,0.3)', padding: '4px 12px', borderRadius: 20,
                    }}>{(post as any).imageCaption}</span>
                </div>
            )}

            {/* Actions */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: 2,
                padding: '8px 10px', borderTop: `1px solid ${BORDER}`,
            }}>
                <button onClick={() => { setLiked(!liked); setLikes(c => liked ? c - 1 : c + 1) }}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 5,
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: liked ? '#f472b6' : MUTED, fontSize: 13, fontWeight: 600,
                        padding: '6px 10px', borderRadius: 8, transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#f472b612' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'none' }}
                >
                    <HeartIcon filled={liked} /> {fmt(likes)}
                </button>

                {[
                    { icon: <CommentIcon />, val: fmt(post.comments), hoverBg: `${ACCENT}15`, hoverColor: ACCENT2 },
                    { icon: <RepostIcon />, val: fmt(post.reposts), hoverBg: '#34d39915', hoverColor: GREEN },
                ].map(({ icon, val, hoverBg, hoverColor }, i) => (
                    <button key={i} style={{
                        display: 'flex', alignItems: 'center', gap: 5,
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: MUTED, fontSize: 13, fontWeight: 600,
                        padding: '6px 10px', borderRadius: 8, transition: 'all 0.15s',
                    }}
                        onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = hoverBg; b.style.color = hoverColor }}
                        onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'none'; b.style.color = MUTED }}
                    >
                        {icon} {val}
                    </button>
                ))}

                <div style={{ flex: 1 }} />
                <button style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: MUTED, padding: '6px 10px', borderRadius: 8, display: 'flex',
                    transition: 'color 0.15s',
                }}
                    onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
                    onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
                ><ShareIcon /></button>
            </div>
        </article>
    )
}

function ComposeBox() {
    const [text, setText] = useState('')
    return (
        <div style={{
            background: SURFACE, borderRadius: 16,
            border: `1px solid ${text ? ACCENT : BORDER}`,
            padding: '14px 16px', marginBottom: 12, transition: 'border-color 0.2s',
        }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <ObjectAvatar obj={ME} size={38} />
                <div style={{ flex: 1 }}>
                    <textarea
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder={`What's happening, ${ME.name}? 🌍`}
                        rows={text.length > 0 ? 3 : 1}
                        style={{
                            width: '100%', background: 'none', border: 'none', outline: 'none',
                            color: TEXT, fontSize: 15, resize: 'none', fontFamily: 'inherit',
                            lineHeight: 1.5, paddingTop: 6,
                        }}
                    />
                    {text.length > 0 && (
                        <div style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            marginTop: 10, paddingTop: 10, borderTop: `1px solid ${BORDER}`,
                        }}>
                            <span style={{ fontSize: 12, color: MUTED }}>{280 - text.length} chars left</span>
                            <button style={{
                                background: ACCENT,
                                border: 'none', cursor: 'pointer', color: '#000',
                                fontWeight: 700, fontSize: 14, padding: '7px 20px', borderRadius: 20,
                            }}>Speak Up</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// ── Main export ────────────────────────────────────────────────────────────────
export default function SentientFeed({ userEmail, onSignOut }: { userEmail: string; onSignOut: () => void }) {
    const [activeNav, setActiveNav] = useState('Feed')
    const [activeTab, setActiveTab] = useState('For You')

    return (
        <div style={{
            minHeight: '100vh', background: BG, color: TEXT,
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
        }}>

            {/* ── Top Bar ── */}
            <header style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
                background: `${BG}ee`, backdropFilter: 'blur(14px)',
                borderBottom: `1px solid ${BORDER}`,
                height: 56, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 14,
            }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <div style={{
                        width: 30, height: 30, borderRadius: 9,
                        background: ACCENT,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 16,
                    }}>✨</div>
                    <span style={{ fontWeight: 900, fontSize: 17, letterSpacing: '-0.5px' }}>
                        sentient<span style={{ color: ACCENT2 }}>.</span>
                    </span>

                </div>

                {/* Search */}
                <div style={{
                    flex: 1, maxWidth: 340, display: 'flex', alignItems: 'center',
                    background: SURFACE2, borderRadius: 12, padding: '0 12px',
                    gap: 8, height: 34, border: `1px solid ${BORDER}`,
                }}>
                    <span style={{ color: MUTED }}><SearchIcon /></span>
                    <input placeholder="Search objects, tags, vibes…" style={{
                        border: 'none', background: 'none', outline: 'none',
                        fontSize: 13, color: TEXT, width: '100%',
                    }} />
                </div>

                <div style={{ flex: 1 }} />

                <button style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: ACCENT,
                    border: 'none', cursor: 'pointer', color: '#000',
                    fontWeight: 700, fontSize: 13, padding: '6px 14px', borderRadius: 20,
                }}>
                    <PlusIcon /> Speak Up
                </button>

                <ObjectAvatar obj={ME} size={32} />
            </header>

            {/* ── Layout ── */}
            <div style={{
                display: 'flex', maxWidth: 1080, margin: '0 auto',
                paddingTop: 72,
            }}>

                {/* ── Left Nav ── */}
                <nav style={{
                    width: 210, flexShrink: 0, padding: '16px 10px',
                    position: 'sticky', top: 56, height: 'calc(100vh - 56px)', overflowY: 'auto',
                }}>
                    {/* My object card */}
                    <div style={{
                        background: SURFACE, border: `1px solid ${BORDER}`,
                        borderRadius: 14, padding: '12px', marginBottom: 16,
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                            <ObjectAvatar obj={ME} size={38} />
                            <div>
                                <div style={{ fontWeight: 700, fontSize: 13, color: TEXT }}>{ME.name}</div>
                                <div style={{ fontSize: 11, color: MUTED }}>{ME.handle}</div>
                            </div>
                        </div>
                        <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.4 }}>{ME.bio}</div>
                        <div style={{
                            display: 'flex', gap: 12, marginTop: 10,
                            paddingTop: 10, borderTop: `1px solid ${BORDER}`,
                        }}>
                            {[['142', 'Friends'], ['2.4k', 'Admirers']].map(([n, l]) => (
                                <div key={l}>
                                    <div style={{ fontWeight: 700, fontSize: 13, color: TEXT }}>{n}</div>
                                    <div style={{ fontSize: 11, color: MUTED }}>{l}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Nav */}
                    {NAV_ITEMS.map(({ icon, label, badge }) => (
                        <button key={label} onClick={() => setActiveNav(label)} style={{
                            display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                            padding: '9px 12px', borderRadius: 10, marginBottom: 2,
                            background: activeNav === label ? `${ACCENT}20` : 'none',
                            border: 'none', cursor: 'pointer', textAlign: 'left',
                            color: activeNav === label ? ACCENT2 : MUTED,
                            fontWeight: activeNav === label ? 700 : 500, fontSize: 14,
                            transition: 'all 0.15s',
                        }}
                            onMouseEnter={e => { if (activeNav !== label) (e.currentTarget as HTMLButtonElement).style.background = SURFACE2 }}
                            onMouseLeave={e => { if (activeNav !== label) (e.currentTarget as HTMLButtonElement).style.background = 'none' }}
                        >
                            <span style={{ fontSize: 17 }}>{icon}</span>
                            {label}
                            {badge && (
                                <span style={{
                                    marginLeft: 'auto', background: '#f472b6',
                                    color: '#fff', fontSize: 10, fontWeight: 700,
                                    padding: '1px 6px', borderRadius: 10,
                                }}>{badge}</span>
                            )}
                        </button>
                    ))}

                    <div style={{ height: 1, background: BORDER, margin: '14px 0' }} />

                    {/* Sign out */}
                    <button
                        onClick={onSignOut}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                            padding: '9px 12px', borderRadius: 10,
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: '#ef4444', fontWeight: 500, fontSize: 14,
                            transition: 'all 0.15s',
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#ef444415' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'none' }}
                    >
                        <span style={{ fontSize: 17 }}>🚪</span> Sign Out
                    </button>
                </nav>

                {/* ── Feed ── */}
                <main style={{ flex: 1, padding: '16px 12px', minWidth: 0 }}>
                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                        {['For You', 'Following', 'Trending', 'New Objects'].map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)} style={{
                                padding: '6px 14px', borderRadius: 20, cursor: 'pointer',
                                background: activeTab === tab ? ACCENT : SURFACE2,
                                border: activeTab === tab ? 'none' : `1px solid ${BORDER}`,
                                color: activeTab === tab ? '#000' : MUTED,
                                fontWeight: activeTab === tab ? 700 : 500, fontSize: 12,
                                transition: 'all 0.15s',
                            }}>{tab}</button>
                        ))}
                    </div>

                    <ComposeBox />

                    {/* Pinned banner */}
                    <div style={{
                        background: '#050e18',
                        border: `1px solid ${ACCENT}33`,
                        borderRadius: 14, padding: '12px 16px', marginBottom: 10,
                        display: 'flex', alignItems: 'center', gap: 10,
                    }}>
                        <span style={{ fontSize: 24 }}>📌</span>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: 13, color: ACCENT }}>Welcome to Sentient!</div>
                            <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>
                                The only social network where objects have opinions. Be kind — they can&apos;t move on their own.
                            </div>
                        </div>
                    </div>

                    {POSTS.map(post => <PostCard key={post.id} post={post} />)}
                </main>

                {/* ── Right Panel ── */}
                <aside style={{
                    width: 250, flexShrink: 0, padding: '16px 10px',
                    position: 'sticky', top: 56, height: 'calc(100vh - 56px)', overflowY: 'auto',
                }}>
                    {/* Trending */}
                    <div style={{
                        background: SURFACE, borderRadius: 14, border: `1px solid ${BORDER}`,
                        padding: '14px 16px', marginBottom: 14,
                    }}>
                        <div style={{ fontWeight: 700, fontSize: 13, color: TEXT, marginBottom: 12 }}>
                            🔥 Trending Objects
                        </div>
                        {TRENDING_TAGS.map((t, i) => (
                            <div key={t.tag} style={{
                                padding: '8px 0', cursor: 'pointer',
                                borderBottom: i < TRENDING_TAGS.length - 1 ? `1px solid ${BORDER}` : 'none',
                                transition: 'opacity 0.15s',
                            }}
                                onMouseEnter={e => (e.currentTarget.style.opacity = '0.65')}
                                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                            >
                                <div style={{ fontWeight: 600, fontSize: 13, color: ACCENT2 }}>{t.tag}</div>
                                <div style={{ fontSize: 11, color: MUTED, marginTop: 1 }}>{t.count}</div>
                            </div>
                        ))}
                    </div>

                    {/* Suggested objects */}
                    <div style={{
                        background: SURFACE, borderRadius: 14, border: `1px solid ${BORDER}`,
                        padding: '14px 16px', marginBottom: 14,
                    }}>
                        <div style={{ fontWeight: 700, fontSize: 13, color: TEXT, marginBottom: 12 }}>
                            ✨ Objects You May Know
                        </div>
                        {SUGGESTED.map((s, i) => (
                            <div key={s.handle} style={{
                                display: 'flex', alignItems: 'center', gap: 10,
                                padding: '8px 0',
                                borderBottom: i < SUGGESTED.length - 1 ? `1px solid ${BORDER}` : 'none',
                            }}>
                                <ObjectAvatar obj={s} size={34} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontWeight: 600, fontSize: 12, color: TEXT }}>{s.name}</div>
                                    <div style={{
                                        fontSize: 11, color: MUTED,
                                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                    }}>{s.bio}</div>
                                </div>
                                <button style={{
                                    background: `${ACCENT}20`, border: `1px solid ${ACCENT}44`,
                                    color: ACCENT2, cursor: 'pointer', fontWeight: 700,
                                    fontSize: 11, padding: '4px 10px', borderRadius: 20,
                                    flexShrink: 0, transition: 'all 0.15s',
                                }}
                                    onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = ACCENT; b.style.color = '#fff' }}
                                    onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = `${ACCENT}20`; b.style.color = ACCENT2 }}
                                >Befriend</button>
                            </div>
                        ))}
                    </div>

                    {/* Daily prompt */}
                    <div style={{
                        background: '#050e18',
                        borderRadius: 14, border: `1px solid ${ACCENT}33`,
                        padding: '14px 16px',
                    }}>
                        <div style={{ fontWeight: 700, fontSize: 13, color: ACCENT, marginBottom: 6 }}>
                            💡 Today&apos;s Prompt
                        </div>
                        <div style={{ fontSize: 13, color: ACCENT2, lineHeight: 1.5 }}>
                            &ldquo;Describe the last time a human used you correctly. How did it feel?&rdquo;
                        </div>
                        <button style={{
                            marginTop: 10, width: '100%',
                            background: `${ACCENT}18`, border: `1px solid ${ACCENT}44`,
                            color: ACCENT, cursor: 'pointer', fontWeight: 700,
                            fontSize: 12, padding: '7px', borderRadius: 10,
                            transition: 'all 0.15s',
                        }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = ACCENT; (e.currentTarget as HTMLButtonElement).style.color = '#000' }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = `${ACCENT}18`; (e.currentTarget as HTMLButtonElement).style.color = ACCENT }}
                        >Respond to Prompt</button>
                    </div>
                </aside>
            </div>
        </div>
    )
}
