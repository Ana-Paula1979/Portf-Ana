// Função genérica de validação
function validarCampo(campo, regra) {
    const valor = campo.value.trim();
    const erroElemento = document.getElementById(`${campo.id}Erro`);
  
    if (regra.required && valor === '') {
      erroElemento.textContent = 'Campo obrigatório.';
      return false;
    }
  
    if (regra.maxLength && valor.length > regra.maxLength) {
      erroElemento.textContent = `Máximo de ${regra.maxLength} caracteres.`;
      return false;
    }
  
    if (regra.emailRegex && !regra.emailRegex.test(valor)) {
      erroElemento.textContent = 'Email inválido.';
      return false;
    }
  
    erroElemento.textContent = '';
    return true;
  }
  
  // Função para habilitar/desabilitar o botão de envio
  function habilitarBotaoEnvio() {
    const nomeValido = validarCampo(document.getElementById('nome'), { required: true, maxLength: 50 });
    const emailValido = validarCampo(document.getElementById('email'), { required: true, emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ });
    const assuntoValido = validarCampo(document.getElementById('assunto'), { required: true, maxLength: 50 });
    const mensagemValida = validarCampo(document.getElementById('mensagem'), { required: true, maxLength: 300 });
  
    const enviarBtn = document.getElementById('enviarBtn');
    enviarBtn.disabled = !(nomeValido && emailValido && assuntoValido && mensagemValida);
  }
  
  // Eventos de foco e desfoco para adicionar/remover a classe 'label-active'
  document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('focus', () => {
      document.getElementById(`label${input.id.charAt(0).toUpperCase() + input.id.slice(1)}`).classList.add('label-active');
    });
  
    input.addEventListener('blur', () => {
      document.getElementById(`label${input.id.charAt(0).toUpperCase() + input.id.slice(1)}`).classList.remove('label-active');
    });
  });
  
  // Evento de clique no botão de envio
  document.getElementById('enviarBtn').addEventListener('click', () => {
    if (habilitarBotaoEnvio()) {
      document.getElementById('mensagemEnviada').style.display = 'block';
  
      // Limpar os campos do formulário
      document.querySelectorAll('.form-control').forEach(input => {
        input.value = '';
      });
    } else {
      document.getElementById('mensagemEnviada').style.display = 'none';
    }
  });
  
  // Inicialização do código após o carregamento da página
  document.addEventListener('DOMContentLoaded', () => {
    habilitarBotaoEnvio();
  });