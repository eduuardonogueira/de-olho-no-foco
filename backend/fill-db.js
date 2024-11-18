const headers = new Headers();
headers.append('Content-Type', 'application/json');

function getRandomNumber(min, max) {
  const randomNumber = Math.random() * (max - min + 1) + min;
  return Math.floor(randomNumber);
}

class CreateProduct {
  constructor(product) {
    this.trueOrFalse = [true, false];
    this.product = product;
    this.discountPrice;
    this.discountPercent;
  }

  hasDiscount() {
    const discount = this.trueOrFalse[getRandomNumber(0, 1)];
    if (discount) {
      const price = this.product.price;
      this.discountPercent = getRandomNumber(1, 100);
      const percent = this.discountPercent / 100;
      this.discountPrice = price - percent * price;
    }
  }

  createProduct() {
    this.hasDiscount();
    const raw = JSON.stringify({
      name: this.product.title.slice(0, 50),
      sku: 'SS001',
      categoryId: getRandomNumber(2, 4),
      price: this.product.price,
      description: this.product.description.slice(0, 250),
      largeDescription: `${this.product.description} \n ${this.product.title}`,
      isNew: this.trueOrFalse[getRandomNumber(0, 1)],
      imageLink: this.product.image,
      discountPrice: this.discountPrice,
      discountPercent: this.discountPercent,
      otherImagesLink: [
        'https://i.postimg.cc/XYD2ts21/miniatura1-sofa.png',
        'https://i.postimg.cc/XYvH2Rgy/miniatura2-sofa.png',
        'https://i.postimg.cc/DzJCh1Hv/miniatura3-sofa.png',
        'https://i.postimg.cc/KY608Rhn/miniatura4-sofa.png',
      ],
    });
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://localhost:3000/product/register', requestOptions).catch(
      (error) => console.error(error),
    );
  }
}

async function getProductInformation(number) {
  return fetch(`https://fakestoreapi.com/products/${number.toString()}`).then(
    (res) => res.json(),
  );
}

function createProductsInDb(numProducts) {
  const productPromises = [];

  for (let i = 0; i < numProducts; i++) {
    const productPromise = getProductInformation(i).then((json) => {
      console.log(json);
      const product = new CreateProduct(json);
      product.createProduct();
    });

    productPromises.push(productPromise);
  }

  return Promise.all(productPromises);
}

createProductsInDb(30)
  .then(() => {
    console.log('All requests were concluded');
  })
  .catch((error) => {
    console.error('Somethin is wrong:', error);
  });
