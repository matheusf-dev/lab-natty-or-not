// Estado e referências ao DOM.
let contador = 0;
const valor = document.querySelector('#valor');
function renderizar() { valor.textContent = contador; }
document.querySelector('#adicionar').addEventListener('click', () => { contador += 1; renderizar(); });
document.querySelector('#zerar').addEventListener('click', () => { contador = 0; renderizar(); });
