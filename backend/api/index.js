import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors'
import fs from 'fs'
import * as cheerio from 'cheerio';
import {LIFE_EVENTS} from "../src/constants.js"
import {analyzeAstrologyData} from '../src/predictor.js'


const app = express();
const PORT = process.env.PORT || 8000;

// Middleware to parse x-www-form-urlencoded data
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*', // Allow all origins
}));

// Function to fetch the Kundli data
async function fetchData(formData) {

  const body = new URLSearchParams(formData).toString()
  const cookieValue = fs.readFileSync('cookie.json', 'utf-8')

  try {

    const response1 = await fetch("https://www.kundlisoft.com/web/KundliFromDOB", {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,fr;q=0.7",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "cookie": JSON.parse(cookieValue).value,
        "Referer": "https://www.kundlisoft.com/web",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": body,
      "method": "POST"
    });

    if (!response1.ok) {
      throw new Error(`HTTP error! status: ${response1.status}`);
    }

    // Parse the response as text (assuming it's HTML)


    const data = await response1.text();
    const $ = cheerio.load(data);

    const result = {};

    const planets = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"]

    const activePlanets = $('li.active')
    .map((i, elem) => $(elem).attr('data-planet')) // Extract 'data-planet' attribute
    .get(); // Convert cheerio object to array
    

    $('.table-block.card').each((i, element) => {
      const label = $(element).find('label').text().trim(); // Extract the planet name (e.g., Mercury)
    
      // Initialize the planet object if it doesn't exist
    
      // Check if the planet is in the list
      if (planets.includes(label)) {
        if (!result[label]) {
          result[label] = {};
        }
        $(element).find('tr').each((j, row) => {
          const title = $(row).attr('title'); // Extract the title attribute (Planet, Nakshatra Lord, etc.)
          
          const values = [];
    
          // Get the `data-aspects` attribute, which contains the aspect values
          const dataAspects = $(row).find('td').attr('data-aspects');
    
    
          // Extract the planet/other values from the span elements
          $(row).find('td span').each((k, span) => {
            const value = $(span).text().trim();
            if (!isNaN(value)) {
              values.push(parseInt(value)); // Add the integer values to the array
            }
          });
    
          // Dynamically assign the planet name (e.g., 'Me', 'Su', 'Sa') as the key
          const planetName = $(row).find('td span').first().text().trim();
          
          // Based on the title, assign values to the correct sub-key in the planet object
          if (title === 'Planet') {
            result[label][`${planetName}_L1`] = values; // For example, 'Me_L1'
          } else if (title === 'Nakshatra Lord') {
            result[label][`${planetName}_L2`] = values; // For example, 'Su_L2'
          } else if (title === 'Sub Lord') {
            result[label][`${planetName}_L3`] = values; // For example, 'Sa_L3'
          }
        });
      }
    });
    return {
      result,
      activePlanets
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }
}


// Define the /getData route
app.post('/getData', async (req, res) => {
  const kundliData = req.body

  if (kundliData) {
    // Send the HTML response back to the client
    const data = await fetchData(kundliData)

    const response = analyzeAstrologyData(data.result, LIFE_EVENTS)
    res.send({
      response,
      activePlanets : data.activePlanets
    });
  } else {
    res.status(500).send('Failed to fetch data from the Kundli service');
  }
});


app.use(express.json())

app.post('/updateCookie', (req, res) => {
  try {
    // Writing the request body to the cookie.json file synchronously
    fs.writeFileSync('cookie.json', JSON.stringify(req.body));
    console.log(req.body)

    res.status(200).send('Cookie updated successfully');
  } catch (error) {
    console.error('Error updating cookie:', error);
    res.status(500).send('Error updating cookie');
  }
});

app.get('/', (req,res) => {
  res.status(200).send('Server Running......')
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
