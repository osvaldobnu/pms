#!/bin/sh
echo "Rodando migrations..."
npx prisma migrate deploy

echo "Iniciando Next.js..."
next start -p $PORT
