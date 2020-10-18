
const app = module.exports = require('express')();
const User = require('./../../models/user')

// multipart middleware: allows you to access uploaded file from req.file
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

// cloudinary: configure using credentials found on your Cloudinary Dashboard
// sign up for a free account here: https://cloudinary.com/users/register/free
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'moviegramcloud',
    api_key: '694817822446975',
    api_secret: 'Hy1J9-gERP7DN0EbjyLHnM_k6U0'
});
/****** Review routes *************************************/

app.get('/:user_id', require('./get_image'));
app.put("/:user_id", multipartMiddleware, (req, res) => {

    const username = req.params.user_id;
    // Use uploader.upload API to upload image to cloudinary server.
    cloudinary.uploader.upload(
        req.files.image.path, // req.files contains uploaded files
        function (result) {
          if (result.url !== undefined) {
            User.findByIdAndUpdate({"_id": username}, { "image_url": result.url })
              .then(user => {
                  if (!user) {
                      res.status(404).send();
                  } else {
                      res.send(user);
                  }
              })
              .catch(error => {
                  res.status(400).send(); // bad request for changing the student.
              });
          }
        });

});

app.post("/upload_image/",  multipartMiddleware, (req, res) => {

    cloudinary.uploader.upload(
        req.files.image.path, // req.files contains uploaded files
        function (result) {
          if (result.url !== undefined) {
              res.send({image_url: result.url});
          }
        });

});
/*******************************************************/
