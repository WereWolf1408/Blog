try:
    a = 10/0
    b = a * 2
except ZeroDivisionError:
    a = 12
finally:
    b = 10
    print ('finally')
