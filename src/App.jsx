import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';

const DARK = {
  "--bg":  "#1C1C1C", "--bg2": "#242424", "--br":  "#303030",
  "--t":   "#F2F2F2", "--t2":  "#9C9C9C", "--t3":  "#3E3E3E",
  "--at":  "#ffa600", "--a":   "#ffa600", "--sn":  "#272727",
  "--nb":  "rgba(28,28,28,0.92)",
  "--tk":  "#1E1E1E", "--tkb": "#2A2A2A", "--tkc": "#686868",
  "--inp": "#242424",
};

const LIGHT = {
  "--bg":  "#ECEAE6", "--bg2": "#E3E1DC", "--br":  "#CDCBC7",
  "--t":   "#141414", "--t2":  "#606060", "--t3":  "#ABABAB",
  "--at":  "#cc7a00", "--a":   "#ffa600", "--sn":  "#DEDAD6",
  "--nb":  "rgba(236,234,230,0.92)",
  "--tk":  "#D7D5D1", "--tkb": "#CDCBC7", "--tkc": "#5A5A5A",
  "--inp": "#E3E1DC",
};

const PROJECTS = [
  {
    id: 1, title: "SPK Shabat",
    desc: "Sistem Pendukung Keputusan berbasis web untuk membantu proses seleksi dan rekomendasi, dibangun sebagai project magang menggunakan Laravel.",
    tags: ["Laravel", "PHP", "Blade", "MySQL"],
    github: "https://github.com/Ianvndy/spkshabat", live: null,
    img: "/projects/spk.jpg", bg: "#08082a", ac: "#4466ff"
  },
  {
    id: 2, title: "SkincareAuth",
    desc: "Sistem autentikasi produk skincare berbasis QR Code dengan Laravel 11. Setiap scan tercatat dan terverifikasi dari generated, validated, hingga purchased.",
    tags: ["Laravel 11", "QR Code", "MySQL", "Tailwind CSS"],
    github: "https://github.com/Ianvndy/skincareauth", live: null,
    img: "/projects/auth.jpg", bg: "#082008", ac: "#22cc55"
  },
  {
    id: 3, title: "Belleza Beauty",
    desc: "Sistem booking online dan manajemen antrian untuk salon kecantikan di Kartasura. Fitur realtime slot, notifikasi WhatsApp, dan dashboard admin lengkap.",
    tags: ["Laravel 11", "Blade", "MySQL", "WhatsApp API"],
    github: "https://github.com/Ianvndy/bellezabeauty", live: null,
    img: "/projects/belleza.jpg", bg: "#1a0808", ac: "#ff4455"
  },
  {
    id: 4, title: "Remake Web",
    desc: "Project redesign website, membangun ulang tampilan dan struktur web yang sudah ada menjadi lebih modern, responsif, dan performatif.",
    tags: ["Laravel", "PHP", "CSS", "JavaScript"],
    github: "https://github.com/Ianvndy/remakeweb", live: null,
    img: "/projects/shabat.jpg", bg: "#0e0820", ac: "#aa44ff"
  },
];

const SKILLS = [
  { cat:"Frontend", items:["React", "Next.js", "Tailwind CSS", "Blade", "JavaScript"] },
  { cat:"Backend",  items:["Laravel", "Node.js", "MySQL", "REST API"] },
  { cat:"Design",   items:["Photoshop", "Canva"] },
  { cat:"Tools",    items:["Git / GitHub", "Vercel", "VS Code", "Claude"] },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap');
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{overflow-x:hidden}
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:var(--a)}

.reveal{opacity:0;transform:translateY(22px);transition:opacity 0.65s ease,transform 0.65s ease}
.reveal.in-view{opacity:1;transform:translateY(0)}
.d1{transition-delay:0.1s}.d2{transition-delay:0.2s}.d3{transition-delay:0.3s}

@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
.fade-up{animation:fadeUp 0.75s ease forwards}

.nb{background:none;border:none;cursor:pointer;padding:4px 0;font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--t3);font-family:'DM Sans',sans-serif;transition:color .2s}
.nb:hover,.nb.on{color:var(--at)}

.pc{background:var(--bg2);border:1px solid var(--br);border-radius:3px;overflow:hidden;transition:border-color .25s,transform .25s}
.pc:hover{border-color:var(--a);transform:translateY(-4px)}

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

.div{height:1px;background:linear-gradient(90deg,transparent 0%,var(--br) 30%,var(--br) 70%,transparent 100%);margin:0 52px}

.tgl{background:var(--bg2);border:1px solid var(--br);border-radius:2px;cursor:pointer;padding:5px 10px;font-size:11px;color:var(--t2);font-family:'DM Sans',sans-serif;transition:border-color .2s,color .2s;letter-spacing:.06em;text-transform:uppercase}
.tgl:hover{border-color:var(--a);color:var(--at)}

/* FIX 1: pgrid pakai min() agar tidak overflow di layar kecil */
.pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(420px,100%),1fr));gap:12px}

.agrid{display:grid;grid-template-columns:1fr 1fr;gap:80px}
.sgrid{display:grid;grid-template-columns:1fr 1fr;gap:32px 24px}

/* FIX 2: proj-thumb-wrap pakai padding-top trick untuk 16:9 yang benar */
.proj-thumb-wrap{position:relative;padding-top:56.25%;height:0;overflow:hidden}
.proj-thumb{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
.proj-thumb-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.55) 0%,transparent 50%)}
.proj-thumb-fallback{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}

/* FIX 3: nav mobile */
.nav-links{display:flex;gap:28px;align-items:center}
.nav-menu-btn{display:none;background:none;border:1px solid var(--br);padding:6px 10px;border-radius:2px;cursor:pointer;color:var(--t2);font-size:18px;line-height:1}
.mobile-menu{display:none;position:fixed;top:60px;left:0;right:0;background:var(--nb);backdrop-filter:blur(18px);border-bottom:1px solid var(--br);padding:20px 24px;flex-direction:column;gap:16px;z-index:99}
.mobile-menu.open{display:flex}
.mobile-nb{background:none;border:none;cursor:pointer;font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:var(--t3);font-family:'DM Sans',sans-serif;text-align:left;padding:4px 0;transition:color .2s}
.mobile-nb:hover,.mobile-nb.on{color:var(--at)}

@media(max-width:768px){
  .nav-links{display:none}
  .nav-menu-btn{display:block}
  .agrid{grid-template-columns:1fr;gap:40px}
  .sgrid{grid-template-columns:1fr 1fr;gap:20px 16px}
  .div{margin:0 24px}
}

@media(max-width:480px){
  .sgrid{grid-template-columns:1fr 1fr;gap:16px}
  .hdots{display:none!important}
}
`;

const SP = { desktop: "0 52px", mobile: "0 24px" };

export default function Portfolio() {
  const [theme, setTheme]   = useState("dark");
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const thm = theme === "dark" ? DARK : LIGHT;

  const textColor      = thm["--t"];
  const textColor2     = thm["--t2"];
  const textColor3     = thm["--t3"];
  const accentTextColor = thm["--at"];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const ids = ["home","about","projects","contact"];
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

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", checkMobile);
      obs.disconnect();
    };
  }, []);

  const P = isMobile ? SP.mobile : SP.desktop;

  const go = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const NAV_ITEMS = [["about","About"],["projects","Projects"],["contact","Contact"]];

  return (
    <div style={{ ...thm, background:"var(--bg)", color: textColor, minHeight:"100vh", fontFamily:"'DM Sans',sans-serif", transition:"background 0.35s,color 0.35s" }}>
      <style>{CSS}</style>

      {/* ── NAV ── */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, padding: isMobile ? "16px 24px" : "20px 52px", display:"flex", alignItems:"center", justifyContent:"space-between", background: scrolled ? "var(--nb)" : "transparent", backdropFilter: scrolled ? "blur(18px)" : "none", borderBottom:`1px solid ${scrolled ? "var(--br)" : "transparent"}`, transition:"all 0.3s" }}>
        <button className="nb" onClick={() => go("home")} style={{ color: accentTextColor, fontSize:"15px", fontWeight:"800", fontFamily:"'Syne',sans-serif", letterSpacing:0 }}>
          Ianz Dev<span style={{ color: textColor3 }}>.</span>
        </button>

        {/* Desktop nav */}
        <div className="nav-links">
          {NAV_ITEMS.map(([id,label]) => (
            <button key={id} className={`nb${active===id?" on":""}`} onClick={() => go(id)}>{label}</button>
          ))}
          <button className="tgl" onClick={() => setTheme(t => t==="dark" ? "light" : "dark")}>
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>

        {/* Mobile: toggle + hamburger */}
        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
          <button className="tgl" onClick={() => setTheme(t => t==="dark" ? "light" : "dark")} style={{ display: isMobile ? "block" : "none" }}>
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <button className="nav-menu-btn" onClick={() => setMenuOpen(o => !o)} style={{ color: textColor2 }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`} style={{ background:"var(--nb)" }}>
        {NAV_ITEMS.map(([id,label]) => (
          <button key={id} className={`mobile-nb${active===id?" on":""}`} onClick={() => go(id)}>{label}</button>
        ))}
      </div>

      {/* ── HERO ── */}
      <section id="home" className="fade-up" style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", padding:P, maxWidth:"1280px", margin:"0 auto", position:"relative" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"28px" }}>
          <div style={{ width:"36px", height:"1px", background:"var(--a)" }} />
          <span style={{ color: accentTextColor, fontSize:"11px", letterSpacing:"0.18em", textTransform:"uppercase", fontFamily:"'Syne',sans-serif" }}>Open to new projects</span>
        </div>

        <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(44px,9.5vw,120px)", fontWeight:"800", lineHeight:"0.92", letterSpacing:"-0.025em", marginBottom:"40px", color: textColor }}>
          Ian<br />
          <span style={{ color: accentTextColor }}>Projects</span><br />
          Portofolio.
        </h1>

        <div style={{ display:"flex", gap: isMobile ? "28px" : "64px", marginBottom:"48px", flexWrap:"wrap", flexDirection: isMobile ? "column" : "row" }}>
          <p style={{ color: textColor2, fontSize:"16px", lineHeight:"1.75", maxWidth:"440px", fontWeight:"300" }}>
            Web developer &amp; graphic designer based in Solo, Indonesia. Saya membangun interface yang bersih dan cepat, sekaligus merancang visual identity yang berkesan.
          </p>
          <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
            {[["Web Dev","Laravel · React · Next.js · Node.js"],["Design","Branding · Poster"]].map(([r,s]) => (
              <div key={r} style={{ display:"flex", gap:"16px", flexWrap:"wrap" }}>
                <span style={{ fontSize:"13px", fontWeight:"500", minWidth:"72px", color: textColor }}>{r}</span>
                <span style={{ fontSize:"13px", color: textColor3 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
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

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding:`100px ${isMobile ? "24px" : "52px"}`, maxWidth:"1280px", margin:"0 auto" }}>
        <div className="reveal" style={{ marginBottom:"56px" }}>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"30px", fontWeight:"800", color: textColor }}>About</h2>
        </div>

        <div className="agrid reveal d1" style={{ marginBottom:"48px" }}>
          <div style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
            <p style={{ color: textColor2, fontSize:"15px", lineHeight:"1.85", fontWeight:"300" }}>
              Halo! Saya Iann, web developer dan graphic designer yang berbasis di Solo, Jawa Tengah. Mulai serius terjun ke dunia coding sejak 2023, dan terus belajar membangun produk digital yang tidak hanya fungsional tapi juga enak dilihat.
            </p>
            <p style={{ color: textColor2, fontSize:"15px", lineHeight:"1.85", fontWeight:"300" }}>
              Di sisi development, saya fokus pada backend berbasis Laravel dan PHP, dengan sentuhan frontend yang bersih. Di sisi desain, saya suka menciptakan visual yang punya karakter dari brand identity hingga UI untuk aplikasi.
            </p>
            <p style={{ color: textColor2, fontSize:"15px", lineHeight:"1.85", fontWeight:"300" }}>
              Saya percaya desain yang baik dan kode yang baik bukan dua hal yang terpisah, keduanya harus bekerja bersama untuk menciptakan pengalaman yang solid bagi pengguna.
            </p>
          </div>
          <div className="sgrid">
            {SKILLS.map(({ cat, items }) => (
              <div key={cat}>
                <p style={{ fontSize:"10px", letterSpacing:"0.14em", textTransform:"uppercase", color: accentTextColor, fontFamily:"'Syne',sans-serif", fontWeight:"700", marginBottom:"14px" }}>{cat}</p>
                <div style={{ display:"flex", flexDirection:"column", gap:"7px" }}>
                  {items.map(item => (
                    <span key={item} style={{ fontSize:"13.5px", color: textColor2, fontWeight:"300" }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal d2" style={{ borderTop:"1px solid var(--br)", paddingTop:"28px", display:"flex", gap:"20px", alignItems:"baseline", flexWrap:"wrap" }}>
          <span style={{ fontSize:"10px", letterSpacing:"0.14em", textTransform:"uppercase", color: accentTextColor, fontFamily:"'Syne',sans-serif", fontWeight:"700", whiteSpace:"nowrap" }}>Currently</span>
          <p style={{ color: textColor2, fontSize:"14px", fontWeight:"300", lineHeight:"1.7" }}>
            Sedang mengeksplorasi Laravel lebih dalam dan mulai belajar Python untuk AI/ML. Terbuka untuk proyek freelance baru web dev maupun desain.
          </p>
        </div>
      </section>

      <div className="div" />

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding:`100px ${isMobile ? "24px" : "52px"}`, maxWidth:"1280px", margin:"0 auto" }}>
        <div className="reveal" style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:"48px" }}>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"30px", fontWeight:"800", color: textColor }}>Web Projects</h2>
          <span style={{ color: textColor3, fontSize:"11px", letterSpacing:"0.1em" }}>{PROJECTS.length} PROJECTS</span>
        </div>

        <div className="pgrid">
          {PROJECTS.map((p,i) => (
            <div key={p.id} className={`pc reveal d${(i%3)+1}`}>

              {/* FIX 2: 16:9 dengan padding-top trick yang benar */}
              <div className="proj-thumb-wrap">
                {p.img ? (
                  <>
                    <img
                      src={p.img}
                      alt={p.title}
                      className="proj-thumb"
                      onError={e => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextSibling.style.opacity = "1";
                      }}
                    />
                    <div style={{ position:"absolute", inset:0, opacity:0, background:`linear-gradient(140deg,${p.bg} 0%,rgba(30,30,30,0.97) 100%)`, transition:"opacity 0.2s", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse at 25% 65%,${p.ac}18 0%,transparent 60%)` }} />
                      <span style={{ fontFamily:"'Syne',sans-serif", fontSize:"72px", fontWeight:"800", color:`${p.ac}14`, userSelect:"none" }}>
                        {String(p.id).padStart(2,"0")}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="proj-thumb-fallback" style={{ background:`linear-gradient(140deg,${p.bg} 0%,rgba(30,30,30,0.97) 100%)` }}>
                    <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse at 25% 65%,${p.ac}18 0%,transparent 60%)` }} />
                    <span style={{ fontFamily:"'Syne',sans-serif", fontSize:"72px", fontWeight:"800", color:`${p.ac}14`, userSelect:"none" }}>
                      {String(p.id).padStart(2,"0")}
                    </span>
                  </div>
                )}
                {p.img && <div className="proj-thumb-overlay" />}
                <div style={{ position:"absolute", top:"14px", right:"14px", display:"flex", gap:"6px", zIndex:2 }}>
                  {p.live && <a href={p.live} className="lnk" target="_blank" rel="noreferrer">Live ↗</a>}
                  <a href={p.github} className="lnk" target="_blank" rel="noreferrer">GitHub</a>
                </div>
              </div>

              <div style={{ padding:"22px 24px" }}>
                <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:"17px", fontWeight:"700", marginBottom:"8px", color: textColor }}>{p.title}</h3>
                <p style={{ color: textColor2, fontSize:"13.5px", lineHeight:"1.65", marginBottom:"18px" }}>{p.desc}</p>
                <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
                  {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="div" />

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding:`100px ${isMobile ? "24px" : "52px"} 140px`, maxWidth:"720px", margin:"0 auto" }}>
        <div className="reveal" style={{ marginBottom:"48px" }}>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"30px", fontWeight:"800", color: textColor }}>Get in Touch</h2>
          <p style={{ color: textColor2, fontSize:"15px", marginTop:"10px" }}>Ada proyek yang ingin didiskusikan? Saya siap mendengarnya.</p>
        </div>

        <div className="reveal d1" style={{ display:"flex", flexDirection:"column", gap:"10px", marginBottom:"40px" }}>
          <input className="inp" placeholder="Nama kamu" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          <input className="inp" placeholder="email@kamu.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          <textarea className="inp" placeholder="Ceritakan proyekmu..." rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
          <div style={{ paddingTop:"6px" }}>
            <button className="cta" onClick={() => {
              if (!form.name || !form.email || !form.message) return alert("Lengkapi semua field dulu ya!");
              setSending(true);
              emailjs.send("service_atd1o5w","template_d9283if",{ name: form.name, email: form.email, message: form.message },"DkrlGV0f1OzDScYz_")
                .then(() => { setSending(false); setSent(true); setForm({ name:"", email:"", message:"" }); })
                .catch(() => { setSending(false); alert("Gagal kirim, coba lagi."); });
            }}>
              {sent ? "Pesan Terkirim ✓" : sending ? "Mengirim..." : "Kirim Pesan →"}
            </button>
          </div>
        </div>

        <div className="reveal d2" style={{ borderTop:"1px solid var(--br)", paddingTop:"28px" }}>
          <p style={{ color: textColor3, fontSize:"11px", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"14px" }}>Find me on</p>
          <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
            {[["GitHub","https://github.com/Ianvndy"],["LinkedIn","https://www.linkedin.com/in/iann-shandy-569b713a9"],["Instagram","https://www.instagram.com/iannvndy"]].map(([l,u]) => (
              <a key={l} href={u} className="lnk" target="_blank" rel="noreferrer">{l} ↗</a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:"1px solid var(--br)", padding: isMobile ? "22px 24px" : "22px 52px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"8px" }}>
        <span style={{ color: textColor3, fontSize:"12px", fontFamily:"'Syne',sans-serif", fontWeight:"700" }}>Ianz Dev. {new Date().getFullYear()}</span>
        <span style={{ color: textColor3, fontSize:"12px" }}>Designed &amp; built by me</span>
      </footer>
    </div>
  );
}