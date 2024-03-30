"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourses = void 0;
require("dotenv/config");
function getCourses(username, password, page) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const browser = await puppeteer.launch({ headless: 'new' });
            // const page = await browser.newPage();
            yield page.setDefaultNavigationTimeout(0);
            yield page.goto('https://sso.cu.edu.ng:8443/auth/realms/Cu/protocol/saml?SAMLRequest=fZJfb8IgFMW%2FSsN7pa2tVaImTrPMxG1G3R72smB7qyQUOi7sz7cftjO6F58I93J%2Bl3NgjLyWDZs5e1Qb%2BHCANviupULWNibEGcU0R4FM8RqQ2YJtZ48rlvQi1hhtdaEluZLcVnBEMFZoRYLlYkLe82y474%2BqYdXP0yTzu3RQJFFexVEa8dFgEJejPNlne6hI8AoGvXJCPMjLER0sFVqurC9FSRJGWRjHuyhnccbS%2BI0EC%2B9GKG5b1dHaBhmliLpXuB6UrqcObJimfcq9e2qAyxrp3NGzLXryQ4LZ%2Bc5zrdDVYLZgPkUBL5vVhVprXUq4gCmKupFwIvhe6XyvOTYtkWK3JiEvsK124hAbEqz%2FZt8JVQp1uJ3mvjuE7GG3W4fr5%2B2OTMcnNGvTMdMOPKbXtXH34k%2BetlystRTFT3CvTc3t7WGniijDqj3KrOEKBSjr85FSf819fBYmxBoHhE67kf%2F%2F1fQX&RelayState=https%3A%2F%2Fmoodle.cu.edu.ng%2Flogin%2Findex.php');
            yield page.setViewport({ width: 1920, height: 1080 });
            yield page.type('#username', username);
            yield page.type('#password', password);
            const loginButtonSelector = '#kc-login';
            yield Promise.all([
                page.waitForNavigation(),
                page.click(loginButtonSelector),
            ]);
            const select = '.dropdown div [aria-labelledby="actionmenuaction-2"]';
            const button = yield page.waitForSelector(select);
            if (!button) {
                throw new Error('Button not found');
            }
            yield button.evaluate((b) => b.click());
            // const viewmore = 'li.viewmore a';
            // await page.waitForSelector(viewmore);
            // await page.click(viewmore);
            try {
                const viewmore = 'li.viewmore a';
                yield page.waitForSelector(viewmore);
                yield page.click(viewmore);
            }
            catch (error) {
                console.error('View more button not found:', error);
            }
            const selector = '.contentnode li a';
            yield page.waitForSelector(selector);
            console.log('-----------------working well------------------------');
            const courses = yield page.evaluate(() => {
                const courseElements = document.querySelectorAll('.contentnode li a');
                return Array.from(courseElements).map((courseElement) => {
                    var _a;
                    const courseName = ((_a = courseElement === null || courseElement === void 0 ? void 0 : courseElement.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
                    const courselink = (courseElement === null || courseElement === void 0 ? void 0 : courseElement.getAttribute('href')) || '';
                    const url = new URL(courselink);
                    const courseId = url.searchParams.get('course');
                    return { link: courselink, id: courseId, name: courseName };
                });
            });
            // await browser.close();
            return courses;
        }
        catch (error) {
            console.error('Error fetching courses:', error);
            throw new Error('Failed to fetch courses');
        }
    });
}
exports.getCourses = getCourses;
