import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className="fixed w-full z-50 top-0 transition-all duration-300 py-6 px-8 flex justify-between items-center glass-panel border-b-0 border-opacity-0">
            <Link href="/" className="text-xl font-bold tracking-tight text-white">
                MK<span className="text-accent-500">.</span>
            </Link>
            <div className="space-x-8 text-sm font-medium text-gray-400 hidden sm:block">
                <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
                <Link href="/apps" className="hover:text-white transition-colors">Uygulamalar</Link>
                <Link href="/privacy" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
                <Link href="/#contact" className="hover:text-white transition-colors">İletişim</Link>
            </div>
        </nav>
    )
}
