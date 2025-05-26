const form = document.getElementById('formEntrevista');
const lista = document.getElementById('listaEntrevistas');

// Função para criar o card de entrevista no HTML
function criarCard(id, nome, curso, status, nivel) {
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <h3>${nome}</h3>
    <p><strong>Curso:</strong> ${curso}</p>
    <p><strong>Status:</strong> ${status}</p>
    ${nivel ? `<p><strong>Nível Técnico:</strong> ${nivel}</p>` : ''}
    <button data-id="${id}">Excluir</button>
  `;

  // Evento para excluir entrevista via API
  card.querySelector('button').addEventListener('click', () => {
    const entrevistaId = card.querySelector('button').getAttribute('data-id');

    fetch(`/api/entrevistas/${entrevistaId}`, {
      method: 'DELETE'
    })
    .then(res => {
      if (res.ok) {
        card.remove();
      } else {
        alert('Erro ao excluir entrevista.');
      }
    })
    .catch(() => alert('Erro ao excluir entrevista.'));
  });

  lista.appendChild(card);
}

// Função para carregar entrevistas da API
function carregarEntrevistas() {
  fetch('/api/entrevistas')
    .then(res => res.json())
    .then(data => {
      lista.innerHTML = ''; // limpa a lista
      data.forEach(item => {
        criarCard(item.id, item.nome, item.curso, item.status, item.nivel_tecnico || '');
      });
    })
    .catch(() => {
      lista.innerHTML = '<p>Erro ao carregar entrevistas.</p>';
    });
}

// Envio do formulário via API
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

  // Envia os dados para a API
  fetch('/api/entrevistas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, curso, status, nivel_tecnico: nivel })
  })
  .then(res => res.json())
  .then(data => {
    // Após salvar, adiciona o card na lista
    criarCard(data.id, data.nome, data.curso, data.status, data.nivel_tecnico || '');
    form.reset();
  })
  .catch(() => alert('Erro ao adicionar entrevista.'));
});

// Carrega entrevistas ao abrir a página
window.addEventListener('load', carregarEntrevistas);
