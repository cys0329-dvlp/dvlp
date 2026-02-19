
import React, { useState } from 'react';
import { useHealth } from '../store/healthStore';

const Pricing: React.FC = () => {
  const { user, togglePremium } = useHealth();
  const [showCheckout, setShowCheckout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = () => {
    setIsLoading(true);
    // Simulate API delay
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
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">👑</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">프리미엄 멤버십 이용 중</h2>
        <p className="text-gray-500 mb-8">모든 고급 기능과 무제한 AI 루틴을 이용하고 계십니다.</p>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-yellow-100">
          <ul className="text-left space-y-4 max-w-sm mx-auto">
            <li className="flex items-center text-gray-700">
              <span className="text-emerald-500 mr-2">✓</span> AI 정밀 건강 분석
            </li>
            <li className="flex items-center text-gray-700">
              <span className="text-emerald-500 mr-2">✓</span> 개인 맞춤형 무제한 루틴 생성
            </li>
            <li className="flex items-center text-gray-700">
              <span className="text-emerald-500 mr-2">✓</span> 광고 제거 및 프리미엄 테마
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">WellSphere PRO</h2>
        <p className="text-xl text-gray-600">당신의 건강을 한 차원 더 스마트하게 관리하세요.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-emerald-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-widest">Best Value</div>
          <h3 className="text-2xl font-bold mb-4">Monthly Pro</h3>
          <div className="flex items-baseline mb-6">
            <span className="text-4xl font-extrabold text-gray-900">₩9,900</span>
            <span className="text-gray-500 ml-2">/ 월</span>
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center">
              <span className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs mr-3">✓</span>
              무제한 AI 루틴 생성
            </li>
            <li className="flex items-center">
              <span className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs mr-3">✓</span>
              심층 웰니스 레포트 (매주)
            </li>
            <li className="flex items-center">
              <span className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs mr-3">✓</span>
              전문가 매칭 서비스 (준비 중)
            </li>
          </ul>
          <button 
            onClick={handleCheckout}
            disabled={isLoading}
            className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg active:scale-95"
          >
            {isLoading ? '연결 중...' : '지금 시작하기'}
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl">
            <h4 className="font-bold text-gray-800 mb-2">왜 프리미엄인가요?</h4>
            <p className="text-sm text-gray-600">기본 기능만으로는 놓칠 수 있는 작은 신체 변화들을 AI가 포착하여 가장 효율적인 루틴을 제안합니다. 당신의 시간이 더 소중하니까요.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">🔒</div>
            <div>
              <p className="text-sm font-bold text-gray-800">보안 결제</p>
              <p className="text-xs text-gray-500">Stripe 결제 시스템으로 안전하게 처리됩니다.</p>
            </div>
          </div>
        </div>
      </div>

      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl animate-slideUp">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold flex items-center"><span className="text-emerald-500 mr-2">wellsphere</span> checkout</h3>
              <button onClick={() => setShowCheckout(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <div className="mb-8">
              <p className="text-sm text-gray-500 mb-1">총 결제 금액</p>
              <p className="text-3xl font-bold text-gray-900">₩9,900</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">카드 번호</label>
                <div className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-gray-700 font-mono">
                  4242 4242 4242 4242
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">만료일</label>
                  <div className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-gray-700">12 / 24</div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">CVC</label>
                  <div className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-gray-700">***</div>
                </div>
              </div>
            </div>

            <button 
              onClick={handlePayment}
              disabled={isLoading}
              className="w-full mt-8 py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : '결제하기'}
            </button>
            <p className="mt-4 text-[10px] text-gray-400 text-center">결제 버튼을 누르면 이용약관 및 개인정보 처리방침에 동의하게 됩니다.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pricing;
