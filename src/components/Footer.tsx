import { profile } from '../data/portfolio'

export function Footer() {
  return (
    <footer className="border-line border-t">
      <div className="container-page flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-dim font-mono text-xs">
          © {new Date().getFullYear()} {profile.name} · {profile.legalName}
        </p>
       
      </div>
    </footer>
  )
}
