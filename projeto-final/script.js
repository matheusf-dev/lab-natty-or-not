// A chave identifica exclusivamente o progresso desta aplicação.
const CHAVE = "devstart-progresso-v1";
const caixas = [...document.querySelectorAll('.tasks input[type="checkbox"]')];
const progresso = document.querySelector('#progress');
const resumo = document.querySelector('#summary');
const limpar = document.querySelector('#reset');
const aviso = document.querySelector('#storage-note');

function informarFalha() {
  aviso.hidden = false;
  aviso.textContent = 'Armazenamento indisponível. Seu progresso pode não ser salvo.';
}

// Calcula o progresso a partir dos controles, sem duplicar o estado.
function atualizar() {
  const feitas = caixas.filter(caixa => caixa.checked).length;
  const total = caixas.length;
  const porcentagem = total ? Math.round(feitas / total * 100) : 0;
  progresso.max = total || 1;
  progresso.value = feitas;
  resumo.textContent = `${feitas} de ${total} etapas · ${porcentagem}%`;
}

// Persiste os identificadores das etapas concluídas.
function salvar() {
  const ids = caixas.filter(caixa => caixa.checked).map(caixa => caixa.value);
  try {
    localStorage.setItem(CHAVE, JSON.stringify(ids));
    aviso.hidden = true;
  } catch {
    informarFalha();
  }
}

// Restaura somente valores válidos; falhas não impedem o uso do painel.
function restaurar() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE) ?? '[]');
    if (!Array.isArray(dados)) return;
    caixas.forEach(caixa => { caixa.checked = dados.includes(caixa.value); });
  } catch {
    informarFalha();
  }
}

caixas.forEach(caixa => {
  caixa.addEventListener('change', () => { atualizar(); salvar(); });
});
limpar.addEventListener('click', () => {
  caixas.forEach(caixa => { caixa.checked = false; });
  atualizar();
  salvar();
});
restaurar();
atualizar();
