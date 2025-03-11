const Course = require('../models/Course'); // Course modeli dahil ediliyor
const Category = require('../models/Category'); // Category modeli dahil ediliyor

// Yeni bir kurs oluşturma işlemi
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body); // İstek gövdesinden gelen verilerle yeni bir kurs oluşturuluyor

    res.status(201).json({
      status: 'succes', // Başarılı oluşturma durum mesajı
      course, // Oluşturulan kursu döndür
    });
  } catch (error) {
    res.status(401).json({
      status: 'Fail', // Hata durumunda durum mesajı
      error, // Hata detayını döndür
    });
  }
};

// Tüm kursları getirme işlemi
exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories; // Query parametresinden kategori slug'ını al
    const category = await Category.findOne({ slug: categorySlug }); // Slug ile kategoriyi bul
    let filter = {}; // Filtre için başlangıçta boş bir nesne

    if (categorySlug) {
      filter = { category: category._id }; // Eğer kategori slug varsa kategoriye göre filtrele
    }

    const courses = await Course.find(filter); // Filtreye göre kursları bul
    const categories = await Category.find(); // Tüm kategorileri bul
    res.status(200).render('courses', {
      page_name: 'courses', // Sayfa ismini ayarla
      courses, // Bulunan kursları gönder
      categories, // Bulunan kategorileri gönder
    });
  } catch (error) {
    res.status(401).json({
      status: 'Fail', // Hata durumunda durum mesajı
      error, // Hata detayını döndür
    });
  }
};

// Belirli bir kursu slug'a göre getirme işlemi
exports.getOneCourse = async (req, res) => {
  const { slug } = req.params; // Route parametresinden slug değerini al
  try {
    const course = await Course.findOne({ slug }); // Slug ile kursu bul
    if (!course) {
      // Eğer kurs bulunamazsa 404 döndür
      return res.status(404).render('404', { message: 'Course not found' });
    }
    res.render('course-single', { course, page_name: 'course' }); // Bulunan kursu ilgili şablona gönder
  } catch (error) {
    console.error(error); // Hata konsola yazdırılır
    res.status(500).render('500', { message: 'Internal server error' }); // 500 hata sayfası döndürülür
  }
};
