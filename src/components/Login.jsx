import { useState } from 'react';
import { LogIn, Key, Mail } from 'lucide-react';

export default function Login({ onLogin }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user && password) {
      onLogin(user, password);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden">

      {/* Subtle modern background circles matching ProEnem Green */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 translate-x-[-20%] translate-y-[-20%]"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 translate-x-[20%] translate-y-[20%]"></div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-8 z-10 relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 mb-4">
            <LogIn size={32} />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">
            Acesso Restrito
          </h2>
          <p className="text-slate-500 mt-2 text-sm">
            Faça login com sua conta ProEnem
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Usuário (prefixo)
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              </div>
              <input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
                className="w-full pl-10 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
                placeholder="seunome"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-sm text-slate-500">@proenem.com.br</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Senha
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 cursor-pointer"
          >
            Entrar no Sistema
          </button>
        </form>
      </div>
    </div>
  );
}
