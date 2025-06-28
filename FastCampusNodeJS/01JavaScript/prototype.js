let user = {
  name: 'John',
  age: 45,
  email: 'abcqkdnxm@naver.com',
};

console.log(user.name);
console.log(user.hasOwnProperty('email'));

// function Person(name, email, birthday) {
//   this.name = name;
//   this.email = email;
//   this.birthday = birthday;
// }
//
// Person.prototype.calculateAge = function () {
//   const diff = Date.now() - this.birthday.getTime();
//   const ageDate = new Date(diff);
//   return Math.abs(ageDate.getUTCFullYear() - 1970);
// };
//
// const john = new Person('John', 'john@example.com', '7-10-91');
// const han = new Person('han', 'han@example.com', '2-11-91');
// console.log(han);
// console.log(john);

// Object 이용
function Person(name, email, birthday) {
  const person = Object.create(personPrototype);
  person.name = name;
  person.email = email;
  person.birthday = new Date(birthday);

  return person;
}

const personPrototype = {
  calculateAge() {
    const diff = Date.now() - this.birthday.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  },
};

const john = new Person('John', 'john@example.com', '7-10-91');
const han = new Person('han', 'han@example.com', '2-11-91');
console.log(han);
console.log(john);
