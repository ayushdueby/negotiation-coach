import { useState, useRef, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Send, Loader2, Car, Home, ShoppingBag, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react'
import Navbar from '../components/Navbar'
import CoachPanel from '../components/CoachPanel'
import { getCoaching } from '../services/api'

const SCENARIOS = [
  { id: 'car', label: 'Car Deal', icon: Car, placeholder: 'e.g. 2019 Honda City, 80,000 km, petrol', color: 'blue' },
  { id: 'rent', label: 'Rent', icon: Home, placeholder: 'e.g. 2BHK apartment in Koramangala, Bangalore', color: 'emerald' },
  { id: 'market', label: 'Market', icon: ShoppingBag, placeholder: 'e.g. Dell laptop, 15 inch, i5, 16GB RAM', color: 'orange' },
]

const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP', 'AED']

function ContextForm({ onStart }) {
  const [params] = useSearchParams()
  const defaultScenario = params.get('scenario') || 'car'

  const [scenario, setScenario] = useState(defaultScenario)
  const [itemDescription, setItemDescription] = useState('')
  const [askingPrice, setAskingPrice] = useState('')
  const [budget, setBudget] = useState('')
  const [targetPrice, setTargetPrice] = useState('')
  const [currency, setCurrency] = useState('INR')

  const currentScenario = SCENARIOS.find((s) => s.id === scenario)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!itemDescription || !askingPrice || !budget || !targetPrice) return
    onStart({
      scenario,
      itemDescription,
      askingPrice: parseFloat(askingPrice),
      budget: parseFloat(budget),
      targetPrice: parseFloat(targetPrice),
      currency,
    })
  }

  const colorMap = {
    blue: 'bg-red-800/30 text-red-400 border-red-600/40',
    emerald: 'bg-emerald-600/20 text-emerald-400 border-emerald-500/40',
    orange: 'bg-orange-600/20 text-orange-400 border-orange-500/40',
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black mb-2">Set Up Your Negotiation</h1>
          <p className="text-slate-400">Tell us the basics — we'll coach you through the rest.</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 space-y-5">
          {/* Scenario selector */}
          <div>
            <label className="label">What are you negotiating?</label>
            <div className="grid grid-cols-3 gap-3 mt-1">
              {SCENARIOS.map((s) => {
                const Icon = s.icon
                const active = scenario === s.id
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setScenario(s.id)}
                    className={`flex flex-col items-center gap-2 py-3 px-2 rounded-xl border transition-all text-sm font-medium ${
                      active
                        ? colorMap[s.color]
                        : 'border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {s.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Item description */}
          <div>
            <label className="label">Describe the item / property</label>
            <input
              type="text"
              className="input-field"
              placeholder={currentScenario.placeholder}
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              required
            />
          </div>

          {/* Currency */}
          <div>
            <label className="label">Currency</label>
            <select
              className="input-field"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c} className="bg-slate-800">{c}</option>
              ))}
            </select>
          </div>

          {/* Prices */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="label">Asking Price</label>
              <input
                type="number"
                className="input-field"
                placeholder="e.g. 650000"
                value={askingPrice}
                onChange={(e) => setAskingPrice(e.target.value)}
                min="0"
                required
              />
            </div>
            <div>
              <label className="label">Your Budget</label>
              <input
                type="number"
                className="input-field"
                placeholder="e.g. 550000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                min="0"
                required
              />
            </div>
            <div>
              <label className="label">Target Price</label>
              <input
                type="number"
                className="input-field"
                placeholder="e.g. 500000"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                min="0"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!itemDescription || !askingPrice || !budget || !targetPrice}
            className="btn-primary w-full py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            Get My Opening Strategy →
          </button>
        </form>
      </div>
    </div>
  )
}

function ChatMessage({ msg }) {
  const [expanded, setExpanded] = useState(true)

  if (msg.role === 'seller') {
    return (
      <div className="flex justify-start animate-slide-up">
        <div className="max-w-[85%]">
          <p className="text-xs text-slate-500 mb-1 ml-1">Seller said</p>
          <div className="bg-slate-800 rounded-2xl rounded-tl-sm px-4 py-3 border border-slate-700">
            <p className="text-slate-200 text-sm">{msg.content}</p>
          </div>
        </div>
      </div>
    )
  }

  if (msg.role === 'coach') {
    return (
      <div className="flex justify-end animate-slide-up">
        <div className="max-w-[90%]">
          <p className="text-xs text-slate-500 mb-1 mr-1 text-right">Coach advice</p>
          <div className="bg-red-800/20 border border-red-600/30 rounded-2xl rounded-tr-sm px-4 py-3">
            <div className="flex items-center justify-between gap-4 mb-1">
              <span className="text-xs font-semibold text-red-400">Say this:</span>
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-slate-500 hover:text-slate-300 transition-colors"
              >
                {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-slate-100 text-sm italic">"{msg.script}"</p>
            {expanded && msg.assessment && (
              <p className="text-slate-400 text-xs mt-2 pt-2 border-t border-slate-700/50">{msg.assessment}</p>
            )}
            {expanded && (
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                  msg.dealScore >= 7 ? 'bg-green-500/20 text-green-400' :
                  msg.dealScore >= 4 ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  Score: {msg.dealScore}/10
                </span>
                {msg.walkAway && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-red-500/20 text-red-400">
                    Walk Away
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // system message
  return (
    <div className="flex justify-center animate-fade-in">
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-full px-4 py-1.5">
        <p className="text-xs text-slate-400">{msg.content}</p>
      </div>
    </div>
  )
}

function CoachingView({ context, onReset }) {
  const [messages, setMessages] = useState([])
  const [history, setHistory] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [latestCoaching, setLatestCoaching] = useState(null)
  const [currentAskingPrice, setCurrentAskingPrice] = useState(context.askingPrice)
  const chatEndRef = useRef(null)

  const scroll = () => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })

  // Get initial analysis on mount
  useEffect(() => {
    getInitialAnalysis()
  }, [])

  useEffect(() => { scroll() }, [messages])

  const getInitialAnalysis = async () => {
    setLoading(true)
    setMessages([{ role: 'system', content: `Starting negotiation for: ${context.itemDescription}` }])
    try {
      const res = await getCoaching({
        ...context,
        history: [],
        latestMessage: null,
      })
      setLatestCoaching(res)
      const coachMsg = {
        role: 'coach',
        content: res.script,
        script: res.script,
        assessment: res.assessment,
        dealScore: res.dealScore,
        walkAway: res.walkAway,
      }
      setMessages((prev) => [...prev, coachMsg])
      setHistory([{ role: 'coach', content: JSON.stringify(res) }])
    } catch (err) {
      setMessages((prev) => [...prev, {
        role: 'system',
        content: `Error: ${err.message}. Check your backend is running.`,
      }])
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const sellerText = input.trim()
    setInput('')

    const sellerMsg = { role: 'seller', content: sellerText }
    setMessages((prev) => [...prev, sellerMsg])
    setLoading(true)

    const updatedHistory = [...history, { role: 'seller', content: sellerText }]

    try {
      const res = await getCoaching({
        ...context,
        askingPrice: currentAskingPrice,
        history: updatedHistory,
        latestMessage: sellerText,
      })

      setLatestCoaching(res)

      const coachMsg = {
        role: 'coach',
        content: res.script,
        script: res.script,
        assessment: res.assessment,
        dealScore: res.dealScore,
        walkAway: res.walkAway,
      }

      setMessages((prev) => [...prev, coachMsg])
      setHistory([
        ...updatedHistory,
        { role: 'coach', content: JSON.stringify(res) },
      ])
    } catch (err) {
      setMessages((prev) => [...prev, {
        role: 'system',
        content: `Error: ${err.message}`,
      }])
    } finally {
      setLoading(false)
    }
  }

  const fmt = (n) => {
    if (context.currency === 'INR') {
      if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`
      if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`
      return `₹${n}`
    }
    return `${context.currency}${n?.toLocaleString()}`
  }

  const scenarioInfo = SCENARIOS.find((s) => s.id === context.scenario)
  const ScenarioIcon = scenarioInfo?.icon || Car

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Context bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-red-800/30 rounded-xl flex items-center justify-center">
              <ScenarioIcon className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <p className="font-semibold text-sm">{context.itemDescription}</p>
              <p className="text-xs text-slate-400">
                Asking: <span className="text-white font-medium">{fmt(currentAskingPrice)}</span>
                <span className="mx-1.5">·</span>
                Budget: <span className="text-white font-medium">{fmt(context.budget)}</span>
                <span className="mx-1.5">·</span>
                Target: <span className="text-green-400 font-medium">{fmt(context.targetPrice)}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-800"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            New Negotiation
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden max-w-7xl w-full mx-auto flex gap-0 lg:gap-6 px-0 lg:px-6 py-0 lg:py-6">

        {/* Chat column */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-0 space-y-4">
            {messages.map((msg, i) => (
              <ChatMessage key={i} msg={msg} />
            ))}
            {loading && (
              <div className="flex justify-end animate-fade-in">
                <div className="bg-red-800/20 border border-red-600/30 rounded-2xl rounded-tr-sm px-4 py-3">
                  <Loader2 className="w-4 h-4 text-red-400 animate-spin" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input bar */}
          <div className="p-4 lg:p-0 lg:pt-4 border-t border-slate-800 lg:border-0">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  className="input-field pr-12"
                  placeholder="Type what the seller just said…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  disabled={loading}
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="btn-primary px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 shrink-0"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2 ml-1">
              Type what the seller says → get instant coaching on how to respond
            </p>
          </div>
        </div>

        {/* Coach panel — desktop only */}
        <div className="hidden lg:block w-80 xl:w-96 shrink-0 overflow-y-auto">
          <CoachPanel
            coaching={latestCoaching}
            askingPrice={currentAskingPrice}
            currency={context.currency}
          />
        </div>
      </div>

      {/* Coach panel — mobile (collapsible bottom sheet feel) */}
      {latestCoaching && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-900 p-4 max-h-64 overflow-y-auto">
          <p className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-3">Latest Advice</p>
          <CoachPanel
            coaching={latestCoaching}
            askingPrice={currentAskingPrice}
            currency={context.currency}
          />
        </div>
      )}
    </div>
  )
}

export default function Negotiate() {
  const [context, setContext] = useState(null)

  if (!context) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Navbar />
        <ContextForm onStart={setContext} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />
      <CoachingView context={context} onReset={() => setContext(null)} />
    </div>
  )
}
