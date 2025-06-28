async function makeRequest() {
  try {
    const response = await fetch('http://jsonplaceholder.typicode.com/todos/1');
    const jsonResponse = await response.json();
    console.log(jsonResponse);
  } catch (error) {
    console.log(error);
  } finally {
    console.log('작업 끝');
  }
}

makeRequest();
