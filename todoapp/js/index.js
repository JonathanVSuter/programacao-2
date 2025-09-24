async function removerTodo (elemento){    
    var elementoRemover = document.querySelector("#"+elemento);
    elementoRemover.remove();    
    await removerBanco(elemento.substring(1,elemento.length));    
    console.log(elemento);
}

async function removerBanco(idElemento){
    await fetch('http://localhost:8080/delete.php?id='+idElemento, {
        method: 'DELETE'})
    .then((response) => {
        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response.text);
    })
    .then((data) => {
        console.log('Data fetched:', data);
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    });    
}

async function atualizarTodo(elemento){
    var elementoAtualizar = document.querySelector("#"+elemento);
    var descricao = elementoAtualizar.querySelector(".valor-descricao");
    console.log(descricao.value);
    await atualizarBanco(elemento.substring(1,elemento.length),descricao.value);
}

async function atualizarBanco(idElemento, descricao){
    await fetch('http://localhost:8080/update.php', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            "id":idElemento,
            "descricao":descricao
        })
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response.json());
    })
    .then((data) => {
        console.log('Data fetched:', data);
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    });  
}

async function salvarTodo(descricao){
    await fetch('http://localhost:8080/save.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({            
            "descricao":descricao
        })
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response);
    })
    .then((data) => {
        console.log('Data fetched:', data);
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    });
}

function validarFormulario(form){
    var camposInvalidos = [];
     for (let i = 0; i < form.target.elements.length; i++) {
        const element = form.target.elements[i];
        if (element.name && element.value) {
            if(element.value == null || element.value == undefined || element.value == null)
                camposInvalidos.push(element.name);
        }
    }
    return camposInvalidos;
}

async function listarTodos(){
    await fetch('http://localhost:8080/listar.php', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }        
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        response.json().then((res)=>{
            console.log(res);
            renderizarDados(res);
        })
    })
    .then((data) => {
        console.log('Data fetched:', data);
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    });
}
function renderizarDados(dados){
    var tabela = document.querySelector("#dados");
    dados.forEach(element => {
        let linha = document.createElement("tr");
        linha.id = "_"+element.idtodo;
        console.log(linha.id);
        let celulaDescricao = document.createElement("td");
        let celulaBotaoAtualizar = document.createElement("td");
        let celularBotaoRemover = document.createElement("td"); 
        let campoDescricao = document.createElement("input");
        campoDescricao.type = "text";
        campoDescricao.value = element.description;
        campoDescricao.classList.add("valor-descricao");
        celulaDescricao.appendChild(campoDescricao);

        let botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.addEventListener('click', removerBanco(element.idtodo)); 
        celularBotaoRemover.appendChild(botaoRemover);
        
        let botaoAtualizar = document.createElement("button");        
        botaoAtualizar.textContent = "Atualizar";
        botaoAtualizar.addEventListener('click', atualizarBanco(element.idtodo, campoDescricao.value))
        celulaBotaoAtualizar.appendChild(botaoAtualizar);
        
        linha.appendChild(celulaDescricao);
        linha.appendChild(celularBotaoRemover)
        linha.appendChild(celulaBotaoAtualizar);
        tabela.appendChild(linha);
    });    
}

const formElement = document.querySelector('#form-todo'); 
formElement.addEventListener('submit', async function(event) {
    // Prevent the default form submission
    event.preventDefault();
    const formData = new FormData(event.target); // event.target refers to the form
    var erros = validarFormulario(event);    
    if(erros.length > 0){
        alert(erros);
        //se o formulário não for válido, irá parar a operação por aqui e mostrar os 
        //campos pendentes de preenchimento
        return;
    } 
    console.log(formData.get("description"));

    //segue para enviar para o back-end
    await salvarTodo(formData.get("description"));
});

listarTodos();