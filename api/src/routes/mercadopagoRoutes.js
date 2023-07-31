

// Rutas pagos 
router.post('/generar-orden', postOCyDetalle); /**aqui oc y detalle OK  */
router.post('/webhook', receiveWebhook);
 router.post('/create-order', createPaymentPreference);

//  router.get("/success", async (req, res) => {
//   try {
//     // Obtener el correo electrónico del usuario desde la referencia externa
//     const correoUsuario = req.query.external_reference;
    
//     // Buscar la orden de compra por el correo electrónico del usuario
//     const {Oc} = require('../db.js'); // Importa el modelo Oc
//     const orden = await Oc.findOne({ where: {estadooc: 'pendiente' , loginuser: correoUsuario } });

//     if (orden) {
//       // Actualizar el estado de la orden de compra a 'success'
//       orden.estadooc = 'Exitoso';
//       await orden.save();
//       const fs = require('fs');
//     const path = require('path');
//     const nodemailer = require('nodemailer');
//       // Enviar correo electrónico de confirmación al usuario
//       const htmlFilePath = path.join(__dirname, '../html/mailpago.html');

//       // Leer el contenido del archivo HTML
//       const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
//       const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: 'all.market.henry@gmail.com',
//           pass: GOOGLE_TOKEN,
//         },
//       });

//       const mailOptions = {
//         from: 'all.market.henry@gmail.com',
//         to: correoUsuario,
//         subject: '¡Recibo de Compra!',
//         html : htmlContent,
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.error(error);
//         } else {
//           console.log('Correo electrónico enviado:', info.response);
//         }
//       });
//     }

//     res.send('Pago exitoso');
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// });

// router.get("/pending", async (req, res) => {
//   try {
//     // Obtener el correo electrónico del usuario desde la referencia externa
//     const correoUsuario = req.query.external_reference;

//     // Buscar la orden de compra por el correo electrónico del usuario
//     const {Oc} = require('../db.js'); // Importa el modelo Oc
//     const orden = await Oc.findOne({ where: { loginuser: correoUsuario } });

//     if (orden) {
//       // Actualizar el estado de la orden de compra a 'pending'
//       orden.estadooc = 'Pendiente';
//       await orden.save();
//     }

//     res.send('Pago pendiente');
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// });

// router.get("/failure", async (req, res) => {
//   try {
//     // Obtener el correo electrónico del usuario desde la referencia externa
//     const correoUsuario = req.query.external_reference;

//     // Buscar la orden de compra por el correo electrónico del usuario
//     const {Oc} = require('../db.js'); // Importa el modelo Oc
//     const orden = await Oc.findOne({ where: { loginuser: correoUsuario } });

//     if (orden) {
//       // Actualizar el estado de la orden de compra a 'failure'
//       orden.estadooc = 'Fallido';
//       await orden.save();
//     }

//     res.send('Pago fallido');
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// });



// router.post('/payment-notification', handlePaymentNotification);