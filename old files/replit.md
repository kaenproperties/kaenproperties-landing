# Kaen Properties Website

## Overview
This is a static HTML/CSS/JS corporate website template for Kaen Properties Sdn Bhd, built with Bootstrap and featuring a responsive design with slider, portfolio gallery, testimonials, and contact sections.

## Project Structure
- `index.html` - Main homepage
- `corporate/` - Site-specific assets
  - `css/style.css` - Custom styles
  - `js/script.js` - Custom JavaScript
  - `img/` - Site images
  - `fonts/` - Custom fonts
- `vendor/` - Third-party libraries
  - `css/` - Bootstrap, Revolution Slider, Fancybox, etc.
  - `js/` - jQuery, plugins, Revolution Slider
  - `fonts/` - Font Awesome, Line Awesome
  - `img/` - Element images

## Running the Project
The project uses a simple Python HTTP server to serve static files:
```
python server.py
```
The server runs on port 5000.

## Key Features
- Revolution Slider for hero section
- Cube Portfolio for image galleries
- Owl Carousel for testimonials
- WOW.js for scroll animations
- Google Maps integration
- Contact form (requires PHP backend for email)

## Dependencies
- Bootstrap 4
- jQuery 3.x
- Revolution Slider
- Owl Carousel
- Fancybox
- Cube Portfolio
- WOW.js

## Notes
- The site has a loading animation that appears while assets load
- Google Maps API key is embedded in the HTML (may need updating)
- Contact form PHP mailer is included but requires server-side PHP support
