const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

CheckLogged();

// Logar no sistema
document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = GetAccount(email);

    if(!account){
        alert("Ops! Verifique o usuario ou a senha.");
        return;
    }

    if(account){
        if(account.password !== password){
            alert("Ops! Verifique o usuario ou a senha.");
            return;
        }

        SaveSession(email, checkSession);

        window.location.href = "home.html";
    }
});

// Criar conta
document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;
    
    if(email.length < 5){
        alert("Preencha o campo com um email valido.");
        return;
    }

    if(password.length < 4){
        alert("Preencha a senha com no minimo 4 digitos.");
        return;    
    }

    SaveAccount({
        login: email,
        password: password,
        transactions: []
    });

    myModal.hide();

    alert("Conta criada com sucesso!");
});

function CheckLogged(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged){
        SaveSession(logged, session);

        window.location.href = "home.html";
    }
}

function SaveAccount(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}

function SaveSession(data, SaveSession){
    if(SaveSession){
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function GetAccount(key){
    const account = localStorage.getItem(key);

    if(account){
        return JSON.parse(account);
    }

    return "";
}