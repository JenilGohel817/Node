import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import Stripe from "stripe";
import cors from "cors";

const stripe = Stripe("key");
const app = express();
const port = 5000;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

app.post("/charge", async (req, res) => {
  try {
    const { amount, token } = req.body;

    const charge = await stripe.charges.create({
      amount: amount * 100, // amount in cents
      currency: "usd",
      source: token.id,
      description: "Sample Charge",
    });

    res.status(200).json({ success: true, charge });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
