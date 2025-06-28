const user = {
  name: 'han',
  province: '경기도',
  city: '성남시',
};

for (let x in user) {
  console.log(`${x}: ${user[x]}`);
}

let i = 0;
while (i < 10) {
  console.log(i);
  i++;
}

i = 100;

do {
  console.log('number' + i);
  i++;
} while (i < 1000);

const locations = ['서울', '부산', '경기도', '대구'];

// Foreach -> 배열요소 반복
locations.forEach(function (location, index, array) {
  console.log(`${index} : ${location}`);
  console.log(array);
});

// map
locations.map(function (location) {
  console.log(location);
});
