import React from 'react';
import { X, Mountain, Users, School, Building2, AlertTriangle, AreaChart, Clock } from 'lucide-react';
import { LandslideRiskData } from '../services/raininducedlandslideRiskService';

interface LandslideRiskPopupCardProps {
  data: LandslideRiskData;
  isOpen: boolean;
  onClose: () => void;
}

export default function LandslideRiskPopupCard({ data, isOpen, onClose }: LandslideRiskPopupCardProps) {
  if (!isOpen) return null;

  const currentDateTime = new Date().toLocaleString('en-PH', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  const getRiskLevel = () => {
    const hasVeryHigh = data.barangays?.some(b => b.risk?.toLowerCase().includes('very high')) || false;
    const percentage = parseFloat(data.pronePercentage || '0');

    if (hasVeryHigh || percentage > 50) return { label: 'CRITICAL', color: 'text-rose-400', bg: 'bg-rose-500/20', border: 'border-rose-500/40' };
    if (percentage > 25) return { label: 'HIGH', color: 'text-amber-400', bg: 'bg-amber-500/20', border: 'border-amber-500/40' };
    return { label: 'MODERATE', color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/40' };
  };

  const risk = getRiskLevel();

  const veryHighRiskBarangays = data.barangays?.filter(b => b.risk?.toLowerCase().includes('very high')) || [];
  const highRiskBarangays = data.barangays?.filter(b => b.risk?.toLowerCase().includes('high susceptibility') && !b.risk?.toLowerCase().includes('very high')) || [];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className="w-full max-w-4xl max-h-[90vh] bg-slate-900/90 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="px-6 py-4 border-b border-slate-800 bg-gradient-to-r from-slate-900 to-slate-800/50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-2.5 rounded-xl ${risk.bg} ${risk.border} border shadow-lg`}>
              <Mountain className={`w-6 h-6 ${risk.color}`} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{data.municipality}, Rizal</h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {currentDateTime}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${risk.bg} ${risk.color} ${risk.border}`}>
                  {risk.label} SUSCEPTIBILITY
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all border border-transparent hover:border-slate-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* SUMMARY SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <AreaChart className="w-4 h-4 text-indigo-400" />
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Land Area</p>
              </div>
              <p className="text-2xl font-bold text-white">{data.totalLandArea}</p>
            </div>
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <Mountain className="w-4 h-4 text-amber-400" />
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Prone Area (Rain Induced Land Slide)</p>
              </div>
              <p className="text-2xl font-bold text-amber-400">{data.proneArea}</p>
              <p className="text-xs text-slate-500 mt-1">{data.pronePercentage} of total land</p>
            </div>
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className={`w-4 h-4 ${risk.color}`} />
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Overall Hazard</p>
              </div>
              <p className={`text-2xl font-bold ${risk.color}`}>{risk.label}</p>
              <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className={`h-full ${risk.label === 'CRITICAL' ? 'bg-rose-500' : risk.label === 'HIGH' ? 'bg-amber-500' : 'bg-yellow-500'}`}
                  style={{ width: data.pronePercentage }}
                />
              </div>
            </div>
          </div>

          {/* BARANGAY RISK SECTION */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></div>
              Barangay Susceptibility
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {veryHighRiskBarangays.map((b, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-rose-500/5 border border-rose-500/20 rounded-lg group hover:bg-rose-500/10 transition-colors">
                  <span className="text-sm font-medium text-slate-200">{b.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-500 text-white shadow-sm uppercase">{b.risk}</span>
                </div>
              ))}
              {highRiskBarangays.map((b, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg group hover:bg-amber-500/10 transition-colors">
                  <span className="text-sm font-medium text-slate-200">{b.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500 text-white shadow-sm uppercase">{b.risk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* POPULATION IMPACT SECTION */}
          {/* POPULATION IMPACT SECTION */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" />
                Population Impact Details
              </h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-slate-950/40 border border-slate-800"></div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Total: {data.population.total}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-rose-500/20 border border-rose-500/40"></div>
                  <span className="text-[10px] text-rose-400 font-bold uppercase">Prone: {data.population.prone}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {data.population.ageBreakdown?.map((age, idx) => (
                <div key={idx} className="bg-slate-950/40 border border-slate-800 rounded-xl p-3 flex flex-col gap-2 group hover:border-slate-700 transition-all">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                    <p className="text-[11px] font-bold text-indigo-400 uppercase tracking-tight">Age Group: {age.ageGroup}</p>
                    <span className="text-[9px] font-bold text-slate-500">{(parseInt(age.maleProne.replace(/,/g, '')) + parseInt(age.femaleProne.replace(/,/g, ''))).toLocaleString()} Prone</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                    <div>
                      <p className="text-[8px] text-slate-500 uppercase font-bold leading-none">Male (Prone)</p>
                      <p className="text-sm font-bold text-rose-400 mt-1">{age.maleProne}</p>
                    </div>
                    <div>
                      <p className="text-[8px] text-slate-500 uppercase font-bold leading-none">Male (Not Prone)</p>
                      <p className="text-sm font-bold text-slate-400 mt-1">{age.maleNotProne}</p>
                    </div>
                    <div>
                      <p className="text-[8px] text-slate-500 uppercase font-bold leading-none">Female (Prone)</p>
                      <p className="text-sm font-bold text-rose-400 mt-1">{age.femaleProne}</p>
                    </div>
                    <div>
                      <p className="text-[8px] text-slate-500 uppercase font-bold leading-none">Female (Not Prone)</p>
                      <p className="text-sm font-bold text-slate-400 mt-1">{age.femaleNotProne}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {data.population.breakdown?.map((item, idx) => {
                const isVeryHigh = item.assessment.toLowerCase().includes('very high');
                const isHigh = item.assessment.toLowerCase().includes('high');
                const isNotProne = item.assessment.toLowerCase().includes('not prone');
                
                return (
                  <div key={idx} className="bg-slate-800/20 border border-slate-800/50 rounded-lg p-2 flex flex-col items-center">
                    <p className={`text-[9px] uppercase font-bold tracking-tighter ${isVeryHigh ? 'text-rose-400' : isHigh ? 'text-amber-400' : isNotProne ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {item.assessment}
                    </p>
                    <p className="text-sm font-bold text-white">{item.count.toLocaleString()}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SCHOOL + BUILDING EXPOSURE SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                <School className="w-4 h-4 text-emerald-400" />
                Schools at Risk
              </h3>
              <div className="bg-slate-950/40 border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/50 text-slate-400">
                    <tr>
                      <th className="px-4 py-2 font-bold uppercase tracking-wider">School Name</th>
                      <th className="px-4 py-2 font-bold uppercase tracking-wider text-right">Risk</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {data.schools?.filter(s => s.risk?.toLowerCase() !== 'not prone').map((s, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="px-4 py-2.5 text-slate-300 font-medium">{s.name}</td>
                        <td className="px-4 py-2.5 text-right">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${s.risk?.toLowerCase().includes('very high') ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                            {s.risk}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {(data.schools?.filter(s => s.risk?.toLowerCase() !== 'not prone').length || 0) === 0 && (
                      <tr>
                        <td colSpan={2} className="px-4 py-4 text-center text-slate-500 italic">No schools reported in high-risk zones.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-400" />
                Buildings at Risk
              </h3>
              <div className="bg-slate-950/40 border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/50 text-slate-400">
                    <tr>
                      <th className="px-4 py-2 font-bold uppercase tracking-wider">Building Name</th>
                      <th className="px-4 py-2 font-bold uppercase tracking-wider text-right">Risk</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {data.buildings?.filter(b => b.risk?.toLowerCase() !== 'not prone').map((b, idx) => {
                      const isGov = b.name?.toLowerCase().includes('barangay') || b.name?.toLowerCase().includes('provincial') || b.name?.toLowerCase().includes('rural health');
                      return (
                        <tr key={idx} className="hover:bg-white/5 transition-colors">
                          <td className="px-4 py-2.5">
                            <div className="flex flex-col">
                              <span className="text-slate-200 font-medium">{b.name}</span>
                              <span className={`text-[8px] font-bold uppercase tracking-wider ${isGov ? 'text-cyan-400' : 'text-purple-400'}`}>
                                {isGov ? 'Government' : 'Private'}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-2.5 text-right">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${b.risk?.toLowerCase().includes('very high') ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                              {b.risk}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                    {(data.buildings?.filter(b => b.risk?.toLowerCase() !== 'not prone').length || 0) === 0 && (
                      <tr>
                        <td colSpan={2} className="px-4 py-4 text-center text-slate-500 italic">No critical buildings reported in high-risk zones.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/30 text-center">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
            Data provided by GeoRiskPH · Rain-Induced Landslide Hazard Analytics
          </p>
        </div>
      </div>
    </div>
  );
}
