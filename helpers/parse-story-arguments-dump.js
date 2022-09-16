// script parses story args dump from local storage

const fs = require('fs');
const { map, result } = require('lodash');
const path = require('path');

const DUMP_FILE = 'storage-dump';
const RESULT_DIR = 'stories-content';

const fileContent = fs.readFileSync(path.join(__dirname, DUMP_FILE), 'utf-8');
const fileJSON = JSON.parse(fileContent);
const storiesFiles = Object.entries(fileJSON).reduce((result, [key, value]) => {
    const {fileName, ...rest} = JSON.parse(value);
    
    if(!result[fileName]) {
        result[fileName] = {};
    }

    result[fileName][key] = rest;

    return result;
}, {});

createResultDir(RESULT_DIR);

Object.entries(storiesFiles).forEach(([fileName, content]) => {
    const fullFileName = prepareFileName(fileName);
    fs.writeFileSync(fullFileName, JSON.stringify(content,null, 2));
})

function prepareFileName(fileName) {
    return path.join(__dirname, RESULT_DIR, fileName.replace('./','').replace(/\//g, '.').replace('.tsx', '.json'));
} 

function createResultDir(name) {
    const fullPath = path.join(__dirname, name);

    if(!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath);
    }
}
