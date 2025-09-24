#!/bin/sh
# scripts/start-with-migrate.sh

echo "Aplicando migrations..."
# Roda migrations diretamente, Prisma vai usar DATABASE_URL
npx prisma migrate deploy

echo "Iniciando Next.js..."
# Next.js deve ser o processo principal
next start -p $PORT
