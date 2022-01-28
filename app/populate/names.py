import random

fnames = ['Mark', 'Amber', 'Todd', 'Anita', 'Sandy']
lnames = ["Smith", "Johnson", "Williams", "Brown", "Jones"]

random.seed(0)

def first_name():
    return fnames[random.randrange(len(fnames))]

def last_name():
    return lnames[random.randrange(len(lnames))]