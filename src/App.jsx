import { useState, useEffect, useRef } from 'react'
import './index.css'

/* ===== Reveal Hook ===== */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el) } },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`reveal ${delay ? `reveal-delay-${delay}` : ''} ${className}`}>
      {children}
    </div>
  )
}

/* ===== Icons ===== */
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
)

const ChevronDown = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

/* ===== Data ===== */
const problems = [
  {
    id: 'content',
    number: '01',
    icon: '✍️',
    problem: '没有内容体系',
    subtitle: '品牌没有系统化的内容输出，发什么全靠灵感',
    solution: '搭建从 0 到 1 的品牌内容体系',
    approach: '从品牌差异化定位出发，构建视频 + 图文内容矩阵，建立可复用的内容资产库。不是帮你"做一条视频"，而是帮你建一个持续产出内容的系统。',
    metric: { value: '120万+', label: '内容累计曝光' },
    cases: [
      {
        tag: 'Branding',
        title: '差异化定位体系',
        desc: 'BOLD CUTS · NO SAUCE · FRESH GREENS — 提炼出品牌的差异化语言体系，让每一条内容都在强化同一个认知。',
      },
      {
        tag: 'Content',
        title: '视频 + 图文内容矩阵',
        desc: '短视频 + 图文多平台分发，建立内容日历与数据追踪机制，持续稳定地输出品牌内容。',
      },
      {
        tag: 'Asset',
        title: '内容资产沉淀',
        desc: '从一次性内容到长期可复用的品牌资产库，让每一次创作都有复利。',
      },
    ],
  },
  {
    id: 'growth',
    number: '02',
    icon: '📈',
    problem: '转化上不去',
    subtitle: '活动做了不少，客单和转化就是跟不上',
    solution: '设计可量化的增长链路',
    approach: '从节日营销到新品上架，设计完整的转化路径——预热、引爆、承接、复盘，每一步都有数据可追踪，每一步都指向下单。',
    metric: { value: '+¥6', label: '平均客单提升' },
    cases: [
      {
        tag: 'Campaign',
        title: '节日限定活动',
        desc: '端午 / 中秋 / 春节等节日限定活动策划与视觉设计，把节日流量转化为实际订单增长。',
      },
      {
        tag: 'Launch',
        title: '新品全链路曝光',
        desc: '从预热悬念到正式上架到效果复盘，完整的新品推广流程，确保每款新品都被目标用户看见。',
      },
    ],
  },
  {
    id: 'retention',
    number: '03',
    icon: '👥',
    problem: '用户留不住',
    subtitle: '来了就走，社群没人看，复购全靠运气',
    solution: '让用户从「路过」变成「常客」',
    approach: '社群精细化运营 + 唤醒触达策略。优惠券不只是打折工具，社群不只是发广告的地方——每一个触点都是品牌与用户建立关系的机会。',
    metric: { value: '+41%', label: '券打开率提升' },
    cases: [
      {
        tag: 'CRM',
        title: '唤醒触达 · 券面即内容',
        desc: '重新设计优惠券的视觉和文案，让券面本身成为品牌内容载体，打开率和核销率同步提升。',
      },
      {
        tag: 'Community',
        title: '社群精细化运营',
        desc: '用户分层、活动节奏、话题设计——让社群从「广告群」变成用户愿意主动打开的地方。',
      },
    ],
  },
  {
    id: 'data',
    number: '04',
    icon: '📊',
    problem: '决策靠感觉',
    subtitle: '该上什么菜、该推什么品，全凭直觉',
    solution: '用数据把猜测变成行动方案',
    approach: '销售数据分析 + 用户行为洞察 + A/B 测试迭代。不是给你一堆报表，而是直接告诉你：下一步该做什么、为什么、预期效果是多少。',
    metric: { value: '↓32%', label: '复购周期缩短' },
    cases: [
      {
        tag: 'Analytics',
        title: '销售数据 → 菜单决策',
        desc: '品类结构分析、单品表现追踪、时段热力图——用数据找到菜单的最优解，砍掉低效品、放大爆品。',
      },
      {
        tag: 'Testing',
        title: 'A/B 测试与持续迭代',
        desc: '从活动方案到文案话术到定价策略，用数据验证每一个假设，让每次迭代都有方向。',
      },
    ],
  },
]

const aiTags = [
  'Prompt Engineering', 'AI 辅助设计', '数据分析自动化',
  'Claude / GPT 协作', '工作流自动化', 'AI 内容生成',
  'MJ 视觉生成', '效率工具整合',
]

/* ===== Problem Card ===== */
function ProblemCard({ data, isActive, onClick }) {
  return (
    <div className={`p-card ${isActive ? 'active' : ''}`} onClick={onClick} role="button" tabIndex={0}>
      <div className="p-card-top">
        <span className="p-card-number">{data.number}</span>
        <span className="p-card-icon">{data.icon}</span>
      </div>
      <h3 className="p-card-problem">{data.problem}</h3>
      <p className="p-card-subtitle">{data.subtitle}</p>
      <div className="p-card-bottom">
        <div className="p-card-metric">
          <span className="p-card-metric-value">{data.metric.value}</span>
          <span className="p-card-metric-label">{data.metric.label}</span>
        </div>
        <div className={`p-card-arrow ${isActive ? 'rotated' : ''}`}>
          <ChevronDown />
        </div>
      </div>
    </div>
  )
}

/* ===== Problem Detail Panel ===== */
function ProblemDetail({ data, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [data.id])

  return (
    <div className="p-detail" ref={ref}>
      <div className="p-detail-inner">
        <div className="p-detail-header">
          <div className="p-detail-header-left">
            <span className="p-detail-number">{data.number}</span>
            <div>
              <h3 className="p-detail-problem">{data.problem}</h3>
              <p className="p-detail-solution">{data.solution}</p>
            </div>
          </div>
          <button className="p-detail-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="p-detail-body">
          <div className="p-detail-approach">
            <h4>我的解法</h4>
            <p>{data.approach}</p>
          </div>
          <div className="p-detail-metric">
            <div className="p-detail-metric-value">{data.metric.value}</div>
            <div className="p-detail-metric-label">{data.metric.label}</div>
          </div>
        </div>

        <div className="p-detail-cases">
          <h4>实战案例</h4>
          <div className="p-detail-cases-grid">
            {data.cases.map((c, i) => (
              <div key={i} className="case-card">
                <span className="case-tag">{c.tag}</span>
                <h5 className="case-title">{c.title}</h5>
                <p className="case-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ===== Main App ===== */
function App() {
  const [activeWindow, setActiveWindow] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.3, rootMargin: '-72px 0px -40% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleWindow = (index) => {
    setActiveWindow(activeWindow === index ? null : index)
  }

  const navLinks = [
    { id: 'problems', label: 'Problems' },
    { id: 'for-ai', label: 'For AI' },
    { id: 'about', label: 'About' },
  ]

  return (
    <>
      {/* Nav */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <a className="nav-logo" href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            Douni.
          </a>
          <div className="nav-links">
            {navLinks.map((link) => (
              <a
                key={link.id}
                className={activeSection === link.id ? 'active' : ''}
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero" id="hero">
        <div className="hero-inner">
          <Reveal>
            <p className="hero-label">品牌数字化运营 · 内容运营</p>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="hero-name">Douni Huang</h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="hero-tagline">
              I solve <strong>4 core problems</strong> for food &amp; lifestyle brands.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <a className="hero-cta" onClick={() => scrollTo('problems')}>
              See what I solve <ArrowRight />
            </a>
          </Reveal>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="hero-scroll-line" />
        </div>
      </section>

      {/* Problems */}
      <section className="problems" id="problems">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <p className="section-label">What I Solve</p>
              <h2>四个核心问题</h2>
              <p className="section-desc">点击任意窗口，查看我的解法和实战案例</p>
            </div>
          </Reveal>

          <div className="p-grid">
            {problems.map((p, i) => (
              <Reveal key={p.id} delay={i + 1}>
                <ProblemCard
                  data={p}
                  isActive={activeWindow === i}
                  onClick={() => toggleWindow(i)}
                />
              </Reveal>
            ))}
          </div>

          {activeWindow !== null && (
            <ProblemDetail
              data={problems[activeWindow]}
              onClose={() => setActiveWindow(null)}
            />
          )}
        </div>
      </section>

      {/* For AI */}
      <section className="for-ai" id="for-ai">
        <div className="container">
          <Reveal>
            <div className="section-header section-header--light">
              <p className="section-label section-label--light">AI Collaboration</p>
              <h2>For AI</h2>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div className="for-ai-content">
              <p>
                我把 AI 当作真正的协作伙伴，而不是替代工具。从 Prompt Engineering 到工作流自动化，
                AI 已经深度嵌入我的日常工作——包括数据分析、视觉设计、内容生成和运营决策。
              </p>
              <p>
                我相信最好的工作来自人机协作：人提供判断力、创意和温度，AI 提供速度、规模和一致性。
              </p>
              <div className="for-ai-tags">
                {aiTags.map((tag, i) => (
                  <span key={i} className="for-ai-tag">{tag}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* About */}
      <section className="about" id="about">
        <div className="container">
          <Reveal>
            <div className="about-inner">
              <p className="section-label">About</p>
              <h2>谢谢浏览到这里</h2>
              <p>
                我是 Douni，一个关注品牌数字化运营的内容人。我相信好的运营不是套路，
                而是真诚地把品牌的温度传递给每一个用户。如果你也在寻找一个既能做内容、
                又能看数据、还能和 AI 打配合的运营搭档——我们聊聊？
              </p>
              <a className="about-cta" href="mailto:dounihuang@gmail.com">
                Let's work together <ArrowRight />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-left">
              <h3>Douni Huang</h3>
              <p>品牌数字化运营 · 内容运营</p>
            </div>
            <div className="footer-right">
              <a href="tel:+8613825681223">138 2568 1223</a>
              <a href="mailto:dounihuang@gmail.com">dounihuang@gmail.com</a>
            </div>
          </div>
          <div className="footer-bottom">
            © {new Date().getFullYear()} Douni Huang. Built with care.
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
