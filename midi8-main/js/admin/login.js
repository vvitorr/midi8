document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');

    // Credenciais de exemplo (em produção, isso deve ser gerenciado pelo backend)
    const validCredentials = {
        username: 'admin',
        password: 'admin123'
    };

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simulação de verificação de credenciais
        if(username === validCredentials.username && password === validCredentials.password) {
            // Armazena o token de autenticação
            const authToken = btoa(username + ':' + password);
            localStorage.setItem('authToken', authToken);
            
            // Redireciona para o painel administrativo
            window.location.href = '/admin/dashboard.html';
        } else {
            showMessage('Usuário ou senha inválidos', 'error');
        }
    });

    function showMessage(message, type) {
        loginMessage.textContent = message;
        loginMessage.className = 'login-message ' + type;
        
        // Esconde a mensagem após 3 segundos
        setTimeout(() => {
            loginMessage.style.display = 'none';
        }, 3000);
    }

    // Verifica se já está autenticado
    const authToken = localStorage.getItem('authToken');
    if(authToken) {
        window.location.href = '/admin/dashboard.html';
    }
}); 