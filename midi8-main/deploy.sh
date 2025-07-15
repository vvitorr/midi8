#!/bin/bash

# Cores para output / Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Iniciando deploy do site MIDI8...${NC}\n"

# Verificar se há mudanças não commitadas / Check for uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo -e "${YELLOW}Há mudanças não commitadas. Deseja continuar? (s/n)${NC}"
    read -r response
    if [[ ! "$response" =~ ^[Ss]$ ]]; then
        echo -e "${RED}Deploy cancelado.${NC}"
        exit 1
    fi
fi

# Atualizar repositório / Update repository
echo -e "\n${YELLOW}Atualizando repositório...${NC}"
git pull origin main

# Verificar se há conflitos / Check for conflicts
if [[ $? -ne 0 ]]; then
    echo -e "${RED}Erro ao atualizar repositório. Resolva os conflitos antes de continuar.${NC}"
    exit 1
fi

# Fazer commit das mudanças / Commit changes
echo -e "\n${YELLOW}Fazendo commit das mudanças...${NC}"
git add .
git commit -m "Deploy automático: $(date '+%Y-%m-%d %H:%M:%S')"

# Fazer push para o GitHub / Push to GitHub
echo -e "\n${YELLOW}Enviando alterações para o GitHub...${NC}"
git push origin main

# Verificar se o push foi bem sucedido / Check if push was successful
if [[ $? -eq 0 ]]; then
    echo -e "\n${GREEN}Deploy concluído com sucesso!${NC}"
    echo -e "${YELLOW}O site estará disponível em alguns minutos em:${NC}"
    echo -e "https://midi8.pt"
    echo -e "https://www.midi8.pt"
else
    echo -e "\n${RED}Erro ao fazer push para o GitHub.${NC}"
    exit 1
fi

# Verificar status do site / Check site status
echo -e "\n${YELLOW}Verificando status do site...${NC}"
sleep 30
if curl -s -f "https://midi8.pt" > /dev/null; then
    echo -e "${GREEN}Site está online!${NC}"
else
    echo -e "${YELLOW}Site ainda não está acessível. Pode levar alguns minutos para propagar as alterações.${NC}"
fi 