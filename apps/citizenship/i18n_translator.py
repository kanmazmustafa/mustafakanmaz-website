import os
import json

PROJECT_ROOT = r"c:\Users\musta\Desktop\software\devam_eden_projeler\einburgeringtest_app_web\nextjs_web"
MESSAGES_DIR = os.path.join(PROJECT_ROOT, "messages")

# Keys that we know are likely in English and need translation
KEYS_TO_FIX = [
    "dashboard.my_bookmarks",
    "dashboard.my_bookmarks_sub",
    "dashboard.select_state_placeholder",
    "dashboard.language_placeholder",
    "premium_features.ad_free_2h",
    "premium_features.all_questions",
    "premium_features.remove_ads_forever",
    "premium_features.unlimited_sims",
    "premium_features.priority_support",
    "practice.image_alt",
    "practice.mastered_title",
    "practice.mastered_desc",
    "dashboard.exam_mode_detail",
    "premium_features.unlock_potential",
    "premium_features.best_value",
    "dashboard.privacy_notice",
    "home.my_bookmarks",
    "home.my_bookmarks_sub",
    "home.premium_edition",
    "dashboard.stats",
    "dashboard.welcome",
    "dashboard.selected_state",
    "home.privacy_notice",
    "dashboard.upgrade_caps",
    "dashboard.remove_ads",
    "result.retry",
    "result.retake_exam"
]

# Translations Database - EXPANDED FOR ALL 29 LANGUAGES
TRANSLATIONS = {
    # GERMAN (de)
    "de": {
        "dashboard.my_bookmarks": "Meine Favoriten",
        "dashboard.my_bookmarks_sub": "Gespeicherte Fragen wiederholen",
        "home.my_bookmarks": "Meine Favoriten",
        "home.my_bookmarks_sub": "Gespeicherte Fragen wiederholen",
        "home.premium_edition": "Premium Edition",
        "home.privacy_notice": "{name} schätzt deine Privatsphäre. Du kannst dein Konto und alle Daten jederzeit löschen.",
        "dashboard.select_state_placeholder": "Bundesland wählen",
        "dashboard.language_placeholder": "Sprache",
        "dashboard.stats": "Ihre Statistik",
        "dashboard.welcome": "Willkommen, {name}",
        "dashboard.selected_state": "Gewähltes Bundesland",
        "premium_features.ad_free_2h": "2 Stunden werbefrei",
        "premium_features.all_questions": "Zugriff auf alle Fragen",
        "premium_features.remove_ads_forever": "Keine Werbung für immer",
        "premium_features.unlimited_sims": "Unbegrenzte Prüfungssimulationen",
        "premium_features.priority_support": "Bevorzugter Support",
        "premium_features.unlock_potential": "Nutze das volle Potenzial deiner Vorbereitung.",
        "premium_features.best_value": "BESTER WERT",
        "practice.image_alt": "Fragenbild",
        "practice.mastered_title": "GAMEISTER!",
        "practice.mastered_desc": "3x richtige Antwort in Folge!",
        "dashboard.privacy_notice": "{name} schätzt deine Privatsphäre. Du kannst dein Konto und alle Daten jederzeit löschen.",
        "dashboard.upgrade_caps": "UPGRADE",
        "dashboard.remove_ads": "Keine Werbung",
        "result.retry": "Wiederholen",
        "result.retake_exam": "Prüfung wiederholen"
    },
    # TURKISH (tr)
    "tr": {
        "dashboard.my_bookmarks": "Favorilerim",
        "dashboard.my_bookmarks_sub": "Kaydettiğin soruları tekrar et",
        "home.my_bookmarks": "Favorilerim",
        "home.my_bookmarks_sub": "Kaydettiğin soruları tekrar et",
        "home.premium_edition": "Premium Sürüm",
        "home.privacy_notice": "{name} gizliliğinize önem verir. Hesabınızı ve ilgili tüm verileri istediğiniz zaman kalıcı olarak silebilirsiniz.",
        "dashboard.select_state_placeholder": "Eyalet Seçin",
        "dashboard.language_placeholder": "Dil",
        "dashboard.stats": "İstatistikler",
        "dashboard.welcome": "Hoş geldin, {name}",
        "dashboard.selected_state": "Seçili Eyalet",
        "premium_features.ad_free_2h": "2 Saat Reklamsız",
        "premium_features.all_questions": "Tüm Sorulara Erişim",
        "premium_features.remove_ads_forever": "Reklamları Kalıcı Kaldır",
        "premium_features.unlimited_sims": "Sınırsız Sınav Simülasyonu",
        "premium_features.priority_support": "Öncelikli Destek",
        "premium_features.unlock_potential": "Hazırlık sürecinin tam potansiyelini ortaya çıkar.",
        "premium_features.best_value": "EN İYİ FİYAT",
        "practice.image_alt": "Soru Görseli",
        "practice.mastered_title": "USTALAŞTIN!",
        "practice.mastered_desc": "3x Doğru Cevap Serisi!",
        "dashboard.privacy_notice": "{name} gizliliğinize önem verir. Hesabınızı ve ilgili tüm verileri istediğiniz zaman kalıcı olarak silebilirsiniz.",
        "dashboard.upgrade_caps": "YÜKSELT",
        "dashboard.remove_ads": "Reklamları Kaldır",
        "result.retry": "Tekrar Dene",
        "result.retake_exam": "Sınavı Tekrarla"
    },
    # SPANISH (es)
    "es": {
        "dashboard.my_bookmarks": "Mis Marcadores",
        "dashboard.my_bookmarks_sub": "Revisar preguntas guardadas",
        "home.my_bookmarks": "Mis Marcadores",
        "home.my_bookmarks_sub": "Revisar preguntas guardadas",
        "home.premium_edition": "Edición Premium",
        "home.privacy_notice": "{name} valora tu privacidad. Puedes borrar tu cuenta permanentemente.",
        "dashboard.select_state_placeholder": "Seleccionar Estado",
        "dashboard.language_placeholder": "Idioma",
        "dashboard.stats": "Tus Estadísticas",
        "dashboard.welcome": "Bienvenido, {name}",
        "dashboard.selected_state": "Estado seleccionado",
        "premium_features.ad_free_2h": "2 Horas Sin Anuncios",
        "premium_features.all_questions": "Acceso a todas las preguntas",
        "premium_features.remove_ads_forever": "Eliminar anuncios para siempre",
        "premium_features.unlimited_sims": "Simulaciones ilimitadas",
        "premium_features.priority_support": "Soporte prioritario",
        "premium_features.unlock_potential": "Desbloquea todo tu potencial.",
        "premium_features.best_value": "MEJOR VALOR",
        "practice.image_alt": "Imagen de la pregunta",
        "practice.mastered_title": "¡DOMINADO!",
        "practice.mastered_desc": "¡Racha de 3 aciertos!",
        "dashboard.privacy_notice": "{name} valora tu privacidad. Puedes borrar tu cuenta permanentemente.",
        "dashboard.upgrade_caps": "MEJORAR",
        "dashboard.remove_ads": "Quitar Anuncios",
        "result.retry": "Reintentar",
        "result.retake_exam": "Repetir Examen"
    },
    # FRENCH (fr)
    "fr": {
        "dashboard.my_bookmarks": "Mes Favoris",
        "dashboard.my_bookmarks_sub": "Revoir les questions",
        "home.my_bookmarks": "Mes Favoris",
        "home.my_bookmarks_sub": "Revoir les questions",
        "home.premium_edition": "Édition Premium",
        "home.privacy_notice": "{name} respecte votre vie privée. Vous pouvez supprimer votre compte.",
        "dashboard.select_state_placeholder": "Choisir l'État",
        "dashboard.language_placeholder": "Langue",
        "dashboard.stats": "Vos Statistiques",
        "dashboard.welcome": "Bienvenue, {name}",
        "dashboard.selected_state": "État sélectionné",
        "premium_features.ad_free_2h": "2 Heures Sans Pub",
        "premium_features.all_questions": "Accès à toutes les questions",
        "premium_features.remove_ads_forever": "Supprimer les pubs",
        "premium_features.unlimited_sims": "Simulations illimitées",
        "premium_features.priority_support": "Support prioritaire",
        "premium_features.unlock_potential": "Libérez tout votre potentiel.",
        "premium_features.best_value": "MEILLEURE VALEUR",
        "practice.image_alt": "Image de la question",
        "practice.mastered_title": "MAÎTRISÉ !",
        "practice.mastered_desc": "Série de 3 bonnes réponses !",
        "dashboard.privacy_notice": "{name} respecte votre vie privée. Vous pouvez supprimer votre compte.",
        "dashboard.upgrade_caps": "PREMIUM",
        "dashboard.remove_ads": "Supprimer Pubs",
        "result.retry": "Réessayer",
        "result.retake_exam": "Repasser l'examen"
    },
    # ITALIAN (it)
    "it": {
        "dashboard.my_bookmarks": "I Miei Preferiti",
        "dashboard.my_bookmarks_sub": "Rivedi salvati",
        "home.my_bookmarks": "I Miei Preferiti",
        "home.my_bookmarks_sub": "Rivedi salvati",
        "home.premium_edition": "Edizione Premium",
        "home.privacy_notice": "{name} tiene alla tua privacy. Puoi eliminare il tuo account.",
        "dashboard.select_state_placeholder": "Seleziona Stato",
        "dashboard.language_placeholder": "Lingua",
        "dashboard.stats": "Le tue statistiche",
        "dashboard.welcome": "Benvenuto, {name}",
        "dashboard.selected_state": "Stato selezionato",
        "premium_features.ad_free_2h": "2 Ore Senza Pubblicità",
        "premium_features.all_questions": "Accesso a tutte le domande",
        "premium_features.remove_ads_forever": "Rimuovi pubblicità per sempre",
        "premium_features.unlimited_sims": "Simulazioni illimitate",
        "premium_features.priority_support": "Supporto prioritario",
        "premium_features.unlock_potential": "Sblocca il tuo potenziale.",
        "premium_features.best_value": "MIGLIOR VALORE",
        "practice.image_alt": "Immagine domanda",
        "practice.mastered_title": "APPRESO!",
        "practice.mastered_desc": "3 risposte corrette di fila!",
        "dashboard.privacy_notice": "{name} tiene alla tua privacy. Puoi eliminare il tuo account.",
        "dashboard.upgrade_caps": "AGGIORNA",
        "dashboard.remove_ads": "Rimuovi Pubblicità",
        "result.retry": "Riprova",
        "result.retake_exam": "Ripeti Esame"
    },
    # UKRAINIAN (uk)
    "uk": {
        "dashboard.my_bookmarks": "Мої закладки", "dashboard.my_bookmarks_sub": "Переглянути збережені",
        "home.my_bookmarks": "Мої закладки", "home.my_bookmarks_sub": "Переглянути збережені",
        "home.premium_edition": "Преміум версія", "premium_features.best_value": "НАЙКРАЩА ЦІНА",
        "dashboard.stats": "Ваша статистика", "dashboard.welcome": "Ласкаво просимо, {name}",
        "dashboard.select_state_placeholder": "Оберіть землю", "dashboard.language_placeholder": "Мова",
        "premium_features.ad_free_2h": "2 години без реклами", "premium_features.all_questions": "Доступ до всіх питань",
        "premium_features.remove_ads_forever": "Видалити рекламу назавжди", "premium_features.unlimited_sims": "Безлімітні симуляції",
        "premium_features.priority_support": "Пріоритетна підтримка", "practice.mastered_title": "ВИВЧЕНО!", "practice.mastered_desc": "3 правильних відповіді поспіль!",
        "dashboard.upgrade_caps": "ПРЕМІУМ", "dashboard.remove_ads": "Прибрати рекламу",
        "result.retry": "Спробувати знову", "result.retake_exam": "Перездати екзамен"
    },
    # POLISH (pl)
    "pl": {
        "dashboard.my_bookmarks": "Moje Zakładki", "dashboard.my_bookmarks_sub": "Przeglądaj zapisane",
        "home.my_bookmarks": "Moje Zakładki", "home.my_bookmarks_sub": "Przeglądaj zapisane",
        "home.premium_edition": "Edycja Premium", "premium_features.best_value": "NAJLEPSZA WARTOŚĆ",
        "dashboard.stats": "Twoje statystyki", "dashboard.welcome": "Witaj, {name}",
        "dashboard.select_state_placeholder": "Wybierz Region", "dashboard.language_placeholder": "Język",
        "premium_features.ad_free_2h": "2 godziny bez reklam", "premium_features.all_questions": "Dostęp do wszystkich pytań",
        "premium_features.remove_ads_forever": "Usuń reklamy na zawsze", "premium_features.unlimited_sims": "Nielimitowane symulacje",
        "premium_features.priority_support": "Wsparcie priorytetowe", "practice.mastered_title": "OPANOWANE!", "practice.mastered_desc": "3 poprawne odpowiedzi z rzędu!",
        "dashboard.upgrade_caps": "PREMIUM", "dashboard.remove_ads": "Usuń Reklamy",
        "result.retry": "Spróbuj ponownie", "result.retake_exam": "Powtórz Egzamin"
    },
    # ROMANIAN (ro)
    "ro": {
        "dashboard.my_bookmarks": "Marcajele mele", "dashboard.my_bookmarks_sub": "Revizuire salvate",
        "home.my_bookmarks": "Marcajele mele", "home.my_bookmarks_sub": "Revizuire salvate",
        "home.premium_edition": "Ediția Premium", "premium_features.best_value": "CEA MAI BUNĂ VALOARE",
        "dashboard.stats": "Statisticile tale", "dashboard.welcome": "Bun venit, {name}",
        "dashboard.select_state_placeholder": "Selectați statul", "dashboard.language_placeholder": "Limbă",
        "premium_features.ad_free_2h": "2 ore fără reclame", "premium_features.all_questions": "Acces la toate întrebările",
        "premium_features.remove_ads_forever": "Eliminați reclamele", "premium_features.unlimited_sims": "Simulări nelimitate",
        "premium_features.priority_support": "Suport prioritar", "practice.mastered_title": "STĂPÂNIT!", "practice.mastered_desc": "3 răspunsuri corecte la rând!",
        "dashboard.upgrade_caps": "PREMIUM", "dashboard.remove_ads": "Elimină Reclamele",
        "result.retry": "Încearcă din nou", "result.retake_exam": "Reia examenul"
    },
    # DUTCH (nl)
    "nl": {
        "dashboard.my_bookmarks": "Mijn Bladwijzers", "dashboard.my_bookmarks_sub": "Bekijk opgeslagen vragen",
        "home.my_bookmarks": "Mijn Bladwijzers", "home.my_bookmarks_sub": "Bekijk opgeslagen vragen",
        "home.premium_edition": "Premium Editie", "premium_features.best_value": "BESTE WAARDE",
        "dashboard.stats": "Je statistieken", "dashboard.welcome": "Welkom, {name}",
        "dashboard.select_state_placeholder": "Kies Deelstaat", "dashboard.language_placeholder": "Taal",
        "premium_features.ad_free_2h": "2 Uur Reclamevrij", "premium_features.all_questions": "Toegang tot alle vragen",
        "premium_features.remove_ads_forever": "Verwijder reclames", "premium_features.unlimited_sims": "Onbeperkte simulaties",
        "premium_features.priority_support": "Prioriteit ondersteuning", "practice.mastered_title": "BEHEERST!", "practice.mastered_desc": "3x Juiste reeks!",
        "dashboard.upgrade_caps": "UPGRADEN", "dashboard.remove_ads": "Geen Reclame",
        "result.retry": "Opnieuw proberen", "result.retake_exam": "Examen opnieuw doen"
    },
    # PORTUGUESE (pt)
    "pt": {
        "dashboard.my_bookmarks": "Meus Favoritos", "dashboard.my_bookmarks_sub": "Revisar salvos",
        "home.my_bookmarks": "Meus Favoritos", "home.my_bookmarks_sub": "Revisar salvos",
        "home.premium_edition": "Edição Premium", "premium_features.best_value": "MELHOR VALOR",
        "dashboard.stats": "Suas Estatísticas", "dashboard.welcome": "Bem-vindo, {name}",
        "dashboard.select_state_placeholder": "Selecionar Estado", "dashboard.language_placeholder": "Idioma",
        "premium_features.ad_free_2h": "2 Horas Sem Anúncios", "premium_features.all_questions": "Acesso a todas as questões",
        "premium_features.remove_ads_forever": "Remover anúncios", "premium_features.unlimited_sims": "Simulações ilimitadas",
        "premium_features.priority_support": "Suporte prioritário", "practice.mastered_title": "DOMINADO!", "practice.mastered_desc": "Sequência de 3 acertos!",
        "dashboard.upgrade_caps": "PREMIUM", "dashboard.remove_ads": "Remover Anúncios",
        "result.retry": "Tentar novamente", "result.retake_exam": "Refazer Exame"
    },
     # ARABIC (ar) - RTL
    "ar": {
        "dashboard.my_bookmarks": "إشاراتي المرجعية", "dashboard.my_bookmarks_sub": "مراجعة الأسئلة المحفوظة",
        "home.my_bookmarks": "إشاراتي المرجعية", "home.my_bookmarks_sub": "مراجعة الأسئلة المحفوظة",
        "home.premium_edition": "نسخة بريميوم", "premium_features.best_value": "أفضل قيمة",
        "dashboard.stats": "إحصائياتك", "dashboard.welcome": "مرحبًا، {name}",
        "dashboard.select_state_placeholder": "اختر المقاطعة", "dashboard.language_placeholder": "لغة",
        "premium_features.ad_free_2h": "ساعتان بدون إعلانات", "premium_features.all_questions": "الوصول إلى جميع الأسئلة",
        "premium_features.remove_ads_forever": "إزالة الإعلانات للأبد", "premium_features.unlimited_sims": "محاكاة امتحان غير محدودة",
        "premium_features.priority_support": "دعم ذو أولوية", "practice.mastered_title": "أتقنت!", "practice.mastered_desc": "3 اجابات صحيحة متتالية!",
        "dashboard.upgrade_caps": "ترقية", "dashboard.remove_ads": "إزالة الإعلانات",
        "result.retry": "حاول مجدداً", "result.retake_exam": "إعادة الامتحان"
    },
    # RUSSIAN (ru)
    "ru": {
        "dashboard.my_bookmarks": "Закладки", "dashboard.my_bookmarks_sub": "Повторить сохраненные",
        "home.my_bookmarks": "Закладки", "home.my_bookmarks_sub": "Повторить сохраненные",
        "home.premium_edition": "Премиум версия", "premium_features.best_value": "ЛУЧШИЙ ВЫБОР",
         "dashboard.stats": "Ваша статистика", "dashboard.welcome": "Добро пожаловать, {name}",
        "dashboard.select_state_placeholder": "Выберите землю", "dashboard.language_placeholder": "Язык",
        "premium_features.ad_free_2h": "2 часа без рекламы", "premium_features.all_questions": "Доступ ко всем вопросам",
        "premium_features.remove_ads_forever": "Убрать рекламу навсегда", "premium_features.unlimited_sims": "Безлимитные симуляции",
        "premium_features.priority_support": "Приоритетная поддержка", "practice.mastered_title": "ОСВОЕНО!", "practice.mastered_desc": "3 правильных ответа подряд!",
        "dashboard.upgrade_caps": "ПРЕМИУМ", "dashboard.remove_ads": "Убрать рекламу",
        "result.retry": "Повторить", "result.retake_exam": "Пересдать экзамен"
    },
    # BULGARIAN (bg)
    "bg": {
        "dashboard.my_bookmarks": "Моите отметки", "dashboard.my_bookmarks_sub": "Преглед на запазените",
        "home.my_bookmarks": "Моите отметки", "home.my_bookmarks_sub": "Преглед на запазените",
        "home.premium_edition": "Премиум версия", "premium_features.best_value": "Най-добра стойност",
        "dashboard.stats": "Вашата статистика", "dashboard.welcome": "Добре дошли, {name}",
        "dashboard.select_state_placeholder": "Изберете държава", "dashboard.language_placeholder": "Език",
        "premium_features.ad_free_2h": "2 часа без реклами", "premium_features.all_questions": "Достъп до всички въпроси",
        "premium_features.remove_ads_forever": "Премахни рекламите завинаги", "premium_features.unlimited_sims": "Неограничени симулации",
        "premium_features.priority_support": "Приоритетна поддръжка", "practice.mastered_title": "УСВОЕНО!", "practice.mastered_desc": "3 поредни верни отговора!",
        "dashboard.upgrade_caps": "НАДГРАЖДАНЕ", "dashboard.remove_ads": "Премахни реклами",
        "result.retry": "Опитай пак", "result.retake_exam": "Повтори изпита"
    },
    # BOSNIAN (bs)
    "bs": {
        "dashboard.my_bookmarks": "Moji Favoriti", "dashboard.my_bookmarks_sub": "Pregledaj sačuvana pitanja",
        "home.my_bookmarks": "Moji Favoriti", "home.my_bookmarks_sub": "Pregledaj sačuvana pitanja",
        "home.premium_edition": "Premium Verzija", "premium_features.best_value": "NAJBOLJA VRIJEDNOST",
        "dashboard.stats": "Vaša Statistika", "dashboard.welcome": "Dobrodošli, {name}",
        "dashboard.select_state_placeholder": "Odaberi Pokrajinu", "dashboard.language_placeholder": "Jezik",
        "premium_features.ad_free_2h": "2 Sata Bez Reklama", "premium_features.all_questions": "Pristup svim pitanjima",
        "premium_features.remove_ads_forever": "Ukloni reklame zauvijek", "premium_features.unlimited_sims": "Neograničene simulacije",
        "premium_features.priority_support": "Prioritetna podrška", "practice.mastered_title": "SAVLADANO!", "practice.mastered_desc": "3x Tačan Niz!",
        "dashboard.upgrade_caps": "NADOGRADNJA", "dashboard.remove_ads": "Ukloni reklame",
        "result.retry": "Pokušaj ponovo", "result.retake_exam": "Ponovi ispit"
    },
    # CZECH (cs)
    "cs": {
        "dashboard.my_bookmarks": "Moje záložky", "dashboard.my_bookmarks_sub": "Zkontrolovat uložené",
        "home.my_bookmarks": "Moje záložky", "home.my_bookmarks_sub": "Zkontrolovat uložené",
        "home.premium_edition": "Prémiová verze", "premium_features.best_value": "NEJLEPŠÍ HODNOTA",
        "dashboard.stats": "Vaše statistiky", "dashboard.welcome": "Vítejte, {name}",
        "dashboard.select_state_placeholder": "Vyberte stát", "dashboard.language_placeholder": "Jazyk",
        "premium_features.ad_free_2h": "2 hodiny bez reklam", "premium_features.all_questions": "Přístup ke všem otázkám",
        "premium_features.remove_ads_forever": "Odstranit reklamy navždy", "premium_features.unlimited_sims": "Neomezené simulace",
        "premium_features.priority_support": "Prioritní podpora", "practice.mastered_title": "ZVLÁDNUTO!", "practice.mastered_desc": "3x správná odpověď v řadě!",
        "dashboard.upgrade_caps": "UPGRADE", "dashboard.remove_ads": "Odstranit reklamy",
        "result.retry": "Zkusit znovu", "result.retake_exam": "Opakovat zkoušku"
    },
    # DANISH (da)
    "da": {
        "dashboard.my_bookmarks": "Mine bogmærker", "dashboard.my_bookmarks_sub": "Gennemse gemte",
        "home.my_bookmarks": "Mine bogmærker", "home.my_bookmarks_sub": "Gennemse gemte",
        "home.premium_edition": "Premium Udgave", "premium_features.best_value": "BEDSTE VÆRDI",
        "dashboard.stats": "Dine statistikker", "dashboard.welcome": "Velkommen, {name}",
        "dashboard.select_state_placeholder": "Vælg stat", "dashboard.language_placeholder": "Sprog",
        "premium_features.ad_free_2h": "2 timer reklamefri", "premium_features.all_questions": "Adgang til alle spørgsmål",
        "premium_features.remove_ads_forever": "Fjern reklamer for altid", "premium_features.unlimited_sims": "Ubegrænsede simuleringer",
        "premium_features.priority_support": "Prioriteret support", "practice.mastered_title": "MESTRET!", "practice.mastered_desc": "3x rigtigt svar i træk!",
        "dashboard.upgrade_caps": "OPGRADER", "dashboard.remove_ads": "Fjern reklamer",
        "result.retry": "Prøv igen", "result.retake_exam": "Tag eksamen igen"
    },
    # GREEK (el)
    "el": {
        "dashboard.my_bookmarks": "Σελιδοδείκτες", "dashboard.my_bookmarks_sub": "Αποθηκευμένες ερωτήσεις",
        "home.my_bookmarks": "Σελιδοδείκτες", "home.my_bookmarks_sub": "Αποθηκευμένες ερωτήσεις",
        "home.premium_edition": "Έκδοση Premium", "premium_features.best_value": "ΚΑΛΥΤΕΡΗ ΑΞΙΑ",
        "dashboard.stats": "Τα στατιστικά σας", "dashboard.welcome": "Καλώς ήρθατε, {name}",
        "dashboard.select_state_placeholder": "Επιλέξτε κράτος", "dashboard.language_placeholder": "Γλώσσα",
        "premium_features.ad_free_2h": "2 ώρες χωρίς διαφημίσεις", "premium_features.all_questions": "Πρόσβαση σε όλες τις ερωτήσεις",
        "premium_features.remove_ads_forever": "Κατάργηση διαφημίσεων", "premium_features.unlimited_sims": "Απεριόριστες προσομοιώσεις",
        "premium_features.priority_support": "Προτεραιότητα υποστήριξης", "practice.mastered_title": "ΚΑΤΑΚΤΗΘΗΚΕ!", "practice.mastered_desc": "3 σωστές απαντήσεις στη σειρά!",
        "dashboard.upgrade_caps": "ΑΝΑΒΑΘΜΙΣΗ", "dashboard.remove_ads": "Αφαίρεση Διαφημίσεων",
        "result.retry": "Προσπαθήστε ξανά", "result.retake_exam": "Επανάληψη εξέτασης"
    },
    # PERSIAN (fa)
    "fa": {
        "dashboard.my_bookmarks": "نشانک‌های من", "dashboard.my_bookmarks_sub": "مرور سوالات ذخیره شده",
        "home.my_bookmarks": "نشانک‌های من", "home.my_bookmarks_sub": "مرور سوالات ذخیره شده",
        "home.premium_edition": "نسخه پرمیوم", "premium_features.best_value": "بهترین ارزش",
        "dashboard.stats": "آمار شما", "dashboard.welcome": "خوش آمدید، {name}",
        "dashboard.select_state_placeholder": "انتخاب استان", "dashboard.language_placeholder": "زبان",
        "premium_features.ad_free_2h": "2 ساعت بدون تبلیغات", "premium_features.all_questions": "دسترسی به تمام سوالات",
        "premium_features.remove_ads_forever": "حذف دائمی تبلیغات", "premium_features.unlimited_sims": "شبیه‌سازی نامحدود",
        "premium_features.priority_support": "پشتیبانی اولویت‌دار", "practice.mastered_title": "مسلط شد!", "practice.mastered_desc": "3 پاسخ صحیح متوالی!",
        "dashboard.upgrade_caps": "ارتقا", "dashboard.remove_ads": "حذف تبلیغات",
        "result.retry": "تلاش مجدد", "result.retake_exam": "تکرار آزمون"
    },
    # FINNISH (fi)
    "fi": {
        "dashboard.my_bookmarks": "Kirjanmerkkini", "dashboard.my_bookmarks_sub": "Tarkista tallennetut",
        "home.my_bookmarks": "Kirjanmerkkini", "home.my_bookmarks_sub": "Tarkista tallennetut",
        "home.premium_edition": "Premium-versio", "premium_features.best_value": "PARAS ARVO",
        "dashboard.stats": "Tilastosi", "dashboard.welcome": "Tervetuloa, {name}",
        "dashboard.select_state_placeholder": "Valitse osavaltio", "dashboard.language_placeholder": "Kieli",
        "premium_features.ad_free_2h": "2 tuntia ilman mainoksia", "premium_features.all_questions": "Pääsy kaikkiin kysymyksiin",
        "premium_features.remove_ads_forever": "Poista mainokset pysyvästi", "premium_features.unlimited_sims": "Rajoittamattomat simulaatiot",
        "premium_features.priority_support": "Ensisijainen tuki", "practice.mastered_title": "OSATTU!", "practice.mastered_desc": "3 oikeaa vastausta peräkkäin!",
        "dashboard.upgrade_caps": "PÄIVITÄ", "dashboard.remove_ads": "Poista mainokset",
        "result.retry": "Yritä uudelleen", "result.retake_exam": "Uusi koe"
    },
    # HEBREW (he)
    "he": {
        "dashboard.my_bookmarks": "הסימניות שלי", "dashboard.my_bookmarks_sub": "סקור שאלות שמורות",
        "home.my_bookmarks": "הסימניות שלי", "home.my_bookmarks_sub": "סקור שאלות שמורות",
        "home.premium_edition": "גרסת פרימיום", "premium_features.best_value": "הערך הטוב ביותר",
        "dashboard.stats": "הסטטיסטיקה שלך", "dashboard.welcome": "ברוך הבא, {name}",
        "dashboard.select_state_placeholder": "בחר מדינה", "dashboard.language_placeholder": "שפה",
        "premium_features.ad_free_2h": "שעתיים ללא פרסומות", "premium_features.all_questions": "גישה לכל השאלות",
        "premium_features.remove_ads_forever": "הסר פרסומות לתמיד", "premium_features.unlimited_sims": "סימולציות ללא הגבלה",
        "premium_features.priority_support": "תמיכה בעדיפות", "practice.mastered_title": "נשלט!", "practice.mastered_desc": "3 תשובות נכונות ברצף!",
        "dashboard.upgrade_caps": "שדרג", "dashboard.remove_ads": "הסר פרסומות",
        "result.retry": "נסה שוב", "result.retake_exam": "גש למבחן שוב"
    },
    # HINDI (hi)
    "hi": {
        "dashboard.my_bookmarks": "मेरे बुकमार्क", "dashboard.my_bookmarks_sub": "सहेजे गए प्रश्नों की समीक्षा करें",
        "home.my_bookmarks": "मेरे बुकमार्क", "home.my_bookmarks_sub": "सहेजे गए प्रश्नों की समीक्षा करें",
        "home.premium_edition": "प्रीमियम संस्करण", "premium_features.best_value": "सबसे अच्छा मूल्य",
        "dashboard.stats": "आपके आँकड़े", "dashboard.welcome": "स्वागत है, {name}",
        "dashboard.select_state_placeholder": "राज्य चुनें", "dashboard.language_placeholder": "भाषा",
        "premium_features.ad_free_2h": "2 घंटे विज्ञापन मुक्त", "premium_features.all_questions": "सभी प्रश्नों तक पहुंच",
        "premium_features.remove_ads_forever": "हमेशा के लिए विज्ञापन हटाएं", "premium_features.unlimited_sims": "असीमित सिमुलेशन",
        "premium_features.priority_support": "प्राथमिकता समर्थन", "practice.mastered_title": "महारत हासिल!", "practice.mastered_desc": "लगातार 3 सही उत्तर!",
        "dashboard.upgrade_caps": "अपग्रेड", "dashboard.remove_ads": "विज्ञापन हटाएं",
        "result.retry": "पुनः प्रयास करें", "result.retake_exam": "परीक्षा फिर से दें"
    },
    # CROATIAN (hr)
    "hr": {
        "dashboard.my_bookmarks": "Moje oznake", "dashboard.my_bookmarks_sub": "Pregled spremljenih",
        "home.my_bookmarks": "Moje oznake", "home.my_bookmarks_sub": "Pregled spremljenih",
        "home.premium_edition": "Premium verzija", "premium_features.best_value": "NAJBOLJA VRIJEDNOST",
        "dashboard.stats": "Vaša statistika", "dashboard.welcome": "Dobrodošli, {name}",
        "dashboard.select_state_placeholder": "Odaberite državu", "dashboard.language_placeholder": "Jezik",
        "premium_features.ad_free_2h": "2 sata bez oglasa", "premium_features.all_questions": "Pristup svim pitanjima",
        "premium_features.remove_ads_forever": "Ukloni oglase zauvijek", "premium_features.unlimited_sims": "Neograničene simulacije",
        "premium_features.priority_support": "Prioritetna podrška", "practice.mastered_title": "SVLADANO!", "practice.mastered_desc": "3 točna odgovora zaredom!",
        "dashboard.upgrade_caps": "NADOGRADI", "dashboard.remove_ads": "Ukloni Oglase",
        "result.retry": "Pokušaj ponovo", "result.retake_exam": "Ponovi ispit"
    },
    # HUNGARIAN (hu)
    "hu": {
        "dashboard.my_bookmarks": "Könyvjelzőim", "dashboard.my_bookmarks_sub": "Mentett kérdések áttekintése",
        "home.my_bookmarks": "Könyvjelzőim", "home.my_bookmarks_sub": "Mentett kérdések áttekintése",
        "home.premium_edition": "Prémium verzió", "premium_features.best_value": "LEGJOBB ÉRTÉK",
        "dashboard.stats": "Statisztikáid", "dashboard.welcome": "Üdvözöljük, {name}",
        "dashboard.select_state_placeholder": "Válasszon államot", "dashboard.language_placeholder": "Nyelv",
        "premium_features.ad_free_2h": "2 óra reklámmentes", "premium_features.all_questions": "Hozzáférés minden kérdéshez",
        "premium_features.remove_ads_forever": "Hirdetések eltávolítása", "premium_features.unlimited_sims": "Korlátlan szimulációk",
        "premium_features.priority_support": "Elsőbbségi támogatás", "practice.mastered_title": "ELSÁJÁTÍTVA!", "practice.mastered_desc": "3 helyes válasz egymás után!",
        "dashboard.upgrade_caps": "FRISSÍTÉS", "dashboard.remove_ads": "Hirdetések Eltávolítása",
        "result.retry": "Próbáld újra", "result.retake_exam": "Vizsga megismétlése"
    },
    # JAPANESE (ja)
    "ja": {
        "dashboard.my_bookmarks": "ブックマーク", "dashboard.my_bookmarks_sub": "保存された質問",
        "home.my_bookmarks": "ブックマーク", "home.my_bookmarks_sub": "保存された質問",
        "home.premium_edition": "プレミアム版", "premium_features.best_value": "ベストバリュー",
        "dashboard.stats": "あなたの統計", "dashboard.welcome": "ようこそ、{name}",
        "dashboard.select_state_placeholder": "州を選択", "dashboard.language_placeholder": "言語",
        "premium_features.ad_free_2h": "2時間広告なし", "premium_features.all_questions": "すべての質問にアクセス",
        "premium_features.remove_ads_forever": "広告を完全に削除", "premium_features.unlimited_sims": "無制限のシミュレーション",
        "premium_features.priority_support": "優先サポート", "practice.mastered_title": "マスターしました！", "practice.mastered_desc": "3回連続正解！",
        "dashboard.upgrade_caps": "アップグレード", "dashboard.remove_ads": "広告を削除",
        "result.retry": "再試行", "result.retake_exam": "試験を再受験"
    },
    # URDU/KURDISH (ku)
    "ku": {
        "dashboard.my_bookmarks": "Bijareyên min", "dashboard.my_bookmarks_sub": "Pirsên tomarkirî",
        "home.my_bookmarks": "Bijareyên min", "home.my_bookmarks_sub": "Pirsên tomarkirî",
        "home.premium_edition": "Guhertoya Premium", "premium_features.best_value": "BEST VALUE",
        "dashboard.stats": "statîstîkên te", "dashboard.welcome": "Bi xêr hatî, {name}",
        "premium_features.ad_free_2h": "2 saet bê reklam", "premium_features.all_questions": "Gihîştina hemî pirsan",
        "dashboard.upgrade_caps": "BILIND KIRIN", "dashboard.remove_ads": "Reklaman Rake",
        "result.retry": "Dîsa biceribîne", "result.retake_exam": "Ezmûn dubare bike"
    },
    # SERBIAN (sr)
    "sr": {
        "dashboard.my_bookmarks": "Моје обележиваче", "dashboard.my_bookmarks_sub": "Преглед сачуваних",
        "home.my_bookmarks": "Моје обележиваче", "home.my_bookmarks_sub": "Преглед сачуваних",
        "home.premium_edition": "Премиум издање", "premium_features.best_value": "НАЈБОЉА ВРЕДНОСТ",
        "dashboard.stats": "Ваша статистика", "dashboard.welcome": "Добродошли, {name}",
        "dashboard.select_state_placeholder": "Изаберите државу", "dashboard.language_placeholder": "Језик",
        "premium_features.ad_free_2h": "2 сата без огласа", "premium_features.all_questions": "Приступ свим питањима",
        "premium_features.remove_ads_forever": "Уклони огласе заувек", "premium_features.unlimited_sims": "Неограничене симулације",
        "premium_features.priority_support": "Приоритетна подршка", "practice.mastered_title": "САВЛАДАНО!", "practice.mastered_desc": "3 тачна одговора заредом!",
        "dashboard.upgrade_caps": "НАДОГРАДЊА", "dashboard.remove_ads": "Уклони Огласе",
        "result.retry": "Покушајте поново", "result.retake_exam": "Поновите испит"
    },
    # THAI (th)
    "th": {
        "dashboard.my_bookmarks": "ที่คั่นหน้าของฉัน", "dashboard.my_bookmarks_sub": "ทบทวนคำถาม",
         "home.my_bookmarks": "ที่คั่นหน้าของฉัน", "home.my_bookmarks_sub": "ทบทวนคำถาม",
        "home.premium_edition": "รุ่นพรีเมียม", "premium_features.best_value": "คุ้มค่าที่สุด",
        "dashboard.stats": "สถิติของคุณ", "dashboard.welcome": "ยินดีต้อนรับ, {name}",
        "dashboard.select_state_placeholder": "เลือกรัฐ", "dashboard.language_placeholder": "ภาษา",
        "premium_features.ad_free_2h": "ไม่มีโฆษณา 2 ชม.", "premium_features.all_questions": "เข้าถึงทุกคำถาม",
        "premium_features.remove_ads_forever": "ลบโฆษณาถาวร", "premium_features.unlimited_sims": "แบบจำลองไม่จำกัด",
        "premium_features.priority_support": "การสนับสนุนลำดับความสำคัญ", "practice.mastered_title": "เชี่ยวชาญ!", "practice.mastered_desc": "ตอบถูก 3 ข้อติด!",
        "dashboard.upgrade_caps": "อัปเกรด", "dashboard.remove_ads": "ลบโฆษณา",
        "result.retry": "ลองอีกครั้ง", "result.retake_exam": "สอบใหม่"
    },
    # VIETNAMESE (vi)
    "vi": {
        "dashboard.my_bookmarks": "Dấu trang", "dashboard.my_bookmarks_sub": "Xem lại đã lưu",
        "home.my_bookmarks": "Dấu trang", "home.my_bookmarks_sub": "Xem lại đã lưu",
        "home.premium_edition": "Phiên bản cao cấp", "premium_features.best_value": "GIÁ TRỊ NHẤT",
        "dashboard.stats": "Thống kê của bạn", "dashboard.welcome": "Chào mừng, {name}",
        "dashboard.select_state_placeholder": "Chọn bang", "dashboard.language_placeholder": "Ngôn ngữ",
        "premium_features.ad_free_2h": "2 giờ không quảng cáo", "premium_features.all_questions": "Truy cập tất cả câu hỏi",
        "premium_features.remove_ads_forever": "Xóa quảng cáo vĩnh viễn", "premium_features.unlimited_sims": "Mô phỏng không giới hạn",
        "premium_features.priority_support": "Hỗ trợ ưu tiên", "practice.mastered_title": "ĐÃ THÀNH THẠO!", "practice.mastered_desc": "3 câu đúng liên tiếp!",
        "dashboard.upgrade_caps": "NÂNG CẤP", "dashboard.remove_ads": "Xóa quảng cáo",
        "result.retry": "Thử lại", "result.retake_exam": "Thi lại"
    },
    # CHINESE (zh)
    "zh": {
        "dashboard.my_bookmarks": "我的书签", "dashboard.my_bookmarks_sub": "查看保存的问题",
        "home.my_bookmarks": "我的书签", "home.my_bookmarks_sub": "查看保存的问题",
        "home.premium_edition": "高级版", "premium_features.best_value": "超值",
        "dashboard.stats": "您的统计数据", "dashboard.welcome": "欢迎, {name}",
        "dashboard.select_state_placeholder": "选择州", "dashboard.language_placeholder": "语言",
         "premium_features.ad_free_2h": "2小时无广告", "premium_features.all_questions": "访问所有问题",
        "premium_features.remove_ads_forever": "永久移除广告", "premium_features.unlimited_sims": "无限模拟",
        "premium_features.priority_support": "优先支持", "practice.mastered_title": "精通！", "practice.mastered_desc": "连续答对3次！",
        "dashboard.upgrade_caps": "升级", "dashboard.remove_ads": "移除广告",
        "result.retry": "重试", "result.retake_exam": "重考"
    }
}

# Helper to load/save
def load_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def save_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def set_nested(d, key, value):
    parts = key.split(".")
    for part in parts[:-1]:
        if part not in d:
            d[part] = {}
        d = d[part]
    d[parts[-1]] = value

def main():
    print("--- Translation Fixer ---")
    files = [f for f in os.listdir(MESSAGES_DIR) if f.endswith(".json")]

    # Load English first as source of truth
    en_path = os.path.join(MESSAGES_DIR, "en.json")
    try:
        en_data = load_json(en_path)
    except Exception as e:
        print(f"CRITICAL: Could not load en.json: {e}")
        return

    # Define the keys we MUST guarantee exist
    
    for filename in files:
        if filename == "en.json":
            continue

        lang_code = filename.split(".")[0]
        path = os.path.join(MESSAGES_DIR, filename)
        
        try:
            data = load_json(path)
            updated = 0
            
            # 1. Apply specific translations if available
            specific_map = TRANSLATIONS.get(lang_code, {})
            for key, val in specific_map.items():
                set_nested(data, key, val)
                updated += 1
                
            # 2. Check for missing keys
            for key in KEYS_TO_FIX:
                if key in specific_map:
                    continue

                parts = key.split(".")
                curr = data
                found = True
                for p in parts:
                    if isinstance(curr, dict) and p in curr:
                        curr = curr[p]
                    else:
                        found = False
                        break
                
                if not found:
                    en_curr = en_data
                    en_found = True
                    for p in parts:
                        if isinstance(en_curr, dict) and p in en_curr:
                            en_curr = en_curr[p]
                        else:
                            en_found = False
                            break
                    
                    if en_found:
                        set_nested(data, key, en_curr)
                        updated += 1

            if updated > 0:
                save_json(path, data)
                print(f"Updated {filename} with {updated} keys.")
            else:
                print(f"Skipped {filename} (no changes needed).")

        except Exception as e:
            print(f"Failed to update {filename}: {e}")

    print("Done.")

if __name__ == "__main__":
    main()
