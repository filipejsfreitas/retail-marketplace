#!/usr/bin/env python3
from logger import Logger
from clients import *
from sellers import *

logger = Logger()

for client in clients:
    add_client(logger, client)

for seller in sellers:
    add_seller(logger, seller)