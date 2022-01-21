

import pandas as pd

data =pd.read_csv("DatafinitiElectronicsProductData.csv", delimiter=',')  

g = data['name'].unique()

l = []
for i in g:
    l.append(i.replace('\' ',''))
    

print (l)


'''
 Microsoft Surface Pro 4 Type Cover with Fingerprint ID , 
  Boytone - 2500W 2.1-Ch. Home Theater System - Black Diamond ,  
  Sanus VLF410B1 10-Inch Super Slim Full-Motion Mount for 37 - 84 Inches TVs ,
    Ultimate Ears MEGABLAST Portable Wi-Fi/Bluetooth Speaker with hands-free Amazon Alexa voice control (waterproof) - Graphite Black , 
     Flipside 300 Backpack (Black) ,  Corsair CMSA8GX3M2A1066C7 Apple 8 GB Dual Channel Kit DDR3 1066 (PC3 8500) 204-Pin DDR3 Laptop SO-DIMM Memory 1.5V ,  iHome Rechargeable 
Splash Proof Stereo Bluetooth Speaker - Black (IBT33BC) ,  Verizon MiFi 
6620L Jetpack 4G LTE Mobile Hotspot (Verizon Wireless) ,  JVC KD-X320BTS Apple iPod and Android Digital Media Receiver with Bluetooth ,  JBL - 6" x 8" 2-Way Coaxial Car Speakers with Polypropylene Cones (Pair) - Black ,  Lenovo - AC Adapter for Select Lenovo Yoga Laptops - Black ,  SiriusXM SXEZR1V1 XM Onyx EZR Satellite Radio Receiver with Vehicle Kit ,  PNY Anarchy 16GB Kit (2x8GB) DDR4 2400MHz (PC4-19200) CL15 Desktop Memory 
(BLUE) - MD16GK2D4240015AB ,  Slingbox M2 ,  Sony SRSHG1/BLK Hi-Res Wireless Speaker- Charcoal black ,  Midland Weather Alert Radio, 1.0 CT ,  Sony Mini Digital Video Cassettes - DVC - 1 Hour ,  SRS-ZR7 Wireless Speaker ,  Toshiba - 3TB Internal Serial ATA III Hard Drive for Desktops ,  Power Acoustik - Gothic Series 10" Dual-Voice-Coil 2-Ohm Subwoofer - Black ,  The Rebel BT On-Ear Wireless Bluetooth Headphones (Black) ,  CRX-322 CD Receiver ,  DreamWave - Tremor Portable Bluetooth Speaker - Green,Black ,  Alpine ,  XPS 8920 Tower Desktop Computer ,  Air-Fi Runaway AF32 Stereo Bluetooth Wireless Headphones with Hidden Microphone (White) , 
 SAMSUNG 40 Class FHD (1080P) Smart LED TV (UN40M5300) ,  NS-SP1800BL 5.1-Channel Home Theater System (Black) ,  Acoustimass 6 Series V Home Theater Speaker System (Black) ,  Logitech G403 Wireless Gaming Mouse with 
High Performance Gaming Sensor ,  Sony MEXM100BT 160W RMS Marine CD Receiver with Bluetooth (Black) and SiriusXM Ready ,  Sony SRSXB30/BLK XB30 
Portable Wireless Speaker with Bluetooth ,  Sony LBT-GPX555 Mini-System 
with Bluetooth and NFC , 
 NS-IW480CWH In-Ceiling 8 Natural Sound Three-Way Speaker System (Pair) ,  
 Motorola Wi-Fi Pet Video Camera ,  AW6500 All-Weather Outdoor Speaker (White, Single) ,  
 Alpine - 6-1/2" 2-Way Coaxial Car Speakers with Polypropylene Cones (Pair) - Black ,  
 Travel RockStar 3-in-1 2A USB and Dual-Outlet Wall Charger with Internal 3000mAh Battery Pack ,  Bowers & Wilkins P7 Wired Over Ear Headphones ,  Everest Elite 700 Around-Ear Wireless Headphones (White) ,  Clarity - Super-Loud Phone Ringer - White ,  House of Marley EM-DH003-PS TTR Noise-Cancelling Over-Ear Headphones (Black) ,  Toshiba Micro Component Speaker System: Wireless Bluetooth Speaker Sound System with FM ,  Kicker 41IK5BT2V2 Amphitheater High-Performance Audio System with Bluetooth, Black ,  Prime Three-Way Center Channel Speaker (Premium Black Ash) ,  2TB Red 5400 rpm SATA III 3.5 Internal NAS HDD ,  Nighthawk AC1900 Dual-Band Wi-Fi USB Adapter ,  Samsung Universal 3100mAh Portable External Battery Charger - White ,  Logitech 915-000224  Harmony Ultimate One 15-Device Universal Infrared Remote with Customizable Touch Screen Control - Black ,  Round LCD/Projector Ceiling Plate - Black 
'''