import puppeteer from 'puppeteer';
// import path from 'path';
// import fs, { mkdirSync } from 'fs';
import { getCourses } from '../src/getCourses';

const browser = await puppeteer.launch({ headless: false });
// const { username, password } = req.body;

const username = '2100732'
const password='david2005'

try {
  //   const downloads = [];

  const courses = await getCourses(username, password, browser);

  // Add a new course object for  general evaluation to the courses array
  courses.push({
    id: '1',
    name: 'General',
    link: '#',
  });

  for (const obj of courses) {
    await page.goto(
      `https://moodle.cu.edu.ng/mod/feedback/view.php?id=37969&courseid=${obj.id}`
    );

    const selectorsList = [
      {selector:'multichoice_159593', option:1},
      {selector:'multichoice_159594', option:1},
      {selector:'multichoice_159596', option:1},
      {selector:'multichoice_159597', option:1},
      {selector:'multichoice_159599', option:1},
      {selector:'multichoice_159600', option:1},
      {selector:'multichoice_159601', option:1},
      {selector:'multichoice_159602', option:1},
      {selector:'multichoice_159604', option:1},
      {selector:'multichoice_159605', option:1},
      {selector:'multichoice_159606', option:1},
      {selector:'multichoice_159607', option:1},
      {selector:'multichoice_159609', option:1},
      {selector:'multichoice_159610', option:1},
      {selector:'multichoice_159611', option:1},
      {selector:'multichoice_159613', option:1},
      {selector:'multichoice_159614', option:1},
      {selector:'multichoice_159615', option:1},
      {selector:'multichoice_159617', option:1},
      {selector:'multichoice_159618', option:1},
      {selector:'multichoice_159620', option:1},
      {selector:'multichoice_159621', option:1},
      {selector:'multichoice_159622', option:1},
      {selector:'multichoice_159624', option:1},
      {selector:'multichoice_159625', option:1},
      {selector:'multichoice_159627', option:1},
      {selector:'multichoice_159628', option:1},
      {selector:'multichoice_159630', option:1},
      {selector:'multichoice_159631', option:1},
      {selector:'multichoice_159634', option:1}
    ];

    selectorsList.forEach(async item => {
      const selector = `select[name=${item.selector}]`;
      const optionValueToSelect = item.option;
      await page.select(selector, optionValueToSelect);
    });

    await page.type('#id_textfield_159633', "Covenany University");

    
        const finish = '#single_button65ff363b6f96c4';
  await page.waitForSelector(finish);
  await page.click(finish);

  //   const selectorNotes = '.aalink';
  //   await page.waitForSelector(selectorNotes);

  //   const notes = await page.evaluate(
  //     (selectorNotes, keyword) => {
  //       const notesList = document.querySelectorAll(selectorNotes);
  //       const notesArray = Array.from(notesList);

  //       const filteredNotes = notesArray
  //         .filter((note) => note.href.includes(keyword))
  //         .map((note) => note.href);

  //       return filteredNotes;
  //     },
  //     selectorNotes,
  //     'resource'
  //   );

  //   for (let i = 0; i < notes.length; i++) {
  //     const note = notes[i];
  //     const notePage = await browser.newPage();

  //     try {
  //       await notePage.goto(note, { waitUntil: 'domcontentloaded' });
  //       const finalUrl = notePage.url();

  //       if (finalUrl) {
  //         const sanitizedFileName = sanitizeFileName(
  //           `note_${obj.name}_${i + 1}`
  //         );

  //         await notePage.evaluate(() => {
  //           const downloadElement = document.createElement('a');
  //           downloadElement.href = window.location.href;
  //           downloadElement.download = 'download.pdf';
  //           document.body.appendChild(downloadElement);
  //           downloadElement.click();
  //           document.body.removeChild(downloadElement);
  //         });

  //         downloads.push(finalUrl);
  //       }
  //     } catch (error) {
  //       console.error('Error processing note:', error);
  //     } finally {
  //       await notePage.close();
  //     }
  //   }


  }

  await browser.close();


  res.json({ courses });
} catch (error) {
  console.error('Error:', error);
  res.status(500).json({ error: 'Internal server error' });
}