
import React, { useState, useEffect } from 'react';
import { Smartphone, ShieldCheck, MapPin, Loader2, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

interface LoginViewProps {
  onLogin: (phone: string) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Auto-verify when 4 digits are entered
  useEffect(() => {
    if (otp.length === 4 && otp === generatedOtp && !isSuccess) {
      handleVerify();
    }
  }, [otp, generatedOtp]);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10) {
      setIsLoading(true);
      // Simulate network delay for sending OTP
      setTimeout(() => {
        const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
        setGeneratedOtp(newOtp);
        setIsLoading(false);
        setStep('OTP');
        setShowNotification(true);
        setTimer(30);
        // Hide notification after 8 seconds
        setTimeout(() => setShowNotification(false), 8000);
      }, 1200);
    }
  };

  const handleVerify = () => {
    if (otp === generatedOtp) {
      setIsSuccess(true);
      // Immediate call to onLogin for better responsiveness
      onLogin(phone);
    } else if (otp.length === 4) {
      alert("Invalid OTP! Please use the code: " + generatedOtp);
      setOtp('');
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleVerify();
  };

  const resendOtp = () => {
    if (timer === 0) {
      setOtp('');
      const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(newOtp);
      setShowNotification(true);
      setTimer(30);
      setTimeout(() => setShowNotification(false), 8000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white overflow-hidden relative">
      {/* Simulated SMS Notification Overlay */}
      {showNotification && (
        <div className="absolute top-4 left-4 right-4 bg-white/95 backdrop-blur-md text-slate-800 p-4 rounded-2xl shadow-2xl z-[100] animate-in fade-in slide-in-from-top-4 duration-500 flex items-center gap-3 border-l-4 border-orange-500">
          <div className="bg-orange-100 p-2 rounded-full text-orange-600">
            <CheckCircle2 size={20} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Message from CitizenConnect</p>
            <p className="text-sm font-bold">Your verification code is: <span className="text-xl text-orange-600 tracking-[0.2em] font-black">{generatedOtp}</span></p>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mb-6 backdrop-blur-md shadow-inner">
          <MapPin size={48} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2 tracking-tight">CitizenConnect</h1>
        <p className="text-orange-100 opacity-90 mb-8 font-medium">Nagar Parishad Digital Services</p>
        
        <div className="w-full bg-white rounded-3xl p-8 text-slate-800 shadow-2xl relative overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-[2px] z-50 rounded-3xl flex flex-col items-center justify-center">
              <Loader2 size={40} className="text-orange-500 animate-spin mb-2" />
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Generating Code...</p>
            </div>
          )}

          <h2 className="text-2xl font-black mb-2 text-slate-900">
            {step === 'PHONE' ? 'Sign In' : 'Verify Identity'}
          </h2>
          <p className="text-slate-400 text-sm mb-8 font-medium">
            {step === 'PHONE' ? 'Enter your mobile to receive an OTP' : `Enter the 4-digit code sent to ${phone}`}
          </p>
          
          {step === 'PHONE' ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 flex items-center gap-2 border-r border-slate-100 pr-3 transition-colors group-focus-within:text-orange-500">
                  <Smartphone size={18} />
                  <span className="text-sm font-bold">+91</span>
                </div>
                <input 
                  type="tel" 
                  placeholder="Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="w-full pl-20 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all font-bold text-lg tracking-wider"
                  required
                />
              </div>
              <button 
                type="submit"
                disabled={phone.length < 10 || isLoading}
                className="w-full bg-orange-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-100 hover:bg-orange-600 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                Send Verification Code
                <ArrowRight size={20} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="0 0 0 0"
                    value={otp}
                    autoFocus
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all text-center tracking-[0.8em] text-3xl font-black text-slate-900 placeholder:tracking-normal placeholder:text-sm placeholder:font-medium"
                    required
                  />
                </div>
                
                <div className="flex justify-between items-center px-2">
                  <button 
                    type="button" 
                    onClick={() => { setStep('PHONE'); setOtp(''); }}
                    className="text-slate-400 text-xs font-bold hover:text-orange-500 transition-colors flex items-center gap-1"
                  >
                    Change Number
                  </button>
                  <button 
                    type="button" 
                    disabled={timer > 0}
                    onClick={resendOtp}
                    className={`text-xs font-bold flex items-center gap-1 ${timer > 0 ? 'text-slate-300' : 'text-orange-500'}`}
                  >
                    {timer > 0 ? `Resend in ${timer}s` : 'Resend Code'}
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                disabled={otp.length < 4 || isSuccess}
                className={`w-full font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                  isSuccess 
                  ? 'bg-green-500 text-white shadow-green-100' 
                  : 'bg-orange-500 text-white shadow-orange-100 hover:bg-orange-600 active:scale-[0.98]'
                }`}
              >
                {isSuccess ? (
                  <>
                    <CheckCircle2 size={20} />
                    Verified Successfully
                  </>
                ) : (
                  <>
                    Verify & Continue
                  </>
                )}
              </button>

              <div className="bg-slate-50 p-4 rounded-2xl flex gap-3 items-start text-left border border-slate-100">
                <AlertCircle size={18} className="text-orange-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-800 mb-0.5">Demo Mode Active</p>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                    A code was just sent. Please enter the number from the notification at the top of this screen.
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
      
      <div className="text-center mt-auto py-6">
        <p className="text-[10px] font-black text-orange-100 tracking-[0.2em] uppercase opacity-70">
          Safe • Secure • Municipal Council
        </p>
      </div>
    </div>
  );
};

export default LoginView;
