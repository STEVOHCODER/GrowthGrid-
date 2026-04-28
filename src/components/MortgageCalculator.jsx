import React, { useState, useEffect } from 'react';

export default function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const payment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    setMonthlyPayment(payment.toFixed(2));
  }, [loanAmount, interestRate, loanTerm]);

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800">
      <h2 className="text-2xl font-black mb-6 text-slate-900 dark:text-white uppercase tracking-tight">Mortgage Calculator</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Loan Amount ($)</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:border-emerald-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Interest Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:border-emerald-500 outline-none transition"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase">Time Horizon</label>
            <div className="flex items-center gap-2">
              <select 
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="bg-slate-900 dark:bg-emerald-600 text-white px-3 py-1 rounded-lg text-xs font-black outline-none cursor-pointer hover:bg-emerald-700 transition"
              >
                {[5, 10, 15, 20, 25, 30, 35, 40].map(y => (
                  <option key={y} value={y} className="bg-white text-slate-900">{y} Years</option>
                ))}
              </select>
            </div>
          </div>
          <input
            type="range"
            min="1"
            max="40"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-[10px] font-black text-slate-500 dark:text-slate-400 mt-2 uppercase">
            <span>1 YEAR</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-black">{loanTerm}Y SELECTED</span>
            <span>40 YEARS</span>
          </div>
        </div>

        <div className="bg-slate-900 dark:bg-emerald-600 p-6 rounded-xl text-center shadow-lg">
          <p className="text-xs font-bold text-emerald-400 dark:text-emerald-100 uppercase tracking-widest mb-1">Monthly Payment</p>
          <p className="text-4xl font-black text-white">${monthlyPayment}</p>
        </div>
      </div>
    </div>
  );
}
