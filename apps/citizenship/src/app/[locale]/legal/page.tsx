"use client";

import { useTranslations } from 'next-intl';

export default function LegalPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-20 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100">
                <h1 className="text-4xl font-bold text-slate-900 mb-8 border-b pb-4">Legal Notice / Impressum</h1>

                <section className="space-y-8 text-slate-600 leading-relaxed">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Information according to § 5 TMG</h2>
                        <p className="font-bold">Mustafa Kanmaz</p>
                        <p>Software Engineer & Developer</p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Contact</h2>
                        <p>Email: <a href="mailto:mustafakanmaz90@gmail.com" className="text-indigo-600 hover:underline">mustafakanmaz90@gmail.com</a></p>
                        <p>Website: <a href="https://mustafakanmaz.com" className="text-indigo-600 hover:underline">mustafakanmaz.com</a></p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Dispute resolution</h2>
                        <p>
                            The European Commission provides a platform for online dispute resolution (OS):
                            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline ml-1">https://ec.europa.eu/consumers/odr</a>.
                        </p>
                        <p className="mt-2">
                            I am not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Disclaimer</h2>
                        <h3 className="font-bold text-slate-700 mt-4">Accountability for content</h3>
                        <p>
                            The contents of our pages have been created with the utmost care. However, we cannot guarantee the contents' accuracy, completeness or topicality. According to statutory provisions, we are furthermore responsible for our own content on these web pages.
                        </p>

                        <h3 className="font-bold text-slate-700 mt-4">Accountability for links</h3>
                        <p>
                            Responsibility for the content of external links (to web pages of third parties) lies solely with the operators of the linked pages. No violations were evident to us at the time of linking. Should any legal infringement become known to us, we will remove the respective link immediately.
                        </p>

                        <h3 className="font-bold text-slate-700 mt-4">Copyright</h3>
                        <p>
                            Our web pages and their contents are subject to German copyright law. Unless expressly permitted by law, every form of utilizing, reproducing or processing works subject to copyright protection on our web pages requires the prior consent of the respective owner of the rights.
                        </p>
                    </div>
                </section>

                <footer className="mt-12 pt-8 border-t text-center text-slate-400 text-sm">
                    &copy; 2026 Mustafa Kanmaz. All rights reserved.
                </footer>
            </div>
        </div>
    );
}
