# student_app

## Funkcjonalności
Aplikacja oferuje szereg funkcjonalności, które ułatwiają organizację czasu i komunikację w środowisku akademickim:
- **Logowanie:** Autoryzacja użytkowników do systemu.
- **Rejestracja użytkownika:** Możliwość tworzenia nowego konta użytkownika.
- **Dostęp do kalendarza:** Użytkownicy mogą przeglądać  wydarzenia i terminy.
- **Dostęp do planu zajęć:** Możliwość wyświetlenia  planu zajęć dodatkowych.
- **Dostęp do chatu grupowego:** Funkcja komunikacji z innymi użytkownikami aplikacji.
- **Dostęp do map placówki:** Wyświetlanie map, które pomagają w orientacji po terenie uczelni.

## Wykorzystywane technologie
Projekt został zbudowany przy użyciu:
- **Frontend:** React - biblioteka JavaScript do budowania interfejsu użytkownika.
- **Backend:** Node.js z frameworkiem Express - służy do obsługi logiki serwerowej.

### Komendy uruchomieniowe
- Aby uruchomić środowisko frontendowe, użyj:
  ```bash
  cd client
  npm install
  npm start
- Aby uruchomić środowisko backendowe, użyj:
  ```bash
  cd server
  npm install
  npm start

### Struktura plików
- client/: Zawiera szablon aplikacji React (create-react-app), z katalogami:
  - services/: Logika odpowiedzialna za komunikację z backendem.
  - components/: Komponenty React reusable.
  - pages/: Strony aplikacji.

- server/: Struktura serwera Node.js/Express z katalogami:
  - routes/: Definicje ścieżek dla routerów.
  - controllers/: Kontrolery obsługujące logikę aplikacji.
  - views/: Domyślne widoki aplikacji.

### Informacje dodatkowe
- Axios: Biblioteka służąca do wykonywania żądań HTTP między klientem a serwerem.
- AntDesign: Biblioteka zawierająca bogatą kolekcję gotowych, responsywnyh komponentów.
- Express.js: Framework do obsługi backendu.
- Node.js: wersję można sprawdzić za pomocą komendy

  ```bash
  node -v
