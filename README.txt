MONT BLANC TREK — INSTALLABLE PWA

This package turns the existing HTML map into an installable phone web app.

SETUP
1. Put this folder on an HTTPS web host. GitHub Pages is a simple free choice.
2. Open the HTTPS page on your phone.
3. Use the browser menu and choose “Add to Home Screen” / “Install app”.
4. Open the new Mont Blanc Trek app from the home screen.

WHAT IS INCLUDED
- The existing custom map in index.html
- Installable PWA manifest
- Service worker for caching the app shell and runtime map assets
- App icons
- “My location” GPS control

IMPORTANT
The map's underlying route data is embedded in the HTML. The online map tile layers are still supplied by OpenStreetMap/OpenTopoMap. The service worker can cache tiles that you have already viewed, but it does not guarantee that the entire Mont Blanc area will be available offline on a first visit. For dependable mountain navigation, a fully offline tile package should be added separately.
