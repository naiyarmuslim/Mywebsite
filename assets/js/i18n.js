(function () {

  // ── 1. TRANSLATIONS ─────────────────────────────────────
  var T = {
  "shared.nav.home": {
    "en": "Home",
    "de": "Startseite"
  },
  "shared.nav.about": {
    "en": "About Me",
    "de": "Über mich"
  },
  "shared.nav.courses": {
    "en": "Courses",
    "de": "Kurse"
  },
  "shared.nav.projects": {
    "en": "Projects",
    "de": "Projekte"
  },
  "shared.nav.content": {
    "en": "Content",
    "de": "Inhalte"
  },
  "shared.nav.contact": {
    "en": "Contact →",
    "de": "Kontakt →"
  },
  "shared.footer.copy": {
    "en": "© 2025 Naiyar Muslim. All rights reserved.",
    "de": "© 2025 Naiyar Muslim. Alle Rechte vorbehalten."
  },
  "home.eyebrow": {
    "en": "Applied CS Student · Germany",
    "de": "Angewandte Informatik · Deutschland"
  },
  "home.title_line1": {
    "en": "Naiyar",
    "de": "Naiyar"
  },
  "home.title_line2": {
    "en": "Muslim.",
    "de": "Muslim."
  },
  "home.desc": {
    "en": "Developer. Educator. Balti content creator. Building software with purpose and sharing knowledge — from code labs in Germany to the mountains of Baltistan.",
    "de": "Entwickler. Pädagoge. Balti-Content-Creator. Software mit Sinn entwickeln und Wissen teilen — von Codelabors in Deutschland bis zu den Bergen Baltistans."
  },
  "home.btn_projects": {
    "en": "↳ View Projects",
    "de": "↳ Projekte ansehen"
  },
  "home.btn_contact": {
    "en": "Get in touch",
    "de": "Kontakt aufnehmen"
  },
  "home.stat1_lbl": {
    "en": "Projects built",
    "de": "Projekte erstellt"
  },
  "home.stat2_lbl": {
    "en": "German (DSH-2)",
    "de": "Deutsch (DSH-2)"
  },
  "home.stat3_lbl": {
    "en": "Languages spoken",
    "de": "Gesprochene Sprachen"
  },
  "home.t_comment": {
    "en": "// who is naiyar?",
    "de": "// wer ist naiyar?"
  },
  "home.t_from": {
    "en": "Gilgit-Baltistan 🏔️",
    "de": "Gilgit-Baltistan 🏔️"
  },
  "home.t_based": {
    "en": "Germany",
    "de": "Deutschland"
  },
  "home.t_study": {
    "en": "Applied Comp. Science",
    "de": "Angewandte Informatik"
  },
  "home.t_goal": {
    "en": "Cyber Security / Network Architect",
    "de": "Cybersicherheit / Netzwerkarchitekt"
  },
  "home.t_status": {
    "en": "open_to_work",
    "de": "offen_fuer_stellen"
  },
  "home.t_cmd": {
    "en": "npm run build naiyar",
    "de": "npm run build naiyar"
  },
  "home.features_tag": {
    "en": "explore",
    "de": "Entdecken"
  },
  "home.features_title1": {
    "en": "Everything",
    "de": "Alles"
  },
  "home.features_title2": {
    "en": "I do.",
    "de": "was ich tue."
  },
  "home.feat1_title": {
    "en": "About Me",
    "de": "Über mich"
  },
  "home.feat1_desc": {
    "en": "From the Himalayas to Applied CS in Germany — my journey, mindset, and what drives me.",
    "de": "Vom Himalaya zur Angewandten Informatik — mein Werdegang und meine Motivation."
  },
  "home.feat1_link": {
    "en": "Read my story →",
    "de": "Meine Geschichte →"
  },
  "home.feat2_title": {
    "en": "Courses",
    "de": "Kurse"
  },
  "home.feat2_desc": {
    "en": "Academic foundation: algorithms, web dev, cloud computing, cybersecurity and more.",
    "de": "Akademische Grundlagen: Algorithmen, Webentwicklung, Cloud Computing und mehr."
  },
  "home.feat2_link": {
    "en": "View coursework →",
    "de": "Kurse ansehen →"
  },
  "home.feat3_title": {
    "en": "Projects",
    "de": "Projekte"
  },
  "home.feat3_desc": {
    "en": "Self-hosted cloud servers, web apps, C programming, and practical academic work.",
    "de": "Selbst gehostete Cloud-Server, Web-Apps, C-Programmierung und Akademikprojekte."
  },
  "home.feat3_link": {
    "en": "View projects →",
    "de": "Projekte ansehen →"
  },
  "home.feat4_title": {
    "en": "Content Creation",
    "de": "Content-Erstellung"
  },
  "home.feat4_desc": {
    "en": "Instagram reels & Facebook study guides in Balti for the people of Baltistan.",
    "de": "Instagram-Reels & Facebook-Lernvideos auf Balti für die Menschen Baltistans."
  },
  "home.feat4_link": {
    "en": "Watch content →",
    "de": "Inhalte ansehen →"
  },
  "home.cta_title": {
    "en": "Ready to connect?",
    "de": "Bereit, in Kontakt zu treten?"
  },
  "home.cta_desc": {
    "en": "Whether it's a job opportunity, a collaboration, or just a friendly hello — I'd love to hear from you.",
    "de": "Ob Jobangebot, Zusammenarbeit oder einfach ein nettes Hallo — ich freue mich von Ihnen zu hören."
  },
  "home.cta_btn": {
    "en": "✉ Send a Message",
    "de": "✉ Nachricht senden"
  },
  "about.page_tag": {
    "en": "about me",
    "de": "über mich"
  },
  "about.page_title1": {
    "en": "From the Himalayas",
    "de": "Vom Himalaya"
  },
  "about.page_title2": {
    "en": "to Applied CS.",
    "de": "zur Angewandten Informatik."
  },
  "about.story_tag": {
    "en": "my story",
    "de": "meine Geschichte"
  },
  "about.bio_title1": {
    "en": "Developer with a",
    "de": "Entwickler mit"
  },
  "about.bio_title2": {
    "en": "human-first mindset.",
    "de": "menschlichem Ansatz."
  },
  "about.p1": {
    "en": "Hello! I'm <strong>Naiyar Muslim</strong>. My journey began in the breathtaking landscapes of <strong>Gilgit-Baltistan</strong>, a region of towering peaks and rich culture in northern Pakistan.",
    "de": "Hallo! Ich bin <strong>Naiyar Muslim</strong>. Mein Weg begann in den atemberaubenden Landschaften von <strong>Gilgit-Baltistan</strong>, einer Region mit majestätischen Gipfeln und reicher Kultur in Nordpakistan."
  },
  "about.p2": {
    "en": "Currently I'm an <strong>Applied Computer Science student in Germany</strong>, studying with a German proficiency of <strong>C1 (DSH-2)</strong>. My technical approach is defined by <em>Innovative Persistence</em> — when I want to build something, it doesn't matter if I know how yet. I will learn, and I will do it.",
    "de": "Derzeit studiere ich <strong>Angewandte Informatik in Deutschland</strong> mit einem Deutschniveau von <strong>C1 (DSH-2)</strong>. Mein Ansatz ist <em>Innovative Beharrlichkeit</em> — wenn ich etwas bauen will, lerne ich es und setze es um."
  },
  "about.p3": {
    "en": "Beyond code, I spent years as a <strong>volunteer teacher</strong> — teaching English, Math, and Science in Baltistan. I also create <strong>study guide videos in Balti</strong> on Facebook and lifestyle reels on Instagram.",
    "de": "Neben dem Programmieren war ich jahrelang <strong>Freiwilligenlehrer</strong> für Englisch, Mathematik und Naturwissenschaften in Baltistan. Ich erstelle auch <strong>Lernvideos auf Balti</strong> bei Facebook und Instagram-Reels."
  },
  "about.timeline_tag": {
    "en": "timeline",
    "de": "Zeitverlauf"
  },
  "about.timeline_t1": {
    "en": "My journey",
    "de": "Mein Werdegang"
  },
  "about.timeline_t2": {
    "en": "so far.",
    "de": "bis jetzt."
  },
  "about.tl1_period": {
    "en": "BALTISTAN, PAKISTAN",
    "de": "BALTISTAN, PAKISTAN"
  },
  "about.tl1_title": {
    "en": "Growing Up — Curiosity in the Mountains",
    "de": "Aufgewachsen — Neugier in den Bergen"
  },
  "about.tl1_desc": {
    "en": "Grew up in the majestic landscape of Gilgit-Baltistan. First experience with computers: zero-internet environment, diagnosing hardware issues completely from first principles.",
    "de": "Aufgewachsen in der majestätischen Landschaft von Gilgit-Baltistan. Erste Computererfahrung ohne Internet — Hardware-Probleme eigenständig diagnostiziert."
  },
  "about.tl2_period": {
    "en": "TEACHING YEARS",
    "de": "LEHRJAHRE"
  },
  "about.tl2_title": {
    "en": "Volunteer Teacher — English, Math & Science",
    "de": "Freiwilliger Lehrer — Englisch, Mathe & Naturwiss."
  },
  "about.tl2_desc": {
    "en": "Served as a local mentor, providing free instruction to students. Developed strong communication, leadership, and the ability to break down complex ideas simply.",
    "de": "Als lokaler Mentor kostenlose Nachhilfe geleistet. Kommunikationsfähigkeit und die Fähigkeit entwickelt, komplexe Themen verständlich zu erklären."
  },
  "about.tl3_period": {
    "en": "WORK EXPERIENCE",
    "de": "BERUFSERFAHRUNG"
  },
  "about.tl3_title": {
    "en": "Multiple Roles — Resilience & Precision",
    "de": "Verschiedene Rollen — Belastbarkeit & Präzision"
  },
  "about.tl3_desc": {
    "en": "Call Center Sales Agent, Delivery & Assembly Helper, and Kitchen Professional — each role building work ethic, resilience, and process discipline.",
    "de": "Call-Center-Vertrieb, Liefer- und Montagetätigkeit sowie Küchenmitarbeiter — jede Rolle stärkte Arbeitsmoral und Prozessdisziplin."
  },
  "about.tl4_period": {
    "en": "PRESENT — GERMANY",
    "de": "AKTUELL — DEUTSCHLAND"
  },
  "about.tl4_title": {
    "en": "Applied CS Student · C1 German",
    "de": "Student Angewandte Informatik · C1 Deutsch"
  },
  "about.tl4_desc": {
    "en": "Studying Applied CS with German proficiency DSH-2/C1. Building practical projects, pursuing a path toward Cyber Security and Network Architecture.",
    "de": "Studium der Angewandten Informatik mit DSH-2/C1. Praktische Projekte, Ziel: Cybersicherheit und Netzwerkarchitektur."
  },
  "about.tl5_period": {
    "en": "FUTURE GOAL",
    "de": "ZUKUNFTSZIEL"
  },
  "about.tl5_title": {
    "en": "Cyber Security Analyst / Network Architect",
    "de": "Cybersicherheitsanalyst / Netzwerkarchitekt"
  },
  "about.tl5_desc": {
    "en": "Aspiring to be a soldier of good in cyber security — protecting citizens and ensuring a secure digital environment. Working toward CompTIA Security+ and CCNA.",
    "de": "Ich möchte ein Soldat des Guten in der Cybersicherheit sein. Ziel: CompTIA Security+ und CCNA."
  },
  "about.values_tag": {
    "en": "what drives me",
    "de": "Was mich antreibt"
  },
  "about.values_t1": {
    "en": "Core values &",
    "de": "Kernwerte &"
  },
  "about.values_t2": {
    "en": "strengths.",
    "de": "Stärken."
  },
  "about.v1_title": {
    "en": "Extreme Persistence",
    "de": "Extreme Beharrlichkeit"
  },
  "about.v1_desc": {
    "en": "Willing to dedicate up to 18 consecutive hours on a technical problem until it's solved.",
    "de": "Bereit, bis zu 18 Stunden an einem technischen Problem zu arbeiten bis es gelöst ist."
  },
  "about.v2_title": {
    "en": "Innovative Problem-Solving",
    "de": "Innovatives Problemlösen"
  },
  "about.v2_desc": {
    "en": "If I want to build it, I will learn how. Overcame ISP port restrictions with Cloudflare tunnels.",
    "de": "Wenn ich etwas bauen will, lerne ich es. ISP-Portbeschränkungen mit Cloudflare-Tunneln umgangen."
  },
  "about.v3_title": {
    "en": "Precision & Quality",
    "de": "Präzision & Qualität"
  },
  "about.v3_desc": {
    "en": "From refining kitchen order assembly from 15 mins to 7 mins, to treating every program execution with the same commitment.",
    "de": "Von der Optimierung der Bestellabwicklung auf 7 Minuten bis zur gleichen Sorgfalt bei jeder Programmausführung."
  },
  "about.v4_title": {
    "en": "Team Adaptability",
    "de": "Teamanpassungsfähigkeit"
  },
  "about.v4_desc": {
    "en": "Quickly assesses team strengths and adjusts my role to fill gaps and maintain maximum workflow efficiency.",
    "de": "Teamstärken schnell einschätzen und die eigene Rolle anpassen, um maximale Effizienz zu gewährleisten."
  },
  "about.v5_title": {
    "en": "Cultural Intelligence",
    "de": "Kulturelle Intelligenz"
  },
  "about.v5_desc": {
    "en": "Uses conversational greetings in Russian, Persian, and Arabic to build immediate rapport across language barriers.",
    "de": "Begrüßungen auf Russisch, Persisch und Arabisch, um sofort Vertrauen über Sprachbarrieren aufzubauen."
  },
  "about.v6_title": {
    "en": "Community Purpose",
    "de": "Gemeinschaftssinn"
  },
  "about.v6_desc": {
    "en": "Creating educational content in Balti for the people of Baltistan — making knowledge accessible to a mountain community that deserves every opportunity.",
    "de": "Bildungsinhalte auf Balti für die Menschen Baltistans — Wissen einer Berggemeinschaft zugänglich machen."
  },
  "about.lang_tag": {
    "en": "communication",
    "de": "Kommunikation"
  },
  "about.lang_t1": {
    "en": "Languages",
    "de": "Sprachen"
  },
  "about.lang_t2": {
    "en": "I speak.",
    "de": "die ich spreche."
  },
  "projects.page_tag": {
    "en": "portfolio",
    "de": "Portfolio"
  },
  "projects.page_title1": {
    "en": "Things I've",
    "de": "Was ich"
  },
  "projects.page_title2": {
    "en": "built.",
    "de": "gebaut habe."
  },
  "projects.self_tag": {
    "en": "self-learning",
    "de": "Eigenständige Projekte"
  },
  "projects.self_t1": {
    "en": "Personal &",
    "de": "Persönliche &"
  },
  "projects.self_t2": {
    "en": "Self-Built Projects",
    "de": "Eigenentwicklungen"
  },
  "projects.cat_done": {
    "en": "✓ Completed",
    "de": "✓ Abgeschlossen"
  },
  "projects.cat_wip": {
    "en": "⟳ In Progress / Paused",
    "de": "⟳ Laufend / Pausiert"
  },
  "projects.p1_name": {
    "en": "🖥️ Self-Hosted Cloud Server",
    "de": "🖥️ Selbst gehosteter Cloud-Server"
  },
  "projects.p1_desc": {
    "en": "Deployed a private Nextcloud instance on Linux using Docker Compose. Overcame ISP port-443 restriction with Cloudflare Proxy Tunnel. Diagnosed and resolved a recursive Git loop conflict via manual IP configuration.",
    "de": "Privates Nextcloud auf Linux via Docker Compose betrieben. ISP-Port-443-Einschränkung mit Cloudflare Proxy-Tunnel umgangen. Rekursiven Git-Schleifenkonflikt durch manuelle IP-Konfiguration gelöst."
  },
  "projects.p2_name": {
    "en": "🌐 Personal Portfolio Website",
    "de": "🌐 Persönliche Portfolio-Website"
  },
  "projects.p2_desc": {
    "en": "This website — modern developer portfolio with dark terminal aesthetic, responsive design, and bilingual EN/DE support.",
    "de": "Diese Website — modernes Entwicklerportfolio mit dunkler Terminal-Ästhetik, responsivem Design und zweisprachigem EN/DE-Support."
  },
  "projects.p3_name": {
    "en": "🤖 Simple AI Chatbot",
    "de": "🤖 Einfacher KI-Chatbot"
  },
  "projects.p3_desc": {
    "en": "Python-based chatbot using basic NLP and data structures. Currently paused while focusing on university coursework.",
    "de": "Python-Chatbot mit einfachem NLP und Datenstrukturen. Derzeit pausiert, Fokus auf Universitätsstudium."
  },
  "projects.uni_tag": {
    "en": "academic",
    "de": "Akademisch"
  },
  "projects.uni_t1": {
    "en": "University",
    "de": "Universitäts-"
  },
  "projects.uni_t2": {
    "en": "Projects",
    "de": "Projekte"
  },
  "projects.u1_name": {
    "en": "📊 Data Structures & Algorithms (Java)",
    "de": "📊 Datenstrukturen & Algorithmen (Java)"
  },
  "projects.u1_desc": {
    "en": "Implementation of core algorithms — sorting, tree traversal, graph search — with complexity analysis.",
    "de": "Implementierung von Kernalgorithmen — Sortieren, Baumdurchlauf, Graphensuche — mit Komplexitätsanalyse."
  },
  "projects.u2_name": {
    "en": "🔧 C Fundamentals — 12-Week Programme",
    "de": "🔧 C-Grundlagen — 12-Wochen-Programm"
  },
  "projects.u2_desc": {
    "en": "12 weeks of C programming exercises covering I/O, loops, functions, arrays, pointers, memory management, structs, and recursion.",
    "de": "12 Wochen C-Programmierübungen: Schleifen, Funktionen, Arrays, Zeiger, Speicherverwaltung, Strukturen und Rekursion."
  },
  "projects.cviewer_tag": {
    "en": "interactive viewer",
    "de": "Interaktiver Viewer"
  },
  "projects.cviewer_t1": {
    "en": "C Programming",
    "de": "C-Programmierung"
  },
  "projects.cviewer_t2": {
    "en": "12-Week Course.",
    "de": "12-Wochen-Kurs."
  },
  "projects.cviewer_sub": {
    "en": "Select a week and program to view the C source code and simulate execution.",
    "de": "Wähle eine Woche und ein Programm aus, um den C-Quellcode anzuzeigen und die Ausführung zu simulieren."
  },
  "projects.run_btn": {
    "en": "▶ Run Simulation",
    "de": "▶ Simulation starten"
  },
  "projects.gh_btn": {
    "en": "View GitHub →",
    "de": "GitHub ansehen →"
  },
  "content.page_tag": {
    "en": "content creation",
    "de": "Content-Erstellung"
  },
  "content.page_title1": {
    "en": "Sharing knowledge",
    "de": "Wissen teilen"
  },
  "content.page_title2": {
    "en": "with Baltistan.",
    "de": "mit Baltistan."
  },
  "content.balti_title": {
    "en": "Why I create content",
    "de": "Warum ich Content erstelle"
  },
  "content.balti_desc": {
    "en": "Baltistan is a remote, mountainous region in northern Pakistan with incredible people and enormous potential — but limited access to quality education in the local language. I create study guide videos in Balti on Facebook so students back home can learn in their mother tongue.",
    "de": "Baltistan ist eine abgelegene Bergregion in Nordpakistan mit unglaublichen Menschen — aber begrenztem Zugang zu Bildung in der Landessprache. Ich erstelle Lernvideos auf Balti bei Facebook, damit Schüler in der Heimat in ihrer Muttersprache lernen können."
  },
  "content.ig_follow": {
    "en": "📸 Follow on Instagram",
    "de": "📸 Auf Instagram folgen"
  },
  "content.ig_tag": {
    "en": "instagram reels",
    "de": "Instagram-Reels"
  },
  "content.ig_t1": {
    "en": "Recent",
    "de": "Aktuelle"
  },
  "content.ig_t2": {
    "en": "reels.",
    "de": "Reels."
  },
  "content.ig_all": {
    "en": "View all reels on Instagram →",
    "de": "Alle Reels auf Instagram →"
  },
  "content.r1_title": {
    "en": "Baltistan Views 🏔️",
    "de": "Baltistan-Ansichten 🏔️"
  },
  "content.r2_title": {
    "en": "Awara Vibes",
    "de": "Awara-Vibes"
  },
  "content.r3_title": {
    "en": "Life in Motion",
    "de": "Leben in Bewegung"
  },
  "content.r4_title": {
    "en": "Peaceful Moments",
    "de": "Friedliche Momente"
  },
  "content.fb_follow": {
    "en": "📘 Follow on Facebook",
    "de": "📘 Auf Facebook folgen"
  },
  "content.fb_tag": {
    "en": "facebook videos",
    "de": "Facebook-Videos"
  },
  "content.fb_t1": {
    "en": "Study guides",
    "de": "Lernvideos"
  },
  "content.fb_t2": {
    "en": "in Balti.",
    "de": "auf Balti."
  },
  "content.fb_all": {
    "en": "Watch more on Facebook →",
    "de": "Mehr auf Facebook →"
  },
  "content.f1_title": {
    "en": "Student Life in Germany",
    "de": "Studentenleben in Deutschland"
  },
  "content.f2_title": {
    "en": "Shaping New Minds",
    "de": "Neue Gedanken formen"
  },
  "content.f3_title": {
    "en": "Studying in Germany — A Guide",
    "de": "Studieren in Deutschland — Ein Leitfaden"
  },
  "content.f4_title": {
    "en": "Mathematics Explained",
    "de": "Mathematik erklärt"
  },
  "contact.page_tag": {
    "en": "contact",
    "de": "Kontakt"
  },
  "contact.page_title1": {
    "en": "Let's build",
    "de": "Lass uns"
  },
  "contact.page_title2": {
    "en": "something.",
    "de": "etwas bauen."
  },
  "contact.ci_loc_val": {
    "en": "Germany — Open to Remote & Relocation",
    "de": "Deutschland — Offen für Remote & Umzug"
  },
  "contact.ci_resp_val": {
    "en": "Usually within 24 hours",
    "de": "Normalerweise innerhalb von 24 Stunden"
  },
  "contact.ci_open_lbl": {
    "en": "Open to",
    "de": "Offen für"
  },
  "contact.ci_open_val": {
    "en": "Jobs, Internships, Collaborations, Mentorship",
    "de": "Jobs, Praktika, Zusammenarbeit, Mentoring"
  },
  "contact.form_title": {
    "en": "Send a message",
    "de": "Nachricht senden"
  },
  "contact.form_sub": {
    "en": "Whether it's a job opportunity, a collaboration, or just a friendly hello — I'd love to hear from you.",
    "de": "Ob Jobangebot, Zusammenarbeit oder ein nettes Hallo — ich freue mich auf Ihre Nachricht."
  },
  "contact.f_name": {
    "en": "Name",
    "de": "Name"
  },
  "contact.f_name_ph": {
    "en": "Your name",
    "de": "Ihr Name"
  },
  "contact.f_email": {
    "en": "Email",
    "de": "E-Mail"
  },
  "contact.f_email_ph": {
    "en": "your@email.com",
    "de": "ihre@email.de"
  },
  "contact.f_subject": {
    "en": "Subject",
    "de": "Betreff"
  },
  "contact.f_subject_ph": {
    "en": "e.g. Job Opportunity / Collaboration",
    "de": "z.B. Stellenangebot / Zusammenarbeit"
  },
  "contact.f_msg": {
    "en": "Message",
    "de": "Nachricht"
  },
  "contact.f_msg_ph": {
    "en": "Tell me about your project, opportunity, or question...",
    "de": "Erzählen Sie mir von Ihrem Projekt oder Ihrer Anfrage..."
  },
  "contact.f_submit": {
    "en": "✉ Send Message",
    "de": "✉ Nachricht absenden"
  },
  "contact.f_success": {
    "en": "✓ Message sent! I'll get back to you within 24 hours.",
    "de": "✓ Nachricht gesendet! Ich melde mich innerhalb von 24 Stunden."
  },
  "contact.faq_tag": {
    "en": "common questions",
    "de": "Häufige Fragen"
  },
  "contact.faq_title": {
    "en": "FAQs",
    "de": "FAQs"
  },
  "contact.q1": {
    "en": "Are you open to job opportunities?",
    "de": "Sind Sie offen für Stellenangebote?"
  },
  "contact.a1": {
    "en": "Yes! I'm actively looking for internships, working student positions, or entry-level roles in software development or cybersecurity in Germany. Also open to remote work.",
    "de": "Ja! Ich suche aktiv nach Praktika, Werkstudentenstellen oder Einstiegspositionen in der Softwareentwicklung oder Cybersicherheit in Deutschland. Auch Remote möglich."
  },
  "contact.q2": {
    "en": "Can you work in German?",
    "de": "Können Sie auf Deutsch arbeiten?"
  },
  "contact.a2": {
    "en": "Absolutely. I hold a C1 German certificate (DSH-2) and use German daily in academic and professional contexts.",
    "de": "Absolut. Ich besitze das C1-Deutschzertifikat (DSH-2) und verwende Deutsch täglich im akademischen und beruflichen Umfeld."
  },
  "contact.q3": {
    "en": "Do you do freelance web development?",
    "de": "Machen Sie freiberufliche Webentwicklung?"
  },
  "contact.a3": {
    "en": "I'm open to freelance projects, especially small to medium websites, web apps, or landing pages. Send me a message with your requirements.",
    "de": "Ich bin offen für Freelance-Projekte, insbesondere kleine bis mittlere Websites und Web-Apps."
  },
  "contact.q4": {
    "en": "Can you create content for my organization?",
    "de": "Können Sie Inhalte für meine Organisation erstellen?"
  },
  "contact.a4": {
    "en": "If you're working on educational content for Baltistani communities, I'd love to collaborate. I create content in Balti, Urdu, and English.",
    "de": "Wenn Sie an Bildungsinhalten für baltistanische Gemeinschaften arbeiten, würde ich gerne zusammenarbeiten. Ich erstelle Inhalte auf Balti, Urdu und Englisch."
  },
  "contact.q5": {
    "en": "How quickly do you respond?",
    "de": "Wie schnell antworten Sie?"
  },
  "contact.a5": {
    "en": "I typically respond within 24 hours. For urgent matters, email naiyarmuslim@gmail.com directly.",
    "de": "Ich antworte normalerweise innerhalb von 24 Stunden. Bei dringenden Angelegenheiten direkt an naiyarmuslim@gmail.com."
  },

  // ── COURSES — updated for YouTube + Cloudflare Pages ────
  "courses.page_tag": {
    "en": "German in Balti",
    "de": "Deutsch auf Balti"
  },
  "courses.page_title1": {
    "en": "Learn German,",
    "de": "Deutsch lernen,"
  },
  "courses.page_title2": {
    "en": "in your language.",
    "de": "in deiner Sprache."
  },
  "courses.page_desc": {
    "en": "Free German language lessons explained in Balti — for the students of Gilgit-Baltistan who dream of studying in Germany.",
    "de": "Kostenlose Deutschstunden auf Balti erklärt — für Schüler aus Gilgit-Baltistan, die in Deutschland studieren möchten."
  },
  "courses.stat_lessons": {
    "en": "Video Lessons",
    "de": "Video-Lektionen"
  },
  "courses.stat_levels": {
    "en": "3 Levels",
    "de": "3 Niveaustufen"
  },
  "courses.stat_free": {
    "en": "100% Free",
    "de": "100% Kostenlos"
  },
  "courses.stat_dl": {
    "en": "Download Available",
    "de": "Download verfügbar"
  },
  "courses.admin_btn": {
    "en": "Add Video",
    "de": "Video hinzufügen"
  },
  "courses.admin_title": {
    "en": "Add New Lesson (YouTube)",
    "de": "Neue Lektion hinzufügen (YouTube)"
  },
  "courses.cloud_title": {
    "en": "How to get your YouTube Video ID:",
    "de": "So findest du deine YouTube-Video-ID:"
  },
  "courses.cloud_s1": {
    "en": "Go to your YouTube video and copy the URL from the address bar.",
    "de": "Öffne dein YouTube-Video und kopiere die URL aus der Adressleiste."
  },
  "courses.cloud_s2": {
    "en": "The Video ID is the part after ?v= — e.g. in youtube.com/watch?v=dQw4w9WgXcQ the ID is dQw4w9WgXcQ.",
    "de": "Die Video-ID ist der Teil nach ?v= — z.B. in youtube.com/watch?v=dQw4w9WgXcQ ist die ID dQw4w9WgXcQ."
  },
  "courses.cloud_s3": {
    "en": "Paste just the 11-character ID into the YouTube Video ID field. The thumbnail and embed are set automatically.",
    "de": "Füge nur die 11-stellige ID in das YouTube-Video-ID-Feld ein. Vorschaubild und Einbettung werden automatisch gesetzt."
  },
  "courses.cloud_s4": {
    "en": "For the Download URL, upload the video file to Google Drive, Dropbox, or Cloudflare R2 and paste a direct download link — YouTube videos cannot be downloaded directly.",
    "de": "Für die Download-URL lade die Videodatei auf Google Drive, Dropbox oder Cloudflare R2 hoch und füge einen direkten Download-Link ein — YouTube-Videos können nicht direkt heruntergeladen werden."
  },
  "courses.cloud_s5": {
    "en": "Your site runs on Cloudflare Pages — lessons are stored in the browser. Use the Export button to back up your lessons as a JSON file.",
    "de": "Deine Website läuft auf Cloudflare Pages — Lektionen werden im Browser gespeichert. Nutze den Export-Button, um deine Lektionen als JSON-Datei zu sichern."
  },
  "courses.fl_title_en": {
    "en": "Lesson Title (English)",
    "de": "Lektionstitel (Englisch)"
  },
  "courses.fl_title_de": {
    "en": "Lesson Title (Deutsch)",
    "de": "Lektionstitel (Deutsch)"
  },
  "courses.fl_title_balti": {
    "en": "Lesson Title (Balti / بلتی)",
    "de": "Lektionstitel (Balti / بلتی)"
  },
  "courses.fl_level": {
    "en": "Level",
    "de": "Niveau"
  },
  "courses.fl_desc": {
    "en": "Description (shown on card)",
    "de": "Beschreibung (auf der Karte angezeigt)"
  },
  "courses.fl_video": {
    "en": "YouTube Video ID",
    "de": "YouTube-Video-ID"
  },
  "courses.hint_video": {
    "en": "Paste only the 11-character video ID from youtube.com/watch?v=VIDEO_ID. The video will be embedded via YouTube's privacy-enhanced player.",
    "de": "Füge nur die 11-stellige Video-ID aus youtube.com/watch?v=VIDEO_ID ein. Das Video wird über YouTubes datenschutzfreundlichen Player eingebettet."
  },
  "courses.fl_dl": {
    "en": "Download URL (Google Drive / Dropbox / Cloudflare R2)",
    "de": "Download-URL (Google Drive / Dropbox / Cloudflare R2)"
  },
  "courses.hint_dl": {
    "en": "YouTube videos cannot be downloaded directly. Upload your video file separately and paste a direct download link here. For Google Drive use: drive.google.com/uc?export=download&id=FILE_ID",
    "de": "YouTube-Videos können nicht direkt heruntergeladen werden. Lade die Videodatei separat hoch und füge hier einen direkten Download-Link ein. Für Google Drive: drive.google.com/uc?export=download&id=FILE_ID"
  },
  "courses.fl_dur": {
    "en": "Duration (e.g. 12:34)",
    "de": "Dauer (z.B. 12:34)"
  },
  "courses.fl_num": {
    "en": "Lesson Number",
    "de": "Lektionsnummer"
  },
  "courses.btn_add": {
    "en": "Add Lesson",
    "de": "Lektion hinzufügen"
  },
  "courses.filter_all": {
    "en": "All Levels",
    "de": "Alle Niveaus"
  },
  "courses.filter_a1": {
    "en": "A1 — Beginner",
    "de": "A1 — Anfänger"
  },
  "courses.filter_a2": {
    "en": "A2 — Elementary",
    "de": "A2 — Grundstufe"
  },
  "courses.filter_b1": {
    "en": "B1 — Intermediate",
    "de": "B1 — Mittelstufe"
  },
  "courses.empty": {
    "en": "No lessons yet — check back soon! If you are the admin, enter your password above to add the first video.",
    "de": "Noch keine Lektionen — bald verfügbar! Wenn du der Admin bist, gib oben dein Passwort ein, um das erste Video hinzuzufügen."
  },
  "courses.btn_dl": {
    "en": "Download Video",
    "de": "Video herunterladen"
  }
};

  // ── 2. DETECT LANGUAGE ──────────────────────────────────
  var GERMAN_LANGS = ['de', 'de-de', 'de-at', 'de-ch', 'de-li', 'de-lu'];

  function detectLang() {
    var saved = localStorage.getItem('nm_lang');
    if (saved === 'de' || saved === 'en') return saved;
    var langs = (navigator.languages && navigator.languages.length)
      ? navigator.languages : [navigator.language || 'en'];
    for (var i = 0; i < langs.length; i++) {
      var l = langs[i].toLowerCase();
      if (l === 'de' || GERMAN_LANGS.indexOf(l) !== -1) return 'de';
    }
    return 'en';
  }

  // ── 3. APPLY TRANSLATIONS ────────────────────────────────

  function applyLang(lang) {
    document.documentElement.lang = lang;
    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var key = el.getAttribute('data-i18n');
      var entry = T[key];
      if (!entry) continue;
      var val = entry[lang] !== undefined ? entry[lang] : entry['en'];
      if (el.getAttribute('data-i18n-html') !== null) {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    }
    var phEls = document.querySelectorAll('[data-i18n-ph]');
    for (var j = 0; j < phEls.length; j++) {
      var phEl = phEls[j];
      var phKey = phEl.getAttribute('data-i18n-ph');
      var phEntry = T[phKey];
      if (phEntry) phEl.placeholder = phEntry[lang] !== undefined ? phEntry[lang] : phEntry['en'];
    }
    var btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = lang === 'de' ? 'EN \ud83c\uddec\ud83c\udde7' : 'DE \ud83c\udde9\ud83c\uddea';
  }

  // ── 4. TOGGLE ────────────────────────────────────────────

  window.toggleLang = function () {
    var current = localStorage.getItem('nm_lang') || detectLang();
    var next = current === 'de' ? 'en' : 'de';
    localStorage.setItem('nm_lang', next);
    applyLang(next);
  };

  // ── 5. BOOT ──────────────────────────────────────────────

  function boot() { applyLang(detectLang()); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();