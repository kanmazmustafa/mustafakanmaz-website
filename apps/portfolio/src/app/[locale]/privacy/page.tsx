
export default function PrivacyPage() {
    return (
        <main className="flex-grow pt-32 pb-24 px-4 min-h-screen">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Gizlilik Politikası</h1>
                <div className="prose max-w-none text-gray-400">
                    <p className="text-gray-400 mb-4">Son Güncelleme: 25 Ocak 2026</p>

                    <p className="mb-6">
                        Mustafa Kanmaz ("biz", "bize" veya "bizim") olarak, kullanıcılarımızın ("siz") gizliliğine büyük önem veriyoruz.
                        Bu Gizlilik Politikası, mobil uygulamalarımızı kullandığınızda bilgilerinizin nasıl toplandığını, kullanıldığını ve paylaşıldığını açıklar.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Toplanan Bilgiler</h2>
                    <p className="mb-4">
                        Uygulamalarımız genellikle kişisel olarak tanımlanabilir bilgileri (PII) doğrudan toplamaz. Ancak, hizmet kalitesini artırmak ve reklam gösterimi sağlamak için üçüncü taraf hizmetler kullanabiliriz.
                    </p>
                    <ul className="list-disc pl-6 mb-6">
                        <li className="mb-2"><strong className="text-gray-200">Cihaz Bilgileri:</strong> Cihaz modeli, işletim sistemi sürümü ve benzersiz cihaz tanımlayıcıları (Advertising ID).</li>
                        <li className="mb-2"><strong className="text-gray-200">Kullanım Verileri:</strong> Uygulama içi etkileşimler, kilitlenme raporları (Crash logs) ve performans verileri.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Üçüncü Taraf Hizmetleri</h2>
                    <p className="mb-4">
                        Uygulamalarımızda aşağıdaki üçüncü taraf hizmet sağlayıcılarını kullanabiliriz. Bu sağlayıcıların kendi gizlilik politikaları geçerlidir:
                    </p>
                    <ul className="list-disc pl-6 mb-6">
                        <li className="mb-2"><strong className="text-gray-200">Google AdSense:</strong> Web sitesinde reklam gösterimi ve gelir elde etmek için.</li>
                        <li className="mb-2"><strong className="text-gray-200">Google AdMob:</strong> Mobil uygulamalarda reklam gösterimi için.</li>
                        <li className="mb-2"><strong className="text-gray-200">Firebase Analytics:</strong> Kullanım istatistiklerini analiz etmek için.</li>
                        <li className="mb-2"><strong className="text-gray-200">Google Play Services:</strong> Uygulama dağıtımı ve güncellemeler için.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Çerezler (Cookies) ve Reklamlar</h2>
                    <p className="mb-4">
                        Web sitemiz ve uygulamalarımız, reklam sunmak ve trafiği analiz etmek için çerezleri kullanır.
                    </p>
                    <ul className="list-disc pl-6 mb-6">
                        <li className="mb-2">Google, sitemizi veya diğer web sitelerini ziyaretlerinize dayalı olarak reklam sunmak için çerezleri kullanır.</li>
                        <li className="mb-2">Google'ın reklam çerezlerini kullanması, hem sitemizi hem de internetteki diğer siteleri ziyaretlerinize dayalı olarak sizin için reklamlar sunmasına olanak tanır.</li>
                        <li className="mb-2">Kullanıcılar, <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-accent-500 hover:text-accent-400">Reklam Ayarları</a> sayfasını ziyaret ederek kişiselleştirilmiş reklamcılığı devre dışı bırakabilirler.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Verilerin Kullanımı</h2>
                    <p className="mb-4">
                        Toplanan veriler şu amaçlarla kullanılır:
                    </p>
                    <ul className="list-disc pl-6 mb-6">
                        <li className="mb-2">Uygulamanın düzgün çalışmasını sağlamak.</li>
                        <li className="mb-2">Hataları tespit etmek ve düzeltmek ("Crashlytics").</li>
                        <li className="mb-2">Size kişiselleştirilmiş veya kişiselleştirilmemiş reklamlar sunmak.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. İletişim</h2>
                    <p className="mb-4">
                        Bu Gizlilik Politikası hakkında sorularınız varsa, lütfen bizimle iletişime geçin:
                        <br />
                        <a href="mailto:privacy@mustafakanmaz.com" className="text-accent-500 hover:text-accent-400">privacy@mustafakanmaz.com</a>
                    </p>
                </div>
            </div>
        </main>
    )
}
