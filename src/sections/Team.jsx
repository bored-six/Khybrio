import { useState } from 'react'
import { AssetImage } from '../components/AssetImage'
import { InitialsAvatar } from '../components/InitialsAvatar'
import { A } from '../lib/assets'
import { Words } from '../components/Words'
import { Reveal } from '../components/Reveal'
import { useContent } from '../content/context'

/**
 * Team cards flip in 3D — hover on desktop, tap on mobile — from a compact
 * face-card to a full profile with bio and focus areas.
 *
 * Members with a `photo` key get their real headshot; the rest keep the
 * initials avatar, so the grid reads evenly while photos are still missing.
 */
function Avatar({ member, size }) {
  const photo = member.photo ? A.teamPhotos[member.photo] : null
  if (!photo) return <InitialsAvatar initials={member.initials} accent={member.accent} size={size} />
  return (
    <AssetImage
      asset={photo}
      className="h-full w-full rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  )
}
export function Team() {
  const { team } = useContent()
  const [flipped, setFlipped] = useState(null)

  return (
    <section id="team" className="relative z-10 bg-cream px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-bright">
          {team.eyebrow}
        </p>
        <h2 className="mt-3 text-[clamp(1.9rem,4.5vw,3rem)] font-semibold text-teal-deep">
          <Words text={team.title} />
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-ink-muted">{team.body}</p>

        {/* Cards swing in on their own hinge before the hover flip takes
            over. The entrance rotates this outer element; the flip rotates the
            inner one, so the two never fight over a transform. */}
        <Reveal
          from={{ rotateY: -55, y: 34 }}
          stagger={0.14}
          duration={1}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 [perspective:1400px]"
        >
          {team.members.map((m, i) => (
            <div
              key={m.name}
              className="group h-80 cursor-pointer [perspective:1400px]"
              onClick={() => setFlipped(flipped === i ? null : i)}
            >
              <div
                className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ${
                  flipped === i ? '[transform:rotateY(180deg)]' : ''
                }`}
              >
                {/* Front — the face card */}
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[var(--radius-card)] bg-teal-soft/20 p-6 text-center [backface-visibility:hidden]">
                  <div className="grid h-24 w-24 place-items-center overflow-hidden rounded-full ring-4 ring-cream">
                    <Avatar member={m} size={96} />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-teal-deep">{m.name}</h3>
                  <p className="text-sm font-medium text-teal-bright">{m.role}</p>
                  <span className="mt-4 rounded-full bg-teal-deep/8 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-ink-muted/70">
                    Hover for profile
                  </span>
                </div>

                {/* Back — the full profile */}
                <div className="absolute inset-0 flex flex-col rounded-[var(--radius-card)] bg-teal-deep p-6 text-cream [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className="flex items-center gap-3">
                    <span className="shrink-0 overflow-hidden rounded-full">
                      <Avatar member={m} size={44} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="truncate font-display text-base font-bold text-cream">
                        {m.name}
                      </h3>
                      <p className="text-xs font-medium text-teal-soft">{m.role}</p>
                    </div>
                  </div>
                  <p className="mt-3 flex-1 text-[0.82rem] leading-relaxed text-cream/80">
                    {m.bio}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {m.focus.map((f) => (
                      <span
                        key={f}
                        className="rounded-full bg-cream/10 px-2.5 py-1 text-[0.68rem] font-medium text-cream"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
