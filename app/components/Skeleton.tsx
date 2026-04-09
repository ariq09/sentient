'use client'

// Loading skeleton placeholders — mirrors the shape of feed cards and profile headers.
// Drop-in replacements while data is loading, not yet wired to any page.

function SkeletonBox({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-[var(--app-elevated)] ${className ?? ''}`}
    />
  )
}

export function FeedCardSkeleton() {
  return (
    <div className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-5 flex flex-col gap-4">
      {/* Author row */}
      <div className="flex items-center gap-3">
        <SkeletonBox className="w-10 h-10 rounded-full flex-shrink-0" />
        <div className="flex flex-col gap-2 flex-1">
          <SkeletonBox className="h-3 w-28" />
          <SkeletonBox className="h-2.5 w-20" />
        </div>
      </div>

      {/* Post body */}
      <div className="flex flex-col gap-2">
        <SkeletonBox className="h-3 w-full" />
        <SkeletonBox className="h-3 w-5/6" />
        <SkeletonBox className="h-3 w-3/4" />
      </div>

      {/* Comment input row */}
      <div className="border-t border-[var(--app-border)] pt-4 flex gap-2 items-center">
        <SkeletonBox className="w-7 h-7 rounded-full flex-shrink-0" />
        <SkeletonBox className="h-8 flex-1 rounded-full" />
        <SkeletonBox className="h-8 w-16 rounded-full" />
      </div>
    </div>
  )
}

export function ProfileHeaderSkeleton() {
  return (
    <div className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl overflow-hidden">
      {/* Cover */}
      <SkeletonBox className="h-28 rounded-none" />

      <div className="px-6 pb-6">
        {/* Avatar */}
        <SkeletonBox className="w-20 h-20 rounded-full -mt-10 mb-4 border-4 border-[var(--app-surface)]" />

        {/* Name + date */}
        <div className="flex flex-col gap-2 mb-4">
          <SkeletonBox className="h-6 w-40" />
          <SkeletonBox className="h-3 w-32" />
        </div>

        {/* Button */}
        <SkeletonBox className="h-9 w-28 rounded-xl" />
      </div>
    </div>
  )
}

export function SidebarUserSkeleton() {
  return (
    <div className="flex items-center gap-3 p-2.5">
      <SkeletonBox className="w-9 h-9 rounded-full flex-shrink-0" />
      <div className="flex flex-col gap-1.5 flex-1">
        <SkeletonBox className="h-3 w-24" />
        <SkeletonBox className="h-2.5 w-16" />
      </div>
    </div>
  )
}
