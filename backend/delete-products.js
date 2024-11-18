function sendRequest(number) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'DELETE',
    headers: headers,
    redirect: 'follow',
  };

  return fetch(
    'http://localhost:3000/product/' + number.toString(),
    requestOptions,
  ).then((res) => res.json());
}

function deleteProducts(number) {
  const productPromises = [];

  for (let i = 1; i <= number; i++) {
    const productPromise = sendRequest(i).then((json) => {
      console.log(json);
    });
    sendRequest(i);

    productPromises.push(productPromise);
  }

  return Promise.all(productPromises);
}

deleteProducts(200);
