# Touchupbybe - Luxury Beauty Website

A modern, responsive, high-performance single-page application built with React, Vite, and GSAP. Designed to provide a luxurious booking experience for bridal makeup, traditional makeup, and gele styling.

## Features

- **Modern Tech Stack**: Built with React and Vite for lightning-fast loading and optimal performance.
- **GSAP Animations**: Features elegant 3D slideshows, scroll-triggered reveals, and realistic physics wave dividers.
- **Fully Responsive**: Perfectly formatted for mobile, tablet, and desktop viewing.
- **Dynamic Routing**: Instant, zero-reload navigation via React Router.
- **SMTP Backend Integration**: Built-in backend server to process booking intake forms and send automatic emails.

## Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)

### Installation

1. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

2. **Backend**:
   ```bash
   cd backend
   npm install
   # Make sure to configure your .env file with your SMTP credentials!
   node server.js
   ```

## Configuration

In the `backend` folder, create a `.env` file with your SMTP credentials:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
RECEIVER_EMAIL=your_email@gmail.com
```
