// function fetchData() {
//   return new Promise((resolve, reject) => {
//     // 비동기 요청
//     const success = false;
//     if (success) {
//       resolve('성공');
//     } else {
//       reject('실패');
//     }
//   });
// }
//
// fetchData()
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

fetch('http://jsonplaceholder.typicode.com/todos/1')
  .then((response) => response.json())
  .then((json) => console.log(json))
  .then(() => fetchData('http://jsonplaceholder.typicode.com'))
  .then((response1) => response1.json())
  .then((json) => console.log(json))
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log('작업 끝');
  });
