import bpLogo from '@/imports/bpoptima-logo-nav.jpg'

export default function Footer() {
  return (
    <footer className="border-t border-border py-16">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <img src={bpLogo} alt="BPOptima" className="h-6 object-contain invert brightness-200" />
          </div>

          <div className="flex items-center gap-8">
            <a href="/privacy.html" className="text-[12px] text-text-muted hover:text-text transition-colors duration-300 tracking-wide">Privacy</a>
            <a href="/terms.html" className="text-[12px] text-text-muted hover:text-text transition-colors duration-300 tracking-wide">Terms</a>
            <a href="#security" className="text-[12px] text-text-muted hover:text-text transition-colors duration-300 tracking-wide">Security</a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <span className="text-[11px] text-text-muted tracking-wide">&copy; 2026 BP Optima Pte Ltd. All rights reserved.</span>
          <span className="text-[10px] text-text-muted tracking-[0.2em] uppercase">Deployed in your VPC. Not ours.</span>
        </div>
      </div>
    </footer>
  )
}
