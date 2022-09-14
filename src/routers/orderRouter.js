import express from "express";
const router = express.Router();

const ordersArg = [
  {
    _id: "11",
    status: "processong", // processing, completed, cancelled
    buyer: {
      buyerId: "skfjlsdjfl434",
      fName: "Prem",
      lName: "sdfs",
      email: "slfjsd@sfd.com",
      phone: "567890004",
    },
    cart: [
      {
        productId: "sjflksd94ksd",
        productName: "sfjalsjdf",
        salesPrice: 100,
        qty: 3,
        thumbnail: "http://...",
        subTotal: 300,
      },
      {
        productId: "s34ksd94ksd",
        productName: "sfjalsjdf",
        salesPrice: 200,
        qty: 1,
        thumbnail: "http://...",
        subTotal: 200,
      },
    ],
    shipping: {
      street: "10 george st",
      suburb: "Sydney",
      postcode: 2000,
      state: "NSW",
      countery: "Australia",
    },
    cartTotal: 450,
    dispcount: 50,
    discountCode: "sldjkfl",
    totalAmount: 400, // cartTotal - dispcount
    paymentInfo: {
      status: "paid", // paid, pending
      method: "cash", //cash or credit card,....
      paidAmount: 400,
      transactionId: "sljflsdjf",
      paidDate: "2020-02-20",
    },
  },
  {
    _id: "1",
    status: "processong", // processing, completed, cancelled
    buyer: {
      buyerId: "skfjlsdjfl434",
      fName: "Prem",
      lName: "sdfs",
      email: "slfjsd@sfd.com",
      phone: "567890004",
    },
    cart: [
      {
        productId: "sjflksd94ksd",
        productName: "sfjalsjdf",
        salesPrice: 100,
        qty: 3,
        thumbnail: "http://...",
        subTotal: 300,
      },
      {
        productId: "s34ksd94ksd",
        productName: "sfjalsjdf",
        salesPrice: 200,
        qty: 1,
        thumbnail: "http://...",
        subTotal: 200,
      },
    ],
    shipping: {
      street: "10 george st",
      suburb: "Sydney",
      postcode: 2000,
      state: "NSW",
      countery: "Australia",
    },
    cartTotal: 450,
    dispcount: 50,
    discountCode: "sldjkfl",
    totalAmount: 400, // cartTotal - dispcount
    paymentInfo: {
      status: "paid", // paid, pending
      method: "cash", //cash or credit card,....
      paidAmount: 400,
      transactionId: "sljflsdjf",
      paidDate: "2020-02-20",
    },
  },
  {
    _id: "1",
    status: "processong", // processing, completed, cancelled
    buyer: {
      buyerId: "skfjlsdjfl434",
      fName: "Prem",
      lName: "sdfs",
      email: "slfjsd@sfd.com",
      phone: "567890004",
    },
    cart: [
      {
        productId: "sjflksd94ksd",
        productName: "sfjalsjdf",
        salesPrice: 100,
        qty: 3,
        thumbnail: "http://...",
        subTotal: 300,
      },
      {
        productId: "s34ksd94ksd",
        productName: "sfjalsjdf",
        salesPrice: 200,
        qty: 1,
        thumbnail: "http://...",
        subTotal: 200,
      },
    ],
    shipping: {
      street: "10 george st",
      suburb: "Sydney",
      postcode: 2000,
      state: "NSW",
      countery: "Australia",
    },
    cartTotal: 450,
    dispcount: 50,
    discountCode: "sldjkfl",
    totalAmount: 400, // cartTotal - dispcount
    paymentInfo: {
      status: "paid", // paid, pending
      method: "cash", //cash or credit card,....
      paidAmount: 400,
      transactionId: "sljflsdjf",
      paidDate: "2020-02-20",
    },
  },
  {
    _id: "1",
    status: "processong", // processing, completed, cancelled
    buyer: {
      buyerId: "skfjlsdjfl434",
      fName: "Prem",
      lName: "sdfs",
      email: "slfjsd@sfd.com",
      phone: "567890004",
    },
    cart: [
      {
        productId: "sjflksd94ksd",
        productName: "sfjalsjdf",
        salesPrice: 100,
        qty: 3,
        thumbnail: "http://...",
        subTotal: 300,
      },
      {
        productId: "s34ksd94ksd",
        productName: "sfjalsjdf",
        salesPrice: 200,
        qty: 1,
        thumbnail: "http://...",
        subTotal: 200,
      },
    ],
    shipping: {
      street: "10 george st",
      suburb: "Sydney",
      postcode: 2000,
      state: "NSW",
      countery: "Australia",
    },
    cartTotal: 450,
    dispcount: 50,
    discountCode: "sldjkfl",
    totalAmount: 400, // cartTotal - dispcount
    paymentInfo: {
      status: "paid", // paid, pending
      method: "cash", //cash or credit card,....
      paidAmount: 400,
      transactionId: "sljflsdjf",
      paidDate: "2020-02-20",
    },
  },
  {
    _id: "1",
    status: "processong", // processing, completed, cancelled
    buyer: {
      buyerId: "skfjlsdjfl434",
      fName: "Prem",
      lName: "sdfs",
      email: "slfjsd@sfd.com",
      phone: "567890004",
    },
    cart: [
      {
        productId: "sjflksd94ksd",
        productName: "sfjalsjdf",
        salesPrice: 100,
        qty: 3,
        thumbnail: "http://...",
        subTotal: 300,
      },
      {
        productId: "s34ksd94ksd",
        productName: "sfjalsjdf",
        salesPrice: 200,
        qty: 1,
        thumbnail: "http://...",
        subTotal: 200,
      },
    ],
    shipping: {
      street: "10 george st",
      suburb: "Sydney",
      postcode: 2000,
      state: "NSW",
      countery: "Australia",
    },
    cartTotal: 450,
    dispcount: 50,
    discountCode: "sldjkfl",
    totalAmount: 400, // cartTotal - dispcount
    paymentInfo: {
      status: "paid", // paid, pending
      method: "cash", //cash or credit card,....
      paidAmount: 400,
      transactionId: "sljflsdjf",
      paidDate: "2020-02-20",
    },
  },
  {
    _id: "1",
    status: "processong", // processing, completed, cancelled
    buyer: {
      buyerId: "skfjlsdjfl434",
      fName: "Prem",
      lName: "sdfs",
      email: "slfjsd@sfd.com",
      phone: "567890004",
    },
    cart: [
      {
        productId: "sjflksd94ksd",
        productName: "sfjalsjdf",
        salesPrice: 100,
        qty: 3,
        thumbnail: "http://...",
        subTotal: 300,
      },
      {
        productId: "s34ksd94ksd",
        productName: "sfjalsjdf",
        salesPrice: 200,
        qty: 1,
        thumbnail: "http://...",
        subTotal: 200,
      },
    ],
    shipping: {
      street: "10 george st",
      suburb: "Sydney",
      postcode: 2000,
      state: "NSW",
      countery: "Australia",
    },
    cartTotal: 450,
    dispcount: 50,
    discountCode: "sldjkfl",
    totalAmount: 400, // cartTotal - dispcount
    paymentInfo: {
      status: "paid", // paid, pending
      method: "cash", //cash or credit card,....
      paidAmount: 400,
      transactionId: "sljflsdjf",
      paidDate: "2020-02-20",
    },
  },
  {
    _id: "1",
    status: "processong", // processing, completed, cancelled
    buyer: {
      buyerId: "skfjlsdjfl434",
      fName: "Prem",
      lName: "sdfs",
      email: "slfjsd@sfd.com",
      phone: "567890004",
    },
    cart: [
      {
        productId: "sjflksd94ksd",
        productName: "sfjalsjdf",
        salesPrice: 100,
        qty: 3,
        thumbnail: "http://...",
        subTotal: 300,
      },
      {
        productId: "s34ksd94ksd",
        productName: "sfjalsjdf",
        salesPrice: 200,
        qty: 1,
        thumbnail: "http://...",
        subTotal: 200,
      },
    ],
    shipping: {
      street: "10 george st",
      suburb: "Sydney",
      postcode: 2000,
      state: "NSW",
      countery: "Australia",
    },
    cartTotal: 450,
    dispcount: 50,
    discountCode: "sldjkfl",
    totalAmount: 400, // cartTotal - dispcount
    paymentInfo: {
      status: "paid", // paid, pending
      method: "cash", //cash or credit card,....
      paidAmount: 400,
      transactionId: "sljflsdjf",
      paidDate: "2020-02-20",
    },
  },
  {
    _id: "1",
    status: "processong", // processing, completed, cancelled
    buyer: {
      buyerId: "skfjlsdjfl434",
      fName: "Prem",
      lName: "sdfs",
      email: "slfjsd@sfd.com",
      phone: "567890004",
    },
    cart: [
      {
        productId: "sjflksd94ksd",
        productName: "sfjalsjdf",
        salesPrice: 100,
        qty: 3,
        thumbnail: "http://...",
        subTotal: 300,
      },
      {
        productId: "s34ksd94ksd",
        productName: "sfjalsjdf",
        salesPrice: 200,
        qty: 1,
        thumbnail: "http://...",
        subTotal: 200,
      },
    ],
    shipping: {
      street: "10 george st",
      suburb: "Sydney",
      postcode: 2000,
      state: "NSW",
      countery: "Australia",
    },
    cartTotal: 450,
    dispcount: 50,
    discountCode: "sldjkfl",
    totalAmount: 400, // cartTotal - dispcount
    paymentInfo: {
      status: "paid", // paid, pending
      method: "cash", //cash or credit card,....
      paidAmount: 400,
      transactionId: "sljflsdjf",
      paidDate: "2020-02-20",
    },
  },
  {
    _id: "1",
    status: "processong", // processing, completed, cancelled
    buyer: {
      buyerId: "skfjlsdjfl434",
      fName: "Prem",
      lName: "sdfs",
      email: "slfjsd@sfd.com",
      phone: "567890004",
    },
    cart: [
      {
        productId: "sjflksd94ksd",
        productName: "sfjalsjdf",
        salesPrice: 100,
        qty: 3,
        thumbnail: "http://...",
        subTotal: 300,
      },
      {
        productId: "s34ksd94ksd",
        productName: "sfjalsjdf",
        salesPrice: 200,
        qty: 1,
        thumbnail: "http://...",
        subTotal: 200,
      },
    ],
    shipping: {
      street: "10 george st",
      suburb: "Sydney",
      postcode: 2000,
      state: "NSW",
      countery: "Australia",
    },
    cartTotal: 450,
    dispcount: 50,
    discountCode: "sldjkfl",
    totalAmount: 400, // cartTotal - dispcount
    paymentInfo: {
      status: "paid", // paid, pending
      method: "cash", //cash or credit card,....
      paidAmount: 400,
      transactionId: "sljflsdjf",
      paidDate: "2020-02-20",
    },
  },
  {
    _id: "1",
    status: "processong", // processing, completed, cancelled
    buyer: {
      buyerId: "skfjlsdjfl434",
      fName: "Prem",
      lName: "sdfs",
      email: "slfjsd@sfd.com",
      phone: "567890004",
    },
    cart: [
      {
        productId: "sjflksd94ksd",
        productName: "sfjalsjdf",
        salesPrice: 100,
        qty: 3,
        thumbnail: "http://...",
        subTotal: 300,
      },
      {
        productId: "s34ksd94ksd",
        productName: "sfjalsjdf",
        salesPrice: 200,
        qty: 1,
        thumbnail: "http://...",
        subTotal: 200,
      },
    ],
    shipping: {
      street: "10 george st",
      suburb: "Sydney",
      postcode: 2000,
      state: "NSW",
      countery: "Australia",
    },
    cartTotal: 450,
    dispcount: 50,
    discountCode: "sldjkfl",
    totalAmount: 400, // cartTotal - dispcount
    paymentInfo: {
      status: "paid", // paid, pending
      method: "cash", //cash or credit card,....
      paidAmount: 400,
      transactionId: "sljflsdjf",
      paidDate: "2020-02-20",
    },
  },
];

router.get("/:_id?", (req, res, next) => {
  try {
    const { _id } = req.params;
    const orders = _id
      ? ordersArg.filter((item) => item._id === _id)[0]
      : ordersArg;
    res.json({
      status: "success",
      message: "order list",
      orders,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
