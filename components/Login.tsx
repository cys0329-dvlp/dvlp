
import React, { useState } from 'react';
import { useHealth } from '../store/healthStore.tsx';

const Login: React.FC = () => {
  const { login } = useHealth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    goal: '체중 감량'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      login({
        ...formData,
        isPremium: false
      });
    }
  };

  const goals = ['체중 감량', '근육 증가', '스트레스 해소', '수면 질 향상', '규칙적인 식습관'];

  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl animate-fadeIn">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-3xl font-bold">W</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">WellSphere</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 ? (
            <>
              <div className="space-y-4">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
                  placeholder="이름"
                />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
                  placeholder="이메일"
                />
              </div>
              <button type="submit" className="w-full py-5 bg-emerald-600 text-white font-bold rounded-2xl shadow-xl">
                다음으로
              </button>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-3">
                {goals.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setFormData({ ...formData, goal: g })}
                    className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all ${
                      formData.goal === g ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-bold' : 'bg-white border-slate-100 text-gray-600'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <button type="submit" className="w-full py-5 bg-emerald-600 text-white font-bold rounded-2xl shadow-xl">
                시작하기
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
