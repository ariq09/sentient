'use client'

// Stacked overlapping avatars — useful for showing "N people have
// commented" or a network preview. Not wired to any page yet.

interface AvatarData {
  src: string
  alt: string
}

interface AvatarStackProps {
  avatars: AvatarData[]
  max?: number          // maximum visible avatars before "+N" overflow badge
  size?: 'sm' | 'md' | 'lg'
  showCount?: boolean   // show total count label next to the stack
  total?: number        // optional override for the total count shown
}

const SIZE_MAP = {
  sm: { ring: 'w-7 h-7',  offset: '-ml-2',   text: 'text-[10px]', badge: 'w-7 h-7'  },
  md: { ring: 'w-9 h-9',  offset: '-ml-2.5', text: 'text-xs',     badge: 'w-9 h-9'  },
  lg: { ring: 'w-11 h-11', offset: '-ml-3',  text: 'text-sm',     badge: 'w-11 h-11' },
}

export default function AvatarStack({
  avatars,
  max = 4,
  size = 'md',
  showCount = false,
  total,
}: AvatarStackProps) {
  const visible = avatars.slice(0, max)
  const overflow = (total ?? avatars.length) - visible.length
  const s = SIZE_MAP[size]

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {visible.map((av, i) => (
          <div
            key={i}
            className={`${s.ring} rounded-full overflow-hidden border-2 border-[var(--app-surface)]
              flex-shrink-0 ${i > 0 ? s.offset : ''}`}
            style={{ zIndex: visible.length - i }}
          >
            <img
              src={av.src}
              alt={av.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {overflow > 0 && (
          <div
            className={`${s.badge} rounded-full border-2 border-[var(--app-surface)]
              bg-[var(--app-elevated)] flex items-center justify-center
              flex-shrink-0 ${s.offset}`}
            style={{ zIndex: 0 }}
          >
            <span className={`font-semibold text-[var(--app-text-2)] ${s.text}`}>
              +{overflow}
            </span>
          </div>
        )}
      </div>

      {showCount && (
        <span className="text-sm text-[var(--app-text-2)] font-medium">
          {total ?? avatars.length}{' '}
          {(total ?? avatars.length) === 1 ? 'person' : 'people'}
        </span>
      )}
    </div>
  )
}

// Example usage:
//
// <AvatarStack
//   avatars={comments.map(c => ({ src: c.profiles.photo_url, alt: c.profiles.name }))}
//   max={3}
//   size="sm"
//   showCount
// />
//
// Renders: [img][img][img] +2  3 people
