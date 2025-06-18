# Instruções para Ativação do Domínio midi8.pt

## 1. Configuração do GitHub Pages

1. Acesse o repositório no GitHub
2. Vá para Settings > Pages
3. Em "Source", selecione "Deploy from a branch"
4. Em "Branch", selecione "gh-pages" e "/(root)"
5. Clique em "Save"

## 2. Configuração DNS

Configure os seguintes registros DNS no seu provedor de domínio:

### Registros A
```
Tipo: A
Nome: @
Valor: 185.199.108.153
TTL: 3600

Tipo: A
Nome: @
Valor: 185.199.109.153
TTL: 3600

Tipo: A
Nome: @
Valor: 185.199.110.153
TTL: 3600

Tipo: A
Nome: @
Valor: 185.199.111.153
TTL: 3600
```

### Registro CNAME
```
Tipo: CNAME
Nome: www
Valor: vvitorr.github.io
TTL: 3600
```

## 3. Verificação

1. Aguarde a propagação DNS (pode levar até 24 horas)
2. Verifique se o site está acessível em:
   - https://midi8.pt
   - https://www.midi8.pt

## 4. Troubleshooting

Se o site não estiver acessível após 24 horas:

1. Verifique se os registros DNS estão corretos
2. Confirme se o GitHub Pages está ativo
3. Verifique se o arquivo CNAME está presente no repositório
4. Teste a conexão usando:
   ```bash
   curl -I https://midi8.pt
   ```

## 5. Suporte

Para suporte adicional:
- Email: contato@midi8.pt
- GitHub Issues: [Criar Issue](https://github.com/vvitorr/midi8/issues)

---

🎉 **O website midi8.pt está pronto para ir ao ar!** 