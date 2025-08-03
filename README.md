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

---

```yaml
id: 16
date: 25-05-2025
media:
  - media/16-1.jpg
  - media/16-2.jpg
  - media/16-3.jpg
```

Going back to the board. I was very lucky to order nylon standoffs from Amazon. First, I fixed the steering mechanism a bit by making the arms longer. Second, with their help, it's very convenient to place all the PCBs on the prototype board.

---

```yaml
id: 17
date: 25-05-2025
media:
  - media/17-1.jpg
```

rpi I disassembled removing the heating sink but sticking on heatsinks

---

```yaml
id: 18
date: 25-05-2025
media:
  - media/18-1.jpg
```

Had to slightly enlarge the holes for M3

---

```yaml
id: 19
date: 25-05-2025
media:
  - media/19-1.jpg
  - media/19-2.jpg
```

Soldered a common GND for all elements using dupont pins

---

```yaml
id: 20
date: 25-05-2025
media:
  - media/20-1.mp4
```

For the servo I added an LM2596 and set it to 6V as my dad suggested. I will need to order a few more of these but with a display so it would be convenient to monitor the voltage without a multimeter.

---

```yaml
id: 21
date: 25-05-2025
media:
  - media/21-1.jpg
```

Before that I also soldered a voltage divider to connect RX rpi and roboclaw because they work at different levels: 3V and 5V. But now I have replaced it with a buck converter.

---

```yaml
id: 22
date: 25-05-2025
media:
  - media/22-1.jpg
```

At first I thought of powering the rpi directly from gpio 2 or 4 but decided not to do it to avoid burning it accidentally. In the end I took a step-down regulator polou 5V D24V90F5 and soldered a usbc cable to connect them. Maybe this could also be done a bit neater.

---

```yaml
id: 23
date: 25-05-2025
media:
  - media/23-1.mp4
```

The first launch was not very successful because one wire was poorly soldered and I spent a long time looking for the problem but after checking with a multimeter I found the issue and everything started working.

---

```yaml
id: 24
date: 25-05-2025
media:
  - media/24-1.jpg
  - media/24-2.jpg
```

Resistors for 5V -> 3.3V divider. Had to remember Ohm's law 🤔

---

```yaml
id: 25
date: 25-05-2025
```

It's actually interesting to remember everything I went through at school, university and heard from my dad and apply it in the real world.

---

```yaml
id: 26
date: 25-05-2025
```

For control via PS5 dualsense I decided not to bother with bluetooth for now especially since the final goal is control over the internet not bluetooth.

---

```yaml
id: 27
date: 25-05-2025
```

Connecting the controller turned out to be simple and everything worked the first time. On R2 I plan to make the trigger move forward. The value range from 0 to 255 can be normalized to the range for roboclaw (-32767, 32767) with a simple formula.

---

```yaml
id: 28
date: 25-05-2025
```

When everything was connected the robot went backward instead of forward but this can be easily fixed by multiplying by -1 or swapping the wires.

---

```yaml
id: 29
date: 25-05-2025
```

As a result it turned out to be just a python script with 3 classes (rabbit, joy and roboclaw) and 2 threads with loops (one listens to the joystick updating the state the other sends commands in an endless loop to roboclaw over UART)

---

```yaml
id: 30
date: 25-05-2025
```

I added a 1 second timeout setting in roboclaw so that the motors stop if the controller does not receive commands for 1 second. This is needed to avoid jams if the program crashes or if there is some kind of bug.

---

```yaml
id: 31
date: 25-05-2025
```

Now we need to deal with the servo and make it work with the sticks.

---

```yaml
id: 32
date: 25-05-2025
```

Oh yeah, at first I started writing code directly on the rpi via ssh but many things didn’t work well in vscode so I decided to develop locally on my mac but sync files using mutagen. A pretty simple and cool tool. One more tool in the toolbox.

---

```yaml
id: 33
date: 25-05-2025
```

The servo I have is 1501MG, it's pretty cheap and loud. I will replace it when the new one arrives but for now that's what I have.

---

```yaml
id: 34
date: 25-05-2025
```

I will control the servo through PWM, i2c and PCA9685

---

```yaml
id: 35
date: 25-05-2025
```

To power the LM2596 step down dc dc at 6V

---

```yaml
id: 36
date: 25-05-2025
media:
  - media/36-1.mp4
```

I had already tested the servos before but now I connected them properly to the controller and refined the Python script.

---

```yaml
id: 37
date: 25-05-2025
media:
  - media/37-1.mp4
```

First ride. The steering wheel is a bit unbalanced, the turn angle is too small, it should be increased and the pwm pulses should be adjusted. The motors are kind of slow, either the wheels need to be bigger or other gearboxes should be used. But overall I am very happy that it moved.

---

```yaml
id: 38
date: 25-05-2025
```

In theory, you can replace the motors and install bldc but you will need to change the controller.

---

```yaml
id: 39
date: 25-05-2025
```

It would be good to fix the PCBs on a vertical/horizontal mount on an acrylic or other plate where it will be easy to drill holes and screw other components to it. At the same time the robot chassis will not be drilled and will not be damaged in case of modifications.

---

```yaml
id: 40
date: 25-05-2025
```

I moved the whole project to docker compose and it became easier to manage dependencies with uv and it's now convenient to proxy devices through mapping:

```
services:
  rabbit:
    build: .
    volumes:
      - ./src:/app/src
    devices:
      - '/dev/input/event0:/dev/joy'
      - '/dev/ttyAMA0:/dev/roboclaw'
    privileged: true
    command: uv run /app/src/main.py
    stdin_open: true
    tty: true
```

---

```yaml
id: 41
date: 25-05-2025
```

There is also docker compose watch mode but I haven’t figured it out yet maybe I’ll come back to it later

---

```yaml
id: 42
date: 25-05-2025
```

In general I am slowly starting to realize the reasons why ros2 is similar to microservices with pipes. In my script it is not very convenient that components depend on each other a lot and know everything about everyone.

---

```yaml
id: 43
date: 25-05-2025
```

The idea that the joystick sends events to the pipe and other nodes just subscribe to topics and react is great.

---

```yaml
id: 44
date: 25-05-2025
```

Next week I will try to migrate the project to ros2 but without their build system and project structure. I will try to use docker and ros2 as a library.

---

```yaml
id: 45
date: 25-05-2025
```

Dualsense is a great joystick but it has no screen which is not very convenient. A good candidate seems to be an Anbernic on Linux running UI in the web [rg552](https://anbernic.com/products/anbernic-rg552)

---

```yaml
id: 46
date: 25-05-2025
```

I found a CSI camera for rpi that I bought for some project but never used. I tried to connect it and write a simple webrtc server to stream the feed to a browser on a device with a joystick. After 3 hours so far I only got a green screen.

---

```yaml
id: 47
date: 25-05-2025
```

The idea is to place it on 2 servos to control the view using the joystick stick. This is called a pan tilt servo kit.

---

```yaml
id: 48
date: 25-05-2025
```

I still have a lot of free pins on the PCA9685.

---

```yaml
id: 49
date: 25-05-2025
```

Shopping list:

-   pan tilt servo kit
-   xArm ESP32 Bus Servo Robotic Arm

---

```yaml
id: 50
date: 25-05-2025
```

[3d_lidar](https://www.reddit.com/r/robotics/comments/1bjjms0/3d_lidar/)

---

```yaml
id: 51
date: 25-05-2025
media:
  - media/51-1.mp4
  - media/51-2.mp4
```

Replaced the cheap servo with a new one from a racing rc for a faster and more precise steering.

---

```yaml
id: 52
date: 25-05-2025
media:
  - media/52-1.jpg
  - media/52-2.mp4
```

As you can see the responsiveness of the steering wheel has increased many times. Also bldc is much quieter.

---

```yaml
id: 53
date: 30-05-2025
media:
  - media/53-1.jpg
```

Also finally received from Ali three devices that I wanted to solder before switching the robot to lipo 4s

On the left is a discharge controller with a screen where you can display voltage, charge percentage and an estimated time if you set the battery parameters. When the lower threshold is reached the relay cuts off the circuit to avoid over-discharging the battery. This is not very useful for lipo.

At the bottom is just an array of switches so you can power all nodes separately and turn some off if needed. There are already 4 now and soon there will be at least 8.

And on the right is an ADC so I can stick it into the circuit and read the voltage on the rpi and send it to a ros2 topic. So the battery level can be displayed nicely in the UI.

---

```yaml
id: 54
date: 30-05-2025
media:
  - media/54-1.jpg
```

I cleared the front part to install the arm there a bit later and as you can see now it's getting cramped. I’ll need to go to Bunnings on the weekend and buy acrylic plates to replace the prototype boards with them. The idea with the prototype boards turned out to be useless because I’m not soldering anything on them anyway.

---

```yaml
id: 55
date: 30-05-2025
media:
  - media/55-1.jpg
```

I think I'll buy a few acrylic plates and cut them exactly like this plate so it looks neater and make a multilayer waffle and mount components on both sides.

---

```yaml
id: 56
date: 30-05-2025
```

Oh yes, before I forget I should buy some kind of metal box for storing lipo at Bunnings and cover it with fireproof material. Just to calm my inner paranoid.

---

```yaml
id: 57
date: 30-05-2025
```

It’s a bit annoying that the steering knuckle and steering linkage are plastic and flimsy. Especially the little cam in the steering linkage. I think I’ve already stripped its thread while taking the steering mechanism apart a few times as I was tuning it and changing the servo. I decided to check what’s available on Aliexpress and I discovered a whole new world.

---

```yaml
id: 58
date: 30-05-2025
media:
  - media/58-1.jpg
```

It is necessary to check the size and shape but finding an aluminum or copper cam does not seem to be a problem.

---

```yaml
id: 59
date: 30-05-2025
media:
  - media/59-1.jpg
```

There are no problems with links either and they cost pennies

---

```yaml
id: 60
date: 30-05-2025
```

It would be cool of course to redo the whole steering wheel and get rid of the plastic completely

---

```yaml
id: 61
date: 30-05-2025
```

While I was looking for parts I thought why do I need 2 motors at the back and why not just leave one and put an axle or differential. But then I got the idea to slightly adjust the wheel speeds depending on the steering angle. Basically it's the same differential but electronic. For example when turning right slightly slow down the right motor. It's trivial to implement you just need to pick a good function because it seems it is not linear.

---

```yaml
id: 62
date: 30-05-2025
```

It seems I'm starting to get sidetracked and scatter my focus on things like this. It's not bad but I should first finish the basic kinematics and only then work on such fine-tuning.

---

```yaml
id: 63
date: 30-05-2025
```

Another random thought is that you can make the car go into a drift because of this. I never thought about it before but when you do it with your own hands you start to realize things that used to seem obvious.

---

```yaml
id: 64
date: 30-05-2025
media:
  - media/64-1.jpg
```

Returning to the electrics. I quickly put together what I want to do with the electrics. The idea is to use relays to turn the circuit on and off only within certain thresholds to prevent battery over-discharge. And as a bonus to turn each component on separately for easier testing and prototyping.

---

```yaml
id: 65
date: 30-05-2025
media:
  - media/65-1.mp4
```

You can set the UP/DOWN voltage parameters on the relay. The relay turns on if the voltage is higher than 11.4V and turns off if the voltage is lower than 10.5V. This is a kind of hysteresis to avoid flickering when crossing the threshold.

---

```yaml
id: 66
date: 30-05-2025
media:
  - media/66-1.jpg
```

The battery discharge curve is not completely linear but it is still possible to roughly estimate the remaining charge as a percentage. This screen will be installed on the robot to get an approximate idea without looking at the UI. To display telemetry on the dashboard you will need to add a voltage divider and an ADC. It will send data via I2C to the rpi where simple math will be done to calculate the percentage based on voltage and send the data to a ros2 topic. From there it will be read by dashboards or control plane.

---

```yaml
id: 67
date: 31-05-2025
```

To roughly understand the layout of the components I needed to decide on the batteries. For now I am looking at the following models and will probably choose the Gens Ace Redline 4S from 5000mAh with a bullet connector. Even though I do not need such a big discharge current it is hard to find something smaller with a similar capacity. [Gens Ace Redline 4S](https://hobbiesdirect.com.au/electronics/batteries/lipo/4s-c417?attributes[34][0]=5.0mm+Bullet&attributes[142][0]=min%3A5000)

---

```yaml
id: 68
date: 31-05-2025
```

Found my original hubs: [RC 02013 02014 02015 Plastic Steering Hub](https://www.aliexpress.com/item/1005004574404215.html)

---

```yaml
id: 69
date: 31-05-2025
media:
  - media/69-1.jpg
```

Wrote out and drew a rough diagram and plan of what I'm doing so I don't get lost in all this

---

```yaml
id: 70
date: 31-05-2025
media:
  - media/70-1.jpg
```

Will be called NVIDIA Jetson Orin Nano super dev kit. For now not so much because I hit the ceiling of rpi4 but rather to understand the size and future placement of the printed circuit boards on the robot.

---

```yaml
id: 71
date: 31-05-2025
media:
  - media/71-1.jpg
  - media/71-2.jpg
```

Spent 2 days trying to install L4T on Jetson. It turned out to be much harder than I thought. At first I naively thought I could just write the SD card image to NVMe and tweak the BIOS to boot from it but that didn't work.

---

```yaml
id: 72
date: 31-05-2025
media:
  - media/72-1.jpg
```

For this I used my cube with ubuntu. Because the cube has only 1 slot for nvme m.2 I had to boot the system from a flash drive using try ubuntu. After that I fixed the loader and bios configs. But the system refused to boot. I spent about 2 hours with ChatGPT but still could not fix it.

---

```yaml
id: 73
date: 31-05-2025
media:
  - media/73-1.jpg
```

In the end I returned to the option with nvidia sdk manager

---

```yaml
id: 74
date: 31-05-2025
media:
  - media/74-1.jpg
```

I was able to flash it only on the third try and each time it took about 30 minutes. Every time something new would break. It turned out the problems were because of wireguard or ufw or sometimes ssh would disconnect.

---

```yaml
id: 75
date: 31-05-2025
media:
  - media/75-1.jpg
```

In the end, I saw that treasured screen. Now the system boots from nvme and it looks like everything works. Now I need to move everything to the new platform and connect and solder all the wires.

---

```yaml
id: 76
date: 31-05-2025
media:
  - media/76-1.jpg
```

About power supply. At first I thought about using an RC lipo at 7000mah but decided to move away from this idea. It bothers me a bit that these batteries can be (although unlikely) quite dangerous. They need to be charged under supervision, they don’t have built-in BMS. But they give much higher discharge current (I probably won’t need > 10A) and are much lighter than a stack of 18650. I took a long time to choose and finally came across V mount batteries that are used in professional video production. These are already assembled 18650 batteries with built-in BMS. They can deliver 14.45V at 14A which looks more than enough and at the same time have a pretty good capacity.

---

```yaml
id: 77
date: 31-05-2025
media:
  - media/77-1.jpg
  - media/77-2.jpg
  - media/77-3.jpg
```

I also took a V plate for it to securely attach it to the robot.

---

```yaml
id: 78
date: 31-05-2025
media:
  - media/78-1.jpg
  - media/78-2.jpg
```

It is quite heavy and tall so I will have to carry it to the 3rd floor. For installing the PCB I bought acrylic glass and cut out the same shape as the metal plates with a jigsaw so I can drill holes simply anywhere.

---

```yaml
id: 79
date: 31-05-2025
media:
  - media/79-1.jpg
```

By the way here is jetson in recovery mode during reflashing. To switch to this mode you need to short 2 contacts.

---

```yaml
id: 80
date: 31-05-2025
media:
  - media/80-1.jpg
```

GPD WIN4 looks like the perfect controller for a robot. The price is of course insane but a full-fledged computer with a keyboard is quite attractive.

---

```yaml
id: 81
date: 31-05-2025
media:
  - media/81-1.mp4
```

I tried for a long time to get these rpi csi cameras to work with ubuntu but nothing worked. I decided to try the official linux for rpi and everything worked right away. Looks like I will struggle with it for a long time until I save up money for a zed 2i. Also, jetson has a slightly different connector for csi and I will have to order an adapter.

---

```yaml
id: 82
date: 31-05-2025
media:
  - media/82-1.mp4
```

After 2 days I figured out the WebRTC protocol which I'm going to use to stream video from the robot's camera and control the robot from the browser. Of course it's not just an http server with requests and responses. By this point I've already run into a bunch of edge cases and behaviors during reconnects and reboots. I started with a smart signaling server but ended up with a simple broadcast of messages via websocket.

The result is on the screen. The terminal at the bottom left is a Python script that sends an offer, the browser on the left is the robot's UI connected to a DualSense. After the connection is established the joystick commands are sent through webrtc to the Python script via data channel and for now they are just logged.

---

```yaml
id: 83
date: 31-05-2025
media:
  - media/83-1.jpg
```

By the way here is a charger with balancing for lipo which I don’t need anymore. Maybe someday I’ll get into drones or rc cars then it might be useful again.

---

```yaml
id: 84
date: 31-05-2025
media:
  - media/84-1.jpg
```

A few more photos that I forgot to post at the very beginning of the process

---

```yaml
id: 85
date: 31-05-2025
media:
  - media/85-1.jpg
```

Simply an indispensable thing during prototyping. I don't even know what I would do without it.

---

```yaml
id: 86
date: 31-05-2025
media:
  - media/86-1.jpg
```

Silicone standoffs turned out to be incredibly convenient for mounting boards on the robot.

---

```yaml
id: 87
date: 31-05-2025
media:
  - media/87-1.jpg
```

And this is the crazy roboclaw 2x30 motor controller which supports up to 30 amps and can work with encoders via uart or usb. Maybe something simpler would have been enough but it does look impressive and cool.

---

```yaml
id: 88
date: 31-05-2025
media:
  - media/88-1.jpg
```

Every time I order from AliExpress I get something wrong. It's already getting funny. I wanted to make gpio pins a bit better and ordered a 40 pin header. But instead I got a header with two rows of 40 instead of 40 total. Okay, til.

---

```yaml
id: 89
date: 31-05-2025
media:
  - media/89-1.jpg
```

Short dupont wires and multicolored pins have also arrived. I can't wait to start assembling version 0.0.2

---

```yaml
id: 90
date: 17-06-2025
media:
  - media/90-1.jpg
```

It also continued with the barrel jack for powering the jetson. The diameter was wrong 🤦‍♂️

---

```yaml
id: 91
date: 17-06-2025
media:
  - media/91-1.jpg
```

Of the more interesting things - ina226 i2c. Simply put a voltage sensor to read voltage and current over i2c and display the voltage on the robot dashboard. There is never too much telemetry.

---

```yaml
id: 92
date: 17-06-2025
media:
  - media/92-1.jpg
```

Since i2c supports addressing you can simply parallel the pins by changing the device addresses. For this there is such a small and handy 10 channel device.

---

```yaml
id: 93
date: 17-06-2025
media:
  - media/93-1.jpg
```

And finally the ball rod ends for the steering link have arrived. The link itself and the hubs haven't arrived yet. I don't remember if I wrote about it or not but I want to replace all the plastic parts with these metal upgrades.

---

```yaml
id: 94
date: 17-06-2025
media:
  - media/94-1.jpg
```

And finally - metal cutting discs and taps for threading. I will try to place all the electronics compactly and securely.

---

```yaml
id: 95
date: 17-06-2025
media:
  - media/95-1.jpg
```

It seems it's time to take apart the first prototype and start assembling a new v0.0.2

---

```yaml
id: 96
date: 17-06-2025
media:
  - media/96-1.jpg
  - media/96-2.jpg
  - media/96-3.jpg
  - media/96-4.jpg
  - media/96-5.jpg
  - media/96-6.jpg
```

Disassembled the robot completely and started assembling the arm

---

```yaml
id: 97
date: 18-06-2025
media:
  - media/97-1.jpg
  - media/97-2.jpg
```

I was very lucky that the holes on the metal plate almost perfectly matched the v plate. The only thing I did for reliability was drill a couple of M4 holes.

---

```yaml
id: 98
date: 18-06-2025
media:
  - media/98-1.mp4
```

Here is how it looks at first approximation. I will trim the base a bit later so the corners won't stick out so much.

---

```yaml
id: 99
date: 18-06-2025
media:
  - media/99-1.jpg
  - media/99-2.jpg
  - media/99-3.jpg
  - media/99-4.jpg
  - media/99-5.jpg
```

Next I want to place all the boards on acrylic plates. I cut the needed shape with a jigsaw drilled holes and cut threads to screw in the standoffs.

---

```yaml
id: 100
date: 18-06-2025
media:
  - media/100-1.jpg
```

That's all for today, this is how it looks so far but there will also be an intermediate level where the nvidia jetson and a couple of other boards will be located.

---

```yaml
id: 101
date: 19-06-2025
media:
  - media/101-1.jpg
  - media/101-2.jpg
  - media/101-3.jpg
```

Replaced the plastic steering hubs with aluminum ones and matched the color to the mechanical arm.

---

```yaml
id: 102
date: 25-06-2025
media:
  - media/102-1.jpg
```

Somehow I don't really like how cutting acrylic sheets with a jigsaw turns out. I decided to try ordering laser cutting.

---

```yaml
id: 103
date: 25-06-2025
media:
  - media/103-1.mp4
```

Bought a mini drill to quickly drill holes.

---

```yaml
id: 104
date: 25-06-2025
media:
  - media/104-1.jpg
  - media/104-2.jpg
```

Lithium grease has arrived. Lubricated all moving parts.

---

```yaml
id: 105
date: 25-06-2025
media:
  - media/105-1.jpg
  - media/105-2.jpg
  - media/105-3.jpg
```

Tried to connect the rpi camera with jetson but nothing worked out. Well, it's okay, I'll wait for the zed and then I'll do it properly.

---

```yaml
id: 106
date: 25-06-2025
media:
  - media/106-1.jpg
  - media/106-2.jpg
  - media/106-3.jpg
  - media/106-4.jpg
```

Today I also picked up the laser cut acrylic. It turned out perfect and very neat. For this version I will drill the holes by hand and for the next version I will draw all the holes in CAD so everything will be perfect.

---

```yaml
id: 107
date: 25-06-2025
media:
  - media/107-1.jpg
  - media/107-2.jpg
  - media/107-3.jpg
```

Placed all the boards on the acrylic and fixed some of them on standoffs. Looks like everything fits but I still need to think about the layout.

---

```yaml
id: 108
date: 26-06-2025
```

I need to write setup.sh to bootstrap the robot from scratch. I won't be able to set up ssh, wg and all the packages for the fourth time.

---

```yaml
id: 109
date: 27-06-2025
```

Ordered new ones from Amazon in the right size. A few days later they arrived in the same size🤦‍♂️ how does this even happen?

---

```yaml
id: 110
date: 28-06-2025
```

Read: [Depth accuracy analysis of the ZED 2i Stereo Camera in an indoor Environment](https://www.sciencedirect.com/science/article/pii/S0921889024001374)

---

```yaml
id: 111
date: 29-06-2025
media:
  - media/111-1.jpg
  - media/111-2.jpg
```

Figured out how ina226 works - a current sensor that can be read via i2c. Everything is quite simple but by default the Chinese breakout board comes with an R100 shunt which is too much for measuring currents higher than 819.175 mA. Although the power is enough and nothing will break the data will be cut off. But this is very easy to fix by replacing the shunt with an R010 (mΩ). After this you can measure currents up to 8.2A but with lower accuracy. This is of course overkill but 0.8A is too little as well. Ordered R010 2512 (in SMD form factor) on Aliexpress because as usual there is nothing in jaycar.

---

```yaml
id: 112
date: 29-06-2025
```

I want 4 of these sensors. One between the robot and the battery and 3 others after the step down DC converters:

-   rear motors
-   nvidia jetson
-   all servo drives (the arm and steering) but maybe I will split them later

4 sensors and all of them by default have the same i2c address. You can change this by soldering jumpers on the breakout board. But I don't really like that. So I bought an i2c multiplexer. At first I thought that this multiplexer works like a router and supports virtual addresses. That is for example the multiplexer itself has address 0x40 and supports its own internal virtual address space and allows you to connect chips with the same names by accessing them via the index of pin groups and at the same time you can read and write to all devices at once. But it doesn't work like that. Basically it's just an 8-channel switch that you can switch programmatically. But that's not a problem because reading from all the sensors can be easily implemented by a loop that goes through all enabled channels reads the data from the same address and writes to a ros2 topic and then to influxdb. All of this is about 20 lines in python and you can run it in a separate docker container.

---

```yaml
id: 113
date: 29-06-2025
```

At the same time, the steering servo is connected via PCA9685 and directly to the jetson pins. But I don't really want to solder a lot of wires so I bought an i2c expansion board. It's convenient, I'll also add i2c. Plus the ground rail turned out to be very handy to connect all the GND together on all the boards.

---

```yaml
id: 114
date: 29-06-2025
media:
  - media/114-1.jpg
  - media/114-2.jpg
  - media/114-3.jpg
```

That's all for today. It still doesn't drive yet but it seems that the next milestone is already in sight.

---

```yaml
id: 115
date: 03-07-2025
```

I understand this author: [My Problems with ROS 2 and Why I’m Going My Own Way (and Salty About It)](https://medium.com/@forrestallison/my-problems-with-ros2-and-why-im-going-my-own-way-and-salty-about-it-4802146eca89)

---

```yaml
id: 116
date: 06-07-2025
```

The fun begins with the jetson orin nano. The fresh docker does not work and fails with the error:

```
failed to solve: process "/bin/sh -c uv sync" did not complete successfully: failed to create endpoint laixim2p0a4udq2v8p15ez4p2 on network bridge: Unable to enable DIRECT ACCESS FILTERING - DROP rule:  (iptables failed: iptables --wait -t raw -A PREROUTING -d 172.17.0.2 ! -i docker0 -j DROP: iptables v1.8.7 (legacy): can't initialize iptables table `raw': Table does not exist (do you need to insmod?)
Perhaps iptables or your kernel needs to be upgraded.
```

https://forums.developer.nvidia.com/t/iptables-error-message/333007

They suggest

> downgrade the docker to avoid the error

---

```yaml
id: 117
date: 07-07-2025
```

After about a week of studying ROS2 both as a framework and an ecosystem I gave up and put it aside for now. I am surprised how this became the industry standard. I tried to separate the feelings I had from rejecting something new from the real difficulties that beginners face when learning ROS2.

It is so clunky and boilerplate-heavy that it makes you feel sick. Sure, ecosystem, contracts, approaches, blah blah blah. But I do not see any reason to use it except for learning purposes and adding a line to your resume.

---

```yaml
id: 118
date: 07-07-2025
```

Maybe someday I will formulate my thoughts and try to describe all my complaints about it as neutrally as possible but for now I am too lazy.

Yesterday I completely deleted from the repository all the code that I and the llm wrote in a week (several thousand lines).

---

```yaml
id: 119
date: 07-07-2025
```

I took a breath of fresh air and switched completely to nats. This gave me:

-   got rid of webrtc (that's a huge chunk)
-   signaling server for webrtc
-   ros2 (a ton of code)
-   weird build scripts needed to run ros2 in docker and locally

-   now the client has websocket and nats
-   access to all topics on the client
-   no building of custom messages
-   video is sent as frames in separate messages
-   everything works great in docker and is monitored with standard tools like prometheus and influxdb
-   robot nodes in any language including typescript
-   code is much less, there are no strange auto-generated files, everything is clean and tidy
-   dropping ros2 turned out to be the best decision
-   almost all image processing, slam and navigation libraries are available as libraries and not tied to ros2 so nothing stops you from using them

-   on the downside I had to give up foxglove but I think I’ll try to write a bridge for it

---

```yaml
id: 120
date: 07-07-2025
```

After a couple of days I spent with nats I am excited about it. It's so simple, lightweight and convenient that I don't understand how I haven't come across it until now. I have a feeling that it's like nginx from the pubsub world.

---

```yaml
id: 121
date: 07-07-2025
```

Plus for sensors and telemetry nats -> telegraf -> influxdb -> grafana is just insanely simple

---

```yaml
id: 122
date: 14-07-2025
```

I decided to update the interface a bit and refactor the code. I want to make the UI in a retro style and add some pixel art. I created some basic components, chose the fonts, added a built-in debug terminal (I think I will use it to send custom messages to nats) and added a cute loader.

---

```yaml
id: 123
date: 16-07-2025
media:
  - 123-1.jpg
```

Today I picked up a package from the US which contained a [ZED 2i stereo camera](https://www.stereolabs.com/en-au/store/products/zed-2i). It looks really awesome. My version has a focal length of 2.1mm, I thought this would be a bit better for indoor use than 4mm. Some interesting features:

-   The SDK does not work in Parallels because it is built only for x86 and does not work on Windows ARM
-   The SDK needs to be downloaded from the website and it is not in the Python repositories which is not very convenient. To run a simple image capture you also need to work a bit but the good thing is they already have a ready-made Docker image for l4t and Jetpack
-   It refused to work with any USB cables except the original one and this is really annoying because you debug the software part and only later start thinking about USB cables
-   I can't say I'm happy with the quality but it has a lot of other advantages, it has IMU, fusion and several other sensors built in and it's pretty easy to work with them
-   In the end after sitting for 4 hours I got it working and streamed the image and sensor telemetry via nats to the browser

---

```yaml
id: 124
date: 16-07-2025
media:
  - 124-1.jpg
```

From other updates I also finally received the 5G gateway. I already took it apart, it's more compact and it's more convenient to mount the board on standoffs on the robot's body. I thought the GNSS and 5G antennas would be included but they were not, so I'll have to order them separately.

---

```yaml
id: 125
date: 16-07-2025
```

How annoying it is that nvidia tests jetpack so badly. Yesterday I finally broke my jetson and decided to flash it again. After an hour the fresh jetpack couldn't launch chrome or any other browser. After a couple of hours talking to chat gpt and claude I got nowhere except installing chrome from flatpak.

I decided to try gemini + deep research this morning and it was just 🔥. The problem is in snap and the simplest way to solve it is to rollback snap to the previous version. This is already the second time when a very simple use case breaks in jetpack and is solved by simply rolling back versions.

---

```yaml
id: 126
date: 17-07-2025
```

On the third try I ordered the correct barrel jack for power and dupont connectors. Quickly crimped them and checked how it works. According to the dev board spec it can be powered with 9-20V. The battery at 96% gives 16.2V which is within the range so it can be powered without step down converters.

---

```yaml
id: 127
date: 17-07-2025
media:
  - 127-1.jpg
```

With minimal load in MAXN_SUPER power mode the consumption is no more than 1A. I will try to load it with a camera and see how long it will work on battery alone.

---

```yaml
id: 128
date: 17-07-2025
media:
  - 128-1.jpg
```

When installing ZED SDK it decided that it needed to optimize neural depth models which increased the consumption to 7W and 1.4A

---

```yaml
id: 129
date: 17-07-2025
media:
  - 129-1.mp4
```

Played a bit with depth estimation.

---

```yaml
id: 130
date: 17-07-2025
media:
  - 130-1.mp4
```

There is also an IMU in the camera. Accelerometer gyroscope and magnetometer.

---

```yaml
id: 131
date: 17-07-2025
media:
  - 131-1.mp4
```

The SDK has models for building point clouds that will be useful for SLAM (simultaneous localization and mapping) when the robot determines its position and maintains a map of the area.

---

```yaml
id: 132
date: 18-07-2025
```

I tried a few more heavy workloads. Jetson consistently reports “System throttled due to over-current.” I doubt that it’s complaining about too much current caused by turning on the GPU. Most likely this is just a standard protection error and the real problem is under voltage. According to the specs the battery should easily deliver 10A and even more at peak which should be more than enough for the Jetson. The reason could be wires that are too thin and too long. I bought a barrel jack without looking at the cable thickness. They arrived as AWG22 one meter long. The voltage drop in a setup like this when the current spikes can reach up to 1V which will definitely be noticeable and most likely Jetson turns on throttling even though the voltage is technically enough.

On the weekend I’ll try to measure current and voltage at different loads. In the best case I’ll just cut the wires. If it doesn’t help and the reason is really the wires then I’ll have to order a new barrel jack with AWG18 for the fourth time.

---

```yaml
id: 133
date: 18-07-2025
```

There is of course still a chance that the battery specs are lying and in reality it gives out much less. I really don't want this because going back to RC lipo with high current output means dealing with charging, BMS and all sorts of other protections and safety concerns.

---

```yaml
id: 134
date: 19-07-2025
media:
  - 134-1.mp4
```

Meditative activity: threading.

---

```yaml
id: 135
date: 19-07-2025
media:
  - 135-1.jpg
```

The whole robot assembled will weigh about 3.5kg. That's quite a lot actually.

---

```yaml
id: 136
date: 19-07-2025
media:
  - 136-1.jpg
```

Today I stayed at home all day and worked on the robot. After 2 weeks without progress I got excited again and moved forward quite well. I found the optimal component layout to minimize wires and fit everything compactly.

---

```yaml
id: 137
date: 19-07-2025
media:
  - 137-1.jpg
  - 137-2.jpg
  - 137-3.jpg
```

I couldn't master CAD and decided to draw everything in Figma. Almost all components had datasheets with dimensions but I had to measure some manually to place the holes accurately. Then I went to Denis and printed the layout of the components and holes. I glued it to the sheets that I cut with a laser and drilled the holes.

---

```yaml
id: 138
date: 19-07-2025
media:
  - 138-1.jpg
  - 138-2.jpg
```

After that I cut threads so I wouldn't have to screw nuts from the back side.

---

```yaml
id: 139
date: 19-07-2025
media:
  - 139-1.jpg
  - 139-2.jpg
  - 139-3.jpg
```

I got this kind of plate with standoffs where I will mount the components.

---

```yaml
id: 140
date: 19-07-2025
media:
  - 140-1.jpg
  - 140-2.jpg
  - 140-3.jpg
```

With the Jetson it's a bit more complicated because it doesn't have holes on the dev board. I had to drill some holes, I hope I didn't touch anything and it still works.

---

```yaml
id: 141
date: 19-07-2025
media:
  - 141-1.jpg
  - 141-2.jpg
  - 141-3.jpg
```

Next is the four-channel INA. I will write about it a bit later. Today I soldered 4 shunts of 0.01 Ohm for measuring current and voltage at different nodes.

---

```yaml
id: 142
date: 19-07-2025
media:
  - 142-1.jpg
```

Assembled everything together but haven't connected the wires yet. Wanted to see how it would look when assembled. For now without the arm, I'll add it a bit later or maybe postpone it until the next milestone.

---

```yaml
id: 143
date: 19-07-2025
media:
  - 143-1.jpg
```

The battery of course makes it a bit hunchbacked and the stereo camera adds some facial expression. With the arm it will look even more amusing. The front is a bit empty for now but the arm controller will go there. In the future there will also be a lidar but that will come a bit later. The problem is that the camera has a depth measurement limit starting from 30cm, so right in front of the robot it has a blind spot. This problem will also need to be solved somehow.

---

```yaml
id: 144
date: 19-07-2025
media:
  - 144-1.jpg
```

Slightly reminds me of the robot from the movie "WALL-E". Overall I am happy with how it looks and how everything fits in. Now I need to connect the wires and check that everything works.

---

```yaml
id: 145
date: 20-07-2025
media:
  - 145-1.jpg
```

Perfectionism is the main enemy of productivity

---

```yaml
id: 146
date: 20-07-2025
media:
  - 146-1.jpg
```

Wired up the rear motor controller, voltage sensor, 2 step down regulators—one for the steering servo, the other for the motors and controller—and started it from the battery. Nothing seems to have started smoking, that's a good sign.

---

```yaml
id: 147
date: 21-07-2025
media:
  - 147-1.jpg
```

Today I connected all the wires and components. I had to take it apart and put it back together five times because every time some new crap happened.

On the bright side the battery is really awesome. First of all it can pass current when connected to the charger and it can charge and power the robot at the same time.

---

```yaml
id: 148
date: 21-07-2025
media:
  - 148-1.mp4
```

Big milestone. It can move and be controlled remotely.

-   runs on a battery
-   video is streamed in real-time at 720p@30
-   controller lag is minimal

Problems:

-   the steering is very twitchy
-   the gear ratio is too high and the robot is very slow and noisy (bldc?)
-   video is not compressed with h264, I take each frame and compress it to jpeg which sends a lot of gigabytes, this will not work on 4g
-   the steering angles are very small, I need to redo the hub and links

---

```yaml
id: 149
date: 22-07-2025
```

Today I caught myself thinking that there are so many cool ideas I want to try implementing but at the same time there is already a lot of technical debt that should really be solved now.

At the very least I want to finish the mechanics right now to move on to perception.

-   redo the steering wheel
-   strengthen the second floor (cut an acrylic plate with a laser and reassemble it on the new platform)
-   change the rear motors or raise the axles a bit and buy bigger wheels
-   adjust the acceleration or distribute the weight better (right now the rabbit jumps a bit when accelerating sharply)

---

```yaml
id: 150
date: 22-07-2025
```

Another disappointment: NVIDIA Jetson Orin Nano does not have hardware h264 compression.

---

```yaml
id: 151
date: 22-07-2025
```

Because of this, the idea leads to several other problems. Initially, I thought about making several nodes that work with the camera. Since only one process can access the camera I thought about local streaming through the ZED SDK. That is, one process connects to the camera and streams a compressed h264 stream. Also, the SDK allows you to read all other parameters through streaming as if you are using the camera locally. But the problem is that streaming through the SDK highly depends on hardware compression and without it crashes and does not work.

---

```yaml
id: 152
date: 22-07-2025
```

Now I have to collapse everything back into a single node that exclusively has access to the camera and does everything.

---

```yaml
id: 153
date: 22-07-2025
media:
  - 153-1.mp4
```

I couldn't resist and decided to play with points cloud and depth measurement. For now I tried the simplest model.

What is shown at the bottom of the screen is not SLAM yet but just a stateless point cloud that is published from the robot to nats at 30hz and is rendered in the browser using treejs. The farther the point the closer it is to green. This is just for convenience but in the code it is just a 3 or 4 dimensional matrix (4 if you want to keep the original color from the camera)

What turned out to be difficult is that 1280x720 is too heavy and just a byte blob of this matrix weighs 70+Mb. It is impossible to push such an array 30 times per second because of the 64Mb limit per message and channel bandwidth. After reducing the resolution to 320p and compressing it with zlib I managed to get a couple hundred kilobytes which looks ok. Plus this matrix is sparse so you can drop zeros from it. Although maybe there is no point if you are going to compress it anyway.

---

```yaml
id: 154
date: 22-07-2025
```

measure depth only from 30cm. This creates a blind spot in front of the robot. Tolerable but not very nice. Maybe it's worth considering a lidar or a proximity sensor for obstacle avoidance.

---

```yaml
id: 155
date: 22-07-2025
```

I'm really frustrated that NVIDIA removed the hardware h264 encoder from Jetson even though they position it as an edge AI device with two CSI ports for cameras. With a software codec, CPU load at 1080p@30fps goes up to 40% and power consumption rises a lot.

After studying the topic a bit, I got the impression that Raspberry Pi 5 also lost the hardware encoder because of a chip shortage but rpi4 still has it. By the way, I have one and used it in the robot until I rebuilt it on Jetson. At the same resolution and frame rate, rpi4 draws a bit more than 5W and CPU load is not more than 5% processing the stream with no lags.

Now I'm thinking that offloading Jetson by moving all the blocks for mechanical control and camera streaming from Jetson to rpi and combining them in a cluster is not such a bad idea. It seems that an extra 5W won't make a difference but will free all resources for Huang.

The question comes up how to connect them together since there should be a NATS server running somewhere. Ethernet + mini switch or ethernet over usb?

---

```yaml
id: 156
date: 22-07-2025
```

I decided to quickly put together a blog in English just to have one. I will duplicate all posts from here there. [https://xrabbit.dev](https://xrabbit.dev)
