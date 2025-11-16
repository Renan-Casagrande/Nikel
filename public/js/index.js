const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

// 1. Verificar se exixte um usuario ja logado
// 2. Se existir um ususario logado, direcionar para a pagina de home
// 3. Caso contrato, manter o usuario na pagina login
CheckLogged();

// Logar no sistema
document.getElementById("login-form").addEventListener("submit", function(e){
    // 1. Impede que a pagina recarregue ao enviar o formulario
    e.preventDefault();

    // 2. Coleta os dados informados pelo usuario
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;

    // 3. Verifica se o usuario marcou a opção "manter-me conectado"
    const checkSession = document.getElementById("session-check").checked;

    // 4. Busca a conta cadastrada no localStorage com base no e-mail informado
    const account = GetAccount(email);

    // 5. Se nao encontrar a conta, exibe mensagem de erro
    if(!account){
        alert("Ops! Verifique o usuario ou a senha.");
        return;
    }

    // 6. Se encontrou a conta, validamos a senha informada
    if(account){
        // 6.1 Verifica se a senha digitada é diferente da senha cadastrada
        if(account.password !== password){
            alert("Ops! Verifique o usuario ou a senha.");
            return;
        }

        // 7. Salva a sessão (login temporario ou permanente dependendo do checkbox)
        SaveSession(email, checkSession);

        // 8. Redireciona o usuario logado para a pagina inicial
        window.location.href = "home.html";
    }
});

// Funçao responsavel por salvar os dados da conta no localStorage
function SaveAccount(data){
    // 1. Converte o objeto da conta para JSON e salva usando o e-mail como chave
    localStorage.setItem(data.login, JSON.stringify(data));
}

// Criar conta
document.getElementById("create-form").addEventListener("submit", function(e){
    // 1. Remove o recarregamento da pagina ao submeter um formulario
    e.preventDefault();

    // 2. Capturar os dados informados pelo usuario no formulario
    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;
    
    // 3. Verificar se o que foi digitado atende os criterios minimos
    if(email.length < 10){
        alert("Preencha o campo com um email valido.");
        return;
    }

    if(password.length < 4){
        alert("Preencha a senha com no minimo 4 digitos.");
        return;    
    }

    // 4. Verificar se o email ja foi cadastrado
    const usuarioExistente = localStorage.getItem(email);

    if(usuarioExistente){
        alert("E-mail ja cadastrado!");
        return;
    }

    // 5. Armazena os dados da conta no localStorage
    SaveAccount({
        login: email,
        password: password,
        transactions: []
    });

    // 6. Limpar os camps do formulario
    e.target.reset();

    // 7. Fechar o modal
    myModal.hide();

    // 8. Dar um feedback para o usuario
    alert("Conta criada com sucesso!");
});

// Buscar no localStorage os dados da conta usando o e-mail como chave
function GetAccount(key){    
    const account = localStorage.getItem(key);

    // 1. Se encontrar a conta, transformar o JSON em objeto e retornar
    if(account){
        return JSON.parse(account);
    }

    // 2. Se não existir conta com essa chave, retornar string vazia
    return "";
}

// Se existir uma sessão salva no localStorage (login persistente),
function CheckLogged(){    
    // copiar para o sessionStorage para manter o usuário logado
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    // 1. Se houver um usuário logado (em qualquer tipo de sessao),
    //    salvar sessao novamente (para atualizar caso esteja marcado "manter conectado")
    //    e redirecionar para a home
    if(logged){
        SaveSession(logged, session);

        // 2. Redirecionar usuario logado para a pagina inicial
        window.location.href = "home.html";
    }
}

// Se o usuario marcou "manter conectado", salvar login no localStorage
function SaveSession(data, SaveSession){    
    if(SaveSession){
        localStorage.setItem("session", data);
    }

    // 1. Registrar o usuario logado na sessão atual (ate fechar o navegador)
    sessionStorage.setItem("logged", data);
}