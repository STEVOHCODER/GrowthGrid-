import React, { useState, useEffect } from 'react';

export default function CompoundInterestCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(8);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    const fvPrincipal = initialInvestment * Math.pow(1 + monthlyRate, months);
    const fvSeries = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    setTotalValue(Math.round(fvPrincipal + fvSeries).toLocaleString());
  }, [initialInvestment, monthlyContribution, years, rate]);

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800">
      <h2 className="text-2xl font-black mb-6 text-slate-900 dark:text-white uppercase tracking-tight">Wealth Forecaster</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Initial Investment ($)</label>
          <input
            type="number"
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:border-emerald-500 outline-none transition"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Monthly ($)</label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:border-emerald-500 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Return (%)</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:border-emerald-500 outline-none transition"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase">Years</label>
            <div className="flex items-center gap-2">
              <select 
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="bg-slate-900 dark:bg-emerald-600 text-white px-3 py-1 rounded-lg text-xs font-black outline-none cursor-pointer hover:bg-emerald-700 transition"
              >
                {[5, 10, 15, 20, 25, 30, 35, 40, 50].map(y => (
                  <option key={y} value={y} className="bg-white text-slate-900">{y} Years</option>
                ))}
              </select>
            </div>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-[10px] font-black text-slate-500 dark:text-slate-400 mt-2 uppercase">
            <span>1 YEAR</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-black">{years}Y SELECTED</span>
            <span>50 YEARS</span>
          </div>
        </div>

        <div className="bg-slate-900 dark:bg-emerald-600 p-6 rounded-xl text-center shadow-lg">
          <p className="text-xs font-bold text-emerald-400 dark:text-emerald-100 uppercase tracking-widest mb-1">Total Wealth</p>
          <p className="text-4xl font-black text-white">${totalValue}</p>
        </div>
      </div>
    </div>
  );
}
