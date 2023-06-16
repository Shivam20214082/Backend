const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./db/conn");

const User = require("./models/usermessage");
const User1 = require("./models/userlogin");
const User2 = require("./models/userorder");
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

const session = require("express-session");
app.use(
  session({
    secret: "your secret key",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());

// console.log(path.join(__dirname," ../public"));

app.use(express.urlencoded({ extended: false }));
app.use(
  "/css",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
);

app.use(function (req, res, next) {
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.usern = req.session.usern;
  res.locals.emailn = req.session.emailn;
  next();
});

app.use(express.static(static_path));
app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/login", (req, res) => {
  res.render("login");
});


app.get("/dashboard", async (req, res) => {
  try {
    const user = await User1.findOne({ username: req.session.usern });
    // console.log(req.session.usern);
    // console.log(req.session.emailn);
    // console.log(user);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const orders = await User2.find({ email: user.email });

    let formattedOrders = [];

    orders.forEach((order) => {
      let formattedCartItems = [];

      order.cartItems.forEach((item) => {
        let formattedItem = {
          productImage: item.image,
          productName: item.name,
          productPrice: item.price,
          productQuantity: item.quantity,
        };

        formattedCartItems.push(formattedItem);
      });

      let formattedOrder = {
        cartItems: formattedCartItems,
        paymentVerified: order.paymentVerified,
        date: order.date.toDateString(),
      };

      formattedOrders.push(formattedOrder);
    });

    // console.log(formattedOrders);
    res.render("dashboard", { orders: formattedOrders });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.get("/cart", (req, res) => {
  res.render("cart");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/daal", (req, res) => {
  res.render("daal");
});
app.get("/payment", (req, res) => {
  res.render("payment1");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/404", (req, res) => {
  res.render("404");
});
app.get("/daal", (req, res) => {
  res.render("daal");
});
app.get("/rice", (req, res) => {
  res.render("rice");
});
app.get("/almond", (req, res) => {
  res.render("almond");
});
app.get("/coconut", (req, res) => {
  res.render("coconut");
});
app.get("/jaggery", (req, res) => {
  res.render("jaggery");
});
app.get("/kaju", (req, res) => {
  res.render("kaju");
});
app.get("/milk", (req, res) => {
  res.render("milk");
});
app.get("/oil", (req, res) => {
  res.render("oil");
});
app.get("/resin", (req, res) => {
  res.render("resin");
});
app.get("/sugar", (req, res) => {
  res.render("sugar");
});
app.get("/aata", (req, res) => {
  res.render("wheat");
});
app.get("/soap", (req, res) => {
  res.render("soap");
});

app.post("/contact", async (req, res) => {
  try {
    // res.send(req.body);
    const userData = new User(req.body);
    await userData.save();
    res.status(201).render("index");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/address", async (req, res) => {
  try {

    const user = await User1.findOne({ username: req.session.usern });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const currentUserEmail = user.email;
    // console.log(currentUserEmail);
    const userData = new User2({
      ...req.body,
      email: currentUserEmail
    });

    // Update cartItems with data from req.body.cartItems
    userData.cartItems = JSON.parse(req.body.cartItems);

    await userData.save();
    res.status(201).render("dashboard");
  } catch (error) {
    res.status(500).send(error);
  }
});


app.post("/login", async (req, res) => {
  try {
    const userData = new User1(req.body);
    const user = await User1.findOne({ email: req.body.email });
    if (user) {
      res.redirect("/login?message=Account Already%20Exit with same Email id");
    }
    else{
      await userData.save();
      res.cookie("authToken", "123456789", { maxAge: 3600000, httpOnly: true });
      req.session.loggedIn = true;
      // console.log(req.session.loggedIn);
      // console.log(req.body.username);
      req.session.usern=req.body.username;
      req.session.emailn=req.body.email;
      // console.log(req.session.emailn);
      res.status(201).render("index");
    }
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.email === 1) {
      res.status(409).send("Email already exists");
    } else if (error.code === 11000 && error.keyPattern.username === 1) {
      res.redirect("/login?message=Username%20not Available");
    } else {
      res.status(500).send(error);
    }
  }
});

app.post("/check", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User1.findOne({ email: email });
    if (user && user.password === password) {
      res.cookie("authToken", "123456789", { maxAge: 3600000, httpOnly: true });

      // Add this code to set a flag in the session indicating that the user is logged in
      req.session.loggedIn = true;
      req.session.usern = user.username;
      res.status(201).render("index");
    } else {
      res.redirect("/login?message=Incorrect%20password");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.get("/logout", function (req, res) {
  // Destroy the user's session to log them out
  req.session.destroy(function (err) {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else {
      // Redirect the user to the homepage after they have been logged out
      res.redirect("/");
    }
  });
});

app.listen(port, () => {
  console.log(`server is running at port no ${port}`);
});
