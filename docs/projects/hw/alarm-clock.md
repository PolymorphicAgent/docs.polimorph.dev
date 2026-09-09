!!! warning "Warning"
    This project is incomplete. <s>I've hit a major roadblock and haven't had the time to return to it! I do plan on completing this project sometime...</s>

!!! success "Progress"
    I've brought this project back and started working on it again! See below for details.

---

# Alarm Clock

## Overview

A DIY alarm clock using a huge custom LED display <s>salvaged 7" LCD displays from old intercom devices</s>, ESP32, wireless snooze button, and a plethora of misc. sensors. It also displays the day & month, indoor/outdoor temperature, weather, and humidity, alongside custom audio output.

---

## Hardware

- ESP32 microcontroller, directly soldered to mainboard
- DS3231 high-precision timekeeping
- PCM5102A stereo output for alarms (no preamp)
- AHT20 temperature and humidity sensor
- BH1750 ambient light sensor for auto-dimming
- well-documented LMR36520ADDAR buck IC for a stable logic rail
- Custom PCBs throughout
- <s>7" LCD (salvaged from intercom)</s>
!!! warning "Undecided"
    Encountered severe issues with the intercom OS that would take too long to reverse-engineer. <s>I'm considering moving towards a small projector rather than an LCD...</s>
- Radio transmitter/receiver for snooze button

---

## Features

- NTP time sync over WIFI, with DS3231 as backup for wifi blackouts
    * Adjusts for daylight savings time
- 200mmx400mm digits so I can see the time without my glasses in bed
- 15 16-segment displays showing the date, driven off 5 chainable custom PCBs
- 2x touchscreen TFT LCDs displaying the indoor/outdoor climate
    * custom UI for changing user preferences
    * AHT20 for indoor temperature and humidity
- Auto-dimming based off ambient brightness with BH1750
    * positioned to minimize photonic feedback
- RF receiver for wireless snooze feature/remote
- Low-power mode with solid state relay
- Custom alarm sounds with pcm5102a
- 12v trigger feature for external alarms

---

## Build Notes

!!! note "TODO"
    Add wiring diagrams, code snippets, images, and format this page properly

---

## Changelog
```changelog
@repo https://github.com/PolymorphicAgent/AlarmClock

## September 9, 2026
+ Updated this page with the current state of things. Full documentation formatting deferred until project completion. A private progress log is being kept. 
+ Laser-cut the plexiglass front panels, spray-painted their backs to make them completely opaque
+ Obtained and cut lumber for frame
+ Several firmware demos for a breadboarded mainboard
+ Continue designing the mainboard. Progress will be slow due to classes possessing a higher priority!

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