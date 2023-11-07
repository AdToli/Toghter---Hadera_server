// const express = require('express');
// const guestBLL = require("../BLL/guestsBLL")
// const router = express.Router()

// localhost:8000/guests


// POST - create a new guest doucument
// router.post("/", async (req, res) => {
//     try {

//         //validation  --> good request?
//         if (!req.body || req.body === undefined) {
//             return res.status(400).json("מידע לא תקין")
//         }

//         const newGuest = req.body
//         const isAdded = await guestBLL.addGuest(newGuest)

//         //validation  --> guest added? 
//         if (isAdded.status === false) {
//             return res.status(404).json({ msg: "המערכת לא הצליחה להוסיף את הפרטים. פנה לתמיכה טכנית" ,theError: isAdded.error});
//         }
//         //success
//         return res.status(201).json({ msg: "הפרטים נוספו בהצלחה" })

//     } catch (error) {
//         return res.status(500).json({ error })
//     }
// })

const express = require('express');
// const guestBLL = require("../BLL/guestsBLL_POST_ONLY")
const router = express.Router()

const { google } = require("googleapis");



router.post("/", async (req, res) => {
  const { request, name } = req.body;

  console.log(req.body);
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
    // scopes: "https://docs.google.com/spreadsheets/d/1v0skrHOjlNMhPPJXljH_aDhT9uJs7ooynHts25C0mXo/edit#gid=1493878043",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "abbe410d420c2d9441c97ae571d6ce0471cbf137";

  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  // Read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1!A:A",
  });

  // Write row(s) to spreadsheet
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1!A:B",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[request, name]],
    },
  });

  res.send("Successfully submitted! Thank you!");
});

module.exports = router