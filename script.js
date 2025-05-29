const form = document.getElementById('formEntrevista');
const lista = document.getElementById('listaEntrevistas');

let entrevistas = JSON.parse(localStorage.getItem('entrevistas')) || [];
let editIndex = null; // Para rastrear se está editando

// Função para criar card na tela
function criarCard(entrevista, index) {
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <h3>${entrevista.nome}</h3>
    <p><strong>Curso:</strong> ${entrevista.curso}</p>
    <p><strong>Status:</strong> ${entrevista.status}</p>
    <p><strong>Nível Técnico:</strong> ${entrevista.nivel || 'Não informado'}</p>
    <button class="btn-excluir">Excluir</button>
    <button class="btn-editar" style="margin-left: 0.5rem; background-color: #f39c12;">Editar</button>
  `;

  // Botão de excluir
  card.querySelector('.btn-excluir').addEventListener('click', () => {
    entrevistas.splice(index, 1);
    salvarEAtualizar();
  });

  // Botão de editar
  card.querySelector('.btn-editar').addEventListener('click', () => {
    const entrevistaEdit = entrevistas[index];
    document.getElementById('nome').value = entrevistaEdit.nome;
    document.getElementById('curso').value = entrevistaEdit.curso;
    document.getElementById('status').value = entrevistaEdit.status;
    document.getElementById('nivel').value = entrevistaEdit.nivel;

    editIndex = index;
    form.querySelector('button[type="submit"]').textContent = 'Salvar Alterações';
  });

  lista.appendChild(card);
}

// Salvar no localStorage e atualizar a lista
function salvarEAtualizar() {
  localStorage.setItem('entrevistas', JSON.stringify(entrevistas));
  mostrarEntrevistas();
}

// Mostrar todas as entrevistas
function mostrarEntrevistas() {
  lista.innerHTML = '';
  entrevistas.forEach((entrevista, index) => {
    criarCard(entrevista, index);
  });
}

// Evento de envio do formulário
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

  const novaEntrevista = { nome, curso, status, nivel };

  if (editIndex !== null) {
    entrevistas[editIndex] = novaEntrevista;
    editIndex = null;
    form.querySelector('button[type="submit"]').textContent = 'Adicionar Entrevista';
  } else {
    entrevistas.push(novaEntrevista);
  }

  salvarEAtualizar();
  form.reset();
});

// Inicializa
mostrarEntrevistas();