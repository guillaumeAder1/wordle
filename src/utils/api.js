
export async function fetchNewWord() {
  // const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  // return response.json();
  return Promise.resolve({ newWord: 'toask' })
}
