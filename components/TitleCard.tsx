type Props = { text: string; index: number; dark: boolean };

export default function TitleCard({ text, index, dark }: Props) {
  async function copyToClipboard() {
    try { await navigator.clipboard.writeText(text); }
    catch { alert("Clipboard blocked. Select & copy manually."); }
  }
  return (
    <button
      onClick={copyToClipboard}
      className={`${dark ? "bg-slate-900/70 border-slate-800 hover:bg-slate-900" : "bg-slate-50 border-slate-200 hover:bg-slate-200"} text-left border rounded-2xl p-4 active:scale-[.99] transition`}
      title="Click to copy"
    >
      <div className="text-sm opacity-70">Title #{index + 1}</div>
      <div className="font-medium mt-1">{text}</div>
    </button>
  );
}
