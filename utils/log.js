module.exports = log = message => {
  const today = new Date();
  const date = `${today.getDate()}/${today.getMonth() +
    1}/${today.getFullYear()}`;
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  console.log(`${dateTime}: ${message}`);
};
