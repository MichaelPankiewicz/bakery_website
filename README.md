# Bakery Website

A full-stack bakery website with a .NET backend API and a frontend that supports product management, contact messages, and dynamic popups. This project is structured for easy development and maintenance.

---

## Project Purpose

This website serves as a digital presence for a bakery, providing:

- Product information and catalog  
- Contact functionality via popup form  
- Full CRUD management for products and contact messages  
- Easy extension for future features like authentication and image uploads  

The project is designed to be clean, modern, and maintainable.

---

## Setup Instructions

1. **Open the project in VS Code**

2. **Install required tools**
   - Install **.NET 7 SDK** from the official Microsoft website  
   - Install **Node.js and npm** from the official Node.js website  
   - In VS Code, install the **Live Server** extension by Ritwick Dey

3. **Start the backend API**
   - Open the backend folder in VS Code (where the `.csproj` file is)  
   - Restore packages using `dotnet restore`  
   - Run the backend using `dotnet run`  
   - The backend runs at `http://localhost:5144/`  
   - Access **Swagger UI** at `http://localhost:5144/swagger` to test API endpoints

4. **Start the frontend**
   - Open the frontend folder in VS Code (where `package.json` is)  
   - Install dependencies using `npm install`  
   - Start the frontend development server with `npm run dev`  
   - Open `http://localhost:5173/` in your browser  

   **Key pages:**
   - Product CRUD page: `http://localhost:5173/crud.html`  
   - Contact messages overview: `http://localhost:5173/contact-crud.html`

5. **Test functionality**
   - Products CRUD: add, edit, delete products on `crud.html`, check persistence via backend API  
   - Contact Us popup: submit messages from homepage, they appear on `contact-crud.html`  
   - Explore More popups: view dynamic content with correct text styling and fullscreen images  
   - Contact CRUD: view all messages, delete if needed, auto-refresh on new submissions

6. **Check backend data**
   - `http://localhost:5144/api/Products` – view stored products  
   - `http://localhost:5144/api/Contact` – view stored contact messages

7. **Make changes**
   - Frontend: modify `src/css/` and `src/js/`, changes reload automatically  
   - Backend: modify `Controllers/` or `Models/`, restart `dotnet run` to apply changes

---

## Folder Structure

- `index.html` – Main homepage  
- `crud.html` – Product CRUD page  
- `contact-crud.html` – Contact messages page  
- `src/css/` – Stylesheets  
- `src/js/` – JavaScript files (`popup.js`, `contact-crud.js`, etc.)  
- Backend:  
  - `Controllers/` – `ProductsController`, `ContactController`  
  - `Models/` – `Product`, `ContactMessage`  
  - `Program.cs` – Backend setup  
- `package.json` – Frontend dependencies  
- `.csproj` – Backend project file

---

## Functionalities

- **Product CRUD:** full create, read, update, delete functionality with frontend-backend sync  
- **Contact Us popup:** validated form, messages sent to backend, appears in `contact-crud.html`  
- **Contact CRUD:** view and delete messages dynamically, auto-refresh on new messages  
- **Explore More popups:** dynamic content from API, correct text colors, fullscreen gallery  
- **Live notifications:** user-friendly messages on successful or failed submissions

---

## Collaborators

- Coach (to be added as collaborator on GitHub)

---
