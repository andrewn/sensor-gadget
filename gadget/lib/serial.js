const SerialPort = require('serialport');

const sendMessage = serial => (topic, payload) => {
  serial.write(
    JSON.stringify({
      topic,
      payload
    })
  );
};

const connect = ({ serialPath }) => {
  const serial = new SerialPort(serialPath, {
    baudRate: 115200
  });

  serial.on('error', err => {
    console.error('Serial error: ', err.message);
  });

  return {
    send: sendMessage(serial)
  };
};

module.exports = connect;
