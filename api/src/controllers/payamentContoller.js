const mercadopago = require('mercadopago');
require('dotenv').config();

// Configure Mercado Pago access token
mercadopago.configure({
  access_token: 'TEST-4280842424471491-070211-516c8b20e0878a4ffcd8b1635fd20deb-1409292019', 
});

// Function to create payment preference
const createPaymentPreference = (description, price, quantity) => {
  return new Promise((resolve, reject) => {
    let preference = {
      items: [
        {
          title: description,
          unit_price: Number(price),
          quantity: Number(quantity),
        },
      ],
      back_urls: {
        success: "http://localhost:3000/Tienda",
        failure: "http://localhost:3000/Tienda",
        pending: "",
      },
      auto_return: "approved",
    };

    mercadopago.preferences.create(preference)
      .then(function (response) {
        resolve(response.body.id);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

module.exports = { createPaymentPreference };
