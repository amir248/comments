function newComments(app, jsonParser, cors, fs, id, importantBag,path) {
    return function comments(x){

        // const folderPath = path.join(__dirname, 'public/json/allDiscus');
        // const filePath = path.join(folderPath, `${x}`+'.json');
        // console.log(path);
        
        app.post('/'+`${id[x]}`, jsonParser,cors(), function (request, response) {
            

            console.log(`${x}` +" console.log(x)");
             importantBag.id=`${id[x]}`;
            console.log(importantBag.id+"____IMOPRTANT BBAG id");
            // console.log(response);
            // console.log(request);
            // console.log(request.body);
            const folderPath = path.join(__dirname,'..', '/public/json/allDiscus');
            const filePath = path.join(folderPath, `${importantBag.id}`);
            console.log(folderPath);
            console.log("// Создаём папку, если нет");
            
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
                console.log('Папка создана:', folderPath);
            }else{
                console.log("Полет нормальный! FOLDER exists");
            }
            //Читать файл
            let existingData = [];
            if (fs.existsSync(filePath)) {
                try {
                    existingData = JSON.parse(fs.readFileSync(filePath+`.json`, 'utf8'));
                } catch (err) {
                    console.error('Ошибка чтения JSON:', err);
                }
            }
         
            response.json(existingData);

        });//appPOST;


        app.post('/' + id[x] + ".json", jsonParser, cors(), (request, response) => {
            console.log(`${x} console.log(x)`);
            importantBag.id = id[x];

            // Папка и файл
            const folderPath = path.join(__dirname, '..', 'public', 'json', 'allDiscus');
            const filePath = path.join(folderPath, importantBag.id + '.json');

            console.log(folderPath);
            console.log("// Создаём папку, если нет");

            // Создать папку, если нет
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
                console.log('Папка создана:', folderPath);
            } else {
                console.log("Папка уже существует");
            }

            // Чтение файла
            let existingData = [];
            if (fs.existsSync(filePath)) {
                try {
                    existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                } catch (err) {
                    console.error('Ошибка чтения JSON:', err);
                }
            }

            // Добавить новые данные
            existingData.push(request.body);

            // Запись в файл
            try {
                fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf8');
                console.log('Файл сохранён:', filePath);
            } catch (err) {
                console.error('Ошибка записи файла:', err);
                return response.status(500).json({ error: 'Ошибка сохранения' });
            }

            // Вернуть клиенту обновлённый массив
            response.json(existingData);
        });
    }
}
module.exports=newComments;