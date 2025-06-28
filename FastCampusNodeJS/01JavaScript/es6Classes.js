class Person {
  constructor(name, email, birthday) {
    this.name = name;
    this.email = email;
    this.birthday = new Date(birthday);
  } // 클래스가 생성할 인스턴스

  introduce() {
    return `hello my name is ${this.name}`;
  }

  static multipleNumbers(x, y) {
    return x * y;
  }
}

const john = new Person('John', 'john@example.com', '10-3-98');
console.log(john);
