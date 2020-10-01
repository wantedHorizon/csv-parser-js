const fs = require('fs');
class CsvParser {
    constructor(path, delimiter = ',') {
        if (!this.validatePath(path)) {
            throw new Error('invalid path');
        }
        this.delimiter = delimiter;;
        this.data = this.parseData(path, delimiter);

    }

    parseData(path, delimiter) {
        const text = fs.readFileSync(path, 'utf8');


        const dataArr = text.toString().split('\n');
        let titles = dataArr[0].split(delimiter);
        titles = titles.map(t => t.replace(/[.,\/#!$%\^&\*;:{}=\-_'"\s`~()]/g, ""));
        dataArr.shift();
        this.titles = titles;


        return dataArr
            .filter(line => line)
            .map((line, index) => {
                if (!line)
                    return;
                const lineArr = line.split(delimiter);
                if (lineArr.length !== titles.length) {
                    throw new Error(`line ${index+1} objects amount doesn't fit titles length`);
                }

                const newLine = {};
                titles.forEach((title, i) => {
                    newLine[title] = this.parseInCorrectType(lineArr[i]);
                });

                return newLine;
            });



    }

    parseInCorrectType(val) {
        if (!isNaN(val))
            return Number(val);

        else if (/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig.test(val)) {
            return new URL(val);
        } else if (/^['"]\w*["']$/.test(val)) {
            return val.replace(/['"]/g, "");
        }

        return val.replace(/['"]/g, "");
    }
    getData() {
        return this.data;
    }
    validatePath(path) {
        const regex = new RegExp("(.*?)\.(csv)$");

        const res= regex.test(path);
        if(!res){
            throw new Error('invalid path');

        }

        return res;
    }
}


// const csv = new CsvParser('./test/test1.csv');
// console.log(csv.getData());
// console.log(csv.data);
// console.log(csv.titles);
// console.log(validatePath("/home/test.csv"));
// console.log(validatePath("/home/csv"));
// console.log(validatePath("/home/file.cSv"));

module.exports=CsvParser;