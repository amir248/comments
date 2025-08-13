
const path = require('path');
const fs = require('fs');

function commentsFn(app, jsonParser, cors, id, importantBag) {
  // Настройки CORS
  app.use(cors({
    origin: ['https://qucu.ru', 'http://qucu.ru'],
    methods: ['POST'],
    allowedHeaders: ['Content-Type']
  }));

  return function comments(x) {
    const routePath = `/${id[x]}.json`;

    app.post(routePath, jsonParser, (request, response) => {
      importantBag.id = id[x];
      console.log(`${importantBag.id} ____IMOPRTANT BAG id`);

      if (!request.body || !request.body.idea) {
        console.log('❌ Пустое тело запроса');
        return response.sendStatus(400);
      }

      console.log('📩 Получено сообщение:', request.body);

      const gitJson = JSON.stringify(request.body);
      const baseDir = path.join(__dirname, 'public', 'json');
      const putGit = path.join(baseDir, `${importantBag.id}.json`);

      // Если это не главная страница
      if (request.body.idea.site.pathname !== '/') {
        const allDiscusDir = path.join(baseDir, 'allDiscus');
        const fileOnPath = path.join(allDiscusDir, importantBag.id);

        // Создание всех папок
        fs.mkdirSync(fileOnPath, { recursive: true });

        const fileName = pathAbracatabruch(request.body.idea.site.pathname);
        const fileOnPathTwo = path.join(fileOnPath, fileName);

        saveMessage(fileOnPathTwo, gitJson);
      } else {
        // Главная страница
        saveMessage(putGit, gitJson);
      }

      response.json({ status: 'ok', received: request.body });
    });
  };
}

// Функция для формирования имени файла
function pathAbracatabruch(p) {
  if (/\/$/.test(p)) {
    return p.slice(0, -1) + '.json';
  } else if (/\.(html|ejs|php)$/.test(p)) {
    return p + '.json';
  } else {
    return p + '.json';
  }
}

// Функция сохранения сообщения
function saveMessage(filePath, gitJson) {
  let arr = [];
  if (fs.existsSync(filePath)) {
    try {
      const existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (Array.isArray(existing)) arr = existing;
    } catch (e) {
      console.log('⚠ Ошибка чтения JSON, создаём заново');
    }
  }
  arr.push(JSON.parse(gitJson));
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(arr, null, 2), 'utf8');
  console.log(`💾 Сообщение сохранено в ${filePath}`);
}

module.exports = commentsFn;
