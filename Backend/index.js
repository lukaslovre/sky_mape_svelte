const fs = require("fs");
const { randomUUID } = require("crypto");
const express = require("express");
const cors = require("cors");

const { stringify } = require("csv-stringify");

const app = express();
const port = 3000;

app.use("/public", express.static("public"));
app.use(cors());
app.use(express.json());

// remove these in seperate file
const stringifyAsync = (data) => {
  return new Promise((resolve, reject) => {
    stringify(data, { header: true }, (err, output) => {
      if (err) {
        return reject(err);
      }

      resolve(output);
    });
  });
};

const writeFileAsync = (fileName, data) => {
  return new Promise((resolve, reject) =>
    fs.writeFile(fileName, data, (err) => {
      if (err) {
        return reject(err);
      }

      resolve();
    })
  );
};

const generateRandomFileName = (path, extensionWithDot) => {
  return `${path}/${randomUUID()}${extensionWithDot}`;
};

app.post("/", async (req, res) => {
  const data = req.body;

  console.log(data);

  try {
    const csvContent = await stringifyAsync(data);

    const fileName = generateRandomFileName("public", ".csv");

    writeFileAsync(fileName, csvContent);
  } catch (err) {
    return res.status(500).send("Internal Server Error." + err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
