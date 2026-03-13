!!! warning "Warning"
    This project is incomplete. <s>I've hit a major roadblock and haven't had the time to return to it! I do plan on completing this project sometime...</s>

!!! success "Progress"
    I've brought this project back and started working on it again! See below for details.

---

# ESP32 Alarm Clock

## Overview

A DIY alarm clock using a huge custom LED display <s>salvaged 7" LCD displays from old intercom devices</s>, an ESP32, and a wireless snooze button. It also displays the day & month, as well as outside temperature & weather.

---

## Hardware

- ESP32 microcontroller
- <s>7" LCD (salvaged from intercom)</s>
!!! warning "Undecided"
    Encountered severe issues with the intercom OS that would take too long to reverse-engineer. <s>I'm considering moving towards a small projector rather than an LCD...</s>
- Radio (or maybe bluetooth?) transmitter/receiver with a big ol' snooze button

---

## Features

- NTP time sync over WIFI, so the time is always accurate
- Accounts for daylight savings time
- Huge digits so my blind ahh can see the time when I'm in bed (without glasses)
- Segmented display showing the date (Formatted as "Nevaday, Octobuary 67th")
- Small LCD displaying the outdoor temperature (maybe, I add a thermometer to measure the indoor temp as well?)
    * Also, a little animation for the weather (clouds, sun, lightning, etc.)
- Touchscreen lcd for configuration menu
- Auto-dimming based off time (maybe add a photo-resistor?)
- RF recieving capabilities for wireless snooze feature/remote
- Self-power on/off with solid state relay


---

## Build Notes

!!! note "TODO"
    Add wiring diagrams, code snippets, images, and format this page properly

---

## Changelog
```changelog
@repo https://github.com/PolymorphicAgent/AlarmClock

## March 13, 2026
+ Ordered addressable LED strips.
~ The power requirements for this project. Obtained a 12V 10A (120W!) PSU.
+ Obtained a 12V to 5V automotive buck since most of the components run off 5V.
+ Plans to use small buck for ESP32 and other controllers.
+ Full inkscape draw-up of laser cuts needed in said plexiglass.
+ Ordered plexiglass (some opaque, and some translucent) for front face & shine-thru cutouts.
+ Started 3d printing light tubes & led backing holders.

## March 11, 2026
~ Brought this project back from the dead!
- Intercom LCD integration attempt.
+ Plans for a custom giant LED wall.
+ Plans for a segmented display showing the date.
+ Started sourcing 16 segment displays for date display.
+ Plans for a small LCD displaying the outdoor temperature.
+ Plans for a small touchscreen for editing user configuration.
+ Plans for RF receiving capabilities.
+ Plans for self-power on/off with solid state relay.

## December 5, 2025
! Ran head-first into a brick wall with the intercom display.
- Shelved this project indefinitely.

## November 3, 2025
+ Initial idea for this project.
+ Started poking Claude for help hacking the Intercom display.

```