
import React, { useState } from 'react';
import { useHealth } from '../store/healthStore.tsx';
import { HealthMetricType } from '../types.ts';

interface Props {
  onComplete: () => void;
}

const LogForm: React.FC<Props> = ({ onComplete }) => {
  const { addLog } = useHealth();
  const [type, setType] = useState<HealthMetricType>('sleep');
  const [value, setValue] = useState<number>(0);
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLog({
      type,
      value,
      note,
      date: new Date().toISOString()
    });
    onComplete();
  };

  const config = {
    sleep: { label: '수면 시간', unit: '시간', placeholder: '예: 7.5', min: 0, max: 24, step: 0.5 },
    exercise: { label: '운동 시간', unit: '분', placeholder: '예: 45', min: 0, max: 500, step: 1 },
    diet: { label: '칼로리 섭취', unit: 'kcal', placeholder: '예: 1800', min: 0, max: 5000, step: 10 },
    mood: { label: '오늘의 기분', unit: '점', placeholder: '1(나쁨) - 10(매우 좋음)', min: 1, max: 10, step: 1 },
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-xl border border-slate-100 animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">건강 데이터 입력</h2>
      
      <div className="flex justify-around mb-8 p-1 bg-slate-100 rounded-2xl">
        {(['sleep', 'exercise', 'diet', 'mood'] as HealthMetricType[]).map((t) => (
          <button
            key={t}
            onClick={() => { setType(t); setValue(0); }}
            className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-all ${
              type === t ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t === 'sleep' ? '🌙' : t === 'exercise' ? '🏃' : t === 'diet' ? '🥗' : '😊'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{config[type].label}</label>
          <div className="relative">
            <input
              type="number"
              value={value || ''}
              onChange={(e) => setValue(parseFloat(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              placeholder={config[type].placeholder}
              min={config[type].min}
              max={config[type].max}
              step={config[type].step}
              required
            />
            <span className="absolute right-4 top-3.5 text-slate-400 text-sm">{config[type].unit}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">메모</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all min-h-[100px]"
            placeholder="기록하고 싶은 내용을 적어주세요."
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg active:scale-95"
        >
          기록 저장하기
        </button>
        <button
          type="button"
          onClick={onComplete}
          className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          취소
        </button>
      </form>
    </div>
  );
};

export default LogForm;
