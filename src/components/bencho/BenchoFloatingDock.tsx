import { Layers, FlaskConical, User, Mail, Command } from 'lucide-react';

const LINKS = [
  { label: 'Work', href: '#work', icon: Layers },
  { label: 'Studio', href: '#lab', icon: FlaskConical },
  { label: 'About', href: '#about', icon: User },
  { label: 'Contact', href: '#contact', icon: Mail },
];

export function BenchoFloatingDock({ onOpenCommandBar }: { onOpenCommandBar: () => void }) {
  return <nav aria-label="Quick navigation" className="portfolio-dock">
    {LINKS.map(({ label, href, icon: Icon }) => <a href={href} key={href} aria-label={label} title={label}><Icon size={17} /><span>{label}</span></a>)}
    <button type="button" onClick={onOpenCommandBar} aria-label="Open command palette" title="Commands (Ctrl/⌘ K)"><Command size={17} /></button>
  </nav>;
}
