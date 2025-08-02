export default function Footer() {
  const currentYear = new Date().getFullYear();
  const currentTime = new Date().toLocaleTimeString();

  return (
    <footer className="bg-slate-900/80 border-t border-slate-700 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/50 border border-slate-600 rounded-lg p-4 font-mono text-sm">
          <div className="space-y-1 text-gray-400">
            <div>[{currentTime}] system: portfolio_v2.1 initialized</div>
            <div>[{currentTime}] user: raja_shylesh logged in</div>
            <div>[{currentTime}] status: all systems operational</div>
            <div>[{currentTime}] location: coimbatore, india</div>
            <div>[{currentTime}] contact: raja@example.com</div>
            <div className="pt-2 border-t border-slate-600 mt-3 text-center">
              © {currentYear} Raja Shylesh. Built with React + TypeScript.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}