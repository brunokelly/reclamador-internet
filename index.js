const nodemailer = require("nodemailer");

const util = require("util");
const exec = util.promisify(require("child_process").exec);

const getMessage = require("./htmlMessage");
const log = require("./utils/log");

async function startTest() {
  log("Realizando teste da internet...");
  const { stdout, stderr } = await exec("speedtest --json --share");
  if (stderr) {
    log("Ocorreu um erro inesperado: \n" + stderr);
    return;
  }
  return JSON.parse(stdout);
}

const sendEmail = ({
  htmlMessage,
  subject = "Velocidade abaixo da contratada"
}) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "1bba2b705a1b8c",
      pass: "4e90767f264ed3"
    }
  });

  const mailOptions = {
    from: "wesleycct@gmail.com",
    to: "wesleycct@gmail.com", //"suporte.rjo@viaband.net.br",
    subject: subject,
    html: htmlMessage
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      log(err);
    } else {
      log("E-mail enviado com sucesso: \n" + info.response);
    }
  });
};

async function doAction({
  desiredSpeed = 40,
  forceSend = false,
  percentageToSend = 50
}) {
  log("Iniciando Teste!");
  const { download, share } = await startTest();

  const personalInfo = require("./personalInfo.json");

  const downloadInMegaBits = Number(
    (Number(download) / 1000000).toPrecision(4)
  );

  const downloadInPercentage = Math.round(
    (downloadInMegaBits * 100) / desiredSpeed
  );

  log(`Velocidade atingida: ${downloadInMegaBits}Mb/s`);
  log(
    `Velocidade contratada: ${desiredSpeed}Mb/s (${downloadInPercentage}% da velocidade contratada)`
  );

  if (forceSend === false && downloadInPercentage > percentageToSend) {
    log("Velocidade atingida não está tão baixa.");
    log("Deixando de enviar e-mail...");
    console.log("===================================================");
    return;
  }

  log("Enviando e-mail...");

  const htmlMessage = getMessage(personalInfo, {
    desiredDownload: desiredSpeed,
    downloadInMegaBits,
    downloadInPercentage,
    share
  });

  const subject = `Velocidade abaixo da contratada(${downloadInMegaBits}Mb/s de ${desiredSpeed}Mb/s) `;

  sendEmail({ htmlMessage, subject });
  console.log("===================================================");
}

function startApp(delayInSeconds, actionArgs) {
  const delayInMs = delayInSeconds * 1000;
  doAction(actionArgs);
  setInterval(() => doAction(actionArgs), delayInMs);
}

startApp(3600, { desiredSpeed: 40 });
