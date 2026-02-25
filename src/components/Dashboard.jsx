import { useState, useRef } from 'react';
import { Search, LogOut, Loader2, FileText, CheckCircle2, Copy, Check } from 'lucide-react';

export default function Dashboard({ user, password, onLogout }) {
  const [search, setSearch] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef(null);

  const handleCopy = () => {
    if (contentRef.current) {
      navigator.clipboard.writeText(contentRef.current.innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  async function fetchEventDetails(localizer) {
    setIsLoading(true);
    setError(null);
    setHtmlContent('');

    const url = `https://api.checkout.prodigioeducacao.com/events/${localizer}?email=${user}@proenem.com.br&password=${password}`;

    try {
      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error(`API retornou status: ${response.status}`);
      }
      const text = await response.text();
      setHtmlContent(text);
    } catch (err) {
      console.error(err);
      setError('Falha ao buscar os detalhes do evento. Verifique o número do pedido ou as credenciais.');
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      fetchEventDetails(search.trim());
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
            <CheckCircle2 className="text-emerald-600 w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              ProEnem Onboarding Search
            </h1>
            <p className="text-xs text-slate-500">Você está logado como {user}@proenem.com.br</p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 transition-colors text-sm font-medium text-slate-600 hover:text-slate-900 group"
        >
          <LogOut className="w-4 h-4 text-slate-400 group-hover:text-red-500 transition-colors" />
          Sair
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 flex flex-col items-center">

        <div className="w-full max-w-3xl mb-12 mt-8 text-center">
          <h2 className="text-3xl font-light text-slate-700 mb-6">
            Procurar por <span className="font-bold text-emerald-600">Localizador de Evento</span>
          </h2>

          <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto">
            <div className="relative flex items-center bg-white border border-slate-300 rounded-2xl shadow-sm focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all overflow-hidden">
              <div className="pl-6 text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Digite o número do pedido..."
                className="w-full bg-transparent border-none px-6 py-5 text-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0"
              />
              <button
                type="submit"
                disabled={isLoading || !search.trim()}
                className="px-8 py-5 font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 transition-colors flex items-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Buscando
                  </>
                ) : (
                  'Pesquisar'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results Area */}
        <div className="w-full flex-1 max-w-5xl flex flex-col">
          {error && (
            <div className="w-full p-4 mb-6 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3">
              <LogOut className="w-5 h-5 rotate-180" />
              {error}
            </div>
          )}

          <div className="flex-1 w-full bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
            <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between bg-slate-50 text-slate-700">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-slate-400" />
                <h3 className="font-medium">Resultado da Busca</h3>
              </div>
              {htmlContent && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 transition-colors text-sm font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar Texto</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="flex-1 p-8 overflow-auto custom-scrollbar bg-slate-50/50">
              {!htmlContent && !isLoading && !error ? (
                <div className="flex flex-col items-center justify-center text-slate-400 py-20 bg-white rounded-2xl border border-slate-100 h-full">
                  <FileText className="w-16 h-16 mb-4 opacity-30" />
                  <p>Os resultados da sua busca aparecerão aqui</p>
                </div>
              ) : htmlContent ? (
                <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                  <div
                    ref={contentRef}
                    className="prose prose-slate prose-emerald max-w-none prose-p:leading-relaxed prose-headings:font-bold prose-a:text-emerald-600 prose-table:w-full prose-th:bg-slate-50 prose-th:p-3 prose-td:p-3 prose-td:border-t prose-td:border-slate-100 prose-img:rounded-xl"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
