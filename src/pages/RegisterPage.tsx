import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/config';
import { 
  Mail, 
  Lock, 
  User,
  UserPlus, 
  GraduationCap, 
  Shield, 
  CreditCard,
  AlertCircle
} from 'lucide-react';

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate inputs
    if (password !== confirmPassword) {
      setError('Hasła nie są identyczne.');
      return;
    }

    if (password.length < 6) {
      setError('Hasło musi składać się z co najmniej 6 znaków.');
      return;
    }

    setLoading(true);

    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile display name
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name
        });
      }
      
      console.log('Registration successful:', userCredential.user);
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Ten adres e-mail jest już zarejestrowany.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Niepoprawny format adresu e-mail.');
      } else if (err.code === 'auth/weak-password') {
        setError('Wybrane hasło jest za słabe.');
      } else {
        setError('Wystąpił błąd podczas rejestracji. Spróbuj ponownie.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans flex flex-col justify-between">
      {/* Main Container */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="max-w-[1000px] w-full bg-white rounded-md shadow-lg border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
          
          {/* Left Column (Info & Branding) */}
          <div className="relative bg-[#021124] text-white p-8 md:p-12 flex flex-col justify-between overflow-hidden">
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src="/images/faculty_hero.png" 
                alt="Faculty Building" 
                className="w-full h-full object-cover opacity-15"
              />
              <div className="absolute inset-0 bg-[#021124]/90" />
            </div>

            <div className="relative z-10">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2.5 mb-16 hover:opacity-85 transition-opacity w-fit">
                <GraduationCap className="w-7 h-7 text-[#84cc16]" />
                <span className="font-bold text-sm tracking-wider uppercase">
                  Faculty of CS & Math
                </span>
              </Link>

              {/* Slogan */}
              <div className="mt-8 max-w-sm">
                <h1 className="text-3xl md:text-[38px] font-bold leading-[1.15] tracking-tight">
                  Empowering Mathematical Minds.
                </h1>
                <p className="text-slate-400 text-xs md:text-sm mt-6 leading-relaxed">
                  Access the academic portal for Krakow University of Technology. Manage your curriculum, research data, and student records in one secure location.
                </p>
              </div>
            </div>

            {/* Stats Footer */}
            <div className="relative z-10 pt-8 border-t border-white/10 flex items-center gap-8 mt-12 md:mt-0">
              <div>
                <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Est. 1945</div>
                <div className="text-xs font-bold text-[#84cc16] mt-0.5">Excellence in STEM</div>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div>
                <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Global Rank</div>
                <div className="text-xs font-bold text-[#84cc16] mt-0.5">Top 500 CS Programs</div>
              </div>
            </div>
          </div>

          {/* Right Column (Sign Up Form) */}
          <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
            <div className="max-w-sm w-full mx-auto">
              <h2 className="text-2xl font-bold text-[#021124] tracking-tight">Sign Up</h2>
              <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
                Create a new academic account to get access.
              </p>

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSignUp} className="mt-6 flex flex-col gap-3.5">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[11px] font-bold text-[#021124] uppercase tracking-wider">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      id="name"
                      type="text"
                      required
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-sm text-xs py-2.5 pl-9 pr-3 focus:outline-none focus:border-slate-400 placeholder:text-slate-400 text-slate-800"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[11px] font-bold text-[#021124] uppercase tracking-wider">
                    University Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      id="email"
                      type="email"
                      required
                      placeholder="name.surname@pk.edu.pl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-sm text-xs py-2.5 pl-9 pr-3 focus:outline-none focus:border-slate-400 placeholder:text-slate-400 text-slate-800"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="password" className="text-[11px] font-bold text-[#021124] uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      id="password"
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-sm text-xs py-2.5 pl-9 pr-3 focus:outline-none focus:border-slate-400 placeholder:text-slate-400 text-slate-800"
                    />
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="confirmPassword" className="text-[11px] font-bold text-[#021124] uppercase tracking-wider">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      id="confirmPassword"
                      type="password"
                      required
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-sm text-xs py-2.5 pl-9 pr-3 focus:outline-none focus:border-slate-400 placeholder:text-slate-400 text-slate-800"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={loading}
                  className="mt-3 w-full bg-[#021124] hover:bg-[#0f172a] active:bg-[#021124] disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-2.5 px-4 font-bold text-xs rounded-sm transition-all shadow-sm flex items-center justify-center gap-2 uppercase tracking-widest"
                >
                  {loading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Registering...</span>
                    </>
                  ) : (
                    <>
                      <span>Register</span>
                      <UserPlus className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              {/* SSO Divider */}
              <div className="relative my-5 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200/60" />
                </div>
                <span className="relative bg-white px-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  Authorized Access Only
                </span>
              </div>

              {/* Alternate Login Options */}
              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="flex items-center justify-center gap-2 border border-slate-200 rounded-sm py-2 px-3 hover:bg-slate-50 transition-colors text-[11px] font-semibold text-[#021124]">
                  <Shield className="w-3.5 h-3.5 text-blue-600" />
                  <span>University SSO</span>
                </button>
                <button type="button" className="flex items-center justify-center gap-2 border border-slate-200 rounded-sm py-2 px-3 hover:bg-slate-50 transition-colors text-[11px] font-semibold text-[#021124]">
                  <CreditCard className="w-3.5 h-3.5 text-slate-600" />
                  <span>Staff ID Card</span>
                </button>
              </div>

              {/* Link to Login */}
              <div className="mt-6 text-center">
                <span className="text-slate-500 text-xs">Already have an account? </span>
                <Link to="/login" className="text-xs font-bold text-[#65a30d] hover:text-[#4d7c0f] transition-colors">
                  Sign In
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#f8fafc] border-t border-slate-200/50 py-5 px-6 shrink-0">
        <div className="max-w-[1000px] w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[10px] text-slate-400 font-medium tracking-wide text-center sm:text-left">
            &copy; 2026 KRAKOW UNIVERSITY OF TECHNOLOGY, FACULTY OF COMPUTER SCIENCE AND MATHEMATICS.
          </span>
          <div className="flex items-center gap-4 text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
            <a href="#" className="hover:text-slate-800 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-800 transition-colors">Contact</a>
            <a href="#" className="hover:text-slate-800 transition-colors">Bip</a>
            <a href="#" className="hover:text-slate-800 transition-colors">Staff Directory</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
