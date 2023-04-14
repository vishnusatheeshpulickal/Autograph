const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv/config");

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Autograph",
    format: async (req, file) => {
      return "jpeg";
    },
  },
});

const destroy = async (url) => {
  try {
    let string = url.split("/");
    const public_id = string[7].split(".jpg");
    await cloudinary.api.delete_resources(
      public_id[0],
      function (error, result) {
        console.log(result, error);
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const upload = multer({ storage: storage });

module.exports = { upload, destroy };
