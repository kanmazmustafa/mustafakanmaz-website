📑 Project State: Einbürgerungstest 2026 (Web - Next.js)
Son Güncelleme: 2026-02-01
Durum: Geliştirme (Development)
Versiyon: 0.1.0 (Next.js)
🎯 1. Proje Amacı
Bu proje, Almanya Vatandaşlık Testi (Leben in Deutschland) için geliştirilmiş modern bir web uygulamasıdır. Flutter projesinden Next.js'e migre edilmiş olup, hibrit bir mobil/web deneyimi yerine, doğrudan web odaklı bir yapıya geçilmiştir.

🏗️ 2. Teknik Mimari
Uygulama, Next.js ile geliştirilmiş olup aşağıdaki ana bileşenleri kullanır:
*   **Framework:** Next.js 16 (React)
*   **Styling:** Tailwind CSS + Framer Motion
*   **Backend:** Firebase (Auth & Firestore)
*   **State Management:** Zustand
*   **Localization:** next-intl (TR, DE, EN, vb.)
*   **Monetization:** Stripe (Ömür boyu premium), AdSense (Planlanan)

🛠️ 3. Tamamlanan Özellikler (Web)
*   [x] Sınav Simülasyonu: 17/33 başarı mantığı ile test çözümü.
*   [x] Eyalet Seçimi: Almanya haritası üzerinden eyalet bazlı soru yükleme.
*   [x] Ödeme Sistemi: Stripe entegrasyonu ile Premium üyelik.
*   [x] Localization: 29 dil desteği.
*   [ ] Kullanıcı Progress Sync: Hatalı sorular ve ilerleme durumu (Firestore - Geliştiriliyor).

📂 4. Kritik Dosya Haritası
./
├── app/               # Next.js App Router (sayfalar)
├── components/        # UI bileşenleri
├── lib/               # Utility ve Firebase servisleri
├── data/              # Soru verileri (questions.json)
└── messages/          # Dil dosyaları

🚦 5. Sonraki Adımlar
*   Firestore Sync servisinin tamamlanması.
*   Firebase Hosting için `firebase.json` yapılandırması.
*   Interstitial reklamların web için uyarlanması (veya kaldırılması).