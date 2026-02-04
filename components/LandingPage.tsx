import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { supabase } from '../lib/supabase';
import './LandingPage.css';
import { Meeting, Spec } from '../types';
import { FileText, Calendar, Shield, ExternalLink, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Dynamic Data State
  const [minutes, setMinutes] = useState<Meeting[]>([]);
  const [ratifiedSpecs, setRatifiedSpecs] = useState<Spec[]>([]);

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

  // Three.js Animation Effect
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0b); // Matches --lp-bg-dark
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
    
    function updateScale() {
        const scale = window.innerWidth < 768 ? 0.4 : 0.55;
        logoGroup.scale.setScalar(scale);
    }
    updateScale();
    logoGroup.position.set(0, 40, 0);
    
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
        
        // Show canvas
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
        updateScale();
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
      <button onClick={onEnterApp} className="nav-login-btn">
        Login
      </button>

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
            <a href="#charter" className="hero-cta">Read the Charter</a>
            <a href="#governance" className="hero-cta">Governance Process</a>
          </div>
        </div>
        <div className="scroll-indicator"></div>
      </section>

      <main id="main-content">
        <section id="mission" className="mission landing-section">
          <div className="container">
            <p className="section-label">Mission</p>
            <h2 className="section-title">Stewardship of the Semantic Internet</h2>
            <p className="section-subhead">A neutral institution responsible for the protocol's long-horizon integrity.</p>
            <div className="section-text">
              <p>The IOI Foundation exists to ensure the long-term integrity, neutrality, and evolution of the Internet of Intelligence protocol — the foundational infrastructure for verifiable AI and deterministic agent execution.</p>
              <p>We operate as custodians, not controllers. Our role is to facilitate governance, fund research, and protect the protocol's core principles across generations of technological change.</p>
            </div>
            <div className="mandate-grid">
              <div className="mandate-block"><h4>Mandate</h4><ul><li>Preserve protocol neutrality and credible upgrade paths</li><li>Fund research and standards work that hardens verifiability</li><li>Publish public records: decisions, grants, audits, and keys</li></ul></div>
              <div className="mandate-block"><h4>Non-Goals</h4><ul><li>The Foundation does not operate validators</li><li>The Foundation does not control applications or markets</li></ul></div>
            </div>
            <p className="charter-excerpt"><em>"The Foundation exists to preserve neutrality, publish the record, and steward protocol integrity across technological change."</em></p>
          </div>
        </section>

        <section id="charter" className="charter-section landing-section">
          <div className="container">
            <p className="section-label">Charter</p>
            <h2 className="section-title">The Foundation Charter</h2>
            <div className="section-text"><p>The Charter defines the Foundation's mandate, limits, and governance requirements. It is designed to outlast market cycles and keep protocol stewardship legible to the public.</p></div>
            <div className="grants-ctas">
                <a href="#" className="section-cta flex items-center gap-2"><FileText size={16} /> Bylaws (PDF)</a>
                <a href="#" className="section-cta flex items-center gap-2"><Shield size={16} /> Governance Framework</a>
                <a href="#" className="section-cta flex items-center gap-2"><ArrowRight size={16} /> Decision Log</a>
            </div>
          </div>
        </section>

        <section id="governance" className="governance landing-section">
          <div className="container">
            <p className="section-label">Governance</p>
            <h2 className="section-title">Constitutional Protocol Stewardship</h2>
            <div className="section-text"><p>Protocol governance requires structures that outlast any single generation of stakeholders. The Foundation maintains separation between operational decisions and constitutional amendments, ensuring stability without stagnation.</p></div>
            <div className="process-flow">
              <h4>Governance Process</h4>
              <ol className="process-steps">
                <li><span className="step-name">Proposal</span><span className="step-desc">IOI Improvement Proposal (IIP) submitted publicly</span></li>
                <li><span className="step-name">Review</span><span className="step-desc">Technical Council + public comment window</span></li>
                <li><span className="step-name">Safety</span><span className="step-desc">Formal security review requirements</span></li>
                <li><span className="step-name">Ratification</span><span className="step-desc">Threshold rule with defined quorum</span></li>
                <li><span className="step-name">Activation</span><span className="step-desc">Scheduled, versioned, reproducible releases</span></li>
                <li><span className="step-name">Record</span><span className="step-desc">Final decision + rationale published</span></li>
              </ol>
            </div>
          </div>
        </section>

        <section id="research" className="research landing-section">
          <div className="container">
            <p className="section-label">Research Programs</p>
            <h2 className="section-title">Long-Horizon Technical Investment</h2>
            <div className="section-text"><p>The Foundation funds research that commercial entities cannot justify — work measured in decades, not quarters.</p></div>
            <div className="research-areas">
              <div className="research-area"><h4>Post-Quantum Migration</h4><p>Developing transition pathways for cryptographic primitives as quantum computing matures.</p><span className="research-deliverable">Deliverables: Reference roadmap, test vectors, upgrade semantics</span></div>
              <div className="research-area"><h4>Formal Verification</h4><p>Proving protocol correctness through mathematical methods. We invest in tooling that allows critical infrastructure to be verified, not merely tested.</p><span className="research-deliverable">Deliverables: Spec proofs, model checking, invariant suites</span></div>
              <div className="research-area"><h4>Semantic Consensus</h4><p>Research into deterministic meaning resolution across heterogeneous agent populations.</p><span className="research-deliverable">Deliverables: Canonicalization rules, verifier frameworks, determinism boundaries</span></div>
            </div>
            <div className="open-calls"><span className="open-calls-label">Open Calls</span><span className="open-calls-date">Next RFP: Q1 2026</span></div>
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
            <a href="#charter">Charter</a>
            <a href="#governance">Governance</a>
            <a href="#research">Research</a>
            <a href="#grants">Grants</a>
            <a href="#transparency">Transparency</a>
          </nav>
          <p className="footer-copyright">{new Date().getFullYear()} IOI Foundation. Protocol stewardship for the long term.</p>
        </div>
      </footer>
    </div>
  );
};