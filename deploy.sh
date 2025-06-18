#!/bin/bash

echo "🚀 Iniciando deploy do website midi8.pt..."

# Verificar se estamos no directório correcto
if [ ! -f "index.html" ]; then
    echo "❌ Erro: Ficheiro index.html não encontrado!"
    exit 1
fi

# Adicionar todos os ficheiros ao Git
echo "📁 Adicionando ficheiros..."
git add .

# Commit das alterações
echo "💾 Fazendo commit..."
git commit -m "Deploy website midi8.pt - $(date '+%Y-%m-%d %H:%M:%S')"

# Push para o repositório
echo "🌐 Enviando para GitHub..."
git push origin main

echo "✅ Deploy concluído!"
echo "🌍 O website estará disponível em: https://midi8.pt"
echo "⏱️  Aguarde 1-2 minutos para propagação..."

# Abrir o website no browser
sleep 2
echo "🔗 Abrindo website..."
open https://midi8.pt 