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