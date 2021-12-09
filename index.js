const express = require("express")
const fileUpload = require("express-fileupload")
const path = require('path')

const app = express()

const PORT = process.env.PORT || 3002

app.use(fileUpload())
app.use(express.static(path.resolve(__dirname, 'public')))

app.post("/upload", async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send("No files were found")
    }
    else {
      const file = req.files.file
      const fileName = `cuisine_video_${(new Date()).getTime().toString()}.mp4`
      await file.mv(`${__dirname}/public/uploads/${fileName}`, function(err) {
        if (err) {
          res.status(400).send(err)
        }
        else {
          res.status(200).send(fileName)
        }
      })
    }
  } catch (error) {
    res.status(500).send(error)
  }
})

app.listen(PORT, () => {
  console.log(`Server is running at: `, PORT)
})