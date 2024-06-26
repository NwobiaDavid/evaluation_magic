import 'dotenv/config';
import puppeteer, { Page } from 'puppeteer';

export async function getCourses(username:string, password:string, page:Page) {
  try {
    // const browser = await puppeteer.launch({ headless: 'new' });
    // const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);

    await page.goto(
      'https://sso.cu.edu.ng:8443/auth/realms/Cu/protocol/saml?SAMLRequest=fZJfb8IgFMW%2FSsN7pa2tVaImTrPMxG1G3R72smB7qyQUOi7sz7cftjO6F58I93J%2Bl3NgjLyWDZs5e1Qb%2BHCANviupULWNibEGcU0R4FM8RqQ2YJtZ48rlvQi1hhtdaEluZLcVnBEMFZoRYLlYkLe82y474%2BqYdXP0yTzu3RQJFFexVEa8dFgEJejPNlne6hI8AoGvXJCPMjLER0sFVqurC9FSRJGWRjHuyhnccbS%2BI0EC%2B9GKG5b1dHaBhmliLpXuB6UrqcObJimfcq9e2qAyxrp3NGzLXryQ4LZ%2Bc5zrdDVYLZgPkUBL5vVhVprXUq4gCmKupFwIvhe6XyvOTYtkWK3JiEvsK124hAbEqz%2FZt8JVQp1uJ3mvjuE7GG3W4fr5%2B2OTMcnNGvTMdMOPKbXtXH34k%2BetlystRTFT3CvTc3t7WGniijDqj3KrOEKBSjr85FSf819fBYmxBoHhE67kf%2F%2F1fQX&RelayState=https%3A%2F%2Fmoodle.cu.edu.ng%2Flogin%2Findex.php'
    );

    await page.setViewport({ width: 1920, height: 1080 });

    await page.type('#username', username);
    await page.type('#password', password);

    const loginButtonSelector = '#kc-login';
    await Promise.all([
      page.waitForNavigation(),
      page.click(loginButtonSelector),
    ]);

    const select = '.dropdown div [aria-labelledby="actionmenuaction-2"]';
    const button = await page.waitForSelector(select);
    if (!button) {
      throw new Error('Button not found');
    }
    await button.evaluate((b: Element) => (b as HTMLButtonElement).click());

    // const viewmore = 'li.viewmore a';
    // await page.waitForSelector(viewmore);
    // await page.click(viewmore);


    try {
      const viewmore = 'li.viewmore a';
      await page.waitForSelector(viewmore);
      await page.click(viewmore);
    } catch (error) {
      console.error('View more button not found:', error);
    }

    const selector = '.contentnode li a';
    await page.waitForSelector(selector);

    console.log('-----------------working well------------------------')
    const courses = await page.evaluate(() => {
      const courseElements = document.querySelectorAll('.contentnode li a');

      return Array.from(courseElements).map((courseElement) => {
        const courseName = courseElement?.textContent?.trim() || '';
        const courselink = courseElement?.getAttribute('href') || '';
        const url = new URL(courselink);
        const courseId = url.searchParams.get('course');

        return { link: courselink, id: courseId, name: courseName };
      });
    });

    // await browser.close();

    return courses;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw new Error('Failed to fetch courses');
  }
}
