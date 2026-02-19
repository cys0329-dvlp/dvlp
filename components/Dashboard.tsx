
import React, { useState } from 'react';
import { useHealth } from '../store/healthStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { generateWellnessRoutine } from '../services/gemini';

const Dashboard: React.FC = () => {
  const { logs, user, routines, addRoutine } = useHealth();
  const [isGenerating, setIsGenerating] = useState(false);

  const chartData = [...logs].reverse().map(log => ({
    name: new Date(log.date).toLocaleDateString(),
    value: log.value,
    type: log.type
  }));

  const handleGenerateRoutine = async () => {
    if (!user) return;
    setIsGenerating(true);
    try {
      const routine = await generateWellnessRoutine(user, logs);
      addRoutine(routine);
    } catch (error) {
      console.error("AI Routine Generation Failed", error);
      alert("루틴 생성 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsGenerating(false);
    }
  };

  const getLatestValue = (type: string) => {
    const log = logs.find(l => l.type === type);
    return log ? log.value : '-';
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Goal Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">안녕하세요, {user?.name}님!</h1>
        <p className="text-emerald-50 opacity-90 mb-4">오늘도 건강한 하루를 위해 함께해요.</p>
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 inline-block">
          <span className="text-xs uppercase font-semibold tracking-wider opacity-70">현재 목표</span>
          <p className="text-lg font-medium">{user?.goal || '설정된 목표가 없습니다.'}</p>
        </div>
      </section>

      {/* Metrics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: '수면', value: getLatestValue('sleep'), unit: '시간', color: 'bg-blue-50 text-blue-600', icon: '🌙' },
          { label: '운동', value: getLatestValue('exercise'), unit: '분', color: 'bg-orange-50 text-orange-600', icon: '🏃' },
          { label: '식단', value: getLatestValue('diet'), unit: 'kcal', color: 'bg-green-50 text-green-600', icon: '🥗' },
          { label: '기분', value: getLatestValue('mood'), unit: '/10', color: 'bg-purple-50 text-purple-600', icon: '😊' },
        ].map((item, idx) => (
          <div key={idx} className={`${item.color} p-6 rounded-2xl border border-white shadow-sm transition-transform hover:scale-105`}>
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="text-sm font-medium opacity-80">{item.label}</div>
            <div className="text-2xl font-bold">{item.value}<span className="text-sm font-normal ml-1">{item.unit}</span></div>
          </div>
        ))}
      </div>

      {/* Routine Section */}
      <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">AI 맞춤 웰니스 루틴</h2>
          <button 
            onClick={handleGenerateRoutine}
            disabled={isGenerating}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              isGenerating ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md'
            }`}
          >
            {isGenerating ? '생성 중...' : routines.length > 0 ? '루틴 새로고침' : '루틴 생성하기'}
          </button>
        </div>

        {routines.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-emerald-800 flex items-center">
                <span className="mr-2">✨</span> {routines[0].title}
              </h3>
              <div className="space-y-3">
                {routines[0].activities.map((act, i) => (
                  <div key={i} className="flex items-start p-3 bg-slate-50 rounded-lg">
                    <span className="w-20 text-xs font-bold text-emerald-600 uppercase mt-1">{act.category}</span>
                    <p className="text-sm text-gray-700 flex-1">{act.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
              <h4 className="font-semibold text-emerald-900 mb-2">오늘의 어드바이스</h4>
              <p className="text-emerald-800 text-sm italic">"{routines[0].advice}"</p>
              {!user?.isPremium && (
                <div className="mt-4 p-3 bg-white/60 rounded-lg text-xs text-emerald-700">
                  💡 프리미엄 회원이 되면 더 상세한 AI 심층 분석을 받을 수 있습니다.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="py-12 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <p className="text-gray-500 mb-4">아직 생성된 루틴이 없습니다. AI에게 맞춤 루틴을 물어보세요!</p>
          </div>
        )}
      </section>

      {/* Progress Chart */}
      <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6">최근 트렌드</h2>
        <div className="h-[300px] w-full">
          {logs.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" fontSize={12} stroke="#94a3b8" />
                <YAxis fontSize={12} stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 italic">
              데이터를 기록하면 차트가 표시됩니다.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
