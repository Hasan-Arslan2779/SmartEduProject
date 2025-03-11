const User = require('../models/User');
const bcrypt = require('bcrypt');
// Yeni bir kullanıcı oluşturma işlemi
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      status: 'succes',
      user,
    });
  } catch (error) {
    res.status(401).json({
      status: 'Fail',
      error,
    });
  }
};

// Kullanıcı oturum acma işlemi
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: 'Fail',
        message: 'User not found',
      });
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: 'Fail',
        message: 'Invalid credentials',
      });
    }
    req.session.userID = user._id;
    res.status(200).redirect('/users/dashboard'); // Kullanıcı bilgilerini döndür
  } catch (error) {
    res.status(401).json({
      status: 'Fail',
      error,
    });
  }
};

exports.logoutUser = async (req, res) => {
  // Oturumu kapatma işlemi
  req.session.destroy(() => {
    res.redirect('/login');
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID });
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
  });
};
