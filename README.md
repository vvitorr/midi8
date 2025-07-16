# MIDI8 Website

Site institucional da MIDI8, empresa de soluções digitais inovadoras.
Institutional website for MIDI8, a company for innovative digital solutions.

---

## 🇵🇹 Características Principais
- Design moderno e responsivo
- Animações suaves e interativas
- Formulário de contacto funcional
- Filtro de portfólio
- Slider de depoimentos
- Menu mobile
- Scroll suave
- Botão de voltar ao topo
- Animação de loading
- SEO otimizado
- Área administrativa (login e dashboard)

## 🇬🇧 Main Features
- Modern, responsive design
- Smooth, interactive animations
- Functional contact form
- Portfolio filter
- Testimonials slider
- Mobile menu
- Smooth scroll
- Back-to-top button
- Loading animation
- SEO optimized
- Admin area (login & dashboard)

---

## 🇵🇹 Estrutura do Projeto / 🇬🇧 Project Structure

```
midi8Trabalho/
├── index.html
├── admin/
│   ├── login.html
│   └── dashboard.html
├── js/
│   ├── main.js
│   ├── about.js
│   ├── contacto.js
│   ├── depoimentos.js
│   ├── portfolio.js
│   ├── services.js
│   └── admin/
│       ├── login.js
│       ├── dashboard.js
│       └── animations.js
├── styles/
│   ├── main.css
│   ├── header.css
│   ├── footer.css
│   ├── hero.css
│   ├── menu-mobile.css
│   ├── responsive.css
│   ├── sobre.css
│   ├── servicos.css
│   ├── depoimentos.css
│   ├── portfolio.css
│   ├── contacto.css
│   └── admin.css
├── Images/
│   └── logo.png
├── pages/
│   ├── sobre/
│   │   └── index.html
│   └── servicos/
│       └── index.html
├── deploy.sh
├── instructions.md
├── LICENSE
├── CNAME
└── README.md
```

---

## 🇵🇹 Instalação e Uso Local
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/midi8Trabalho.git
   ```
2. Entre na pasta do projeto:
   ```bash
   cd midi8Trabalho
   ```
3. Abra o ficheiro `index.html` no seu navegador ou utilize um servidor local (ex: Live Server no VS Code).

## 🇬🇧 Installation & Local Usage
1. Clone the repository:
   ```bash
   git clone https://github.com/your-user/midi8Trabalho.git
   ```
2. Enter the project folder:
   ```bash
   cd midi8Trabalho
   ```
3. Open `index.html` in your browser or use a local server (e.g., VS Code Live Server).

---

## 🇵🇹 Personalização / 🇬🇧 Customization

### 🇵🇹 Cores / 🇬🇧 Colors
As principais cores e estilos globais são definidos em variáveis CSS no ficheiro `styles/main.css`:

The main colors and global styles are defined as CSS variables in `styles/main.css`:

```css
:root {
    --primary-blue-dark: #00296B;
    --primary-blue: #003F88;
    --primary-blue-light: #00509D;
    --accent-yellow: #FDC500;
    --accent-yellow-light: #FFD500;
    --text-primary: #00296B;
    --text-secondary: #003F88;
    --text-light: #00509D;
    --text-white: #fff;
    --bg-primary: #FAF9F6;
    --bg-secondary: #003F88;
    --bg-light: #00509D;
    --gradient-primary: linear-gradient(135deg, #00296B 0%, #003F88 50%, #00509D 100%);
    --gradient-secondary: linear-gradient(135deg, #FDC500 0%, #FFD500 100%);
    /* ... outras variáveis para sombras, fontes, etc ... */
}
```

- 🇵🇹 Para alterar as cores do site, edite os valores destas variáveis em `styles/main.css`.
- 🇬🇧 To change the site colors, edit these variable values in `styles/main.css`.

### 🇵🇹 Conteúdo / 🇬🇧 Content
O conteúdo pode ser editado nos ficheiros HTML em `index.html`, `pages/sobre/index.html`, `pages/servicos/index.html` e na área admin.
Content can be edited in the HTML files: `index.html`, `pages/sobre/index.html`, `pages/servicos/index.html` and in the admin area.

### 🇵🇹 Imagens / 🇬🇧 Images
Substitua as imagens em `Images/` mantendo os nomes, ou atualize os caminhos nos HTML.
Replace images in `Images/` keeping the same names, or update the paths in HTML.

---

## 🇵🇹 Área Administrativa / 🇬🇧 Admin Area
- `admin/login.html` e `admin/dashboard.html` para gestão interna.
- Scripts dedicados em `js/admin/`.
- Acesso restrito por login.

---

## 🇵🇹 Deploy (GitHub Pages & Domínio)
1. Faça push das alterações para o repositório.
2. O GitHub Pages faz o deploy automático.
3. Para domínio personalizado, configure os DNS conforme `instructions.md`:
   - Registos A: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - CNAME: www → vvitorr.github.io
4. Aguarde propagação DNS (até 24h).

## 🇬🇧 Deployment (GitHub Pages & Domain)
1. Push your changes to the repository.
2. GitHub Pages will deploy automatically.
3. For a custom domain, set DNS as in `instructions.md`:
   - A records: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - CNAME: www → vvitorr.github.io
4. Wait for DNS propagation (up to 24h).

---

## 🇵🇹 Licença / 🇬🇧 License
MIT License. Veja o ficheiro `LICENSE` para detalhes.
MIT License. See `LICENSE` file for details.

---

## 🇵🇹 Contacto / 🇬🇧 Contact
MIDI8 - contacto@midi8.pt

Website: [https://midi8.pt](https://midi8.pt)