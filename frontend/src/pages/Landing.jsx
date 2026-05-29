import { useNavigate } from 'react-router-dom'
import { Car, Home, ShoppingBag, Zap, ChevronRight, MessageSquare, Target, TrendingUp, Shield, Star } from 'lucide-react'
import Navbar from '../components/Navbar'

const SCENARIOS = [
  {
    id: 'car',
    icon: Car,
    title: 'Car Deals',
    emoji: '🚗',
    description: 'Beat dealer tactics, know fair market value, close at the right price.',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80',
    color: 'blue',
    examples: ['Used car from dealer', 'Private seller', 'Bike / scooter'],
  },
  {
    id: 'rent',
    icon: Home,
    title: 'Rent Negotiation',
    emoji: '🏠',
    description: 'Lower your monthly rent, get better terms, negotiate like a pro.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
    color: 'emerald',
    examples: ['Apartment rent', 'Office space', 'Renewal negotiation'],
  },
  {
    id: 'market',
    icon: ShoppingBag,
    title: 'Market Haggling',
    emoji: '🛍️',
    description: 'Haggle confidently at bazaars, electronics shops, and anywhere.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80',
    color: 'orange',
    examples: ['Electronics', 'Clothing & fashion', 'Furniture & decor'],
  },
]

const STEPS = [
  {
    step: '01',
    icon: Target,
    title: 'Set the Context',
    description: 'Tell us what you\'re buying, the asking price, and your budget.',
  },
  {
    step: '02',
    icon: MessageSquare,
    title: 'Enter What They Say',
    description: 'Type what the seller says during the negotiation.',
  },
  {
    step: '03',
    icon: Zap,
    title: 'Get Coached Live',
    description: 'Receive exact scripts, strategy, and a signal when to walk away.',
  },
]

const STATS = [
  { value: '₹47K', label: 'Avg. savings per deal' },
  { value: '94%', label: 'Users negotiate better' },
  { value: '3 min', label: 'To master any deal' },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute top-40 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/30 rounded-full px-4 py-1.5 mb-8">
              <Zap className="w-3.5 h-3.5 text-blue-400" fill="currentColor" />
              <span className="text-blue-400 text-sm font-medium">AI-Powered Negotiation Coach</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6">
              Win Every{' '}
              <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400 bg-clip-text text-transparent">
                Negotiation
              </span>
            </h1>

            <p className="text-xl text-slate-400 leading-relaxed mb-10 max-w-xl mx-auto">
              Real-time AI coaching tells you <strong className="text-white">exactly what to say</strong>, when to push, and when to walk away — for cars, rent, and everyday purchases.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/negotiate')}
                className="btn-primary text-base px-8 py-4 flex items-center justify-center gap-2"
              >
                Start Coaching Free
                <ChevronRight className="w-5 h-5" />
              </button>
              <a
                href="#how-it-works"
                className="btn-secondary text-base px-8 py-4 text-center"
              >
                See How It Works
              </a>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap justify-center gap-8 mt-16 pt-12 border-t border-slate-800/60">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-black text-white">{s.value}</p>
                  <p className="text-sm text-slate-400 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scenarios */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Pick Your Battleground</h2>
          <p className="text-slate-400 text-lg">Expert coaching for the three biggest negotiation arenas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SCENARIOS.map((s) => {
            const colorMap = {
              blue: { ring: 'group-hover:ring-blue-500/50', badge: 'bg-blue-600/20 text-blue-400', btn: 'bg-blue-600 hover:bg-blue-500' },
              emerald: { ring: 'group-hover:ring-emerald-500/50', badge: 'bg-emerald-600/20 text-emerald-400', btn: 'bg-emerald-600 hover:bg-emerald-500' },
              orange: { ring: 'group-hover:ring-orange-500/50', badge: 'bg-orange-600/20 text-orange-400', btn: 'bg-orange-600 hover:bg-orange-500' },
            }[s.color]

            return (
              <div
                key={s.id}
                onClick={() => navigate(`/negotiate?scenario=${s.id}`)}
                className={`group card overflow-hidden cursor-pointer ring-1 ring-transparent ${colorMap.ring} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  <span className="absolute top-4 left-4 text-3xl">{s.emoji}</span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-slate-400 text-sm mb-4">{s.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {s.examples.map((ex) => (
                      <span key={ex} className={`text-xs px-2.5 py-1 rounded-full font-medium ${colorMap.badge}`}>
                        {ex}
                      </span>
                    ))}
                  </div>
                  <button className={`w-full ${colorMap.btn} text-white text-sm font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2`}>
                    Start Negotiating
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-slate-400 text-lg">Three steps to winning any deal.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={s.step} className="relative text-center">
                  {i < STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[40%] h-px bg-gradient-to-r from-blue-500/50 to-transparent" />
                  )}
                  <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-5 ring-1 ring-blue-500/30">
                    <Icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <div className="text-blue-500/50 font-black text-4xl mb-2 font-mono">{s.step}</div>
                  <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{s.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: Target,
              title: 'Exact Scripts',
              desc: 'No more guessing what to say. Get word-for-word phrases crafted for your exact situation.',
              color: 'text-blue-400',
              bg: 'bg-blue-600/10',
            },
            {
              icon: TrendingUp,
              title: 'Fair Price Intelligence',
              desc: 'Know the real market value before you sit down. Never overpay again.',
              color: 'text-emerald-400',
              bg: 'bg-emerald-600/10',
            },
            {
              icon: Shield,
              title: 'Walk-Away Signal',
              desc: 'AI detects when a deal is no longer worth it and tells you to leave — before you lose.',
              color: 'text-orange-400',
              bg: 'bg-orange-600/10',
            },
            {
              icon: Zap,
              title: 'Real-Time Coaching',
              desc: 'The advice updates every time the seller says something new. Live, dynamic, contextual.',
              color: 'text-purple-400',
              bg: 'bg-purple-600/10',
            },
          ].map((f) => {
            const Icon = f.icon
            return (
              <div key={f.title} className="card p-6 flex gap-4">
                <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center shrink-0`}>
                  <Icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{f.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">What People Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Rohan M.',
                role: 'Bought a used Honda City',
                quote: 'Saved ₹85,000 on my car. The dealer kept using tactics I didn\'t recognize — the AI called every one of them.',
                stars: 5,
              },
              {
                name: 'Priya K.',
                role: 'Renegotiated apartment rent',
                quote: 'Got ₹4,000 off my monthly rent. The script it gave me was so calm and confident — my landlord agreed in 10 minutes.',
                stars: 5,
              },
              {
                name: 'Aditya S.',
                role: 'Electronics market, Nehru Place',
                quote: 'Used it to buy a laptop. Told me the exact price to counter with. Ended up paying ₹8,000 less than the asking price.',
                stars: 5,
              },
            ].map((t) => (
              <div key={t.name} className="card p-5">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">"{t.quote}"</p>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="text-4xl sm:text-5xl font-black mb-6">
              Ready to win your<br />next deal?
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto">
              Free to use. No sign-up. Just enter your context and start coaching.
            </p>
            <button
              onClick={() => navigate('/negotiate')}
              className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2"
            >
              Start Coaching Now
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" fill="white" />
            </div>
            <span className="font-bold text-sm">Negotiate<span className="text-blue-500">AI</span></span>
          </div>
          <p className="text-slate-500 text-sm">© 2025 NegotiateAI. For informational purposes only.</p>
        </div>
      </footer>
    </div>
  )
}
