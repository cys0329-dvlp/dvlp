
import React, { useState } from 'react';
import { useHealth } from '../store/healthStore';

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
      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3">
            <span className="text-white text-3xl font-bold">W</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">WellSphere</h1>
          <p className="text-gray-500 mt-2">나를 위한 스마트 웰니스 시작하기</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 ? (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">이름</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none ring-2 ring-transparent focus:ring-emerald-500 outline-none transition-all"
                    placeholder="이름을 입력하세요"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">이메일</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none ring-2 ring-transparent focus:ring-emerald-500 outline-none transition-all"
                    placeholder="example@email.com"
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="w-full py-5 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-xl active:scale-95"
              >
                다음으로
              </button>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">당신의 주요 건강 목표는 무엇인가요?</label>
                <div className="grid grid-cols-1 gap-3">
                  {goals.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setFormData({ ...formData, goal: g })}
                      className={`w-full text-left px-5 py-4 rounded-2xl transition-all border-2 ${
                        formData.goal === g ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-bold' : 'bg-white border-slate-100 text-gray-600 hover:border-emerald-200'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex space-x-3">
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-5 bg-slate-100 text-slate-500 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                >
                  이전
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-5 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-xl active:scale-95"
                >
                  시작하기
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
