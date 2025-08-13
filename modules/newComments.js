function newComments(app, jsonParser, cors, fs, id, importantBag, path) {
  return function comments(x) {
    app.post('/' + `${id[x]}`, jsonParser, function (request, response) {
      // Получаем ID (папка)
      const folderName = importantBag.id || id[x];

      // Получаем путь страницы из запроса
      const pathname = request.body.site?.pathname || '/index';

      // Функция для преобразования pathname в имя файла:
      // например, '/news/article1' -> 'news-article1.json'
      function pathnameToFilename(pathname) {
        let cleanPath = pathname.trim();
        if (cleanPath === '/' || cleanPath === '') {
          return 'index.json';
        }
        if (cleanPath.startsWith('/')) {
          cleanPath = cleanPath.slice(1);
        }
        // Заменяем слэши на тире, убираем все, кроме букв, цифр, тире и нижнего подчёркивания
        cleanPath = cleanPath.replace(/\//g, '-').replace(/[^a-zA-Z0-9-_]/g, '');
        return cleanPath + '.json';
      }

      const folderPath = path.join(__dirname, '..', 'public', 'json', 'allDiscus', folderName);
      const fileName = pathnameToFilename(pathname);
      const filePath = path.join(folderPath, fileName);

      console.log('folderPath:', folderPath);
      console.log('filePath:', filePath);

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log('Папка создана:', folderPath);
      } else {
        console.log('Папка существует:', folderPath);
      }

      // Если файла нет — создаём с первым комментарием
      if (!fs.existsSync(filePath)) {
        const dateFirst = new Date().toISOString();
        const firstComment = [{
          userName: "comments boot",
          message: "Hello world, it's first comment!",
          date: dateFirst,
          idea: {
            id: "id",
            site: {
              href: "localhostBot",
              origin: "test",
              protocol: "https:",
              host: "localhost",
              hostname: "localhost",
              port: "undefined",
              pathname: "oK",
              search: "",
              hash: ""
            }
          }
        }];
        fs.writeFileSync(filePath, JSON.stringify(firstComment, null, 2), 'utf8');
        console.log("Создан новый файл с первым комментарием:", filePath);
      }

      // Читаем существующие комментарии
      let existingData = [];
      try {
        existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } catch (err) {
        console.error('Ошибка чтения JSON:', err);
      }

      response.json(existingData);
    });

    app.post('/' + id[x] + ".json", jsonParser, cors(), (request, response) => {
      const folderName = importantBag.id || id[x];
      const pathname = request.body.idea?.site?.pathname || '/index';

      function pathnameToFilename(pathname) {
        let cleanPath = pathname.trim();
        if (cleanPath === '/' || cleanPath === '') {
          return 'index.json';
        }
        if (cleanPath.startsWith('/')) {
          cleanPath = cleanPath.slice(1);
        }
        cleanPath = cleanPath.replace(/\//g, '-').replace(/[^a-zA-Z0-9-_]/g, '');
        return cleanPath + '.json';
      }

      const folderPath = path.join(__dirname, '..', 'public', 'json', 'allDiscus', folderName);
      const fileName = pathnameToFilename(pathname);
      const filePath = path.join(folderPath, fileName);

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log('Папка создана:', folderPath);
      } else {
        console.log("Папка уже существует");
      }

      console.log('filePath:', filePath);

      let existingData = [];
      if (fs.existsSync(filePath)) {
        try {
          existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } catch (err) {
          console.error('Ошибка чтения JSON:', err);
        }
      }

      existingData.push(request.body);

      try {
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf8');
      } catch (err) {
        console.error('Ошибка записи файла:', err);
        return response.status(500).json({ error: 'Ошибка сохранения' });
      }

      response.json(existingData);
    });
  };
}

module.exports = newComments;
