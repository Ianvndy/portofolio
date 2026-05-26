import { useState, useEffect } from "react";

const DARK = {
  "--bg":  "#1C1C1C", "--bg2": "#242424", "--br":  "#303030",
  "--t":   "#F2F2F2", "--t2":  "#9C9C9C", "--t3":  "#3E3E3E",
  "--at":  "#D4FF00", "--a":   "#D4FF00", "--sn":  "#272727",
  "--nb":  "rgba(28,28,28,0.92)",
  "--tk":  "#1E1E1E", "--tkb": "#2A2A2A", "--tkc": "#686868",
  "--inp": "#242424",
};

const LIGHT = {
  "--bg":  "#ECEAE6", "--bg2": "#E3E1DC", "--br":  "#CDCBC7",
  "--t":   "#141414", "--t2":  "#606060", "--t3":  "#ABABAB",
  "--at":  "#5E7200", "--a":   "#D4FF00", "--sn":  "#DEDAD6",
  "--nb":  "rgba(236,234,230,0.92)",
  "--tk":  "#D7D5D1", "--tkb": "#CDCBC7", "--tkc": "#5A5A5A",
  "--inp": "#E3E1DC",
};

const PROJECTS = [
  { id:1, title:"Project Title 1", desc:"Deskripsi singkat — apa yang dilakukan proyek ini, masalah yang diselesaikan, dan teknologi utamanya.", tags:["React","Node.js","MongoDB"],   github:"#", live:"#",  bg:"#08082a", ac:"#4466ff" },
  { id:2, title:"Project Title 2", desc:"Deskripsi singkat — apa yang dilakukan proyek ini, masalah yang diselesaikan, dan teknologi utamanya.", tags:["Next.js","Tailwind","PostgreSQL"],github:"#", live:null, bg:"#082008", ac:"#22cc55" },
  { id:3, title:"Project Title 3", desc:"Deskripsi singkat — apa yang dilakukan proyek ini, masalah yang diselesaikan, dan teknologi utamanya.", tags:["Vue.js","Express","Firebase"],    github:"#", live:"#",  bg:"#1a0808", ac:"#ff4455" },
  { id:4, title:"Project Title 4", desc:"Deskripsi singkat — apa yang dilakukan proyek ini, masalah yang diselesaikan, dan teknologi utamanya.", tags:["React","TypeScript","Supabase"],  github:"#", live:null, bg:"#0e0820", ac:"#aa44ff" },
];

const DESIGNS = [
  { id:1, title:"Brand Identity — Client Name", h:280, c1:"#ff6b35", c2:"#180500" },
  { id:2, title:"Poster Series",                h:200, c1:"#00bcd4", c2:"#001418" },
  { id:3, title:"UI Kit Design",                h:250, c1:"#9c27b0", c2:"#0a0012" },
  { id:4, title:"Social Media Kit",             h:200, c1:"#4caf50", c2:"#001a02" },
  { id:5, title:"Event Branding",               h:260, c1:"#ff9800", c2:"#150800" },
  { id:6, title:"Typography Poster",            h:200, c1:"#e91e63", c2:"#150008" },
];

const SKILLS = [
  { cat:"Frontend", items:["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { cat:"Backend",  items:["Node.js", "Express.js", "PostgreSQL", "MongoDB"] },
  { cat:"Design",   items:["Figma", "Illustrator", "Photoshop", "InDesign"] },
  { cat:"Tools",    items:["Git / GitHub", "Vercel", "VS Code", "Docker"] },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap');
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:var(--a)}

.reveal{opacity:0;transform:translateY(22px);transition:opacity 0.65s ease,transform 0.65s ease}
.reveal.in-view{opacity:1;transform:translateY(0)}
.d1{transition-delay:0.1s}.d2{transition-delay:0.2s}.d3{transition-delay:0.3s}

@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
.fade-up{animation:fadeUp 0.75s ease forwards}

.nb{
  background:none;border:none;cursor:pointer;padding:4px 0;
  font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;
  color:var(--t3);font-family:'DM Sans',sans-serif;transition:color .2s
}
.nb:hover,.nb.on{color:var(--at)}

.pc{background:var(--bg2);border:1px solid var(--br);border-radius:3px;overflow:hidden;transition:border-color .25s,transform .25s}
.pc:hover{border-color:var(--a);transform:translateY(-4px)}

.dc{background:var(--bg2);border:1px solid var(--br);border-radius:3px;overflow:hidden;transition:border-color .25s,transform .25s;margin-bottom:12px;break-inside:avoid}
.dc:hover{border-color:var(--a);transform:translateY(-4px)}

.tag{background:var(--tk);border:1px solid var(--tkb);color:var(--tkc);padding:3px 9px;border-radius:2px;font-size:11px;letter-spacing:.04em;font-family:'DM Sans',sans-serif}

.lnk{display:inline-flex;align-items:center;gap:4px;padding:5px 11px;border:1px solid var(--br);border-radius:2px;color:var(--t2);font-size:11px;text-decoration:none;background:none;cursor:pointer;letter-spacing:.04em;font-family:'DM Sans',sans-serif;transition:border-color .2s,color .2s}
.lnk:hover{border-color:var(--a);color:var(--at)}

.cta{display:inline-flex;align-items:center;gap:8px;padding:13px 28px;background:var(--a);color:#0C0C0C;font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;border:none;cursor:pointer;border-radius:2px;font-family:'DM Sans',sans-serif;transition:opacity .2s}
.cta:hover{opacity:.82}

.cta-o{display:inline-flex;align-items:center;gap:8px;padding:12px 28px;background:transparent;color:var(--at);font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;border:1px solid var(--a);cursor:pointer;border-radius:2px;font-family:'DM Sans',sans-serif;transition:background .2s,color .2s}
.cta-o:hover{background:var(--a);color:#0C0C0C}

.inp{width:100%;background:var(--inp);border:1px solid var(--br);border-radius:2px;color:var(--t);padding:12px 14px;font-size:14px;font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;resize:vertical}
.inp:focus{border-color:var(--a)}
.inp::placeholder{color:var(--t3)}

.snum{font-family:'Syne',sans-serif;font-size:clamp(60px,8vw,92px);font-weight:800;color:var(--sn);line-height:1;user-select:none;pointer-events:none}

.div{height:1px;background:linear-gradient(90deg,transparent 0%,var(--br) 30%,var(--br) 70%,transparent 100%);margin:0 52px}

.tgl{background:var(--bg2);border:1px solid var(--br);border-radius:2px;cursor:pointer;padding:5px 10px;font-size:11px;color:var(--t2);font-family:'DM Sans',sans-serif;transition:border-color .2s,color .2s;letter-spacing:.06em;text-transform:uppercase}
.tgl:hover{border-color:var(--a);color:var(--at)}

.pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(420px,1fr));gap:12px}
.dcols{column-count:3;column-gap:12px}
.agrid{display:grid;grid-template-columns:1fr 1fr;gap:80px}
.sgrid{display:grid;grid-template-columns:1fr 1fr;gap:32px 24px}

@media(max-width:960px){
  .pgrid{grid-template-columns:1fr}
  .dcols{column-count:2}
  .agrid{grid-template-columns:1fr;gap:40px}
}
@media(max-width:600px){
  .dcols{column-count:1}
  .hdots{display:none!important}
  nav,section,footer{padding-left:24px!important;padding-right:24px!important}
  .div{margin:0 24px}
}
`;

const P = "0 52px";

export default function Portfolio() {
  const [theme, setTheme]   = useState("dark");
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const thm = theme === "dark" ? DARK : LIGHT;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const ids = ["home","about","projects","design","contact"];
      let cur = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) cur = id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll);

    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in-view"); }),
      { threshold: 0.07 }
    );
    setTimeout(() => document.querySelectorAll(".reveal").forEach(el => obs.observe(el)), 120);

    return () => { window.removeEventListener("scroll", onScroll); obs.disconnect(); };
  }, []);

  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ ...thm, background:"var(--bg)", color:"var(--t)", minHeight:"100vh", fontFamily:"'DM Sans',sans-serif", transition:"background 0.35s,color 0.35s" }}>
      <style>{CSS}</style>

      {/* ── NAV ─────────────────────────────────────────── */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, padding:"20px 52px", display:"flex", alignItems:"center", justifyContent:"space-between", background: scrolled ? "var(--nb)" : "transparent", backdropFilter: scrolled ? "blur(18px)" : "none", borderBottom:`1px solid ${scrolled ? "var(--br)" : "transparent"}`, transition:"all 0.3s" }}>
        <button className="nb" onClick={() => go("home")} style={{ color:"var(--at)", fontSize:"15px", fontWeight:"800", fontFamily:"'Syne',sans-serif", letterSpacing:0 }}>
          YN<span style={{ color:"var(--t3)" }}>.</span>
        </button>
        <div style={{ display:"flex", gap:"28px", alignItems:"center" }}>
          {[["about","About"],["projects","Projects"],["design","Design"],["contact","Contact"]].map(([id,label]) => (
            <button key={id} className={`nb${active===id?" on":""}`} onClick={() => go(id)}>{label}</button>
          ))}
          <button className="tgl" onClick={() => setTheme(t => t==="dark" ? "light" : "dark")}>
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section id="home" className="fade-up" style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", padding:P, maxWidth:"1280px", margin:"0 auto", position:"relative" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"28px" }}>
          <div style={{ width:"36px", height:"1px", background:"var(--a)" }} />
          <span style={{ color:"var(--at)", fontSize:"11px", letterSpacing:"0.18em", textTransform:"uppercase", fontFamily:"'Syne',sans-serif" }}>Open to new projects</span>
        </div>

        <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(52px,9.5vw,120px)", fontWeight:"800", lineHeight:"0.92", letterSpacing:"-0.025em", marginBottom:"40px" }}>
          Your<br />
          <span style={{ color:"var(--at)" }}>Name</span><br />
          Here.
        </h1>

        <div style={{ display:"flex", gap:"64px", marginBottom:"48px", flexWrap:"wrap" }}>
          <p style={{ color:"var(--t2)", fontSize:"16px", lineHeight:"1.75", maxWidth:"440px", fontWeight:"300" }}>
            Web developer &amp; graphic designer based in Solo, Indonesia. Saya membangun interface yang bersih dan cepat, sekaligus merancang visual identity yang berkesan.
          </p>
          <div style={{ display:"flex", flexDirection:"column", gap:"10px", paddingTop:"4px" }}>
            {[["Web Dev","React · Next.js · Node.js"],["Design","Branding · UI/UX · Print"]].map(([r,s]) => (
              <div key={r} style={{ display:"flex", gap:"20px" }}>
                <span style={{ fontSize:"13px", fontWeight:"500", minWidth:"80px" }}>{r}</span>
                <span style={{ fontSize:"13px", color:"var(--t3)" }}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display:"flex", gap:"12px" }}>
          <button className="cta" onClick={() => go("projects")}>See My Work</button>
          <button className="cta-o" onClick={() => go("about")}>About Me</button>
        </div>

        <div className="hdots" style={{ position:"absolute", right:"52px", top:"50%", transform:"translateY(-50%)", display:"flex", flexDirection:"column", gap:"10px" }}>
          {[1,0.75,0.5,0.3,0.15,0.07].map((o,i) => (
            <div key={i} style={{ width:"4px", height:"4px", borderRadius:"50%", background:"var(--a)", opacity:o }} />
          ))}
        </div>
      </section>

      <div className="div" />

      {/* ── ABOUT ─────────────────────────────────────────── */}
      <section id="about" style={{ padding:"100px 52px", maxWidth:"1280px", margin:"0 auto" }}>
        <div className="reveal" style={{ marginBottom:"56px" }}>
          <div className="snum">01</div>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"30px", fontWeight:"800", marginTop:"-8px" }}>About</h2>
        </div>

        <div className="agrid reveal d1" style={{ marginBottom:"48px" }}>
          {/* Bio */}
          <div style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
            <p style={{ color:"var(--t2)", fontSize:"15px", lineHeight:"1.85", fontWeight:"300" }}>
              Halo! Saya seorang web developer dan graphic designer yang berbasis di Solo. Saya mulai coding sejak [tahun], dan sejak saat itu terus belajar membangun produk digital yang tidak hanya fungsional tapi juga enak dilihat.
            </p>
            <p style={{ color:"var(--t2)", fontSize:"15px", lineHeight:"1.85", fontWeight:"300" }}>
              Di sisi development, saya fokus pada frontend yang performatif dan user-friendly, dengan backend yang solid. Di sisi desain, saya suka menciptakan visual yang bersih tapi punya karakter — dari brand identity hingga UI untuk aplikasi.
            </p>
            <p style={{ color:"var(--t2)", fontSize:"15px", lineHeight:"1.85", fontWeight:"300" }}>
              Saya percaya desain yang baik dan kode yang baik bukan dua hal yang terpisah — keduanya harus bekerja bersama untuk menciptakan pengalaman yang solid bagi pengguna.
            </p>
          </div>

          {/* Skills */}
          <div className="sgrid">
            {SKILLS.map(({ cat, items }) => (
              <div key={cat}>
                <p style={{ fontSize:"10px", letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--at)", fontFamily:"'Syne',sans-serif", fontWeight:"700", marginBottom:"14px" }}>{cat}</p>
                <div style={{ display:"flex", flexDirection:"column", gap:"7px" }}>
                  {items.map(item => (
                    <span key={item} style={{ fontSize:"13.5px", color:"var(--t2)", fontWeight:"300" }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Currently */}
        <div className="reveal d2" style={{ borderTop:"1px solid var(--br)", paddingTop:"28px", display:"flex", gap:"20px", alignItems:"baseline" }}>
          <span style={{ fontSize:"10px", letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--at)", fontFamily:"'Syne',sans-serif", fontWeight:"700", whiteSpace:"nowrap" }}>Currently</span>
          <p style={{ color:"var(--t2)", fontSize:"14px", fontWeight:"300", lineHeight:"1.7" }}>
            Sedang mengeksplorasi [teknologi/topik yang sedang kamu pelajari] dan terbuka untuk proyek freelance baru.
          </p>
        </div>
      </section>

      <div className="div" />

      {/* ── PROJECTS ─────────────────────────────────────── */}
      <section id="projects" style={{ padding:"100px 52px", maxWidth:"1280px", margin:"0 auto" }}>
        <div className="reveal" style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:"48px" }}>
          <div>
            <div className="snum">02</div>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"30px", fontWeight:"800", marginTop:"-8px" }}>Web Projects</h2>
          </div>
          <span style={{ color:"var(--t3)", fontSize:"11px", letterSpacing:"0.1em" }}>{PROJECTS.length} PROJECTS</span>
        </div>

        <div className="pgrid">
          {PROJECTS.map((p,i) => (
            <div key={p.id} className={`pc reveal d${(i%3)+1}`}>
              <div style={{ height:"200px", background:`linear-gradient(140deg,${p.bg} 0%,rgba(20,20,20,0.95) 100%)`, position:"relative", overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse at 25% 65%,${p.ac}18 0%,transparent 60%)` }} />
                <span style={{ fontFamily:"'Syne',sans-serif", fontSize:"72px", fontWeight:"800", color:`${p.ac}14`, userSelect:"none" }}>
                  {String(p.id).padStart(2,"0")}
                </span>
                <div style={{ position:"absolute", top:"14px", right:"14px", display:"flex", gap:"6px" }}>
                  {p.live && <a href={p.live} className="lnk" target="_blank" rel="noreferrer">Live ↗</a>}
                  <a href={p.github} className="lnk" target="_blank" rel="noreferrer">GitHub</a>
                </div>
              </div>
              <div style={{ padding:"22px 24px" }}>
                <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:"17px", fontWeight:"700", marginBottom:"8px" }}>{p.title}</h3>
                <p style={{ color:"var(--t2)", fontSize:"13.5px", lineHeight:"1.65", marginBottom:"18px" }}>{p.desc}</p>
                <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
                  {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="div" />

      {/* ── DESIGN ─────────────────────────────────────────── */}
      <section id="design" style={{ padding:"100px 52px", maxWidth:"1280px", margin:"0 auto" }}>
        <div className="reveal" style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:"48px" }}>
          <div>
            <div className="snum">03</div>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"30px", fontWeight:"800", marginTop:"-8px" }}>Graphic Design</h2>
          </div>
          <span style={{ color:"var(--t3)", fontSize:"11px", letterSpacing:"0.1em" }}>{DESIGNS.length} WORKS</span>
        </div>

        <div className="dcols reveal d1">
          {DESIGNS.map(d => (
            <div key={d.id} className="dc">
              <div style={{ height:`${d.h}px`, background:`linear-gradient(140deg,${d.c2} 0%,${d.c1}2a 100%)`, position:"relative", overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ position:"absolute", inset:0, background:`radial-gradient(circle at 65% 35%,${d.c1}40 0%,transparent 65%)` }} />
                <span style={{ fontFamily:"'Syne',sans-serif", fontSize:"10px", letterSpacing:"0.18em", textTransform:"uppercase", color:"#2a2a2a", zIndex:1 }}>Screenshot</span>
              </div>
              <div style={{ padding:"12px 16px", borderTop:"1px solid var(--br)" }}>
                <p style={{ fontFamily:"'Syne',sans-serif", fontSize:"13px", fontWeight:"600" }}>{d.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="div" />

      {/* ── CONTACT ─────────────────────────────────────────── */}
      <section id="contact" style={{ padding:"100px 52px 140px", maxWidth:"720px", margin:"0 auto" }}>
        <div className="reveal" style={{ marginBottom:"48px" }}>
          <div className="snum">04</div>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"30px", fontWeight:"800", marginTop:"-8px" }}>Get in Touch</h2>
          <p style={{ color:"var(--t2)", fontSize:"15px", marginTop:"10px" }}>Ada proyek yang ingin didiskusikan? Saya siap mendengarnya.</p>
        </div>

        <div className="reveal d1" style={{ display:"flex", flexDirection:"column", gap:"10px", marginBottom:"40px" }}>
          <input className="inp" placeholder="Nama kamu" />
          <input className="inp" placeholder="email@kamu.com" />
          <textarea className="inp" placeholder="Ceritakan proyekmu..." rows={5} />
          <div style={{ paddingTop:"6px" }}>
            <button className="cta">Kirim Pesan →</button>
          </div>
        </div>

        <div className="reveal d2" style={{ borderTop:"1px solid var(--br)", paddingTop:"28px" }}>
          <p style={{ color:"var(--t3)", fontSize:"11px", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"14px" }}>Find me on</p>
          <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
            {[["GitHub","#"],["LinkedIn","#"],["Dribbble","#"],["Instagram","#"]].map(([l,u]) => (
              <a key={l} href={u} className="lnk">{l} ↗</a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer style={{ borderTop:"1px solid var(--br)", padding:"22px 52px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ color:"var(--t3)", fontSize:"12px", fontFamily:"'Syne',sans-serif", fontWeight:"700" }}>
          YN. {new Date().getFullYear()}
        </span>
        <span style={{ color:"var(--t3)", fontSize:"12px" }}>Designed &amp; built by me</span>
      </footer>
    </div>
  );
}
