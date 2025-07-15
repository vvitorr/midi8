document.addEventListener('DOMContentLoaded', function() {
    // Verifica autenticação
    const authToken = localStorage.getItem('authToken');
    if(!authToken) {
        window.location.href = '/admin/login.html';
        return;
    }

    // Navegação
    const navLinks = document.querySelectorAll('.admin-nav a[data-section]');
    const contentSections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            contentSections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.getAttribute('data-section') + 'Section';
            document.getElementById(sectionId).classList.add('active');
        });
    });

    // Logout
    document.getElementById('logoutButton').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('authToken');
        window.location.href = '/admin/login.html';
    });

    // Save buttons
    const saveButtons = document.querySelectorAll('.editor-button.save');
    
    saveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = this.closest('.content-section');
            const sectionId = section.id;
            
            // Coleta os dados do formulário
            const formData = {};
            const inputs = section.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                formData[input.id] = input.value;
            });
            
            // Simula o envio para o servidor
            console.log('Salvando dados:', formData);
            
            // Mostra mensagem de sucesso
            showMessage('Alterações salvas com sucesso!', 'success');
        });
    });

    // Upload de imagens
    const imageInputs = document.querySelectorAll('input[type="file"]');
    
    imageInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if(file) {
                // Simula o upload da imagem
                console.log('Uploading image:', file.name);
                
                // Mostra preview da imagem
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = document.createElement('img');
                    preview.src = e.target.result;
                    preview.style.maxWidth = '200px';
                    preview.style.marginTop = '10px';
                    
                    const container = input.parentElement;
                    const existingPreview = container.querySelector('img');
                    if(existingPreview) {
                        container.removeChild(existingPreview);
                    }
                    container.appendChild(preview);
                };
                reader.readAsDataURL(file);
            }
        });
    });

    // Função para mostrar mensagens
    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        
        document.body.appendChild(messageDiv);
        
        // Remove a mensagem após 3 segundos
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    // Carrega dados iniciais
    loadInitialData();
});

// Função para carregar dados iniciais
function loadInitialData() {
    // Simula carregamento de dados do servidor
    const mockData = {
        homeTitle: 'MIDI8 - Soluções Digitais Inovadoras',
        homeDescription: 'Transformando ideias em realidade digital.',
        webTitle: 'Desenvolvimento Web',
        webDescription: 'Criamos sites e aplicações web modernas, responsivas e otimizadas para SEO.',
        contactEmail: 'contato@midi8.pt',
        contactPhone: '+351 123 456 789',
        contactAddress: 'Rua da Inovação, 123'
    };

    // Preenche os campos com os dados
    Object.keys(mockData).forEach(key => {
        const element = document.getElementById(key);
        if(element) {
            element.value = mockData[key];
        }
    });
} 