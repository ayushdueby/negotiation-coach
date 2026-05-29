import { Copy, Check, TrendingDown, AlertTriangle, Lightbulb, Target, Brain } from 'lucide-react'
import { useState } from 'react'

function DealScoreMeter({ score }) {
  const pct = (score / 10) * 100
  const color =
    score >= 7 ? 'bg-green-500' :
    score >= 4 ? 'bg-yellow-500' :
    'bg-red-500'
  const label =
    score >= 8 ? 'Great Deal' :
    score >= 6 ? 'Good Deal' :
    score >= 4 ? 'Fair Deal' :
    score >= 2 ? 'Poor Deal' :
    'Walk Away'

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Deal Score</span>
        <span className={`text-sm font-bold ${score >= 7 ? 'text-green-400' : score >= 4 ? 'text-yellow-400' : 'text-red-400'}`}>
          {score}/10 — {label}
        </span>
      </div>
      <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

function FairPriceBar({ min, max, current, currency }) {
  const fmt = (n) => {
    if (!n) return '—'
    if (currency === 'INR') {
      if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`
      if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`
      return `₹${n}`
    }
    return `${currency || '$'}${n.toLocaleString()}`
  }

  // position of current price on the bar (clamped 0–100%)
  const range = max - min
  const rawPct = range > 0 ? ((current - min) / range) * 100 : 50
  const pct = Math.max(0, Math.min(100, rawPct))
  const isOverpriced = current > max

  return (
    <div className="space-y-2">
      <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Fair Price Range</span>
      <div className="relative h-3 bg-slate-700 rounded-full mt-3">
        {/* Green zone */}
        <div className="absolute inset-0 bg-green-500/30 rounded-full" />
        {/* Current price marker */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all duration-500 ${isOverpriced ? 'bg-red-500' : 'bg-blue-500'}`}
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
      <div className="flex justify-between text-xs text-slate-400 mt-1">
        <span className="text-green-400 font-medium">{fmt(min)}</span>
        <span className={`font-semibold ${isOverpriced ? 'text-red-400' : 'text-blue-400'}`}>
          Now: {fmt(current)}
        </span>
        <span className="text-green-400 font-medium">{fmt(max)}</span>
      </div>
    </div>
  )
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-700"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

export default function CoachPanel({ coaching, askingPrice, currency }) {
  if (!coaching) {
    return (
      <div className="card p-8 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
        <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-4">
          <Brain className="w-8 h-8 text-blue-400" />
        </div>
        <h3 className="font-semibold text-lg mb-2">Your AI Coach</h3>
        <p className="text-slate-400 text-sm max-w-xs">
          Set up your negotiation context and start chatting. Real-time advice will appear here.
        </p>
      </div>
    )
  }

  const { script, strategy, fairPriceMin, fairPriceMax, dealScore, walkAway, powerTip, assessment } = coaching

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Walk Away Alert */}
      {walkAway && (
        <div className="bg-red-500/10 border border-red-500/40 rounded-2xl p-4 flex items-center gap-3 animate-pulse-slow">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
          <div>
            <p className="font-semibold text-red-400 text-sm">Time to Walk Away</p>
            <p className="text-red-300/80 text-xs mt-0.5">This deal is not worth it. Be ready to leave.</p>
          </div>
        </div>
      )}

      {/* Deal score */}
      <div className="card p-4">
        <DealScoreMeter score={dealScore} />
      </div>

      {/* Fair price */}
      {fairPriceMin > 0 && fairPriceMax > 0 && (
        <div className="card p-4">
          <FairPriceBar min={fairPriceMin} max={fairPriceMax} current={askingPrice} currency={currency} />
        </div>
      )}

      {/* What to say */}
      <div className="card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Say This</span>
          </div>
          <CopyButton text={script} />
        </div>
        <p className="text-slate-100 text-sm leading-relaxed bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
          "{script}"
        </p>
      </div>

      {/* Strategy */}
      {strategy && (
        <div className="card p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Strategy</span>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{strategy}</p>
        </div>
      )}

      {/* Assessment */}
      {assessment && (
        <div className="card p-4 space-y-2">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</span>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{assessment}</p>
        </div>
      )}

      {/* Power tip */}
      {powerTip && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Power Tip</span>
          </div>
          <p className="text-amber-100/80 text-sm leading-relaxed">{powerTip}</p>
        </div>
      )}
    </div>
  )
}
