#!/bin/sh
# scripts/start-with-migrate.sh

echo "Aguardando o banco estar pronto..."
# Aguarda PostgreSQL estar disponível
until pg_isready -h $(echo $DATABASE_URL | sed -E 's|.*@([^:]+):.*|\1/') -p $(echo $DATABASE_URL | sed -E 's|.*:([0-9]+)/.*|\1/') > /dev/null 2>&1; do
  echo "Banco ainda não está pronto, tentando novamente..."
  sleep 1
done

echo "Banco pronto, aplicando migrations..."
npx prisma migrate deploy

echo "Iniciando Next.js..."
next start -p $PORT
