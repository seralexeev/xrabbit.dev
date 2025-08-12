```yaml
id: 1
date: 18-05-2025
```

Decided to dust off my soldering skills a bit and mix that with what I’ve learned working as a full-stack dev. I want to build a robot that can be controlled over the internet and uses [Ackermann steering](https://en.wikipedia.org/wiki/Ackermann_steering_geometry). The second step is to dive deeper into [ROS2](https://github.com/ros2/ros2) and autonomous navigation.

---

```yaml
id: 2
date: 18-05-2025
media:
  - 1-1.jpg
```

Ordered some basic components and tools for assembly from AliExpress and Amazon.

---

```yaml
id: 3
date: 18-05-2025
```

I was planning to run the steering servo today and try to turn it with the [Raspberry Pi](https://www.raspberrypi.org/), but Amazon didn't deliver the solder so I'll have to wait to do any soldering.

---

```yaml
id: 4
date: 18-05-2025
```

Turns out Raspberry Pi has just one PWM output, which is OK for tests but I still ordered the [16-channel PWM driver PCA9685](https://www.adafruit.com/product/815) just in case I decide to add another servo. Better to overdo it than hack together some ugly workaround later.

---

```yaml
id: 5
date: 18-05-2025
```

I found out there are 2 ways to work with [DualSense](https://www.playstation.com/en-us/accessories/dualsense-wireless-controller/) from the browser: [Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API) (standard but limited) and [WebHID API](https://developer.mozilla.org/en-US/docs/Web/API/WebHID_API) (full access to all features).

---

```yaml
id: 6
date: 21-05-2025
```

[RoboClaw](https://www.basicmicro.com/RoboClaw-2x30A-Motor-Controller_p_9.html) doesn't stop if your script crashes - that's dangerous! You definitely need to enable RC timeout and send commands in a loop.

---

```yaml
id: 7
date: 22-05-2025
media:
  - 7-1.mp4
```

Finally got the motors running via [UART](https://ru.wikipedia.org/wiki/UART)! First sign of life.

---

```yaml
id: 8
date: 22-05-2025
```

The problem was that I stupidly bought a [TXB0104](https://www.ti.com/product/TXB0104), thinking that this level shifter would work with UART and let me connect RX on the RoboClaw (which runs at 5V), but it didn't work. I disconnected it and just left TX 3.3V from the Raspberry Pi.

---

```yaml
id: 9
date: 22-05-2025
```

In the end I'll order a [TXS0108E](https://www.ti.com/product/TXS0108E) or just quickly throw together a voltage divider on resistors but I need to go to [Jaycar](https://www.jaycar.com.au/) for resistors.

---

```yaml
id: 10
date: 22-05-2025
```

For now everything is of course held together with wires and mounted on a breadboard – I probably need to solder all this onto a proper PCB with real traces instead of wires. But first I need to make it actually move. One step at a time!

---

```yaml
id: 11
date: 22-05-2025
media:
  - 11-1.mp4
```

The servo works too but I'm waiting for a quieter and more precise [brushless servo](https://www.aliexpress.com/w/wholesale-brushless-servo.html) from AliExpress. Once it arrives I'll swap it.

---

```yaml
id: 12
date: 24-05-2025
```

Started thinking about a custom PCB and dusting off the laser iron. Spent some time with [KiCad](https://www.kicad.org/) and realized it's too early - there are still too many things I don't understand. I'll put it off until [MCP](https://modelcontextprotocol.io/) comes out for PCB-CAD or I finally figure things out. Maybe one day Claude will learn to design boards.

---

```yaml
id: 13
date: 24-05-2025
```

For now I'm thinking to stick with the prototype board and put everything together on it. At least the layout will be clear and it'll be a bit easier to spread everything out later.

---

```yaml
id: 14
date: 24-05-2025
media:
  - 14-1.jpg
```

Today was actually pretty good progress. I bought 3 prototype boards and connected them together.

---

```yaml
id: 15
date: 25-05-2025
media:
  - 15-1.mp4
```

I'll talk about this a bit later, but turns out I forgot to increase the current limit on the power supply when I tested the robot for the first time. So, when testing the joystick, if I suddenly pressed the trigger, the current jumped and the rpi would shut down. After sitting down with the logs for a while, I found this:

```
May 25 01:36:39 rabbit kernel: hwmon hwmon2: Undervoltage detected!
May 25 01:36:41 rabbit kernel: hwmon hwmon2: Voltage normalised
```

which shows there's a problem. I'll try to raise the max to 3 - 4 A and see how it goes.

---

```yaml
id: 16
date: 25-05-2025
media:
  - 16-1.jpg
  - 16-2.jpg
  - 16-3.jpg
```

Going back to the board. I got really lucky ordering nylon standoffs from Amazon. First, I fixed the steering mechanism by making the arms a bit longer. Second, these standoffs make it super easy to place all the PCBs on the prototyping board.

---

```yaml
id: 17
date: 25-05-2025
media:
  - 17-1.jpg
```

I took apart the rpi, removed the heating sink, but stuck on some heat sinks

---

```yaml
id: 18
date: 25-05-2025
media:
  - 18-1.jpg
```

Had to make the holes for M3 a bit bigger

---

```yaml
id: 19
date: 25-05-2025
media:
  - 19-1.jpg
  - 19-2.jpg
```

Soldered a common GND for all elements using dupont pins

---

```yaml
id: 20
date: 25-05-2025
media:
  - 20-1.mp4
```

I added an LM2596 for the servo and set it to 6V like my dad suggested. I need to order a few more of these but with a screen so it's easier to monitor the voltage without a multimeter.

---

```yaml
id: 21
date: 25-05-2025
media:
  - 21-1.jpg
```

Before that I also soldered a voltage divider to connect the RX of the rpi and roboclaw because they work at different levels: 3V and 5V. But I've already swapped it for a step-down converter.

---

```yaml
id: 22
date: 25-05-2025
media:
  - 22-1.jpg
```

At first I thought about powering the rpi directly from gpio 2 or 4 but decided not to do it so I don't fry it by accident. In the end I took a step-down regulator polou 5V D24V90F5 and soldered a usbc cable to connect them. Maybe this could also be done a bit neater.

---

```yaml
id: 23
date: 25-05-2025
media:
  - 23-1.mp4
```

The first launch didn't go so well because one wire was soldered badly and I spent a long time looking for the problem but after checking with a multimeter I found the issue and everything started working.

---

```yaml
id: 24
date: 25-05-2025
media:
  - 24-1.jpg
  - 24-2.jpg
```

Resistors for the 5V -> 3.3V divider. Had to remember Ohm's law 🤔

---

```yaml
id: 25
date: 25-05-2025
```

It's actually interesting to remember everything I went through at school, university and heard from my dad and use it in the real world.

---

```yaml
id: 26
date: 25-05-2025
```

For now, I decided not to bother with bluetooth for controlling it through the PS5 dualsense, especially since the final goal is control over the internet, not bluetooth.

---

```yaml
id: 27
date: 25-05-2025
```

Connecting the controller turned out to be easy and everything worked the first time. I’m thinking of making the R2 trigger control forward movement. The value range from 0 to 255 can be normalized to roboclaw’s range (-32767, 32767) with a simple formula.

---

```yaml
id: 28
date: 25-05-2025
```

When I connected everything the robot went backwards instead of forwards but you can fix it by just multiplying by -1 or swapping the wires.

---

```yaml
id: 29
date: 25-05-2025
```

In the end I just got a Python script with 3 classes (rabbit, joy and roboclaw) and 2 threads with loops (one listens to the joystick and updates the state, the other sends commands in an endless loop to roboclaw over UART)

---

```yaml
id: 30
date: 25-05-2025
```

I added a 1-second timeout setting in roboclaw in 1C so the motors stop if the controller doesn't get commands for 1 second. This is needed to avoid sticking if the program suddenly crashes or if there's some kind of bug.

---

```yaml
id: 31
date: 25-05-2025
```

Now it's time to deal with the servo and make it work with the sticks.

---

```yaml
id: 32
date: 25-05-2025
```

Oh yeah, at first I started writing code right on the rpi through ssh but a lot of things didn’t work well in vscode so I decided to develop locally on my mac and sync files using mutagen. Pretty simple and cool tool. One more tool in the toolbox.

---

```yaml
id: 33
date: 25-05-2025
```

The 1501MG servo I have is pretty cheap and noisy. I'll replace it when the new one arrives but for now this is what I've got.

---

```yaml
id: 34
date: 25-05-2025
```

I'll control the servo with PWM, i2c and PCA9685

---

```yaml
id: 35
date: 25-05-2025
media:
  - 35-1.jpg
```

For powering the LM2596 step down dc dc to 6V

---

```yaml
id: 36
date: 25-05-2025
media:
  - 36-1.mp4
```

I already tested the servos before but now I connected them properly to the controller and tweaked the Python script.

---

```yaml
id: 37
date: 25-05-2025
media:
  - 37-1.mp4
```

First ride. The steering is a bit off balance, the turn angle is too small, I should increase it and adjust the pwm pulses. The motors are kind of slow, I need to either get bigger wheels or use different gearboxes. But overall I'm really happy that it moved.

---

```yaml
id: 38
date: 25-05-2025
```

In theory, you can swap out the motors and put in bldc but you'll have to change the controller.

---

```yaml
id: 39
date: 25-05-2025
```

I need to mount the PCBs using vertical/horizontal mounts on an acrylic or some other plate that I can easily drill holes in and attach other components to. This way the robot chassis won't get drilled or damaged if I need to redo something.

---

```yaml
id: 40
date: 25-05-2025
```

Moved the whole project to docker compose and uv, so now it's easier to manage dependencies and you can conveniently proxy devices with mapping:

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

There's also docker compose watch mode but I haven't figured it out yet, maybe I'll get back to it later

---

```yaml
id: 42
date: 25-05-2025
```

I'm slowly starting to realize why ros2 looks a lot like microservices with pipes. In my script it's not very convenient that components depend on each other a lot and know everything about everyone.

---

```yaml
id: 43
date: 25-05-2025
```

The idea that the joystick sends events into the pipe and other nodes just subscribe to topics and react is beautiful.

---

```yaml
id: 44
date: 25-05-2025
```

Next week I'll try to move the project to ros2 but without their build system and project structure. I'll try to use docker and ros2 as a library.

---

```yaml
id: 45
date: 25-05-2025
```

Dualsense is a great gamepad but it doesn't have a screen which isn't very convenient. Looks like a decent candidate — Anbernic running Linux and launching a UI in the browser [rg552](https://anbernic.com/products/anbernic-rg552)

---

```yaml
id: 46
date: 25-05-2025
```

I found a CSI camera for rpi lying around that I bought for some project but never used. Tried to connect it and write a simple webrtc server to stream the feed to a browser on the device with the joystick. After 3 hours all I got so far is a green screen.

---

```yaml
id: 47
date: 25-05-2025
```

The idea is to put it on 2 servos so you can control the view with a joystick stick. This is called a pan tilt servo kit.

---

```yaml
id: 48
date: 25-05-2025
```

I still have a lot of free pins on the PCA9685 anyway.

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
date: 28-05-2025
```

[3d_lidar](https://www.reddit.com/r/robotics/comments/1bjjms0/3d_lidar/)

---

```yaml
id: 51
date: 30-05-2025
media:
  - 51-1.mp4
  - 51-2.mp4
```

Replaced the cheap servo with a new one from a racing RC for a faster and more precise steering.

---

```yaml
id: 52
date: 30-05-2025
media:
  - 52-1.jpg
  - 52-2.mp4
```

As you can see, the steering wheel responsiveness increased a lot. Also, the bldc is much quieter.

---

```yaml
id: 53
date: 30-05-2025
media:
  - 53-1.jpg
```

Finally got 3 things from Aliexpress that I wanted to solder before switching the robot to lipo 4s

On the left is a discharge controller with a screen where you can show voltage and charge percentage and an estimated time if you set the battery parameters. When it hits the lower threshold the relay cuts off the circuit so you don’t over-discharge the battery. Not super useful for lipo though.

At the bottom is just an array of switches so you can power all nodes separately and turn some off if needed. There are already 4 now and soon there will be at least 8.

And on the right is an ADC so I can plug it into the circuit, read the voltage on the rpi and send it to a ros2 topic. So I can nicely show the battery level in the UI.

---

```yaml
id: 54
date: 30-05-2025
media:
  - 54-1.jpg
```

I cleared out the front part so I can install the arm there later and as you can see it's getting tight. I'll have to go to Bunnings on the weekend and buy some acrylic sheets to replace these prototype boards. The idea with the proto boards turned out useless because I never solder anything on them anyway.

---

```yaml
id: 55
date: 30-05-2025
media:
  - 55-1.jpg
```

I'm thinking of buying a few acrylic sheets and cutting them to fit neatly with this plate so it's tidier and making a multilayer waffle and mounting components on both sides.

---

```yaml
id: 56
date: 30-05-2025
```

Oh yeah, before I forget I need to go to Bunnings and buy some kind of metal box for storing the lipo and line it with some fireproof material. Just to calm down my inner paranoid.

---

```yaml
id: 57
date: 30-05-2025
```

It’s a bit annoying that the steering knuckle and steering linkage are plastic and flimsy. Especially the little arm in the steering linkage. I think I’ve already stripped its threads while taking apart the steering mechanism a few times when I was tuning and changing the servo. Decided to check what’s on AliExpress and discovered a whole new world.

---

```yaml
id: 58
date: 30-05-2025
media:
  - 58-1.jpg
```

I need to check the size and shape but finding an aluminum or copper cam doesn't seem to be a problem.

---

```yaml
id: 59
date: 30-05-2025
media:
  - 59-1.jpg
```

There’s no problem with the links either and they cost next to nothing

---

```yaml
id: 60
date: 30-05-2025
```

It would be great of course to redo the whole steering wheel and get rid of plastic completely

---

```yaml
id: 61
date: 30-05-2025
```

While I was looking for parts I thought, why do I need two motors in the back and why not just leave one and put in an axle or a differential. But then the idea came to slightly adjust the wheel speeds depending on how the steering turns. Basically the same as a differential but electronic. For example, when turning right, slow down the right motor a bit. It's trivial to implement, just need to choose a good function since it doesn't seem linear.

---

```yaml
id: 62
date: 30-05-2025
```

Looks like I'm starting to drift off and get distracted by things like this. It's not a bad thing but I probably need to finish the basic kinematics first and only then work on these fine details.

---

```yaml
id: 63
date: 30-05-2025
```

Another random thought — you can make the car drift using this. Never thought about it before but when you do it with your own hands you start realizing things that used to seem basic.

---

```yaml
id: 64
date: 30-05-2025
media:
  - 64-1.jpg
```

Back to the electronics. I put together a rough version of how I want to wire things up. The idea is to use a relay to switch the circuit on and off only within certain limits to prevent over-discharging the battery. And as a bonus, I want to be able to turn each component on separately to make testing and prototyping easier.

---

```yaml
id: 65
date: 30-05-2025
media:
  - 65-1.mp4
```

You can set the UP/DOWN voltage parameters on the relay. The relay turns on if the voltage is more than 11.4V and turns off if the voltage goes below 10.5V. It's a kind of hysteresis so it doesn't keep switching when crossing the threshold.

---

```yaml
id: 66
date: 30-05-2025
media:
  - 66-1.jpg
```

The battery discharge curve isn't exactly linear but you can still roughly estimate the remaining charge in percent. This screen will be on the robot so you can get an idea without looking at the UI. To show telemetry on the dashboard I'll need to add a voltage divider and an ADC. It'll send data via I2C to the rpi where there will be some simple math to calculate the percentage by voltage and send the data to a ros2 topic. From there dashboards or control plane can read it.

---

```yaml
id: 67
date: 31-05-2025
```

To get a rough idea of the component layout I needed to figure out the battery first. For now I've settled on a few models and will probably look at the Gens Ace Redline 4S, 5000mAh with a bullet connector. I don’t actually need such a big discharge current but it’s hard to find something smaller with similar capacity. [Gens Ace Redline 4S](https://hobbiesdirect.com.au/electronics/batteries/lipo/4s-c417?attributes[34][0]=5.0mm+Bullet&attributes[142][0]=min%3A5000)

---

```yaml
id: 68
date: 01-06-2025
```

Found my original hubs: [RC 02013 02014 02015 Plastic Steering Hub](https://www.aliexpress.com/item/1005004574404215.html)

---

```yaml
id: 69
date: 31-05-2025
media:
  - 69-1.jpg
```

Wrote down and sketched a rough diagram and plan of what I'm doing so I don't get lost in all this

---

```yaml
id: 70
date: 04-06-2025
media:
  - 70-1.jpg
```

It’ll be called NVIDIA Jetson Orin Nano super dev kit. Not really because I’ve hit the rpi4 ceiling yet but more to get a sense of the size and future placement of the PCBs on the robot.

---

```yaml
id: 71
date: 15-06-2025
media:
  - 71-1.jpg
  - 71-2.jpg
```

Spent 2 days trying to install L4T on the Jetson. Turned out to be way harder than I thought. At first I naively thought I could just write the SD card image to an NVMe and tweak the BIOS to boot from it but that didn't work.

---

```yaml
id: 72
date: 31-05-2025
media:
  - 72-1.jpg
```

I used my cube with Ubuntu for this. Since the cube has only one slot for nvme m.2 I had to boot the system from a flash drive using try ubuntu. After that I fixed the loader and bios configs. But the system refused to boot. Spent about 2 hours with ChatGPT but still couldn't fix it.

---

```yaml
id: 73
date: 31-05-2025
media:
  - 73-1.jpg
```

In the end I went back to the option with nvidia sdk manager

---

```yaml
id: 74
date: 31-05-2025
media:
  - 74-1.jpg
```

I was only able to flash it on the third try, and each time it took about 30 minutes. Every time something new would break. Turned out the problems were because of wireguard, ufw or sometimes ssh would drop.

---

```yaml
id: 75
date: 31-05-2025
media:
  - 75-1.jpg
```

In the end I saw that cherished screen. So now the system boots from nvme and it seems everything works. Now I need to move everything I have to the new platform and connect and solder all the wires.

---

```yaml
id: 76
date: 31-05-2025
media:
  - 76-1.jpg
```

About power supply. At first, I was thinking of using an rc lipo at 7000mah but decided to drop that idea. It bothers me a bit that these batteries can be (even if unlikely) pretty dangerous. You need to keep an eye on them while charging and they don't have a built-in BMS. But they can deliver way more discharge current (though I probably won't need > 10A) and they're much lighter than a stack of 18650s. I spent a long time choosing and eventually stumbled upon V mount batteries which are used in professional video production. These are already assembled 18650 packs with a built-in BMS. They can output 14.45V at 14A which seems more than enough and they have quite a decent capacity.

---

```yaml
id: 77
date: 31-05-2025
media:
  - 77-1.jpg
  - 77-2.jpg
  - 77-3.jpg
```

I also got a V plate for it so I could securely mount it on the robot.

---

```yaml
id: 78
date: 31-05-2025
media:
  - 78-1.jpg
  - 78-2.jpg
```

It's pretty heavy and tall so I'll have to carry it up to the third floor. To mount the PCB I bought some acrylic glass and used a jigsaw to cut out the same shape as the metal plates so I can drill holes anywhere I want.

---

```yaml
id: 79
date: 31-05-2025
media:
  - 79-1.jpg
```

Here's Jetson in recovery mode during reflashing by the way. To enter this mode you need to short 2 contacts.

---

```yaml
id: 80
date: 16-06-2025
media:
  - 80-1.jpg
```

GPD WIN4 looks like the perfect controller for a robot. The price is of course insane but a full-fledged computer with a keyboard is pretty appealing.

---

```yaml
id: 81
date: 31-05-2025
media:
  - 81-1.mp4
```

I spent a really long time trying to get these rpi csi cameras working with Ubuntu but nothing worked. Decided to try the official Linux for rpi and everything worked on the first try. Looks like I'll be struggling with it for a while until I save up for a zed 2i. Plus Jetson has a slightly different connector for csi so I'll have to order an adapter.

---

```yaml
id: 82
date: 17-06-2025
media:
  - 82-1.mp4
```

After 2 days I figured out the webrtc protocol I'm going to use for streaming video from the robot's camera and controlling the robot from the browser. Of course it's not just a simple http server with requests and responses. By this point I'd already run into a ton of edge cases and odd behavior during reconnects and reboots. I started with a smart signaling server but ended up just broadcasting the message through websocket like an idiot.

Result on the screen. The terminal in the bottom left is a python script sending the offer, the browser on the left is the robot UI with a dualsense connected. After the connection is set up commands from the joystick go through webrtc into the python script through the data channel and for now they're just logged there.

---

```yaml
id: 83
date: 17-06-2025
media:
  - 83-1.jpg
```

By the way, here's a charger with balancing for lipo that I don't need anymore. Maybe someday I'll get into drones or rc cars, then it might come in handy again.

---

```yaml
id: 84
date: 17-06-2025
media:
  - 84-1.jpg
```

A few more photos that I forgot to post at the very beginning of the process

---

```yaml
id: 85
date: 17-06-2025
media:
  - 85-1.jpg
```

Just an indispensable thing when prototyping. I don't even know what I'd do without it.

---

```yaml
id: 86
date: 17-06-2025
media:
  - 86-1.jpg
```

Silicone standoffs turned out to be incredibly handy for mounting boards on the robot.

---

```yaml
id: 87
date: 17-06-2025
media:
  - 87-1.jpg
```

And this is the crazy roboclaw 2x30 motor controller which supports up to 30 amps and can work with encoders via uart or usb. I guess I could’ve used something simpler but it sure looks impressive and cool.

---

```yaml
id: 88
date: 17-06-2025
media:
  - 88-1.jpg
```

Every time I order from AliExpress I get something wrong. It's already getting funny. I wanted to lay out the gpio pins a bit better and ordered a 40-pin header. But instead I got a header with two rows of 40 instead of 40 total. Oh well, til.

---

```yaml
id: 89
date: 17-06-2025
media:
  - 89-1.jpg
```

Short dupont wires and colorful pins also arrived. Can't wait to start assembling version 0.0.2

---

```yaml
id: 90
date: 17-06-2025
media:
  - 90-1.jpg
```

Also continued with the barrel jack for powering the Jetson. Got the wrong diameter 🤦‍♂️

---

```yaml
id: 91
date: 17-06-2025
media:
  - 91-1.jpg
```

From the more interesting stuff – ina226 i2c. In simple words, it's a voltage sensor to read voltage and current over i2c and show the voltage on the robot's dashboard. You can never have too much telemetry.

---

```yaml
id: 92
date: 17-06-2025
media:
  - 92-1.jpg
```

Since i2c supports addressing you can just parallel the pins by changing the device addresses. There's this small and handy 10-channel device for that.

---

```yaml
id: 93
date: 17-06-2025
media:
  - 93-1.jpg
```

And finally, the ball rod ends for the steering link have arrived. The link itself and the hubs haven't arrived yet. I don't remember if I wrote about it or not but I want to replace all the plastic parts with these metal upgrades.

---

```yaml
id: 94
date: 17-06-2025
media:
  - 94-1.jpg
```

And last - metal cutting discs and taps for threading. I'll try to place all the electronics compactly and securely.

---

```yaml
id: 95
date: 17-06-2025
media:
  - 95-1.jpg
```

Looks like it's time to take apart the first prototype and start building a new one v0.0.2

---

```yaml
id: 96
date: 18-06-2025
media:
  - 96-1.jpg
  - 96-2.jpg
  - 96-3.jpg
  - 96-4.jpg
  - 96-5.jpg
  - 96-6.jpg
```

Took the robot completely apart and started assembling the arm

---

```yaml
id: 97
date: 18-06-2025
media:
  - 97-1.jpg
  - 97-2.jpg
```

I got really lucky that the holes on the metal plate almost perfectly matched the v plate. Just to be sure I drilled a couple of M4 holes.

---

```yaml
id: 98
date: 18-06-2025
media:
  - 98-1.mp4
```

Here’s what it looks like at first glance. I’ll trim the base a bit later so the corners don’t stick out so much.

---

```yaml
id: 99
date: 18-06-2025
media:
  - 99-1.jpg
  - 99-2.jpg
  - 99-3.jpg
  - 99-4.jpg
  - 99-5.jpg
```

Next I want to place all the boards on acrylic plates. I cut out the shape I needed with a jigsaw, drilled some holes and tapped threads to screw in the standoffs.

---

```yaml
id: 100
date: 18-06-2025
media:
  - 100-1.jpg
```

That's all for today, that's how it looks so far, but there will be another intermediate level where the Nvidia Jetson and a couple other boards will be.

---

```yaml
id: 101
date: 19-06-2025
media:
  - 101-1.jpg
  - 101-2.jpg
  - 101-3.jpg
```

Changed the plastic steering hubs to aluminum ones and matched the color to the robotic arm.

---

```yaml
id: 102
date: 25-06-2025
media:
  - 102-1.jpg
```

Not really happy with how cutting acrylic sheets with a fretsaw turns out. Decided to try ordering laser cutting.

---

```yaml
id: 103
date: 25-06-2025
media:
  - 103-1.mp4
```

Bought a mini drill to quickly drill holes.

---

```yaml
id: 104
date: 25-06-2025
media:
  - 104-1.jpg
  - 104-2.jpg
```

The lithium grease arrived. I greased all the moving parts.

---

```yaml
id: 105
date: 25-06-2025
media:
  - 105-1.jpg
  - 105-2.jpg
  - 105-3.jpg
```

Tried to make the rpi camera work with jetson but it didn't work out. Oh well, I'll wait for the zed and then do it properly.

---

```yaml
id: 106
date: 25-06-2025
media:
  - 106-1.jpg
  - 106-2.jpg
  - 106-3.jpg
  - 106-4.jpg
```

Also today I picked up the laser-cut acrylic. It turned out perfect and really neat. For this version I'll drill the holes by hand, and for the next version I'll draw all the holes in CAD so everything comes out perfect.

---

```yaml
id: 107
date: 25-06-2025
media:
  - 107-1.jpg
  - 107-2.jpg
  - 107-3.jpg
```

I put all the boards on the acrylic and mounted some of them on standoffs. Looks like everything fits but I still need to think more about the layout.

---

```yaml
id: 108
date: 26-06-2025
```

I need to write setup.sh to bootstrap the robot from scratch. I can't handle setting up ssh, wg and all the packages for the fourth time.

---

```yaml
id: 109
date: 27-06-2025
```

Ordered new ones from Amazon in the right size. A few days later they showed up in the same size🤦‍♂️ how does that even happen?

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
  - 111-1.jpg
  - 111-2.jpg
```

Figured out how the ina226 works – it’s a current sensor you can read over i2c. It’s all pretty simple but by default the Chinese breakout board comes with an R100 shunt which is way too much for measuring currents over 819.175 mA. Even though the board can handle the power and nothing will break, the data just gets clipped. But it’s super easy to fix – just swap the shunt resistor to R010 (mΩ). After that, yeah, you lose some accuracy but you can measure up to 8.2A. That’s definitely overkill, but honestly 0.8A is way too low too. Ordered R010 2512 (in SMD form factor) from AliExpress because as usual Jaycar has nothing.

---

```yaml
id: 112
date: 29-06-2025
```

I want 4 of these sensors. One between the robot and the battery and 3 others after the step down DC converters:

-   rear motors
-   nvidia jetson
-   all servo drives (arm and steering) but maybe I'll split them later

4 sensors and they all have the same i2c address by default. You can change this by soldering jumpers on the breakout board. But I'm not a big fan of that. So I bought an i2c multiplexer. At first I thought this multiplexer worked like a router and supported virtual addresses. Like for example the multiplexer itself has address 0x40 and supports an internal virtual address space and lets you connect chips with the same names and access them by pin group indexes, so you can write and read from all devices at the same time. But it doesn't work like that. Basically it's just an 8-channel switch you can toggle in software. But that's not really a problem because reading from all the sensors can be done very simply with a loop that goes through all the enabled channels, reads data from the same address and writes it to a ros2 topic and then to influxdb. All that is around 20 lines in Python and can run in a separate docker container.

---

```yaml
id: 113
date: 29-06-2025
media:
  - 113-1.jpg
```

At the same time, the steering servo is connected through PCA9685 and directly to the jetson pins. But I don't really want to solder a bunch of wires so I bought an i2c expansion board. It's convenient, I'll add more i2c too. Plus, the ground pin header turned out to be super handy for tying all the GNDs together on all the boards.

---

```yaml
id: 114
date: 29-06-2025
media:
  - 114-1.jpg
  - 114-2.jpg
  - 114-3.jpg
```

That's all for today. It still doesn't drive but it looks like the next milestone is already in sight.

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

The fun begins with jetson orin nano. Fresh docker doesn’t work and crashes with an error:

```
failed to solve: process "/bin/sh -c uv sync" did not complete successfully: failed to create endpoint laixim2p0a4udq2v8p15ez4p2 on network bridge: Unable to enable DIRECT ACCESS FILTERING - DROP rule:  (iptables failed: iptables --wait -t raw -A PREROUTING -d 172.17.0.2 ! -i docker0 -j DROP: iptables v1.8.7 (legacy): can't initialize iptables table `raw': Table does not exist (do you need to insmod?)
Perhaps iptables or your kernel needs to be upgraded.
```

https://forums.developer.nvidia.com/t/iptables-error-message/333007

People suggest

> downgrade the docker to avoid the error

---

```yaml
id: 117
date: 07-07-2025
```

After about a week of digging into ROS2 as a framework and ecosystem I gave up and put it aside for now. I’m honestly surprised how this became an industry standard. I tried to separate my feelings of rejecting something new from the real struggles beginners have when learning ROS2.

It’s so clunky and boilerplate-heavy it makes you feel sick. Sure, the ecosystem, contracts, approaches blah blah blah. But I don’t see a single reason to use it except for learning or adding a line to your resume.

---

```yaml
id: 118
date: 07-07-2025
```

Maybe someday I'll put my thoughts together and try to describe all my grievances about it in the most neutral way but for now I'm too lazy.

Yesterday I completely deleted from the repository all the code that me and the LLM wrote in a week (a few thousand lines).

---

```yaml
id: 119
date: 07-07-2025
```

Took a deep breath and switched completely to nats. This gave me:

-   ditched webrtc (that was a huge chunk)
-   no more signaling server for webrtc
-   ros2 is gone (lots of code)
-   weird build scripts for running ros2 in docker and locally are gone

-   now the client uses websocket and nats
-   access to all topics on the client
-   no custom message building
-   video is sent as frames in separate messages
-   everything works great in docker and gets monitored with standard tools like prometheus and influxdb
-   robot nodes can be in any language including typescript
-   codebase is much smaller now, no weird autogenerated files, everything is clean and tidy
-   dropping ros2 was the best decision
-   almost all libraries for image processing, slam and navigation are available as libraries and not tied to ros2 so it won't block using them

-   downside — had to drop foxglove, but I think I'll try to write a bridge for it

---

```yaml
id: 120
date: 07-07-2025
```

After a couple of days spent with nats, I'm thrilled with it. It's so simple, lightweight and convenient that I don't get how I hadn't come across it before. Feels like it's the nginx of the pubsub world.

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
media:
  - 122-1.mp4
  - 122-2.jpg
```

Decided to update the interface a bit and refactor the code. I want to make the UI in a retro style with some pixel art. Threw together some basic components, picked the fonts, added a built-in debug terminal (planning to use it to send custom messages to nats) and added a cute loader.

---

```yaml
id: 123
date: 16-07-2025
media:
  - 123-1.jpg
```

Picked up a package from the US today with the [ZED 2i stereo camera](https://www.stereolabs.com/en-au/store/products/zed-2i). It looks awesome, really. My version has a 2.1mm focal length. I figured that’d work a bit better indoors than 4mm. Some interesting features:

-   The SDK doesn’t work in Parallels because it’s only built for x86 and doesn’t work on Windows ARM
-   You have to download the SDK from the website, it’s not in the Python repos which is kind of annoying. Even to just run a simple image capture you’ll have to mess around a bit but on the bright side there’s already a prebuilt docker image for l4t and jetpack
-   It refused to work with any USB cables except the original one. That’s just plain annoying because you end up debugging the software and only later realize it’s actually the stupid USB cable
-   I wouldn’t say I’m super impressed with the image quality but it’s got loads of other benefits. It’s got IMU and fusion and a bunch of other sensors built in and it’s pretty easy to use them
-   In the end after about 4 hours I got it running and streamed video and sensor telemetry through nats to the browser

---

```yaml
id: 124
date: 16-07-2025
media:
  - 124-1.jpg
```

From other updates I finally got the 5G gateway. Already took it apart – it's more compact and it's easier to mount the board on standoffs on the robot's body. I thought GNSS and 5G antennas would be included but they weren't, so I'll have to order them separately.

---

```yaml
id: 125
date: 16-07-2025
media:
  - 125-1.jpg
```

It’s so annoying how badly nvidia tests jetpack. Yesterday I finally broke my jetson and decided to reflash it from scratch. After an hour the fresh jetpack couldn’t launch chrome or any other browser. After a couple hours chatting with chat gpt and claude, all I got was installing chrome from flatpak.

This morning I decided to try gemini + deep research and it was straight 🔥. The problem is in snap and the simplest way to fix it is to roll snap back one version. This is already the second time when a really basic use case breaks in jetpack and gets fixed by just rolling back versions.

---

```yaml
id: 126
date: 17-07-2025
```

On the third try I ordered the right barrel jack for power and dupont connectors. Crimped everything quickly and checked if it works. According to the dev board specs, it can be powered by 9-20V. The battery at 96% gives 16.2V which is within the limits so I can power it without step down converters.

---

```yaml
id: 127
date: 17-07-2025
media:
  - 127-1.jpg
```

With minimal load in MAXN_SUPER power mode the consumption is no more than 1A. I'll try to load it with a camera and see how long it runs on battery alone.

---

```yaml
id: 128
date: 17-07-2025
media:
  - 128-1.jpg
```

When installing the ZED SDK it decided it needed to optimize the neural depth models, which pushed the consumption up to 7W and 1.4A

---

```yaml
id: 129
date: 17-07-2025
media:
  - 129-1.mp4
```

Played around a bit with depth estimation.

---

```yaml
id: 130
date: 17-07-2025
media:
  - 130-1.mp4
```

There’s also an IMU in the camera. Accelerometer gyroscope and magnetometer.

---

```yaml
id: 131
date: 17-07-2025
media:
  - 131-1.mp4
```

The SDK has models for building point clouds that will be useful for SLAM (simultaneous localization and mapping) when the robot figures out its position and maintains a map of the area.

---

```yaml
id: 132
date: 18-07-2025
```

Tried a few more heavy workloads. Jetson keeps reporting “System throttled due to over-current.” I doubt it’s actually complaining about too much current from turning on the GPU. Most likely it’s just a standard protection error and the real problem is under voltage. The battery should easily give out 10A according to the specs and even more at peak, which should be more than enough for Jetson. The reason might be wires that are too thin and too long. I bought a barrel jack without checking the cable thickness. What arrived was AWG22, one meter long. Voltage drop on this setup can reach up to 1V during current spikes, which will definitely be noticed and probably makes Jetson do throttling even though the voltage is technically enough.

On the weekend I’ll try to measure current and voltage under different loads. In the best case I’ll just cut the wires. If that doesn’t help and the wires really are the problem, I’ll have to order a new barrel jack with AWG18 for the fourth time.

---

```yaml
id: 133
date: 18-07-2025
```

There’s still a chance the battery specs are lying and in reality it gives out a lot less. Really don’t want that because going back to RC lipo with high current output means messing with charging, BMS and all sorts of other protections and safety stuff.

---

```yaml
id: 134
date: 19-07-2025
media:
  - 134-1.mp4
```

Meditative activity: cutting threads.

---

```yaml
id: 135
date: 19-07-2025
media:
  - 135-1.jpg
```

The whole robot assembled will be about 3.5kg. That's pretty hefty honestly.

---

```yaml
id: 136
date: 19-07-2025
media:
  - 136-1.jpg
```

Today I didn't leave the house at all and spent the whole day working on the robot. After 2 weeks with no progress I got excited about it again and made pretty good headway. I found the best layout for the components to minimize wires and fit everything in nice and compact.

---

```yaml
id: 137
date: 19-07-2025
media:
  - 137-1.jpg
  - 137-2.jpg
  - 137-3.jpg
```

I couldn't handle CAD so I decided to draw everything in Figma. Almost all components had datasheets with dimensions but some I had to measure by hand to place the holes accurately. Then I went to Denis and printed out the layout for the components and holes. I glued it to the sheets I cut with the laser and drilled the holes.

---

```yaml
id: 138
date: 19-07-2025
media:
  - 138-1.jpg
  - 138-2.jpg
```

After that I cut threads so I wouldn't have to screw on nuts from the other side.

---

```yaml
id: 139
date: 19-07-2025
media:
  - 139-1.jpg
  - 139-2.jpg
  - 139-3.jpg
```

I got a plate like this with standoffs where I'll mount the components.

---

```yaml
id: 140
date: 19-07-2025
media:
  - 140-1.jpg
  - 140-2.jpg
  - 140-3.jpg
```

It's a bit trickier with the Jetson because it doesn't have holes on the dev board. I had to drill some holes myself, I hope I didn't touch anything important and it's still working.

---

```yaml
id: 141
date: 19-07-2025
media:
  - 141-1.jpg
  - 141-2.jpg
  - 141-3.jpg
```

Next is the four-channel INA. I'll write about it a bit later. Today I soldered 4 shunts of 0.01 Ohm to measure current and voltage at different points.

---

```yaml
id: 142
date: 19-07-2025
media:
  - 142-1.jpg
```

Put everything together but haven’t connected the wires yet. Wanted to see how it looks assembled. No arm for now, I’ll add it a bit later or maybe leave it for the next milestone.

---

```yaml
id: 143
date: 19-07-2025
media:
  - 143-1.jpg
  - 143-2.jpg
  - 143-3.jpg
  - 143-4.jpg
  - 143-5.jpg
  - 143-6.jpg
```

The battery, of course, makes it look a bit hunchbacked and the stereo camera adds some facial expression. With the arm it'll look even funnier. The front is a bit empty for now but that's where the arm controller will go. In the future there will also be a lidar but that's for later. The problem is that the camera has a minimum depth measurement of 30 cm, so right in front of the robot it has a blind spot. I'll have to find a way to deal with that too.

---

```yaml
id: 144
date: 19-07-2025
media:
  - 144-1.jpg
```

Kind of reminds me of the robot from the movie “WALL-E”. Overall I'm happy with how it looks and how everything fit in. Now I need to connect the wires and check that everything works.

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

Wired up the rear motor controller, voltage sensor, 2 step down regulators - one for the servo steering, the other for the motors and controller - and started it up from the battery. Looks like nothing smoked, that's a good sign.

---

```yaml
id: 147
date: 21-07-2025
media:
  - 147-1.jpg
```

Today I wired up all the cables and components. Had to take it apart and put it back together five times because every time some new crap came up.

On the bright side, the battery is awesome. First, it can pass current when it’s plugged into the charger and it can charge and power the robot at the same time.

---

```yaml
id: 148
date: 21-07-2025
media:
  - 148-1.mp4
```

Big milestone. It can move and be controlled remotely.

-   runs on battery
-   video streams in real time at 720p@30
-   controller lag is minimal

Problems:

-   steering is super twitchy
-   gear ratio is way too high and the robot is really slow and noisy (bldc?)
-   video isn’t compressed with h264, I just take every frame and compress it as jpeg so tons of gigabytes are flying around, which won’t work over 4g
-   steering angles are very small, need to redo the hub and links

---

```yaml
id: 149
date: 22-07-2025
```

Today I caught myself thinking that there are so many cool ideas I want to try out but already a ton of technical debt I probably should deal with first.

At the very least, I really want to finish the mechanics right now so I can move on to perception.

-   redo the steering
-   reinforce the second floor (laser cut an acrylic plate and rebuild on a new platform)
-   change the rear motors or raise the axles a bit and buy bigger wheels
-   tweak the acceleration or distribute the weight better (right now the rabbit jumps a bit when accelerating hard)

---

```yaml
id: 150
date: 22-07-2025
```

Another disappointment: the NVIDIA Jetson Orin nano doesn't have hardware h264 encoding.

---

```yaml
id: 151
date: 22-07-2025
```

Because of this, the idea brings a few other problems. At first, I thought about making several nodes that work with the camera. Since only one process can access the camera, I thought about local streaming through the ZED SDK. So, one process connects to the camera and streams a compressed h264 stream. The SDK also allows you to read other parameters through streaming as if you’re using the camera locally. But the problem is the streaming in the SDK really depends on hardware encoding and without it everything crashes and doesn’t work.

---

```yaml
id: 152
date: 22-07-2025
```

Now I have to squash everything back into a single node that exclusively has access to the camera and does everything.

---

```yaml
id: 153
date: 22-07-2025
media:
  - 153-1.mp4
```

I couldn’t resist and decided to play around with points cloud and depth measurement. For now I tried the lightest model.

What you see at the bottom of the screen isn’t SLAM yet, it’s just a stateless point cloud that gets published from the robot to nats at 30hz and drawn using treejs in the browser. The further a point is, the greener it gets. That’s just for convenience but in code it’s just a 3 or 4 dimensional matrix (4 if you want to keep the original camera color)

Turns out the tricky part is that 1280x720 is way too heavy and just the raw byte blob of this matrix is 70+Mb. Pumping such an array 30 times a second is impossible because of the 64Mb per message limit and bandwidth restrictions. After dropping the resolution to 320p and compressing it with zlib, I managed to get a couple hundred kilobytes which seems ok. Plus this matrix is sparse so you could also cut out the zeros. Maybe it doesn’t even make sense if you compress anyway.

---

```yaml
id: 154
date: 22-07-2025
```

Because the baseline of the stereo pair is pretty wide it can only measure depth from 30 cm. This creates a blind spot in front of the robot. Tolerable but not very nice. Maybe it's worth thinking about a lidar or a proximity sensor for obstacle avoidance.

---

```yaml
id: 155
date: 22-07-2025
```

I'm really annoyed that NVIDIA removed the hardware h264 encoder from the Jetson even though they market it as an edge AI device with two CSI ports for cameras. With a software codec, CPU load at 1080p@30fps reaches up to 40% and power consumption shoots up a lot.

After looking into the topic a bit, it feels like the Raspberry Pi 5 also lost the hardware encoder because of a chip shortage, but the rpi4 still has it. By the way, I have one and used it in the robot until I rebuilt it with a Jetson. At the same resolution and frame rate, the rpi4 pulls a bit over 5W and CPU load isn’t more than 5% handling the stream without any hiccups.

Now I’m starting to think maybe moving all the mechanics control and camera streaming from the Jetson to the rpi and merging them into a cluster isn’t such a bad idea. It seems like the extra 5W won’t matter but will free up all resources for Huang.

Now there's the question of how to connect them together since a NATS server needs to run somewhere. Ethernet + a mini switch or ethernet over usb?

---

```yaml
id: 156
date: 22-07-2025
```

Decided to quickly throw together a blog in English just to have one. I'll repost all the posts from here there. [https://xrabbit.dev](https://xrabbit.dev)

---

```yaml
id: 157
date: 22-07-2025
media:
  - 157-1.mp4
```

More and more I'm using NATS in the project. Threw together a simple UI to control camera settings through the UI. For this I decided to step away from the idea of using pub sub for everything and check out jetstream. By default NATS core doesn't have persistence but you can turn it on by enabling jetstream. Basically it's just one flag and now you get a persistent KV store, object store and some delivery guarantees. All of this is really useful and super convenient to use. For example camera settings are just a KV. Both client and robot are subscribed to this key (in jetstream everything is still subjects) and can react to changes, both of them can also update the value and all clients instantly react to it, and after reboot the state is restored.

---

```yaml
id: 158
date: 22-07-2025
media:
  - 158-1.mp4
```

Spatial mapping + three.js
