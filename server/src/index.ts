import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer';
import path from 'path';
// import fs, { mkdirSync } from 'fs';
import { getCourses } from './getCourses';

const app = express();

const PORT = process.env.PORT || "4000";

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.post('/api/evaluate', async (req, res) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const { username, password } = req.body;

  try {
    //   const downloads = [];

    const courses = await getCourses(username, password, page);

    // Add a new course object for  general evaluation to the courses array
    courses.push({
      id: '1',
      name: 'General',
      link: '#',
    });

    let num = 1;
    
    for (const obj of courses) {
      await page.goto(
        `https://moodle.cu.edu.ng/mod/feedback/print.php?id=37969&courseid=${obj.id}`
        );
        
        await page.screenshot({ path: `screenshot_${num}.png` });
        num++;
      console.log("-------------entered the index page --------------")

      const selectorsList = [
        { selector: 'multichoice_159593', option: 1 },
        { selector: 'multichoice_159594', option: 1 },
        { selector: 'multichoice_159596', option: 1 },
        { selector: 'multichoice_159597', option: 1 },
        { selector: 'multichoice_159599', option: 1 },
        { selector: 'multichoice_159600', option: 1 },
        { selector: 'multichoice_159601', option: 1 },
        { selector: 'multichoice_159602', option: 1 },
        { selector: 'multichoice_159604', option: 1 },
        { selector: 'multichoice_159605', option: 1 },
        { selector: 'multichoice_159606', option: 1 },
        { selector: 'multichoice_159607', option: 1 },
        { selector: 'multichoice_159609', option: 1 },
        { selector: 'multichoice_159610', option: 1 },
        { selector: 'multichoice_159611', option: 1 },
        { selector: 'multichoice_159613', option: 1 },
        { selector: 'multichoice_159614', option: 1 },
        { selector: 'multichoice_159615', option: 1 },
        { selector: 'multichoice_159617', option: 1 },
        { selector: 'multichoice_159618', option: 1 },
        { selector: 'multichoice_159620', option: 1 },
        { selector: 'multichoice_159621', option: 1 },
        { selector: 'multichoice_159622', option: 1 },
        { selector: 'multichoice_159624', option: 1 },
        { selector: 'multichoice_159625', option: 1 },
        { selector: 'multichoice_159627', option: 1 },
        { selector: 'multichoice_159628', option: 1 },
        { selector: 'multichoice_159630', option: 1 },
        { selector: 'multichoice_159631', option: 1 },
        { selector: 'multichoice_159634', option: 1 },
      ];

      selectorsList.forEach(async (item) => {
        const selector = `select[name=${item.selector}]`;
        const optionValueToSelect = item.option.toString();
        await page.select(selector, optionValueToSelect);
      });

      await page.type('#id_textfield_159633', 'Covenany University');


      const finish = 'button[type="submit"]';
      page.waitForSelector(finish);
      page.click(finish);

      console.log('-----------------completed----------------')
    }

    await browser.close();

    res.json({ courses });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//production path
app.use(express.static(path.join(__dirname, '../../client/dist')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'))
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
