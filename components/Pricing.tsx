
import React, { useState } from 'react';
import { useHealth } from '../store/healthStore.tsx';

const Pricing: React.FC = () => {
  const { user, togglePremium } = useHealth();
  const [showCheckout, setShowCheckout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowCheckout(true);
    }, 1000);
  };

  const handlePayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      togglePremium();
      setShowCheckout(false);
      setIsLoading(false);
      alert('WellSphere PRO 가입을 축하드립니다! 🎉');
    }, 1500);
  };

  if (user?.isPremium) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12 animate-fadeIn">
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">👑</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">프리미엄 멤버십 이용 중</h2>
        <p className="text-gray-500 mb-8">모든 고급 기능과 무제한 AI 루틴을 이용하고 계십니다.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">WellSphere PRO</h2>
        <p className="text-xl text-gray-600">당신의 건강을 한 차원 더 스마트하게 관리하세요.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-emerald-500 relative overflow-hidden">
          <h3 className="text-2xl font-bold mb-4">Monthly Pro</h3>
          <div className="flex items-baseline mb-6">
            <span className="text-4xl font-extrabold text-gray-900">₩9,900</span>
            <span className="text-gray-500 ml-2">/ 월</span>
          </div>
          <button 
            onClick={handleCheckout}
            className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg"
          >
            지금 시작하기
          </button>
        </div>
      </div>

      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl">
            <h3 className="text-xl font-bold mb-4">결제하기</h3>
            <button 
              onClick={handlePayment}
              className="w-full py-4 bg-black text-white font-bold rounded-lg"
            >
              결제 완료
            </button>
            <button onClick={() => setShowCheckout(false)} className="w-full mt-4 text-gray-500">취소</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pricing;
