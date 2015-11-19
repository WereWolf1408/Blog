__metaclass__ = type


class A(object):

    def __init__(self, name):
        self.__name = name

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, val):
        self.__name = val


class B(A):

    def __init__(self, name, age):
        super(B, self).__init__(self)
        self.name = name
        self.age = age



    def get_age(self):
        print(self.age)


a = A("class A")
b = B("class B", 100)
print (a.name)
print (b.name)
b.get_age()




