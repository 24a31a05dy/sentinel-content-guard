/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Search, BarChart3, FileText, ChevronRight, Upload } from 'lucide-react';

const MOCK_SCAN = {
  id: '#8821-IPL',
  status: 'Flagged',
  riskLevel: 'CRITICAL',
  confidence: 94,
  original: {
    title: 'IPL 2025 Final CSK vs MI Full Highlights',
    duration: '12:45',
    resolution: '1080p',
    hash: '8a4c1f2e3d4b5a6c7d8e9f0a1b2c3d4e5f6g7h8i9j0k',
  },
  suspect: {
    title: 'Last over CSK MI IPL final short clip',
    duration: '0:59',
    resolution: '720p (Upscaled)',
    id: 'SUS-990-2',
  },
  analysis: [
    { type: 'Frame Hash Matching', description: 'Visual fingerprints from the last over (11:46 - 12:45) of the original match identical sequences in the suspect clip. [Threshold: >92% visual similarity, 120 frames matched]', severity: 'red' },
    { type: 'Audio Signature', description: 'Crowd noise peaks and commentary tracks align with 0.2ms precision. The "Last Over" suspect content is a direct crop. [Metric: Spectrogram correlation 98.4%, phase alignment <0.5ms]', severity: 'red' },
    { type: 'Unauthorized Modification', description: 'Content has been cropped to 9:16 aspect ratio and pixel-filtered to bypass standard automated fingerprinting. [Alert: Aspect ratio violation detected, filter coefficient variance >0.15]', severity: 'amber' },
  ]
};

export default function App() {
  const [originalTitle, setOriginalTitle] = useState('IPL 2025 Final CSK vs MI Full Highlights');
  const [suspectTitle, setSuspectTitle] = useState('Last over CSK MI IPL final short clip');
  const [scan, setScan] = useState(MOCK_SCAN);
  
  // Dynamic stats
  const [stats, setStats] = useState({
    activeScans: 12,
    flagged: 3,
    pending: 7,
    revenue: 420
  });

  const [history, setHistory] = useState([MOCK_SCAN]);

  const runAnalysis = () => {
    const newConfidence = Math.floor(Math.random() * 30) + 70;
    const issueFound = newConfidence > 80;
    const scanId = '#' + Math.floor(Math.random() * 10000) + '-RES';
    
    const newScan = {
        id: scanId,
        status: issueFound ? 'Flagged' : 'Clean',
        riskLevel: issueFound ? (newConfidence > 90 ? 'CRITICAL' : 'HIGH') : 'LOW',
        confidence: newConfidence,
        original: { ...scan.original, title: originalTitle },
        suspect: { ...scan.suspect, title: suspectTitle },
        analysis: [
            { 
                type: 'AI Pattern Match', 
                description: `Deep-learning based analysis of '${suspectTitle}' shows high correlation with '${originalTitle}'. [Match: ${newConfidence}%]`, 
                severity: issueFound ? 'red' : 'amber' 
            },
            { 
                type: 'Metadata Audit', 
                description: `Extracted metadata reveals source ID tampering. [Metric: Source signature mismatch, Variance: +${(Math.random() * 0.5).toFixed(2)}ms]`, 
                severity: issueFound ? 'red' : 'green' 
            },
            { 
                type: 'Forensic Watermarking', 
                description: `Static watermarks found removed via crop. Dynamic overlay injection recommended for future protection.`, 
                severity: 'amber' 
            }
        ]
    };
    
    setScan(newScan);
    setStats(prev => ({
        ...prev,
        activeScans: prev.activeScans + 1,
        flagged: issueFound ? prev.flagged + 1 : prev.flagged
    }));
    setHistory(prev => [newScan, ...prev]);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold tracking-tight text-xl text-slate-900">
            Sentinel <span className="font-medium text-slate-400">/ Content Guard</span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <button 
             onClick={runAnalysis}
             className="bg-slate-900 text-white px-6 py-2 text-xs font-semibold rounded-lg hover:bg-slate-800 transition-all active:scale-95"
          >
            RUN ANALYSIS
          </button>
          <div className="font-mono text-xs uppercase tracking-wider text-slate-500">
            Analysis ID: <span className="text-slate-900 font-bold">{scan.id}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <nav className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col gap-6 shrink-0">
          <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">Main Menu</div>
          <div className="flex flex-col gap-2">
          {[
            { icon: Search, label: 'Active Scans', active: true },
            { icon: BarChart3, label: 'Scan History' },
            { icon: FileText, label: 'Reports' },
          ].map((item) => (
            <div key={item.label} className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${item.active ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
          </div>
          <div className="mt-auto p-5 bg-slate-900 text-white rounded-xl text-xs shadow-lg">
            <div className="font-mono opacity-60 uppercase tracking-wider">Storage Quota</div>
            <div className="mt-3 h-2 w-full bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full w-[62%] bg-blue-500"></div>
            </div>
            <div className="mt-2 font-mono font-medium">124 / 200 Scans</div>
          </div>
        </nav>

        {/* Comparison Area */}
        <div className="flex-1 p-8 flex flex-col gap-8 overflow-auto">
          {/* Overview Stats */}
          <div className="grid grid-cols-4 gap-6 shrink-0">
            {[
              { label: 'Active Scans', value: stats.activeScans },
              { label: 'Flagged Content', value: stats.flagged },
              { label: 'Pending Reviews', value: stats.pending },
              { label: 'Revenue Claimed', value: `$${stats.revenue}` }
            ].map(stat => (
              <div key={stat.label} className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-[10px] font-bold font-mono uppercase tracking-widest text-slate-400">{stat.label}</div>
                <div className="text-3xl font-bold font-mono mt-2 text-slate-900">{stat.value}</div>
              </div>
            ))}
          </div>


          <div className="grid grid-cols-2 gap-8">
            {/* Original Content */}
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold uppercase text-slate-900">Original Content</h3>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                  <CheckCircle className="w-3.5 h-3.5" /> VERIFIED
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <input 
                  type="text" 
                  value={originalTitle} 
                  onChange={(e) => setOriginalTitle(e.target.value)}
                  className="w-full text-sm p-3 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-900 focus:ring-2 focus:ring-slate-900"
                  placeholder="Enter original title"
                />
                <button className="flex items-center gap-2 border border-slate-200 p-3 rounded-lg text-xs font-semibold uppercase hover:bg-slate-50 transition-colors">
                    <Upload className="w-4 h-4 text-slate-500"/> Upload Original Asset
                </button>
                <div className="flex gap-4 mt-2">
                   <div className="w-40 h-24 bg-slate-100 flex items-center justify-center rounded-lg border border-slate-200">
                     <Search className="w-10 h-10 text-slate-300" />
                   </div>
                   <div className="flex-1">
                     <p className="font-mono text-xs text-slate-500 mt-2">DUR: {scan.original.duration} | {scan.original.resolution}</p>
                     <p className="font-mono text-[10px] text-slate-400 mt-1 truncate">SHA: {scan.original.hash}</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Suspected Content */}
            <div className="bg-white border-2 border-red-100 p-6 rounded-xl shadow-sm relative">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold uppercase text-red-600">Suspected Content</h3>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                  <AlertTriangle className="w-3.5 h-3.5" /> FLAG
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <input 
                  type="text" 
                  value={suspectTitle} 
                  onChange={(e) => setSuspectTitle(e.target.value)}
                  className="w-full text-sm p-3 bg-red-50 border border-red-100 rounded-lg font-semibold text-red-900 focus:ring-2 focus:ring-red-500"
                  placeholder="Enter suspected title"
                />
                 <button className="flex items-center gap-2 border border-red-200 p-3 rounded-lg text-xs font-semibold text-red-700 uppercase hover:bg-red-50 transition-colors">
                    <Upload className="w-4 h-4 text-red-400"/> Upload Suspect Asset
                </button>
                <div className="flex gap-4 mt-2">
                   <div className="w-40 h-24 bg-red-50 flex items-center justify-center rounded-lg border border-red-100">
                     <Search className="w-10 h-10 text-red-300" />
                   </div>
                   <div className="flex-1">
                     <p className="font-mono text-xs text-red-400 mt-2">DUR: {scan.suspect.duration} | {scan.suspect.resolution}</p>
                     <p className="font-mono text-[10px] text-red-300 mt-1">ID: {scan.suspect.id}</p>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-3 bg-white border border-slate-200 p-8 rounded-xl shadow-sm flex flex-col justify-center items-center">
              <div className="text-6xl font-mono font-bold text-slate-900">{scan.confidence}%</div>
              <div className="mt-2 text-xs font-bold font-mono uppercase tracking-widest text-slate-400">Confidence Score</div>
              <div className="mt-8 w-full border border-red-200 bg-red-50 p-4 rounded-lg text-center">
                <div className="text-xs font-bold font-mono text-red-700">{scan.riskLevel} RISK</div>
              </div>
            </div>
            
            <div className="col-span-9 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
              <div className="border-b border-slate-100 px-8 py-6 flex justify-between items-center">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">Analysis Reasoning</h2>
              </div>
              <div className="divide-y divide-slate-100">
                {scan.analysis.map((item, i) => (
                  <div key={i} className="px-8 py-6 flex gap-6 items-start">
                    <div className={`w-3 h-3 mt-1.5 rounded-full shrink-0 ${item.severity === 'red' ? 'bg-red-500' : 'bg-amber-400'}`}></div>
                    <div>
                      <p className="font-bold text-sm tracking-tight text-slate-900">{item.type}</p>
                      <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-8 py-5 border-t border-slate-100 bg-white flex gap-4">
                <button className="bg-slate-900 text-white px-6 py-2.5 text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors">ISSUE TAKEDOWN</button>
                <button className="bg-white border border-slate-200 px-6 py-2.5 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors text-slate-700">CLAIM REVENUE</button>
                <button className="ml-auto text-xs font-bold tracking-widest uppercase flex items-center gap-2 text-slate-500 hover:text-slate-900">View Full Logs <ChevronRight className="w-4 h-4"/></button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

