```yaml
id: 1
date: 18-05-2025
```

I decided to remember a bit how to handle a soldering iron and combine it with the knowledge I gained working as a fullstack. I want to build an internet-controlled machine with [Ackerman](https://en.wikipedia.org/wiki/Ackermann_steering_geometry) steering. The second step is to dive deeper into [ros2](https://github.com/ros2/ros2) and autonomous navigation.

---

```yaml
id: 2
date: 18-05-2025
media:
  - media/1-1.jpg
```

Ordered some basic components and tools for assembly from aliexpress and amazon.

---

```yaml
id: 3
date: 18-05-2025
```

I planned to start the steering servo today and try to turn it through the rpi but Amazon didn’t deliver the solder and I’ll have to wait with the soldering.

---

```yaml
id: 4
date: 18-05-2025
```

As it turned out rpi has only one pwm output which is ok for testing but I still ordered [PCA9685](https://www.adafruit.com/product/815) just in case I add another servo.

---

```yaml
id: 5
date: 18-05-2025
```

Found out that there are 2 ways to read dualsense from the browser. [Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API) and [WebHID API](https://developer.mozilla.org/en-US/docs/Web/API/WebHID_API).

---

```yaml
id: 6
date: 18-05-2025
```

Roboclaw does not stop if the script crashes. You need to enable rc timeout and send commands in a loop

---

```yaml
id: 7
date: 18-05-2025
media:
  - media/7-1.mp4
```

Finally launched the motors via UART

---

```yaml
id: 8
date: 18-05-2025
```

The problem was that I foolishly bought a TXB0104 thought this level shifter would work with UART and allow me to connect RX roboclaw which works on 5V logic but it didn't work. I disconnected it and left only TX 3.3V from the RPI.

---

```yaml
id: 9
date: 18-05-2025
```

In the end I'll order a TXS0108E or quickly make a voltage divider but I need to go to jaycar for resistors.

---

```yaml
id: 10
date: 22-05-2025
```

For now of course everything is held together with makeshift connections, I probably need to solder it all onto a PCB with proper traces instead of wires

---

```yaml
id: 11
date: 22-05-2025
media:
  - media/11-1.mp4
```

The servo also works but I am waiting for a quieter and more precise brushless one from Aliexpress. When it arrives I will replace it.

---

```yaml
id: 12
date: 24-05-2025
```

Started thinking about a custom PCB and getting out the laser iron. Sat with KiCad and realized it's too early. There are still too many details I don't understand yet. I'll put it off until PCBs for MCUs appear or until I'm completely ready.

---

```yaml
id: 13
date: 24-05-2025
```

For now I am thinking of using a prototype board and assembling everything on it. At least the layout will be clear and it will be a bit easier to lay everything out later.

---

```yaml
id: 14
date: 24-05-2025
media:
  - media/14-1.jpg
```

Today there is pretty good progress. I bought 3 prototype boards and connected them together.

---

```yaml
id: 15
date: 25-05-2025
media:
  - media/15-1.mp4
```

A bit more on this later but it turned out I forgot to increase the current limit on the power supply when I tested starting the robot for the first time. As a result during joystick testing when I sharply pressed the trigger the current spiked and the rpi shut down. After spending some time with the logs I found:

```
May 25 01:36:39 rabbit kernel: hwmon hwmon2: Undervoltage detected!
May 25 01:36:41 rabbit kernel: hwmon hwmon2: Voltage normalised
```

which points to the problem. I'll try to raise the maximum to 3 - 4 A and see how things go.
