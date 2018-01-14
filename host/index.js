const SerialPort = require('serialport');

const init = ({ handler, serialPath }) => {
  if (serialPath == null || serialPath == '') {
    throw new Error('serialPath not provided');
  }

  const serial = new SerialPort(serialPath, {
    baudRate: 115200
  });

  serial.on('data', data => {
    // console.log('>', JSON.parse(data));
    // return;
    try {
      handler(null, JSON.parse(data));
    } catch (err) {
      handler(err, null);
    }
  });

  serial.on('error', err => {
    handler(err, null);
  });
};

module.exports = init;
