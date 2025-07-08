-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'admin',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  price VARCHAR(100) NOT NULL,
  image VARCHAR(500),
  features JSON NOT NULL,
  examples JSON NOT NULL,
  process JSON NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  `order` INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create portfolio_items table
CREATE TABLE IF NOT EXISTS portfolio_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  client VARCHAR(255),
  url VARCHAR(500),
  image VARCHAR(500),
  images JSON,
  technologies JSON,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  `order` INT NOT NULL DEFAULT 0,
  year VARCHAR(4) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create pages table
CREATE TABLE IF NOT EXISTS pages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  content JSON NOT NULL,
  meta_title VARCHAR(255),
  meta_description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create media_files table
CREATE TABLE IF NOT EXISTS media_files (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  size INT NOT NULL,
  url VARCHAR(500) NOT NULL,
  folder VARCHAR(255) DEFAULT '',
  uploaded_by VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE CASCADE
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(500),
  skills JSON NOT NULL,
  social JSON NOT NULL,
  `order` INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  avatar VARCHAR(500),
  rating INT NOT NULL DEFAULT 5,
  text TEXT NOT NULL,
  project VARCHAR(255) NOT NULL,
  date VARCHAR(50) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  `order` INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image VARCHAR(500),
  category VARCHAR(100) NOT NULL,
  author VARCHAR(255) NOT NULL,
  read_time VARCHAR(50) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create faq_items table
CREATE TABLE IF NOT EXISTS faq_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question VARCHAR(500) NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  `order` INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create cases table
CREATE TABLE IF NOT EXISTS cases (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  client VARCHAR(255) NOT NULL,
  industry VARCHAR(100) NOT NULL,
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  results JSON NOT NULL,
  image VARCHAR(500),
  timeline VARCHAR(100) NOT NULL,
  technologies JSON NOT NULL,
  `order` INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  salary VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  requirements JSON NOT NULL,
  skills JSON NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  `order` INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  `key` VARCHAR(255) NOT NULL UNIQUE,
  value JSON NOT NULL,
  description TEXT,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample FAQ data
INSERT INTO faq_items (question, answer, category, `order`) VALUES
('Сколько времени занимает разработка сайта?', 'Время разработки зависит от сложности проекта. Простой сайт-визитка занимает 1-2 недели, корпоративный сайт - 3-4 недели, интернет-магазин - 4-6 недель.', 'Разработка', 1),
('Какие технологии вы используете?', 'Мы используем современные технологии: React, Next.js, Node.js, TypeScript, Tailwind CSS, PostgreSQL, MongoDB и другие в зависимости от требований проекта.', 'Технологии', 1),
('Предоставляете ли вы техническую поддержку?', 'Да, мы предоставляем техническую поддержку в течение 3 месяцев после запуска проекта бесплатно. Далее поддержка осуществляется по договору.', 'Поддержка', 1),
('Можно ли внести изменения в проект в процессе разработки?', 'Да, мы используем гибкую методологию разработки, которая позволяет вносить изменения на любом этапе. Однако значительные изменения могут повлиять на сроки и стоимость.', 'Разработка', 2),
('Какова стоимость ваших услуг?', 'Стоимость зависит от сложности и объема работ. Простой сайт от 50,000 руб., корпоративный сайт от 150,000 руб., интернет-магазин от 300,000 руб.', 'Цены', 1);

-- Insert sample team data
INSERT INTO team_members (name, role, description, skills, social, `order`) VALUES
('Алексей Иванов', 'Lead Developer', 'Ведущий разработчик с 8-летним опытом в создании веб-приложений', '["React", "Node.js", "TypeScript", "PostgreSQL"]', '{"github": "alexivanov", "linkedin": "alexivanov", "email": "alex@altergemu.com"}', 1),
('Мария Петрова', 'UI/UX Designer', 'Дизайнер интерфейсов с фокусом на пользовательский опыт', '["Figma", "Adobe XD", "Sketch", "Prototyping"]', '{"linkedin": "mariapetrova", "email": "maria@altergemu.com"}', 2),
('Дмитрий Сидоров', 'Backend Developer', 'Специалист по серверной разработке и архитектуре систем', '["Python", "Django", "PostgreSQL", "Docker"]', '{"github": "dmitrysidorov", "email": "dmitry@altergemu.com"}', 3);

-- Insert sample blog posts
INSERT INTO blog_posts (slug, title, excerpt, content, category, author, read_time, is_featured) VALUES
('modern-web-development-trends', 'Современные тренды веб-разработки в 2024', 'Обзор актуальных технологий и подходов в веб-разработке', 'Подробный обзор современных трендов веб-разработки...', 'Технологии', 'Алексей Иванов', '5 мин', TRUE),
('ux-design-principles', 'Принципы UX-дизайна для успешного продукта', 'Как создать интуитивно понятный и удобный интерфейс', 'Основные принципы UX-дизайна и их применение...', 'Дизайн', 'Мария Петрова', '7 мин', FALSE);

-- Insert sample reviews
INSERT INTO reviews (name, position, company, rating, text, project, date, is_featured) VALUES
('Иван Петров', 'Директор', 'ООО "Технологии"', 5, 'Отличная работа! Сайт получился именно таким, как мы хотели. Команда профессиональная, сроки соблюдены.', 'Корпоративный сайт', 'Декабрь 2023', TRUE),
('Анна Сидорова', 'Маркетолог', 'Стартап XYZ', 5, 'Ребята сделали потрясающий интернет-магазин. Продажи выросли на 40% после запуска!', 'Интернет-магазин', 'Ноябрь 2023', TRUE);
