import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { supabase } from '../lib/supabase';
import './LandingPage.css';
import { Meeting, Spec } from '../types';
import { FileText, Calendar, Shield, ChevronDown, Check, Search, X } from 'lucide-react';
import { HeaderLogo } from './ui/HeaderLogo';
import { researchItems } from './research/researchCatalog';

interface LandingPageProps {
  onEnterApp: () => void;
}

interface LanguageOption {
  code: string;
  nativeLabel: string;
  nativeRegion?: string;
  englishLabel: string;
  englishRegion?: string;
}

const LANGUAGE_OPTIONS = [
  { code: 'sq-AL', nativeLabel: 'shqip', englishLabel: 'Albanian' },
  { code: 'am-ET', nativeLabel: 'አማርኛ', englishLabel: 'Amharic' },
  { code: 'ar', nativeLabel: 'العربية', englishLabel: 'Arabic' },
  { code: 'zh-Hans-CN', nativeLabel: '中文', nativeRegion: 'China', englishLabel: 'Chinese', englishRegion: 'China' },
  { code: 'zh-Hant-HK', nativeLabel: '中文', nativeRegion: 'Hong Kong', englishLabel: 'Chinese', englishRegion: 'Hong Kong SAR China' },
  { code: 'zh-Hant', nativeLabel: '中文', nativeRegion: 'Taiwan', englishLabel: 'Chinese', englishRegion: 'Taiwan' },
  { code: 'nl-NL', nativeLabel: 'Nederlands', englishLabel: 'Dutch' },
  { code: 'en-US', nativeLabel: 'English', nativeRegion: 'United States', englishLabel: 'English', englishRegion: 'United States' },
  { code: 'en-GB', nativeLabel: 'English', nativeRegion: 'United Kingdom', englishLabel: 'English', englishRegion: 'United Kingdom' },
  { code: 'fr-CA', nativeLabel: 'francais', nativeRegion: 'Canada', englishLabel: 'French', englishRegion: 'Canada' },
  { code: 'fr-FR', nativeLabel: 'francais', nativeRegion: 'France', englishLabel: 'French', englishRegion: 'France' },
  { code: 'de-DE', nativeLabel: 'Deutsch', englishLabel: 'German' },
  { code: 'el-GR', nativeLabel: 'Ελληνικά', englishLabel: 'Greek' },
  { code: 'hi-IN', nativeLabel: 'हिन्दी', englishLabel: 'Hindi' },
  { code: 'it-IT', nativeLabel: 'italiano', englishLabel: 'Italian' },
  { code: 'ja-JP', nativeLabel: '日本語', englishLabel: 'Japanese' },
  { code: 'ko-KR', nativeLabel: '한국어', englishLabel: 'Korean' },
  { code: 'pt-BR', nativeLabel: 'portugues', nativeRegion: 'Brasil', englishLabel: 'Portuguese', englishRegion: 'Brazil' },
  { code: 'pt-PT', nativeLabel: 'portugues', nativeRegion: 'Portugal', englishLabel: 'Portuguese', englishRegion: 'Portugal' },
  { code: 'ru-RU', nativeLabel: 'русский', englishLabel: 'Russian' },
  { code: 'es-ES', nativeLabel: 'espanol', nativeRegion: 'Espana', englishLabel: 'Spanish', englishRegion: 'Spain' },
  { code: 'es-419', nativeLabel: 'espanol', nativeRegion: 'Latinoamerica', englishLabel: 'Spanish', englishRegion: 'Latin America' },
  { code: 'sv-SE', nativeLabel: 'svenska', englishLabel: 'Swedish' },
  { code: 'tr-TR', nativeLabel: 'Turkce', englishLabel: 'Turkish' },
] satisfies LanguageOption[];

const LanguageGlobeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.667 10a8.333 8.333 0 1 1 16.666 0 8.333 8.333 0 0 1-16.666 0M10 3.333h-.009v.002c-.031.008-.186.074-.41.409-.214.319-.43.792-.622 1.414-.325 1.056-.55 2.446-.61 4.009h3.302c-.06-1.563-.285-2.953-.61-4.009-.192-.622-.408-1.095-.622-1.414-.224-.335-.379-.401-.41-.41zm1.65 7.5h-3.3c.061 1.621.301 3.056.645 4.124.203.627.428 1.088.644 1.382.107.146.198.232.265.28a.4.4 0 0 0 .07.04l.024.008h.004l.023-.007a.4.4 0 0 0 .071-.041 1.3 1.3 0 0 0 .265-.28c.216-.294.441-.755.643-1.382.345-1.068.585-2.503.647-4.124M6.682 9.167c.06-1.704.305-3.264.685-4.499q.152-.494.338-.929a6.67 6.67 0 0 0-4.32 5.428zm-3.296 1.666H6.68c.063 1.766.323 3.379.728 4.635q.135.417.295.793a6.67 6.67 0 0 1-4.32-5.428m9.934 0h3.296a6.67 6.67 0 0 1-4.32 5.428q.162-.376.296-.793c.405-1.256.665-2.87.728-4.635m3.296-1.666h-3.296c-.06-1.704-.305-3.264-.686-4.499q-.15-.494-.337-.929a6.67 6.67 0 0 1 4.319 5.428"
    />
  </svg>
);

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const languageSearchRef = useRef<HTMLInputElement>(null);
  
  // Dynamic Data State
  const [minutes, setMinutes] = useState<Meeting[]>([]);
  const [ratifiedSpecs, setRatifiedSpecs] = useState<Spec[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(
    LANGUAGE_OPTIONS.find((option) => option.code === 'en-US') ?? LANGUAGE_OPTIONS[0]
  );
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [languageQuery, setLanguageQuery] = useState('');

  const closeLanguageSelector = () => {
    setIsLanguageOpen(false);
    setLanguageQuery('');
  };

  // Fetch Public Data
  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        // Fetch latest 3 meetings for Transparency section
        const { data: meetings, error: meetingsError } = await supabase
          .from('meetings')
          .select('*')
          .order('date', { ascending: false })
          .limit(3);
        
        // Fetch latest ratified specs
        const { data: specs, error: specsError } = await supabase
          .from('specs')
          .select('*')
          .eq('status', 'Ratified')
          .order('updated_at', { ascending: false })
          .limit(3);

        if (!meetingsError && meetings) setMinutes(meetings);
        if (!specsError && specs) setRatifiedSpecs(specs);
      } catch (e) {
        console.warn("Public data sync failed (likely offline/demo mode):", e);
      }
    };

    fetchPublicData();
  }, []);

  useEffect(() => {
    if (!isLanguageOpen) return;

    languageSearchRef.current?.focus();

    const handlePointerDown = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        closeLanguageSelector();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLanguageSelector();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLanguageOpen]);

  const normalizedLanguageQuery = languageQuery.trim().toLowerCase();
  const filteredLanguageOptions = LANGUAGE_OPTIONS.filter((option) => {
    if (!normalizedLanguageQuery) return true;

    return [
      option.nativeLabel,
      option.nativeRegion ?? '',
      option.englishLabel,
      option.englishRegion ?? '',
      option.code,
    ]
      .join(' ')
      .toLowerCase()
      .includes(normalizedLanguageQuery);
  });

  // Three.js Animation Effect
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0b);
    scene.fog = new THREE.Fog(0x0a0a0b, 650, 1400);
    
    const frustumSize = 550;
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(
        frustumSize * aspect / -2, frustumSize * aspect / 2,
        frustumSize / 2, frustumSize / -2, 0.1, 2000
    );
    camera.position.set(0, 0, 800);
    
    const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.setClearColor(0x0a0a0b, 1);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.28);
    scene.add(ambientLight);
    
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    keyLight.position.set(400, 500, 400);
    scene.add(keyLight);
    
    const fillLight = new THREE.DirectionalLight(0xe8eeff, 0.45);
    fillLight.position.set(-300, 200, -300);
    scene.add(fillLight);
    
    // Material Properties
    const MP: Record<string, any> = {
        stone: {color: 0xdedad5, metalness: 0.02, roughness: 0.78},
        ceramic: {color: 0xeae8e4, metalness: 0.04, roughness: 0.72},
        shadow: {color: 0x3a3d42, metalness: 0.08, roughness: 0.68},
        accent: {color: 0x4a62a8, metalness: 0.15, roughness: 0.55}
    };
    const CM: Record<string, string> = {st0:'accent',st1:'ceramic',st3:'stone',st4:'shadow',st5:'stone',st6:'shadow',st7:'stone',st8:'stone',st9:'ceramic',st10:'stone',st11:'shadow'};
    
    function cM(c: string) {
        const p = MP[CM[c] || 'stone'];
        const m = new THREE.MeshStandardMaterial({
            color: p.color, 
            metalness: p.metalness, 
            roughness: p.roughness, 
            side: THREE.DoubleSide
        });
        m.dithering = true;
        return m;
    }
    
    // Geometries
    const OP = [
        {c:"st0",p:[719.32,662.56,854.49,740.59,876.04,695.90,719.32,425.08]},
        {c:"st7",p:[287.99,675.22,151.88,753.80,164.88,780.74,470.76,780.74]},
        {c:"st8",p:[507.31,295.34,712.95,414.07,533.96,104.78,507.31,104.78]},
        {c:"st10",p:[280.68,662.56,280.68,425.09,123.96,695.90,145.51,740.59]},
        {c:"st6",p:[712.01,675.22,529.24,780.74,835.12,780.74,848.12,753.80]},
        {c:"st5",p:[492.69,295.34,492.69,104.78,466.04,104.78,287.05,414.07]}
    ];
    
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);
    keyLight.target = logoGroup;
    scene.add(keyLight.target);
    
    const cubeGroup = new THREE.Group();
    const cubeSolidGroup = new THREE.Group();
    cubeGroup.add(cubeSolidGroup);
    logoGroup.add(cubeGroup);
    
    // Function to create Triangular Pyramid geometry
    function triPyr(A: THREE.Vector3, B: THREE.Vector3, C: THREE.Vector3, ctr: THREE.Vector3, ins: number) {
        const ct = new THREE.Vector3().add(A).add(B).add(C).multiplyScalar(1/3);
        const a = ct.clone().addScaledVector(A.clone().sub(ct), ins);
        const b = ct.clone().addScaledVector(B.clone().sub(ct), ins);
        const c = ct.clone().addScaledVector(C.clone().sub(ct), ins);
        const pos: number[] = [];
        [a, b, c, ctr].forEach(v => { pos.push(v.x, v.y, v.z); });
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
        g.setIndex([0,1,2,0,1,3,1,2,3,2,0,3]);
        g.computeVertexNormals();
        return g;
    }
    
    // Function to create Quadrilateral Pyramid geometry
    function quadPyr(A: THREE.Vector3, B: THREE.Vector3, C: THREE.Vector3, D: THREE.Vector3, ctr: THREE.Vector3, ins: number) {
        const ct = new THREE.Vector3().add(A).add(B).add(C).add(D).multiplyScalar(0.25);
        const vs = [A, B, C, D].map(v => ct.clone().addScaledVector(v.clone().sub(ct), ins));
        const pos: number[] = [];
        vs.concat([ctr]).forEach(v => { pos.push(v.x, v.y, v.z); });
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
        g.setIndex([0,1,2,0,2,3,0,1,4,1,2,4,2,3,4,3,0,4]);
        g.computeVertexNormals();
        return g;
    }
    
    function createCube(sz: number, ins: number) {
        while(cubeSolidGroup.children.length) cubeSolidGroup.remove(cubeSolidGroup.children[0]);
        const h = sz / 2;
        const ctr = new THREE.Vector3();
        const V = [
            new THREE.Vector3(-h,-h,h), new THREE.Vector3(h,-h,h),
            new THREE.Vector3(h,h,h), new THREE.Vector3(-h,h,h),
            new THREE.Vector3(-h,-h,-h), new THREE.Vector3(h,-h,-h),
            new THREE.Vector3(h,h,-h), new THREE.Vector3(-h,h,-h)
        ];
        // Define sides logic
        const sides: any[] = [[0,1,2,3,false,'st1'],[1,5,6,2,true,'st9'],[5,4,7,6,false,'st11'],[4,0,3,7,true,'st11']];
        sides.forEach((s: any) => {
            const A = V[s[0]].clone(), B = V[s[1]].clone(), C = V[s[2]].clone(), D = V[s[3]].clone();
            const tris = s[4] ? [[A,B,D],[B,C,D]] : [[A,B,C],[A,C,D]];
            tris.forEach((t: any) => {
                cubeSolidGroup.add(new THREE.Mesh(triPyr(t[0],t[1],t[2],ctr,ins/100), cM(s[5])));
            });
        });
        cubeSolidGroup.add(new THREE.Mesh(quadPyr(V[3].clone(),V[2].clone(),V[6].clone(),V[7].clone(),ctr,ins/100), cM('st3')));
        cubeSolidGroup.add(new THREE.Mesh(quadPyr(V[4].clone(),V[5].clone(),V[1].clone(),V[0].clone(),ctr,ins/100), cM('st4')));
        cubeGroup.position.set(0, -100, 0);
    }
    
    function createOuter() {
        const d = 18, cx = 500, cy = 442.5;
        OP.forEach(o => {
            const s = new THREE.Shape();
            s.moveTo(o.p[0] - cx, -(o.p[1] - cy));
            for (let i = 2; i < o.p.length; i += 2) {
                s.lineTo(o.p[i] - cx, -(o.p[i+1] - cy));
            }
            const g = new THREE.ExtrudeGeometry(s, {depth: d, bevelEnabled: true, bevelThickness: 1.1, bevelSize: 1.1, bevelSegments: 2, curveSegments: 6});
            g.computeVertexNormals();
            const m = new THREE.Mesh(g, cM(o.c));
            m.position.z = -d / 2;
            logoGroup.add(m);
        });
    }
    
    createOuter();
    createCube(270, 85);
    
    function updateLogoLayout() {
        const scale = window.innerWidth < 768 ? 0.4 : 0.55;
        logoGroup.scale.setScalar(scale);
        logoGroup.position.set(0, 40, 0);
    }
    updateLogoLayout();
    
    let scrollTh = window.innerHeight * 0.3;
    let curSP = 0;
    
    function getTargetSP() {
        const raw = Math.min(1, window.scrollY / scrollTh);
        return raw * raw * raw;
    }

    const prec = {xF: 0.00004, yF: 0.00006, zF: 0.00002, xA: 0.05, yA: 0.08, zA: 0.025};
    const cubeRot = {x: 0.002, y: 0.0032, z: 0.0012};
    const lightOrb = {r: 450, h: 500, s: 0.00003};
    let startT: number | null = null;
    let rafId: number | null = null;
    
    function getLightCol(t: number) {
        const p = (Math.sin(t) + 1) / 2;
        return ((255 - p * 8) << 16) | ((252 - p * 4 + (1 - p) * 4) << 8) | (248 + p * 7);
    }
    
    function tick(ts: number) {
        if (!startT) startT = ts;
        const el = ts - startT;
        const eIn = Math.min(1, el / 10000);
        const e = eIn * eIn * (3 - 2 * eIn);
        const tSP = getTargetSP();
        curSP += (tSP - curSP) * 0.08;
        const pd = 1 - curSP * 0.5;
        
        if (logoGroup && cubeGroup) {
            logoGroup.rotation.x = Math.sin(ts * prec.xF) * prec.xA * e * pd;
            logoGroup.rotation.y = Math.sin(ts * prec.yF) * prec.yA * e * pd;
            logoGroup.rotation.z = Math.sin(ts * prec.zF) * prec.zA * e * pd;
            
            const ca = (1 - curSP) * e;
            cubeGroup.rotation.x += cubeRot.x * ca;
            cubeGroup.rotation.y += cubeRot.y * ca;
            cubeGroup.rotation.z += cubeRot.z * ca;
        }

        if (keyLight) {
            const lt = ts * lightOrb.s;
            keyLight.position.set(lightOrb.r * Math.cos(lt), lightOrb.h, lightOrb.r * Math.sin(lt));
            keyLight.color.setHex(getLightCol(lt));
        }

        renderer.render(scene, camera);
        
        if (canvasRef.current && !canvasRef.current.classList.contains('loaded')) {
            canvasRef.current.classList.add('loaded');
        }
        
        rafId = requestAnimationFrame(tick);
    }

    if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(tick);
    } else {
        renderer.render(scene, camera);
        if (canvasRef.current) canvasRef.current.classList.add('loaded');
    }

    // Event Listeners
    const handleResize = () => {
        const a = window.innerWidth / window.innerHeight;
        camera.left = frustumSize * a / -2;
        camera.right = frustumSize * a / 2;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        scrollTh = window.innerHeight * 0.3;
        updateLogoLayout();
    };

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        if (rafId) cancelAnimationFrame(rafId);
        renderer.dispose();
    };
  }, []);

  return (
    <div className="landing-page-wrapper">
      <header className="landing-header">
        <div className="landing-header-shell">
          <a href="/" className="nav-brand" aria-label="Return to IOI Foundation home">
            <HeaderLogo className="nav-brand-logo" />
          </a>

          <div className="language-selector" ref={languageMenuRef}>
            {isLanguageOpen && (
              <button
                type="button"
                className="language-selector-overlay"
                aria-label="Close language selector"
                onClick={closeLanguageSelector}
              />
            )}

            <button
              type="button"
              className={`language-selector-button ${isLanguageOpen ? 'is-open' : ''}`}
              aria-expanded={isLanguageOpen}
              aria-haspopup="dialog"
              aria-controls="landing-language-popover"
              onClick={() => {
                if (isLanguageOpen) {
                  closeLanguageSelector();
                  return;
                }

                setIsLanguageOpen(true);
              }}
            >
              <LanguageGlobeIcon className="language-selector-icon" aria-hidden="true" />
              <span className="language-selector-label">
                <span>{selectedLanguage.nativeLabel}</span>
                {selectedLanguage.nativeRegion && <span className="language-selector-region">{selectedLanguage.nativeRegion}</span>}
              </span>
              <ChevronDown size={14} className={`language-selector-caret ${isLanguageOpen ? 'is-open' : ''}`} />
            </button>

            {isLanguageOpen && (
              <div
                id="landing-language-popover"
                className="language-selector-popover"
                role="dialog"
                aria-labelledby="landing-language-title"
                tabIndex={-1}
              >
                <div className="language-selector-popover-header">
                  <span id="landing-language-title">Select language</span>
                  <button
                    type="button"
                    className="language-selector-close"
                    aria-label="Close language selector"
                    onClick={closeLanguageSelector}
                  >
                    <X size={16} />
                  </button>
                </div>

                <label className="language-selector-search">
                  <Search size={14} className="language-selector-search-icon" />
                  <input
                    ref={languageSearchRef}
                    type="text"
                    value={languageQuery}
                    onChange={(event) => setLanguageQuery(event.target.value)}
                    placeholder="Search"
                    aria-autocomplete="list"
                    aria-controls="landing-language-listbox"
                    aria-expanded={isLanguageOpen}
                    aria-label="Search locales by name or region"
                    role="combobox"
                  />
                </label>

                <div className="language-selector-results">
                  <ul id="landing-language-listbox" role="listbox" aria-label="Language selector">
                    {filteredLanguageOptions.map((option) => {
                      const isSelected = option.code === selectedLanguage.code;

                      return (
                        <li key={option.code}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            className={`language-option ${isSelected ? 'is-selected' : ''}`}
                            onClick={() => {
                              setSelectedLanguage(option);
                              closeLanguageSelector();
                            }}
                          >
                            <span className="language-option-copy">
                              <span className="language-option-text">
                                <span>{option.nativeLabel}</span>
                                {option.nativeRegion && <span className="language-option-region">{option.nativeRegion}</span>}
                              </span>
                              <span className="language-option-subtext">
                                <span>{option.englishLabel}</span>
                                {option.englishRegion && <span className="language-option-region">{option.englishRegion}</span>}
                              </span>
                            </span>
                            {isSelected && (
                              <span className="language-option-check-wrap" aria-hidden="true">
                                <Check size={14} className="language-option-check" />
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>

                  {filteredLanguageOptions.length === 0 && (
                    <div className="language-selector-empty">No locales match your search.</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-canvas-container">
          <canvas ref={canvasRef} id="hero-canvas"></canvas>
        </div>
        <div className="hero-content">
          <p className="hero-mark">Charter · Public Stewardship</p>
          <h1 className="hero-title">IOI Foundation</h1>
          <p className="hero-subtitle">
            <span>Governance</span><span className="dot"></span>
            <span>Research</span><span className="dot"></span>
            <span>Protocol Integrity</span>
          </p>
          <p className="hero-oneliner">A public institution for protocol neutrality, research funding, and long-horizon security.</p>
          <div className="hero-ctas">
            <a href="/charter" className="hero-cta">Read the Charter</a>
            <a href="/governance" className="hero-cta">Governance Process</a>
          </div>
        </div>
        <div className="scroll-indicator"></div>
      </section>

      <main id="main-content">
        <section id="mission" className="mission landing-section">
          <div className="container">
            <p className="section-label">Mission</p>
            <h2 className="section-title">Autonomous systems will become more powerful than the institutions that deploy them. </h2>
            <p className="section-subhead">The only viable path forward is to make that power bounded, verifiable, and sovereign by design.</p>
            <div className="section-text">
              <p>Autonomous systems are already capable. What's missing is trust.</p>
              <p>As agents gain the ability to act independently — across code, infrastructure, and real-world systems — the risk is no longer theoretical. Systems that can act without constraint cannot be safely deployed at scale.</p>
              <p>IOI defines a new category: <strong>sovereign agent infrastructure</strong> — where every actor operates within explicit, enforceable authority boundaries, and every action is provably within bounds.</p>
            </div>
            <div className="mandate-grid">
              <div className="mandate-block">
                <h4>Bounded</h4>
                <p className="mandate-premise">Autonomy must be constrained by design, not intent.</p>
                <ul>
                  <li>Capability-scoped execution and explicit authority boundaries</li>
                  <li>Dynamic constraints that scale with trust — not static limits on intelligence</li>
                  <li>Actors cannot exceed their delegated permissions, regardless of model behavior</li>
                </ul>
                <p className="mandate-coda">Unbounded autonomy is unsafe.<br/>Bounded autonomy is an engineering discipline.</p>
              </div>
              <div className="mandate-block">
                <h4>Verifiable</h4>
                <p className="mandate-premise">Trust cannot depend on the platform — it must be independently provable.</p>
                <ul>
                  <li>Cryptographic receipts and auditable execution</li>
                  <li>Deterministic policy enforcement and replayable outcomes</li>
                  <li>Evidence that an action was valid — not just logs that it happened</li>
                </ul>
                <p className="mandate-coda">If a system cannot prove what it did, it cannot be trusted with real authority.</p>
              </div>
              <div className="mandate-block">
                <h4>Sovereign</h4>
                <p className="mandate-premise">Authority must belong to the user — not the system, not the platform.</p>
                <ul>
                  <li>Capability ownership, revocation, and delegation under user control</li>
                  <li>Portable identity and policy across environments and providers</li>
                  <li>Verification that does not depend on a single institution</li>
                </ul>
                <p className="mandate-coda">Autonomous systems should carry their authority — and their constraints — with them.</p>
              </div>
            </div>
            <p className="charter-excerpt"><em>"Without a shared framework for bounded and verifiable execution, one system's autonomy becomes another system's risk. IOI provides that framework."</em></p>
          </div>
        </section>

        <section id="charter" className="charter-section charter-banner-section landing-section">
          <div className="container">
            <div className="charter-banner">
              <div className="charter-banner-copy">
                <p className="section-label charter-banner-label">Charter</p>
                <h2 className="section-title charter-banner-title">The Foundation Charter</h2>
                <p className="charter-banner-text">Enforceable constitutional constraints on protocol action, mutation, and governance, designed to outlast market cycles and keep stewardship legible to the public.</p>
              </div>
              <div className="charter-banner-actions">
                <a href="/charter" className="hero-cta charter-banner-primary">Read the Charter</a>
                <div className="grants-ctas charter-banner-links">
                  <a href="/bylaws" className="section-cta flex items-center gap-2"><FileText size={16} /> Corporate Bylaws</a>
                  <a href="/governance" className="section-cta flex items-center gap-2"><Shield size={16} /> Governance Framework</a>
                  <a href="#transparency" className="section-cta flex items-center gap-2"><Calendar size={16} /> Decision Log</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="research" className="research landing-section">
          <div className="container">
            <p className="section-label">Research Programs</p>
            <h2 className="section-title">Long-Horizon Technical Investment</h2>
            <div className="section-text"><p>The Foundation funds research that commercial entities cannot justify — work measured in decades, not quarters.</p></div>
            <div className="research-areas">
              {researchItems.slice(0, 3).map((item) => (
                <div key={item.slug} className="research-area">
                  <h4>{item.title}</h4>
                  <div>
                    <p>{item.summary}</p>
                    <span className="research-deliverable">{item.deliverables}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="open-calls">
              <span className="open-calls-label">Research Catalog</span>
              <a href="/research" className="open-calls-date">View All</a>
            </div>
          </div>
        </section>

        <section id="transparency" className="transparency landing-section">
          <div className="container">
            <p className="section-label">Public Record</p>
            <h2 className="section-title">Transparency</h2>
            <div className="section-text">
              <p>Foundations are judged by their records. We publish decisions, governance outcomes, and financial summaries as a matter of institutional duty.</p>
            </div>
            
            <div className="transparency-grid">
              <div className="transparency-item">
                <h4>Legal Entity</h4><p>IOI Foundation<br/>Status: Formation in progress (Dec 2025)</p>
              </div>

              {/* DYNAMIC: Ratified Specs */}
              <div className="transparency-item">
                <h4>Ratified Standards</h4>
                 {ratifiedSpecs.length === 0 ? <p className="text-sm opacity-50">Fetching records...</p> : (
                  <div className="flex flex-col gap-3">
                    {ratifiedSpecs.map(s => (
                      <div key={s.id} className="flex items-start gap-2">
                        <FileText size={16} className="text-[var(--lp-accent)] shrink-0 mt-0.5" />
                        <div>
                            <span className="text-sm block font-medium text-[var(--lp-text-dark)]">{s.filename}</span>
                            <span className="text-xs text-[var(--lp-text-muted)]">Version {s.version}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* DYNAMIC: Meeting Minutes */}
              <div className="transparency-item">
                <h4>Recent Minutes</h4>
                {minutes.length === 0 ? <p className="text-sm opacity-50">Fetching records...</p> : (
                  <div className="flex flex-col gap-3">
                    {minutes.map(m => (
                      <div key={m.id} className="flex items-start gap-2">
                        <Calendar size={16} className="text-[var(--lp-text-muted)] shrink-0 mt-0.5" />
                        <div>
                            <span className="text-sm block font-medium text-[var(--lp-text-dark)]">{m.title}</span>
                            <span className="text-xs text-[var(--lp-text-muted)]">{new Date(m.date).toLocaleDateString(undefined, {dateStyle: 'medium'})}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="transparency-item">
                <h4>Contact</h4>
                <p>foundation at ioi.ai</p>
                <div className="mt-2">
                    <a href="#security" className="flex items-center gap-1.5 text-sm">
                        <Shield size={14} /> Security Disclosure
                    </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-mark">IOI Foundation</div>
          <nav className="footer-links">
            <a href="/charter">Charter</a>
            <a href="/bylaws">Bylaws</a>
            <a href="/governance">Governance</a>
            <a href="/research">Research</a>
            <a href="#transparency">Transparency</a>
            <button type="button" className="footer-link-button" onClick={onEnterApp}>Login</button>
          </nav>
          <p className="footer-copyright">{new Date().getFullYear()} IOI Foundation. Protocol stewardship for the long term.</p>
        </div>
      </footer>
    </div>
  );
};
