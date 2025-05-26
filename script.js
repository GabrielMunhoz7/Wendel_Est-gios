const form = document.getElementById('formEntrevista');
const lista = document.getElementById('listaEntrevistas');

let entrevistas = JSON.parse(localStorage.getItem('entrevistas')) || [];

// Função para criar card na tela
function criarCard(entrevista, index) {
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <h3>${entrevista.nome}</h3>
    <p><strong>Curso:</strong> ${entrevista.curso}</p>
    <p><strong>Status:</strong> ${entrevista.status}</p>
    <p><strong>Nível Técnico:</strong> ${entrevista.nivel || 'Não informado'}</p>
    <button>Excluir</button>
  `;

  // Excluir entrevista
  card.querySelector('button').addEventListener('click', () => {
    entrevistas.splice(index, 1);
    salvarEAtualizar();
  });

  lista.appendChild(card);
}

// Salva no localStorage e atualiza a lista
function salvarEAtualizar() {
  localStorage.setItem('entrevistas', JSON.stringify(entrevistas));
  mostrarEntrevistas();
}

// Mostra todas as entrevistas na tela
function mostrarEntrevistas() {
  lista.innerHTML = '';
  entrevistas.forEach((entrevista, index) => {
    criarCard(entrevista, index);
  });
}

// Evento do formulário
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const curso = document.getElementById('curso').value.trim();
  const status = document.getElementById('status').value;
  const nivel = document.getElementById('nivel').value.trim();

  if (!nome || !curso || !status) {
    alert('Por favor, preencha os campos obrigatórios.');
    return;
  }

  entrevistas.push({ nome, curso, status, nivel });
  salvarEAtualizar();
  form.reset();
});

// Carregar entrevistas ao abrir página
mostrarEntrevistas();
