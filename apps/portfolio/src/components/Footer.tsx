export default function Footer() {
    return (
        <footer className="py-8 border-t border-[var(--nav-border)] mt-20 transition-colors duration-300">
            <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-slate-500 text-sm">
                    © {new Date().getFullYear()} Mustafa Kanmaz. All rights reserved.
                </p>
                <div className="flex items-center gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
                    <a href="https://github.com/kanmazmustafa" target="_blank" rel="noopener noreferrer" className="hover:text-foreground dark:hover:text-white transition-colors">
                        GitHub
                    </a>

                    <a href="https://www.linkedin.com/in/mustafa-kanmaz" target="_blank" rel="noopener noreferrer" className="hover:text-foreground dark:hover:text-white transition-colors">
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
}
