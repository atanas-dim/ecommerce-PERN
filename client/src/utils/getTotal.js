export function getTotal(products) {
  let sum = 0;
  products.forEach((product) => {
    sum += product.price * product.quantity;
  });
  return sum;
}
