const botaoAdicionar = document.querySelector(".button-container");
const listaDeTarefas = document.querySelector(".lista-de-tarefas");

let minhaListaDeItens = [];

botaoAdicionar.addEventListener("click", () => {
  mensagemInput = document.querySelector(".input-container");
  minhaListaDeItens.push({
    tarefa: mensagemInput.value,
    concluida: false,
  }); //Empurra o valor de input para lista.
  mensagemInput.value = ""; // Deixa o input vazio depois de clicar ao adicionar uma tarefa.

  mostrarTarefas(); //Executa a função que cria a novali para cada item no minhaListaDeItens e a class do ul pegga o inner html dessa novali que tem as tarefas e vai adicionando.
});

function mostrarTarefas() {
  let novali = "";

  minhaListaDeItens.forEach((item, posicao) => {
    //Para cada item que esta na lista
    novali =
      novali +
      ` 
            <li class="tarefas ${item.concluida && "done"}">
                <img src="./img/checked.png" alt="Icone de checado" onclick="concluirTarefa(${posicao})">
                <p>${item.tarefa}</p>
                <img src="./img/trash.png" alt="Icone de lixo" onclick="deletarItem(${posicao})">
            </li>
            `;
  });

  listaDeTarefas.innerHTML = novali;

  localStorage.setItem("lista", JSON.stringify(minhaListaDeItens));
}

function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1);

  mostrarTarefas();
}

function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;

  mostrarTarefas();
}

function recarregarTarefas() {
  const tarefasDoLocalStorage = localStorage.getItem("lista");

  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
    mostrarTarefas();
  }
}

recarregarTarefas();
