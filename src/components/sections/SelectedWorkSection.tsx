import { useRef } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { PROJECTS, TERMINAL_REPOS } from '../../data/projects';
import { ScrollTrigger } from '../../lib/gsap';
import { useSectionMotion } from '../../hooks/useSectionMotion';

const SUMMARIES: Record<string, string> = {
  'range-shaders': 'Screen filters, procedural surfaces and material experiments for Range Engine & UPBGE.',
  'bgui-range': 'A modular Python toolkit for building interfaces inside Range Engine games.',
  'volumetric-light': 'Light shafts and atmospheric scattering through real-time raymarching.',
  'erp-grafica': 'Quotes, customers and production orders in one management system.',
  'maze-galaxy': 'An exploration of 3D game mechanics, camera systems and physics.',
};

export function SelectedWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionMotion(sectionRef);
  const extraRepos = TERMINAL_REPOS.filter(repo => !PROJECTS.some(project => project.githubUrl === repo.url));
  return <section ref={sectionRef} id="work" className="portfolio-section work-section">
    <div className="section-shell">
      <div className="section-kicker" data-reveal><span>01 / SELECTED WORK</span><span>IDEAS MADE TANGIBLE</span></div>
      <div className="section-heading" data-reveal><h2>Code with<br /><span className="text-slate-500">a point of view.</span></h2><p>Graphics, tools and software.<br />A selection of things I build.</p></div>
      <div className="section-rule" data-draw />
      <div className="project-grid">
        {PROJECTS.map((project, index) => <article className={`project-card ${index === 0 ? 'project-featured' : ''}`} key={project.id} data-reveal>
          <div className={`project-art project-art-${project.id}`} aria-hidden="true">
            <span className="project-art-index">{project.chapter}</span>
            <div className="project-art-object"><i /><i /><i /><i /><i /></div>
            <span className="project-art-caption">{project.category} / {project.tech[0]}</span>
          </div>
          <div className="project-body">
            <div className="flex items-start justify-between gap-4"><h3><a href={project.githubUrl} target="_blank" rel="noreferrer">{project.title}<ArrowUpRight size={22} /></a></h3></div>
            <p>{SUMMARIES[project.id]}</p>
            <div className="project-tags">{project.tech.slice(0, 3).map(tech => <span key={tech}>{tech}</span>)}</div>
            <details className="project-details" onToggle={() => ScrollTrigger.refresh()}>
              <summary>Behind the build <Plus size={14} /></summary>
              <div className="project-details-content"><ul>{project.highlights.slice(0, 2).map(highlight => <li key={highlight}>{highlight}</li>)}</ul>
                {project.codeSnippet && <pre tabIndex={0} aria-label={`${project.title} code example`}>{project.codeSnippet}</pre>}
                <a href={project.githubUrl} target="_blank" rel="noreferrer">View repository <ArrowUpRight size={14} /></a>
              </div>
            </details>
          </div>
        </article>)}
      </div>
      <details id="opensource" className="more-repos" onToggle={() => ScrollTrigger.refresh()}>
        <summary>More on GitHub <span>{extraRepos.length} repositories <Plus size={16} /></span></summary>
        <div>{extraRepos.map(repo => <a href={repo.url} key={repo.name} target="_blank" rel="noreferrer"><span>{repo.name}<small>{repo.desc}</small></span><ArrowUpRight size={18} /></a>)}</div>
      </details>
    </div>
  </section>;
}
