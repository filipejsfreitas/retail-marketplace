def default_headers():
    return {'Content-Type': 'application/json'}


def auth_headers(bearer):
    return {'Content-Type': 'application/json', "Authorization": bearer}
