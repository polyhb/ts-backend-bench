import autocannon from 'autocannon';

async function run() {
  const url = 'http://localhost:3000/authors/12';

  console.log('Running benchmark...');

  const instance = await autocannon({
    url,
    connections: 100, // default
    duration: 10, // default
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ age: 30 }),
    method: 'PUT'
  });

  console.log('Average requests', instance.requests.average);
}

run();
