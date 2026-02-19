# Scope

Generiere eine App, mit der ich ein Kanban Bord pflegen kann. Beginne mit einem ganz einfachen Issue.

# Issue

Die App liest Spalten mit ihren Karten aus einer JSON-Datei `board.json` mit diesem Format:

```
{

  columns: [

    {

      name: "Ready",

      cards: [

        {

          title: "einkaufen gehen"

        }

      ]

    }

  ]

}
```

Die Spalten werden nebeneinander angezeigt mit ihren Titeln und darunter ein Unterstrich.

Darunter dann die Karten mit ihren Titeln.

(Fülle `board.json` mit Beispieldaten in den Spalten "Ready", "In Progress" und "Done".)

# Tech Stack
- Benutze Typescript mit node.
- Persistenz in einer JSON-Datei board.json
- User Interface mit WebUI. Benutze darin shadcn mit passenden Komponenten für Spalten, Überschriften und Karten.

---

## Was wurde gemacht

Folgende Dateien wurden unter `src/` erstellt:

- **board.json** – Beispieldaten mit 3 Spalten (Ready, In Progress, Done) und insgesamt 8 Karten.
- **processor.ts** – Typdefinitionen (`Board`, `Column`, `Card`) und `loadBoard()` zum Einlesen der JSON-Datei via `Deno.readTextFileSync`.
- **backendbindings.ts** – Bindet `getBoard` als WebUI-Funktion, die das Board als JSON-String zurückgibt.
- **backendproxy.js** – `BackendProxy`-Klasse im Frontend, ruft `webui.call('getBoard')` auf und parst die Antwort.
- **index.html** – Zeigt die Spalten nebeneinander (Flexbox), mit Titel, Trennlinie und Karten darunter. Styling im shadcn/ui-Stil (neutrales Farbschema, abgerundete Karten, dezente Schatten).
- **main.ts** – Einstiegspunkt: liest `index.html`, erstellt WebUI-Fenster, registriert Bindings, öffnet im Browser.

Starten mit: `deno run --allow-read --allow-net --unstable-webui src/main.ts`