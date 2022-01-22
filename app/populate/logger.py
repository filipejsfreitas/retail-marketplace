class Logger:
    def __init__(self):
        self.depth = 0

    def spc(self):
        for i in range(self.depth):
            print("  ", end="")

    def info(self, str):
        print("[INFO]: ", end="")
        self.spc()
        print(str)

    def push(self):
        self.depth += 1

    def pop(self):
        self.depth -= 1