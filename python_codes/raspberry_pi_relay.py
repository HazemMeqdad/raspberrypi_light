# import RPi.GPIO as GPIO
import time

# GPIO.setwarnings(False)
# GPIO.setmode(GPIO.BCM)

# GPIO.setup(18, GPIO.OUT)

def read_state():
    with open("../state.txt", "r") as file:
        state = file.read()
    if state == "exit":
        exit()
    return True if state == "true" else False

while True:
    state = read_state()
    print(state)
    # if state == True:
    #     GPIO.output(18, 0)
    # else:
    #     GPIO.output(18, 1)
    time.sleep(0.1)
