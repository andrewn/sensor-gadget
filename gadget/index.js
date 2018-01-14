const notify = require('./lib/notify');
const rfid = require('./lib/rfid');
const serial = require('./lib/serial');

const serialPath = process.argv[2] || process.env.SERIAL_PATH;

if (!serialPath) {
  console.error('Please specify a serial path');
  process.exit(1);
}

const send = serial({ serialPath }).send;
const { error, presented, removed } = notify(send);

// Start polling for cards
rfid({ error, presented, removed });
