# termo-api

This repository aims to create a backend for Wordle game applying SOLID. All the scripts work in different environments (Windows, Linux, MacOS).

## Rules
- There is a word in PT-BR to be guessed
- Each player has 6 chances to guess
- Players are identified by UUIDs

## Scripts
```
# Build
yarn build

# Start in prod
yarn start 

# Start in dev
yarn start-dev

# Run tests
yarn test

# Run migrations in dev
yarn migrate

# Run migrations in test (before yarn test)
yarn migrate:test
```
