# Cooking Game Repository Structure

## Overview
This repository follows a modular, component-based architecture optimized for a React-based endless cooking game with Redux state management.

## Directory Structure

```
cooking-game/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── assets/
│       ├── images/
│       │   ├── characters/
│       │   ├── ingredients/
│       │   ├── ui/
│       │   └── backgrounds/
│       ├── sounds/
│       │   ├── effects/
│       │   └── music/
│       └── fonts/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.js
│   │   │   ├── Modal.js
│   │   │   └── Animation.js
│   │   ├── game/
│   │   │   ├── Kitchen.js
│   │   │   ├── Customer.js
│   │   │   ├── OrderDisplay.js
│   │   │   ├── Timer.js
│   │   │   ├── ScoreBoard.js
│   │   │   └── IngredientSelector.js
│   │   ├── ui/
│   │   │   ├── GameUI.js
│   │   │   ├── Menu.js
│   │   │   └── Settings.js
│   │   └── index.js
│   ├── redux/
│   │   ├── actions/
│   │   │   ├── gameActions.js
│   │   │   ├── customerActions.js
│   │   │   └── scoreActions.js
│   │   ├── reducers/
│   │   │   ├── gameReducer.js
│   │   │   ├── customerReducer.js
│   │   │   └── scoreReducer.js
│   │   ├── store.js
│   │   └── types.js
│   ├── utils/
│   │   ├── gameLogic.js
│   │   ├── scoring.js
│   │   ├── difficultyScaling.js
│   │   └── performance.js
│   ├── hooks/
│   │   ├── useGameState.js
│   │   ├── useCustomerQueue.js
│   │   └── useTimer.js
│   ├── styles/
│   │   ├── global.css
│   │   ├── components.css
│   │   └── animations.css
│   ├── App.js
│   ├── index.js
│   └── serviceWorker.js
├── docs/
│   ├── TECHNICAL_ARCHITECTURE.md
│   ├── GAME_DESIGN_SPEC.md
│   ├── REPOSITORY_STRUCTURE.md
│   └── PERFORMANCE_OPTIMIZATION.md
├── tests/
│   ├── components/
│   ├── redux/
│   └── utils/
├── .gitignore
├── package.json
├── README.md
└── webpack.config.js (or similar build config)
```

## Key Directories Explanation

- **public/**: Static assets and HTML entry point
- **src/components/**: Reusable React components organized by feature
- **src/redux/**: State management with actions, reducers, and store
- **src/utils/**: Utility functions for game logic and calculations
- **src/hooks/**: Custom React hooks for stateful logic
- **src/styles/**: CSS files for styling and animations
- **docs/**: Documentation files for architecture and design
- **tests/**: Unit and integration tests

## File Naming Conventions
- Components: PascalCase (e.g., CustomerOrder.js)
- Utilities: camelCase (e.g., calculateScore.js)
- Actions/Reducers: camelCase with descriptive names
- CSS: kebab-case for classes, camelCase for files

## Scalability Considerations
- Modular structure allows easy addition of new features
- Separation of concerns between UI, logic, and state
- Lazy loading support for components and assets
- Testable architecture with isolated units