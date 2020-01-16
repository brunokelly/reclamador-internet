module.exports = function getMessage(
  { name, address, cpf },
  { desiredDownload, downloadInMegaBits, downloadInPercentage, share }
) {
  const nameMessage = name ? `<p>Nome: ${name}</p>` : "";
  const addressMessage = address ? `<p>Endereço: ${address}</p>` : "";
  const cpfMessage = cpf ? `<p>CPF: ${cpf}</p>` : "";
  return `
  <h4 style="color: #ff141075">Essa é uma mensagem automática!</h4>
  <p>Olá,</p>
  <p>Um teste automatizado constatou que a velocidade da minha internet está <strong>muito</strong> abaixo da contratada.</p>
  <p>Velocidade contratada: <strong>${desiredDownload}Mb/s</strong><br>
  Velocidade atingida: <strong>${downloadInMegaBits}Mb/s</strong> (${downloadInPercentage}% da velocidade contratada.)</p>
  <p>Informações do assinante: </p>
  ${nameMessage}
  ${addressMessage}
  ${cpfMessage}
  <p>Por favor, peço que resolvam o problema.</p>
  <img src="${share}"/>
  `;
};
