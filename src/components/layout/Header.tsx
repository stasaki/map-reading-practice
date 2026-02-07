import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-map-blue text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight hover:opacity-90">
          MAP Reading Practice
        </Link>
        <nav className="flex gap-4 text-sm">
          <Link to="/practice/setup" className="hover:underline underline-offset-4">
            Practice
          </Link>
          <Link to="/progress" className="hover:underline underline-offset-4">
            Progress
          </Link>
        </nav>
      </div>
    </header>
  );
}
