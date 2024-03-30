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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const path_1 = __importDefault(require("path"));
// import fs, { mkdirSync } from 'fs';
const getCourses_1 = require("./getCourses");
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use((0, cors_1.default)({
    credentials: true,
    origin: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.post('/api/evaluate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({ headless: true });
    const page = yield browser.newPage();
    const { username, password } = req.body;
    try {
        //   const downloads = [];
        const courses = yield (0, getCourses_1.getCourses)(username, password, page);
        // Add a new course object for  general evaluation to the courses array
        courses.push({
            id: '1',
            name: 'General',
            link: '#',
        });
        let num = 1;
        for (const obj of courses) {
            yield page.goto(`https://moodle.cu.edu.ng/mod/feedback/print.php?id=37969&courseid=${obj.id}`);
            yield page.screenshot({ path: `screenshot_${num}.png` });
            num++;
            console.log("-------------entered the index page --------------");
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
            selectorsList.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
                const selector = `select[name=${item.selector}]`;
                const optionValueToSelect = item.option.toString();
                yield page.select(selector, optionValueToSelect);
            }));
            yield page.type('#id_textfield_159633', 'Covenany University');
            const finish = 'button[type="submit"]';
            page.waitForSelector(finish);
            page.click(finish);
            console.log('-----------------completed----------------');
        }
        yield browser.close();
        res.json({ courses });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
//production path
app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend/dist')));
app.get('*', (req, res) => res.sendFile(path_1.default.join(__dirname, '../../frontend/dist/index.html')));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
