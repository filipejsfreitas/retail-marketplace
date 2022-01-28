import requests
import json
import random
from headers import auth_headers

possibilities = ["thin light type pretty easily,trust", "love new design key space mis type finger print recognition work ok use surface pro 3,positive", "attach easily firmly nice feel surface pro,fear", "original keyboard okay laptop feel bit floppy new solid feel key laptop like,positive", "purchase replace original surface pro 3 keyboard well feel fingerprint reader handy feature,positive", "find comfortable type rarely use fingerprint id,fear", "good keyboard addition surface pro platform desire fingerprint scanner access use surface pro keyboard fingerprint scanner work fine,trust", "tough get work surface pro 3 work bug love spacing large touchpad,negative", "quickly hassle free log surface finger print scanner work time problem get recognize fingerprint key space huge plus,fear", "accessory surface pro computer,fear", "fingerprint scanner price worth good keyboard fp scanner standard,positive", "keyboard feel surprisingly good consider thin key satisfy tactile response feel rubbery build quality excellent type cover rigid normal keyboard feel bend break overall excellent product complaint fingerprint reader consistently read finger scan finger 3 4 time read thankfully scanning process fast leave desire software problem hard say product 4/5 star,positive", "like fingerprint id make log easy fast key keyboard smooth,fear", "good product expensive easy setup plenty nice feature,positive", "best keyboard tablet connect,fear", "keyboard work perfectly complaint nice touch key illumination right,anger", "come mechanical switch keyboard thinkpads type upwards 120 wpm picky keyboard having try type cover keyboard clearly good well lot laptop keyboard market tactile audible feedback key travel effective palm rejection size keyboard easy toggling row special key function key press fn key large glassy smooth touchpad backlight bonus fingerprint reader easy biometric log thin light package perfect surface pro 4 backwards compatible surface pro 3,positive", "keyboard solid work great love cover,positive", "surface pro 4 surface pro 3 treat decide new pen keyboard windows hello feature work flawlessly second typing experience completely different wonder microsoft start recommend keyboard change typing experience surface line product,positive", "good keyboard like fingerprint reader fast accurate,positive", "buy surface pro 4 windows hello extra login option love type cover feel great hand carry key feel like real laptop highly recommend sp4 sp3 user,positive",
                 "buy surface pro 3 awesome keyboard give feel keyboard key space apart fingerprint simply awesome recognize fingerprint fast wish window application utilize feature near future like ios app iphone,positive", "lightweight responsive especially like lighted key function excellent unit,trust", "work surface pro 3 feel great scanner work,fear", "far keyboard fantastic problem key spacing feel fairly natural complaint keyboard,negative", "great keyboard fingerprint reader quick accurate,positive", "encounter wrong occasionally touch pad little sensitive,positive", "key feel like size keyboard use touchpad fingerprint reader work advertise,positive", "good keyboard fingerprint scanner work sp3,trust", "surface pro 3 far good typing cover device finally feel like real keyboard finger print sensor work nice extra backlit great,trust", "keyboard necessary device come free device,fear", "key wider space backlighte well fingerprint reader work super keyboard stiff improve product original surface pro 3 keyboard worth penny extra cost,positive", "key great fingerprint recognition generally work fingerprint like way keyboard click surface pro,fear", "trackpad vast improvement surface 3 type keyboard keypad vastly improve,trust", "great product overall fingerprint scanner work like charm issue whatsoever great design,positive", "accessory plan surface,anticipation", "keyboard work great surface pro 4 provide security comfortable work key spacing good,trust", "have couple surface(s keyboard good love fingerprint id log feel key responsive compare old keyboard version,positive", "wish work seperate tablet way bluetooth connection,fear", "nice keyboard fingerprint reading work windows 10,positive", "upgrade current surface 2 pro difference obvious key feel great responsive bit expensive surface cheap highly recommend,trust", "great feeling easy type keyboard lighting nice variable brightness level turn mouse pad smooth responsive decently large add fingerprint scanner nice feature sign surface accurate add multiple fingerprint use,positive", "hear surface pro 4 keyboard work surface pro 3 intrigue purchase keyboard impressed greatly keyboard well layout well feel bit accurate fingerprint d feature add bonus surface pro 3 4 owner keyboard worth price,positive", "purchase surface pro 3 year weak link product type cover trackpad small key close new type cover change game trackpad large responsive long carry wireless mouse key well space fingerprint reader make unlock system breeze cover backwards compatible pro 3 4 away star store pen think upgrade surface pro 3 owner greatly improve usability product,trust", "like key spacing fingerprint reader work great,positive"]

comments = [
#    {"title": "Title", "comment": "Comment", "score": 4,
#        "clientKey": "client", "productKey": "desktophp"}
]


def generate_comment(state, clientKey, productKey):
    sel = possibilities[random.randrange(len(possibilities))]
    return {
        "title": sel[:sel.index(" ")].capitalize(),
        "comment": sel,
        "score": random.randrange(2, 5),
        "clientKey": clientKey, "productKey": productKey,
    }


def populate_comments(state):
    random.seed(0)
    state.logger.info("Generating comments.")
    for clientKey in state.clients:
        for productKey in state.products:
            if random.random() < 0.2:
                state.comments.append(generate_comment(
                    state, clientKey, productKey))


def add_comment(state, comment):
    url = state.baseurl + "/product/" + \
        state.products[comment["productKey"]]["_id"] + "/comment"
    state.logger.info("Adding comment on '" + comment["productKey"] + "'.")

    payload = {}
    for key in ["title", "comment", "score"]:
        payload[key] = comment[key]

    rep = requests.request(
        "POST", url, headers=auth_headers(state.clients[comment["clientKey"]]["token"]), data=json.dumps(payload))
    comment["_id"] = rep.json()["data"]["_id"]


def add_comments(state):
    for comment in state.comments:
        add_comment(state, comment)
