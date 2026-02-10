```markdown
# ⚡ NextGen Store - Fullstack Ecommerce

> A modern, fully responsive Ecommerce platform built with React, Django REST Framework, and Tailwind CSS. Featuring secure authentication, cart management, and payment integration.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

<iframe width="560" height="315" 
  src="https://www.youtube.com/embed/DzUKHesHAAg" 
  title="YouTube video player" frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>

## 🚀 Live Demo
- **Frontend:** [https://praxisforge.github.io/Fullstack-Ecommerce/](https://praxisforge.github.io/Fullstack-Ecommerce/)
- **Backend API:** [https://ecommerce-backend-joy9.onrender.com/api/products/](https://ecommerce-backend-joy9.onrender.com/api/products/)

## 🛠 Tech Stack

### Frontend
- **Framework:** React (Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **HTTP Client:** Axios (with Interceptors)
- **Deployment:** GitHub Pages

### Backend
- **Framework:** Django REST Framework (DRF)
- **Authentication:** SimpleJWT (Access/Refresh Tokens)
- **Database:** PostgreSQL (Production) / SQLite (Dev)
- **Media Storage:** Cloudinary
- **Deployment:** Render

## ✨ Features

- **🔐 User Authentication:** Secure Login/Signup with JWT (JSON Web Tokens).
- **🛒 Shopping Cart:** Persistent cart management using LocalStorage and Redux.
- **📦 Order Management:** Place orders securely (Authentication required).
- **📱 Fully Responsive:** Optimized for Mobile, Tablet, and Desktop.
- **⚡ Performance:** Fast load times with Vite and optimized API queries.
- **🖼 Media Hosting:** Product images hosted on Cloudinary for fast delivery.
- **🛡 Admin Panel:** Full control over Products, Users, and Orders via Django Admin.

## ⚙️ Installation & Setup

### Prerequisites
- Node.js & npm
- Python 3.10+
- Git

### 1. Clone the Repository
```bash
git clone [https://github.com/PraxisForge/Fullstack-Ecommerce.git](https://github.com/PraxisForge/Fullstack-Ecommerce.git)
cd Fullstack-Ecommerce

```

### 2. Backend Setup (Django)

```bash
# Navigate to backend (root folder)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create Admin User
python manage.py createsuperuser

# Start Server
python manage.py runserver

```

### 3. Frontend Setup (React)

```bash
# Open new terminal and navigate to frontend
cd ecommerce-frontend

# Install dependencies
npm install

# Start Dev Server
npm run dev

```

## 🔑 Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file or deployment platform.

**Backend (`.env`)**

```env
SECRET_KEY=your_secret_key
DEBUG=True
DATABASE_URL=postgres://user:pass@host/db (Optional for local)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

```

## 📂 Project Structure

```
Fullstack-Ecommerce/
├── ecommerce_backend/      # Django Settings & Config
├── ecommerce-frontend/     # React Application
│   ├── src/
│   │   ├── api/            # Axios setup
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Full page views
│   │   ├── store/          # Redux slices
│   │   └── types/          # TypeScript interfaces
├── products/               # Django Product App
├── users/                  # Django User App
├── orders/                 # Django Order App
└── manage.py

```

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👤 Author

**Damodar**

* GitHub: [@PraxisForge](https://www.google.com/search?q=https://github.com/PraxisForge)

---

⭐️ **Don't forget to star this repo if you found it useful!**

```

```
