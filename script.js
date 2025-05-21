// Seleciona elementos
const form = document.getElementById('formEntrevista');
const lista = document.getElementById('listaEntrevistas');

// Cria e adiciona o card
function criarCard(nome, curso, status, nivel) {
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <h3>${nome}</h3>
    <p><strong>Curso:</strong> ${curso}</p>
    <p><strong>Status:</strong> ${status}</p>
    ${nivel ? `<p><strong>Nível Técnico:</strong> ${nivel}</p>` : ''}
    <button>Excluir</button>
  `;

  // Botão de exclusão
  card.querySelector('button').addEventListener('click', () => {
    card.remove();
  });

  lista.appendChild(card);
}

// Envia formulário
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

  criarCard(nome, curso, status, nivel);
  form.reset();
});
