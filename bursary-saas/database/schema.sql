-- PostgreSQL schema for Bursary SaaS MVP
CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bursaries (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  eligibility TEXT,
  amount NUMERIC,
  deadline DATE
);

CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id),
  bursary_id INT REFERENCES bursaries(id),
  statement TEXT,
  status VARCHAR(50) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS documents (
  id SERIAL PRIMARY KEY,
  application_id INT REFERENCES applications(id),
  file_url TEXT,
  verification_status VARCHAR(50) DEFAULT 'Pending',
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
