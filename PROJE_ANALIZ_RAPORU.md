# Proje Analiz Raporu

Bu repo, modern web teknolojileri ile geliştirilmiş bir **Monorepo** (Turborepo + pnpm) mimarisidir. İçerisinde iki adet ana uygulama (app) barındırmaktadır.

## 1. Mimari ve Teknolojiler
- **Workspace Yönetimi**: `pnpm` workspaces ve `Turborepo` kullanılarak modüler bir yapı kurulmuş.
- **Framework & Kütüphaneler**: 
  - **Next.js 15 (App Router)** ve **React 19** kullanılıyor.
  - **Arayüz ve Tasarım**: `Tailwind CSS v4`, `Radix UI` (erişilebilir UI bileşenleri) ve `Framer Motion` (animasyonlar).
  - **Durum Yönetimi ve Formlar**: `zustand`, `react-hook-form` ve `zod`.
- **Lokalizasyon (i18n)**: `next-intl` ile çoklu dil desteği uygulanmış.
- **Altyapı**: Firebase (Hosting, Firestore, Cloud Functions). Ödemeler için `Stripe` kullanılıyor.

## 2. Uygulamalar (Apps)

### A. Portfolio App (`apps/portfolio`)
- **Amacı**: Ana web sitesi ve portfolyo sayfası.
- **Detaylar**: Kök dizinden (`/`) gelen istekleri karşılar. E-posta bildirimleri/iletişim formları için `resend` entegrasyonu ve Firebase Admin yetkileri barındırıyor.

### B. Citizenship App (`apps/citizenship`)
- **Amacı**: Vatandaşlık testi (Einbürgerungstest) vb. sınavlarlara hazırlık provası sunan interaktif eğitim uygulaması.
- **Detaylar**: `/einbuergerungstest/app` dizini altında çalışır. Stripe entegrasyonu sayesinde premium/ücretli üyelik ve test paketleri barındırıyor olabilir. Test bitimindeki animasyonlar için `canvas-confetti` eklenmiş.

## 3. Dağıtım ve Yönlendirme (Firebase Hosting)
Firebase yapısı (`firebase.json`) iki uygulamayı tek bir sistemde başarıyla birleştiriyor:
- Hosting, `frameworksBackend` özelliği yardımıyla Next.js projelerini doğrudan Cloud Functions (örn. `ssrmustafakanmazcom` ve `ssrmustafakanmazcitizen`) üzerinden Server-Side Rendering (SSR) destekli şekilde ayağa kaldırıyor.
- Kullanıcı `mustafakanmaz.com/einbuergerungstest/*` adresine girdiğinde, şeffaf bir şekilde (`rewrite`) `citizenship` uygulamasına yönlendiriliyor. Geri kalan her şey portfolyo sitesini açıyor.
- Dil parametreleri URL içerisinde (`/tr`, `/en`, `/de` vb.) `redirects` kurallarıyla kapsamlı şekilde yönetilmiş.

## Özet
Proje son teknoloji (Next 15, React 19, Tailwind v4) kullanılarak, ölçeklendirmeye oldukça uygun bir monorepo formatında kurgulanmış. Klasörleme mantığı ve servis mimarisi profesyonel bir standartta planlanmış.
