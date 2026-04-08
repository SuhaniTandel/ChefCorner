# ChefCorner - Recipe Blog Website

A modern, fully functional recipe blog and social cooking platform built with React and Bootstrap 4.

## 🎨 Features

### Pages
1. **Dashboard (Home)** - Hero slider with trending recipes, featured dishes, and sidebar widgets
2. **About** - Company information, mission, and quick facts
3. **Blog/Recipes** - Recipe listing with search, categories, and recent posts
4. **Recipe Details** - Full recipe view with ingredients, instructions, and author info
5. **Contact** - Contact form with business information
6. **User Profile** - User profile management, my recipes, and saved recipes
7. **Login** - User authentication page with validation
8. **Sign Up** - New user registration with password strength indicator
9. **Submit Recipe** - Recipe submission form with dynamic ingredient management
10. **404 Not Found** - Custom error page with navigation options

### Components
- **Header** - Responsive navigation with logo, menu, login, and submit recipe buttons
- **Footer** - Footer with social media links and copyright
- **Sidebar** - Reusable sidebar widgets for recipes and categories
- **Preloader** - Animated loading indicator with Pacman animation

### Features
- ✅ Responsive Bootstrap 4 grid layout
- ✅ React Router navigation between pages
- ✅ Form validation and error handling
- ✅ Password strength indicator
- ✅ Dynamic form fields (ingredients, etc.)
- ✅ Tab-based profile sections
- ✅ Owl Carousel slider for featured recipes
- ✅ Search and filter functionality
- ✅ Social media integration
- ✅ Professional UI/UX design

## 📁 Project Structure

```
src/
├── components/
│   ├── header.js          # Navigation header
│   ├── footer.js          # Footer with social links
│   └── sidebar.js         # Sidebar component
├── pages/
│   ├── dashboard.js       # Home page with slider and recipes
│   ├── about.js           # About page
│   ├── blog.js            # Blog/recipes listing
│   ├── contact.js         # Contact form page
│   ├── recipeDetails.js   # Single recipe view
│   ├── login.js           # Login page
│   ├── signup.js          # Sign up page
│   ├── profile.js         # User profile page
│   ├── submitRecipe.js    # Recipe submission page
│   ├── notFound.js        # 404 error page
│   ├── Preloader.js       # Loading animation
│   └── preloader.css      # Preloader styles
├── App.js                 # Main app component with routing
└── index.js               # React entry point
```

## 🚀 Getting Started

### Installation

```bash
# Navigate to the user directory
cd ChefCorner/user

# Install dependencies
npm install

# Start the development server
npm start
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📱 Navigation

| Route | Page |
|-------|------|
| `/` | Dashboard (Home) |
| `/about` | About Page |
| `/blog` | Blog/Recipes |
| `/contact` | Contact Page |
| `/recipe/:id` | Recipe Details |
| `/login` | Login |
| `/signup` | Sign Up |
| `/profile` | User Profile |
| `/submit-recipe` | Submit Recipe |
| `/*` | 404 Not Found |

## 🎯 Key Components Explained

### Header Component
- Responsive navigation menu
- Logo and site branding
- Quick action buttons (Login, Submit Recipe)
- Social media icons

### Dashboard Page
- Hero slider with Owl Carousel
- Featured recipes section
- Trending recipes with full recipe cards
- Editor's choice section
- Sidebar with about info, social links, and newsletter signup

### Forms
All forms include:
- Input validation
- Error message display
- Success feedback
- Responsive design

### Profile Page
Three-tab interface:
1. **Profile Tab** - Edit user information
2. **My Recipes Tab** - User's submitted recipes with stats
3. **Saved Recipes Tab** - Bookmarked recipes

## 🎨 Styling

The project uses:
- **Bootstrap 4** - Responsive grid and components
- **Font Awesome Icons** - Icon library
- **Flaticon** - Custom food icons
- **Custom CSS** - Custom styles in `assets/css/main.css`
- **Owl Carousel** - Recipe slider

## 📦 Dependencies

```json
{
  "react": "^19.2.4",
  "react-dom": "^19.2.4",
  "react-router-dom": "^7.13.1",
  "jquery": "^3.6.0",
  "react-scripts": "5.0.1"
}
```

## 🔧 Available Scripts

### `npm start`
Runs the app in development mode at port 3000

### `npm build`
Builds the app for production to the `build` folder

### `npm test`
Launches the test runner in interactive watch mode

### `npm eject`
Ejects from Create React App (irreversible)

## 🎨 Color Scheme

- **Primary**: #e74c3c (Red)
- **Secondary**: #3498db (Blue)
- **Success**: #27ae60 (Green)
- **Dark**: #333333
- **Light**: #f8f8f8

## 🌐 Features to Add

Future enhancement ideas:
- Backend API integration
- User authentication with JWT
- Recipe database with MongoDB
- Comments and reviews system
- Email notifications
- Advanced search and filters
- Recipe ratings system
- User following system
- Recipe difficulty levels
- Nutritional information
- Print recipe functionality
- Share recipe functionality

## 📝 Sample Data

The website includes sample data for:
- 4 sample blog posts
- 3 slider items
- 6 featured recipes
- 3 user recipes
- 3 saved recipes
- Contact information
- Author profiles

## ✅ Testing the Website

### Test Navigation
- Click all header navigation links
- Test mobile menu (on small screens)
- Check all page routing

### Test Forms
- Fill out login form with validation
- Try sign-up with password strength indicator
- Test recipe submission form
- Test contact form

### Test Profile
- Switch between profile tabs
- View user recipes
- View saved recipes

### Test Mobile
- Resize browser to test responsive design
- Check header responsiveness
- Verify all buttons are clickable

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# Use a different port
PORT=3001 npm start
```

### Missing Assets
Ensure all images and CSS files are in the `public/assets/` directory

### Build Errors
Delete `node_modules` and `package-lock.json`, then run:
```bash
npm install
npm start
```

## 📞 Support

For issues or questions, refer to:
- React Documentation: https://react.dev
- React Router: https://reactrouter.com
- Bootstrap 4: https://getbootstrap.com/docs/4.0/

## 📄 License

This project is open source and available for personal and commercial use.

## 🙏 Credits

- Built with React and Bootstrap 4
- Icons from Font Awesome and Flaticon
- Carousel functionality by Owl Carousel
- Template design inspired by modern recipe blogs

---

**Version**: 1.0.0  
**Last Updated**: March 11, 2026  
**Author**: Your Name
