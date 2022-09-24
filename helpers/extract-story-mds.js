const glob = require('glob');
const fs = require('fs');
const path = require('path');

const RES_DIRNAME = 'readmes';
const resultDirName = path.join(__dirname, RES_DIRNAME);
const EN_READMES_DIR = './translated/readmes-en/';
const EN_STORIES_CONTENT_DIR = './translated/stories-content_en/';


// createDir(resultDirName)
// extractFiles();
// placeTranslatedReadmes(EN_READMES_DIR);
placeTranslatedReadmes(EN_STORIES_CONTENT_DIR, 'json');

function extractFiles(ext = 'md') {
    return glob(`./**/*.${ext}`, {
        ignore:'./node_modules/**/*.md'
    }, (er, files) => {
        if(er) {
            throw Error(er.message);
        }
    
        files.forEach((fileName)=> {
            const fullName = fileName.replace('./','').replace(/\//g,'.');

            fs.copyFile(path.join(__dirname, fileName), path.join(resultDirName, fullName),(err) => {
                if(err) {
                    console.error(`Unable to copy file ${fileName}`, err)
                } else {
                    console.error(`File ${fileName} copied`)
                }
                
            })
        });
    })
}

function createDir(name) {
    if(fs.existsSync(resultDirName)) {
        fs.unlink(resultDirName);
    }

    fs.mkdirSync(resultDirName);
}

function placeTranslatedReadmes(readmesDir, ext = 'md') {
    glob(`${readmesDir}/*${ext}`, {}, (er, files) => {

        if(er) {
            throw Error(er.message);
        }   

        files.forEach((fileName) => {
            const filePathRegexp = new RegExp(`\\.(?!${ext})`, 'g')
            const targetPath = fileName
                .replace('.stories(en)','_content')
                .replace(readmesDir, '')
                .replace(filePathRegexp,'/');

            fs.copyFile(fileName, targetPath,(err) => {
                if(err) {
                    console.error(`Unable to copy file ${fileName}`, err)
                } else {
                    console.error(`File ${fileName} copied`)
                }
                
            })

            
        });
    })
}