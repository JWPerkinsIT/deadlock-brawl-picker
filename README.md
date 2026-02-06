# Deadlock Brawl Picker

**Street Brawl Item Priority Companion** for [Deadlock](https://store.steampowered.com/app/1422450/Deadlock/) by Valve.

A web app that helps you make optimal item picks during Street Brawl rounds. Supports all 37 heroes with hero-specific synergy scoring.

## Features

- **Tier List** - Hero-specific item ratings across all categories and tiers
- **Pick Advisor** - Enter your 3 item groups, get scored recommendations with reroll guidance
- **Build Path Tracker** - Track your round-by-round picks with category balance analysis

## How It Works

Items are scored based on:
- Base brawl effectiveness rating
- Hero-specific synergy overrides (tag matching + manual tuning)
- Round context (tier weighting by round number)
- Build diversity (penalizes over-stacking one category)
- Legendary item priority (Street Brawl exclusive items always ranked high)

## Tech Stack

- React 19 + Vite
- Lucide React icons
- GitHub Pages deployment via Actions

## Development

```bash
npm install
npm run dev
```

## Build & Deploy

Pushes to `main` auto-deploy via GitHub Actions to GitHub Pages.

```bash
npm run build    # outputs to ./dist
npm run preview  # preview production build locally
```

## Data Sources

Item and hero data is embedded in the app, sourced from:
- [deadlock.wiki](https://deadlock.wiki)
- [deadlock-api.com](https://assets.deadlock-api.com)
- In-game observation and community resources

## License

MIT
