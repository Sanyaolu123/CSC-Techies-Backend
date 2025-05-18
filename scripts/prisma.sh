#!/bin/bash

set -e

# Set the production database URL
export DATABASE_URL=postgres://postgres:Yxu6e5FQWbAG4Nusi0fLgecj3HwO4YBa5TYxmfNP8IHx69yqeuZkk19geeCIHkeU@172.236.19.106:5432/takeandtrade

# Function to display usage
usage() {
  echo "Usage: $0 [--migrate] [--seed] [--reset]"
  echo "  --migrate: Run Prisma migrations only."
  echo "  --seed: Run Prisma seed only."
  echo "  --reset: Run Prisma migration reset (with --skip-seed)."
  echo "  If no flags are provided, both migrate and seed will run."
  exit 1
}

# Parse command-line arguments
MIGRATE=false
SEED=false
RESET=false

while [[ "$#" -gt 0 ]]; do
  case $1 in
    --migrate) MIGRATE=true ;;
    --seed) SEED=true ;;
    --reset) RESET=true ;;
    *) echo "Unknown parameter: $1"; usage ;;
  esac
  shift
done

# If no flags are provided, run both migrate and seed
if [[ "$MIGRATE" == false && "$SEED" == false && "$RESET" == false ]]; then
  MIGRATE=true
  SEED=true
fi

# Run reset if --reset flag is set
if [[ "$RESET" == true ]]; then
  echo "🔄 Resetting Prisma database..."
  echo "🔗 Using DATABASE_URL: $DATABASE_URL"
  npx prisma migrate reset --skip-seed
  echo "✅ Prisma database reset completed successfully!"
fi

# Run migrations if --migrate flag is set
if [[ "$MIGRATE" == true ]]; then
  echo "🚀 Starting Prisma production database migration..."
  echo "🔗 Using DATABASE_URL: $DATABASE_URL"
  npx prisma migrate deploy
  echo "✅ Prisma migrations applied successfully!"
fi

# Run seed if --seed flag is set
if [[ "$SEED" == true ]]; then
  echo "🌱 Seeding the production database..."
  npm run prisma:seed
  echo "✅ Database seeding completed successfully!"
fi