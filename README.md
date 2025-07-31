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
