const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Add axios for HTTP requests
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/country', async (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ message: "Country name is required" });
    }

    try {
        // Fetch country data from REST Countries API
        const response = await axios.get(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true`);
        // Map the response to match your required structure
        const country = response.data[0];
        const countryData = [
            {
                name: country.name,
                capital: country.capital,
                region: country.region,
                subregion: country.subregion,
                population: country.population,
                area: country.area,
                languages: country.languages,
                currencies: country.currencies,
                flags: country.flags
            }
        ];
        res.json(countryData);
    } catch (error) {
        res.json({ message: "Not Found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});