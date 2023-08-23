import slugify from "slugify";
import ProductModel from "../models/ProductModel.js";
import Category from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import fs from "fs";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

const CreateProduct = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;

    console.log(name, slug, description, price, category, quantity, shipping);
    const { photo } = req.files;

    if (!name || !description || !price || !category || !quantity) {
      res.status(400).send({
        message: "All Field Required !",
        success: false,
      });
    }

    if (!photo && photo.size > 1000000) {
      res.status(500).send({
        message: "photo required & less then 1mb",
      });
    }

    const product = new ProductModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    const saveProduct = await product.save();

    res.status(201).send({
      success: true,
      message: "Product Created !",
      saveProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error,
      success: false,
      message: "Error In Product Create !",
    });
  }
};

const UpdateProduct = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;

    console.log(name, slug, description, price, category, quantity, shipping);
    const { photo } = req.files;

    if (!name || !description || !price || !category || !quantity) {
      res.status(400).send({
        message: "All Field Required !",
        success: false,
      });
    }

    if (!photo && photo.size > 1000000) {
      res.status(500).send({
        message: "photo required & less then 1mb",
      });
    }

    const product = await ProductModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      {
        new: true,
      }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    const updateProduct = await product.save();

    res.status(201).send({
      success: true,
      message: "Product Update !",
      updateProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error,
      success: false,
      message: "Error In Product Update !",
    });
  }
};

const GetAllProduct = async (req, res) => {
  try {
    const getProduct = await ProductModel.find({})
      .select("-photo")
      .limit(12)
      .populate("category")
      .sort({
        createdAt: -1,
      });

    res.status(200).send({
      getProduct,
      message: "Fetch All Product !",
      success: false,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error,
      success: false,
      message: "Error In Product Get !",
    });
  }
};
const productPhotoController = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

const GetSingleProduct = async (req, res) => {
  try {
    const product = await ProductModel.findOne({
      slug: req.params.slug,
    })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      product,
      success: true,
      message: "single category fetch !",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Single Data Not Fetch !",
      error,
    });
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const Delete = await ProductModel.findByIdAndDelete(req.params.pid).select(
      "-photo"
    );
    res.status(200).send({
      message: "Product Deleted !",
      success: true,
      Delete,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error,
      success: false,
      message: "Error In Product Delete !",
    });
  }
};

const PhotoController = async (req, res) => {
  try {
    const productImage = await ProductModel.findById(req.params.pid).select(
      "photo"
    );

    if (productImage.photo.data) {
      res.set("Content-type", productImage.photo.contentType);
      res.status(200).send(productImage.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({
      error,
      message: "Photo not fetch !",
      success: false,
    });
  }
};

const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};
    if (checked.length > 0) args.category = checked;

    if (radio.length)
      args.price = {
        $gte: radio[0],
        $lte: radio[1],
      };

    const product = await ProductModel.find(args);
    res.status(200).send({
      product,
    });
  } catch (error) {
    d;
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Filter",
      error,
    });
  }
};

const productCountController = async (req, res) => {
  try {
    const total = await ProductModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
  }
};

const productListController = async (req, res) => {
  try {
    const perPage = 3;
    const page = req.params.page ? req.params.page : 1;
    const product = await ProductModel.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).send({
      product,
      success: true,
    });
  } catch (error) {}
};

const SearchproductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await ProductModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");
    console.log(results);
    res.status(200).send({
      results,
      success: true,
      message: "search data...",
    });
  } catch (error) {
    console.log("==================", error);
    res.status(400).send({
      message: "Not Search",
      success: false,
      error,
    });
  }
};

const RealtedproductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const product = await ProductModel.find({
      category: cid,
      _id: { $ne: pid },
    })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      product,
      success: true,
      message: "Realted Product Fetched !",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Realted Product",
      error,
    });
  }
};

const productCategoryController = async (req, res) => {
  try {
    const category = await Category.findOne({
      slug: req.params.slug,
    });
    const product = await ProductModel.find({
      category,
    }).populate("category");
    res.status(200).send({
      success: true,
      message: "fetch Cate !",
      category,
      product,
    });
  } catch (error) {
    res.status(400).send({
      message: "Error In Category Get",
      error,
      success: false,
    });
    console.log(error);
  }
};

const braintreeTokenController = async (req, res) => {
  try {
    await gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTrasaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export {
  SearchproductController,
  CreateProduct,
  productCategoryController,
  RealtedproductController,
  UpdateProduct,
  GetAllProduct,
  GetSingleProduct,
  DeleteProduct,
  PhotoController,
  productPhotoController,
  productListController,
  productCountController,
  productFilterController,
  braintreeTokenController,
  braintreePaymentController,
};
