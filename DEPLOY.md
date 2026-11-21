# Jak wgrać Alba na GitHub i Vercel (bez terminala)

Ten plik jest dla Ciebie, nie dla rekruterów. Możesz go usunąć po wdrożeniu.

## Zanim zaczniesz

- Rozpakuj `alba-app.zip`. Powstanie folder `alba-app` z plikami `package.json`, `src`, `docs` itd.
- Kod nie był jeszcze uruchamiany (ani zbudowany) po stronie, która go przygotowała. Pierwszy build zrobi Vercel i pokaże ewentualne błędy w logu. To normalne, napisz mi, co pokazuje log, a poprawię.

## 1. GitHub: konto i repozytorium

1. Wejdź na github.com i załóż konto (Sign up). Potwierdź e-mail.
2. Kliknij **+** (prawy górny róg) → **New repository**.
3. Nazwa: `alba-app`. Ustaw **Public** (żeby rekruterzy mogli zobaczyć kod). **Nie** zaznaczaj „Add a README" ani innych plików. Kliknij **Create repository**.

## 2. GitHub: wgranie plików

1. Na pustej stronie repozytorium kliknij link **uploading an existing file**.
2. Otwórz folder `alba-app` na swoim komputerze i zaznacz **całą zawartość** (nie sam folder): `src`, `docs`, `package.json`, `README.md` itd. Przeciągnij to do okna przeglądarki.
3. Poczekaj, aż wszystkie pliki się wgrają. Na dole w polu „Commit changes" wpisz np. `Initial commit` i kliknij **Commit changes**.
4. Sprawdź, czy w repozytorium widzisz folder `src` i plik `package.json` **na samej górze**, a nie w podfolderze `alba-app`. Jeśli są w podfolderze, usuń repozytorium i wgraj jeszcze raz sama zawartość.

Uwaga: plik `.gitignore` jest ukryty w Finderze (Mac: Cmd + Shift + `.` pokazuje ukryte pliki). Bez niego aplikacja działa tak samo.

## 3. Vercel: konto i wdrożenie

1. Wejdź na vercel.com → **Sign Up** → **Continue with GitHub**. Zezwól na dostęp.
2. Na pulpicie kliknij **Add New… → Project**.
3. Na liście repozytoriów znajdź `alba-app` i kliknij **Import**. Jeśli go nie widzisz, kliknij **Adjust GitHub App Permissions** i dodaj to repozytorium.
4. Vercel sam rozpozna **Framework Preset: Next.js**. Niczego nie zmieniaj (Root Directory zostaw puste, domyślne komendy też).
5. Kliknij **Deploy**. Trwa ok. 1–2 minut.
6. Po sukcesie zobaczysz zrzut ekranu i adres w stylu `alba-app-xxxx.vercel.app`. To jest Twoja żywa aplikacja.

## 4. Test przed wysłaniem komukolwiek

1. Otwórz link na laptopie (aplikacja jest w ramce telefonu) i na telefonie (pełny ekran).
2. Przejdź ścieżkę: Get started → Connect securely → dotknij karty runway → See options → Apply → Back to home → zakładki na dole.
3. Otwórz link w oknie incognito, żeby sprawdzić, że działa bez logowania. Jeśli Vercel prosi o logowanie: Project → Settings → Deployment Protection i wyłącz ochronę dla wdrożenia produkcyjnego.

## 5. Gdzie wstawić link

- Na portfolio: przycisk „Open live app" w sekcji z prototypem.
- W `README.md` w repozytorium: uzupełnij linię „Live app" (w GitHubie kliknij plik → ikona ołówka → edytuj → Commit).
- Opcjonalnie: krótszy adres. Project → Settings → Domains → zmień nazwę na np. `alba-maya.vercel.app`.

## 6. Kolejne zmiany

Za każdym razem, gdy zmienisz plik w GitHubie (lub wgrasz nową wersję), Vercel sam zbuduje i opublikuje nową wersję w ok. minutę.

## Gdy build się nie powiedzie

1. W Vercelu wejdź w **Deployments**, kliknij nieudane wdrożenie i skopiuj czerwony fragment logu.
2. Wklej mi go. Najczęstsze przyczyny to literówka w jednym pliku albo wersja zależności.

## Wersja z terminalem (jeśli wolisz)

```bash
cd alba-app
npm install
npm run dev        # sprawdź na http://localhost:3000
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TWOJ-LOGIN/alba-app.git
git push -u origin main
```
