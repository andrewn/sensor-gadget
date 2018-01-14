# Sensor Gadget

This project sets up a Raspberry Pi Zero as a USB gadget device.

The Pi Zero has sensors etc connected to it's GPIO pins. When the Pi Zero is plugged into a "host" computer (another Raspberry Pi, or a laptop) via a USB cable then it appears as a Ethernet device and also as a serial port e.g. `/dev/cu.usbmodem1413`. The host computer can then listen on this serial port to receive messages from the RFID reader.

Currently, the MFRC522 RFID reader is supported, connected to the SPI interface.

## Installation

### Pre-setup

* Flash Raspbian onto an SD card (tested with Lite but Desktop should also work)
* On the computer you used to flash the SD, open up the boot partition and add to the bottom of the `config.txt` file `dtoverlay=dwc2` on a new line, then save the file.
* Open up the `cmdline.txt`. Be careful with this file, it is very picky with its formatting! Each parameter is seperated by a single space (it does not use newlines). Insert `modules-load=dwc2,g_ether` after `rootwait`
* Create a new file simply called `ssh` in the SD card boot
* Eject the SD card
* Put it into the Pi Zero and power it up via a USB cable in the 'USB' slot
* You will now be able to SSH into the Pi

### Setup

* On the Pi, copy `gadget/deployment/provision`
* Run `sudo ./provision`
* The Pi Zero will be configured as a USB gadget with serial interface

## RFID reader

_insert diagram of wiring_

## Usage

On boot, the RFID reader process will be started. On the `host` machine at the other end of the USB cable, you can listen on the serial port for JSON messages.

A small nodejs script is provided as an example:

    `./host/bin/sensor-gadget-host /dev/cu.usbmodem1413`

Where `/dev/cu.usbmodem1413` is the device that will have appeared representing the serial interface of the Pi Zero.
