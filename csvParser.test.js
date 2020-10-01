const { isMainThread } = require('worker_threads');
const CsvParser = require('./csvParser');

describe('csvParser', () => {

    describe('parseInCorrectType', () => {

        it('should test all types of parsing options', ()=>{

            //Arrange
            const csv = new CsvParser('./test/test1.csv');
            const num = "2";
            const str = "'str'";
            const url = "https://github.com/";
    
            //Act
            const resNum = csv.parseInCorrectType(num);
            const resStr = csv.parseInCorrectType(str);
            const resUrl = csv.parseInCorrectType(url);
    
            //Assert
    
            expect(resNum).toEqual(2);
            expect(resStr).toEqual('str');
            expect(resUrl).toEqual(new URL(url));

            
        });
        
    });

    describe('validatePath', ()=>{

        it('should throw an error on invalid path', ()=>{
            //Arrange
            const csv = new CsvParser('./test/test1.csv');
            

            //Assert
            expect(() =>{ csv.validatePath('asfasf')}).toThrow(new Error('invalid path'));
            expect(() =>{ csv.validatePath('')}).toThrow(new Error('invalid path'));
            expect(() =>{ csv.validatePath('safasf.CSV')}).toThrow(new Error('invalid path'));
            expect(() =>{ csv.validatePath('csv')}).toThrow(new Error('invalid path'));

        } );

        it('should return true for all valid paths', () =>{
            //Arrange
            const csv = new CsvParser('./test/test1.csv');

            const path1 = 'test.csv';
            const path2 = '/home/test.csv';
            const path3 = './home/documents/test.csv';

            //Act
            const res1 = csv.validatePath(path1);
            const res2 = csv.validatePath(path2);
            const res3 = csv.validatePath(path3);

            //Assert
            expect(res1&&res2&&res3).toEqual(true);
            



        });
    });
})