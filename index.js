// import express from 'express';
// import multer from 'multer';
// import axios from 'axios';
// import FormData from 'form-data';
// import fs from 'fs/promises';
// import mime from 'mime-types';

// const app = express();
// const port = 8080;

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// const flaskApiEndpoint = 'http://192.168.0.110:5000/detect_objects';

// app.post('/upload', upload.single('image'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No image provided' });
//     }

//     const imageBuffer = req.file.buffer;
//     const fileExtension = mime.extension(req.file.mimetype);

//     const formData = new FormData();
//     formData.append('image', imageBuffer, { filename: `image.${fileExtension}` });

//     const response = await axios.post(flaskApiEndpoint, formData, {
//       headers: {
//         ...formData.getHeaders(),
//       },
//       responseType: 'arraybuffer',
//     });

//     const base64Image = Buffer.from(response.data, 'binary').toString('base64');
//     res.status(200).json({ image: base64Image });
//   } catch (error) {
//     console.error('Error uploading image:', error.message);
//     res.status(error.response ? error.response.status : 500).json({ error: error.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`Express app listening at http://localhost:${port}`);
// });


import express from 'express';
import mongoose from 'mongoose';
import Routes  from './routes/route.js';
const app = express();
const port = process.env.PORT || 8080;
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ObjectSnap', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
// Use express.json() instead of bodyParser
app.use(express.json());
app.use('/upload', express.static("upload"));

app.use('/', Routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});