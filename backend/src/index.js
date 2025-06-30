const express = require("express");
const Automizer = require("pptx-automizer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

app.get("/generate-pptx", async (req, res) => {
  const automizer = new Automizer({
    templateDir: path.join(__dirname, "templates"), // Directory for your PPTX templates
    outputDir: path.join(__dirname, "output"), // Directory for generated PPTX
  });

  try {
    // Load templates and add slides as needed
    let pres = automizer
      .loadRoot("RootTemplate.pptx")
      .load("SlideTemplate.pptx", "slide");

    pres.addSlide("slide", 1); // Add the first slide from 'SlideTemplate.pptx'

    const outputPath = path.join(
      __dirname,
      "output",
      "generated_presentation.pptx"
    );
    await pres.write(outputPath);

    res.download(outputPath, "generated_presentation.pptx", (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).send("Error generating or sending PPTX.");
      }
      // Clean up the generated file after download
      fs.unlink(outputPath, (unlinkErr) => {
        if (unlinkErr) console.error("Error deleting file:", unlinkErr);
      });
    });
  } catch (error) {
    console.error("PPTX generation error:", error);
    res.status(500).send("Error generating PPTX.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
