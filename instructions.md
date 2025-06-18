# 🌐 Instruções para Activar midi8.pt

## ✅ Passo 1: GitHub Pages (Já Configurado!)

O repositório já está preparado para GitHub Pages. Siga estes passos:

### No GitHub:
1. Vá a **Settings** > **Pages**
2. Em **Source** seleccione: **Deploy from a branch**
3. Em **Branch** seleccione: **main** / (root)
4. Clique **Save**

## ✅ Passo 2: Configurar DNS do Domínio midi8.pt

No painel de controlo do seu registo de domínio, adicione:

### Registos A (para domínio principal):
```
Tipo: A
Nome: @
Valor: 185.199.108.153

Tipo: A  
Nome: @
Valor: 185.199.109.153

Tipo: A
Nome: @  
Valor: 185.199.110.153

Tipo: A
Nome: @
Valor: 185.199.111.153
```

### Registo CNAME (para www):
```
Tipo: CNAME
Nome: www
Valor: midi8.pt
```

## ✅ Passo 3: Deploy Automático

Execute o script de deploy:
```bash
./deploy.sh
```

Ou manualmente:
```bash
git add .
git commit -m "Activar website midi8.pt"
git push origin main
```

## ⏱️ Tempo de Propagação

- **GitHub Pages**: 1-2 minutos
- **DNS**: 2-24 horas (normalmente 15-30 minutos)

## 🔍 Verificar Funcionamento

1. **GitHub Pages**: https://[username].github.io/midi8
2. **Domínio**: https://midi8.pt (após propagação DNS)

## 📞 Contactos no Website

- **Morada**: Avenida da República, 45 - 2º, 1050-187 Lisboa
- **Telefone**: +351 210 123 456  
- **Email**: geral@midi8.pt

## 🚨 Troubleshooting

### Se o domínio não funcionar:
1. Verificar DNS com: `nslookup midi8.pt`
2. Verificar CNAME no GitHub Pages
3. Aguardar propagação DNS (até 24h)

### Se GitHub Pages não activar:
1. Verificar repositório público
2. Verificar ficheiro CNAME
3. Verificar Settings > Pages

---

🎉 **O website midi8.pt está pronto para ir ao ar!** 