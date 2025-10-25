/**
 * Validate a product object against rules.
 * @param {object} product - Product data
 * @param {array} productsList - Existing products list to check SKU uniqueness
 * @returns {object} errors - key:value pair of field errors
 */
export const validateProduct = (product, productsList) => {
  const errors = {};

  // Name: letters, numbers, spaces only
  if (!/^[a-zA-Z0-9\s]+$/.test(product.name)) {
    errors.name = "Name must contain only letters and numbers";
  }

  // Price: positive number (allow 2 decimals)
  if (!/^\d+(\.\d{1,2})?$/.test(product.price) || Number(product.price) <= 0) {
    errors.price = "Price must be a positive number (max 2 decimals)";
  }

  // Quantity: positive integer
  if (!product.quantity || Number(product.quantity) <= 0 || !Number.isInteger(Number(product.quantity))) {
    errors.quantity = "Quantity must be a positive integer";
  }

  // SKU: required & unique
  if (!product.sku) {
    errors.sku = "SKU is required";
  } else if (productsList.some(p => p.sku === product.sku)) {
    errors.sku = "SKU must be unique";
  }


  return errors;
};
