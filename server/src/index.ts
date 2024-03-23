import 'dotenv/config'
import express from 'express';
import cors from 'cors';
// import puppeteer from 'puppeteer';
import path from 'path';
// import fs, { mkdirSync } from 'fs';
import { getCourses } from './getCourses';

const app = express();

const PORT = process.env.PORT;



app.use(
    cors({
        credentials: true,
        origin: true
    })
)


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.post('/api/evaluate', async (req, res) => {
    const { username, password } = req.body;
  
    try {
    //   const downloads = [];
  
      const courses = await getCourses(username, password);
  
    //   for (const obj of courses) {
    //     await page.goto(`https://moodle.cu.edu.ng/course/view.php?id=${obj.id}`);
  
    //     const selectorNotes = '.aalink';
    //     await page.waitForSelector(selectorNotes);
  
    //     const notes = await page.evaluate(
    //       (selectorNotes, keyword) => {
    //         const notesList = document.querySelectorAll(selectorNotes);
    //         const notesArray = Array.from(notesList);
  
    //         const filteredNotes = notesArray
    //           .filter((note) => note.href.includes(keyword))
    //           .map((note) => note.href);
  
    //         return filteredNotes;
    //       },
    //       selectorNotes,
    //       'resource'
    //     );
  
    //     for (let i = 0; i < notes.length; i++) {
    //       const note = notes[i];
    //       const notePage = await browser.newPage();
  
    //       try {
    //         await notePage.goto(note, { waitUntil: 'domcontentloaded' });
    //         const finalUrl = notePage.url();
  
    //         if (finalUrl) {
    //           const sanitizedFileName = sanitizeFileName(
    //             `note_${obj.name}_${i + 1}`
    //           );
  
    //           await notePage.evaluate(() => {
    //             const downloadElement = document.createElement('a');
    //             downloadElement.href = window.location.href;
    //             downloadElement.download = 'download.pdf';
    //             document.body.appendChild(downloadElement);
    //             downloadElement.click();
    //             document.body.removeChild(downloadElement);
    //           });
  
    //           downloads.push(finalUrl);
    //         }
    //       } catch (error) {
    //         console.error('Error processing note:', error);
    //       } finally {
    //         await notePage.close();
    //       }
    //     }
    //   }
  
    //   await browser.close();
  
    //   res.json({ downloads });
      res.json({ courses });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


//production path
app.use(express.static(path.join(__dirname, '../../frontend/dist')))
app.get('*', (req, res)=>
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});


