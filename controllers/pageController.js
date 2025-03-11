//İndex Page
exports.getIndexPage = (req, res, next) => {
  res.status(200).render('index', {
    page_name: 'index',
  });
};

//About Page
exports.getAboutPage = (req, res, next) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};

exports.getRegisterPage = (req, res, next) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};

exports.getLoginPage = (req, res, next) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};
