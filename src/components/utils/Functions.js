export const generateId = () => {
  return (
    String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
    Math.floor(Math.random() * Date.now())
      .toString()
      .substring(0, 4)
  );
};

export const encodeListOfProducts = (products) => {
  let articles = "";

  products.map((p) => {
   return articles += p.quantity + ":" + p.product.toUpperCase().trim() + ";";
  });

  return articles;
}

export const decodeListOfProducts = (codedPoducts) => {
  const row = codedPoducts.split(';');

  const products = row.map((p) => {
    let quantity = p.split(":")[0];
    let product = p.split(":")[1];
    return { quantity, product };
  });

  return products;
}

export const formatDateFromMilliseconds = (milliseconds) => {
  const date = new Date(milliseconds);
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const day = String(date.getDate()).padStart(2, '0');
  
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}
