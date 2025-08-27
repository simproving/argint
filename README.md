# argint

A Romanian silver jewelry inventory management web application for tracking and organizing silver jewelry pieces.

## Project Status

**Current Status**: ✅ **Fully Functional** - Complete working application with all core features implemented

**Last Updated**: August 2025

## Overview

Argint is a web-based tool designed for Romanian jewelry businesses and collectors to manage their silver jewelry inventory. The application provides a grid-based input system where users can enter jewelry piece values and automatically calculates totals and frequencies.

## Features

### ✅ Implemented Features
- **Grid Input System**: 10x50 table for entering values
- **Input Validation**: Only accepts values ending in 5 or 0
- **Real-time Calculations**: Automatic total sum and count updates
- **Frequency Analysis**: Generates frequency tables showing value distribution
- **Auto-save**: Automatically saves data to browser localStorage
- **Data Persistence**: Loads saved data on page refresh
- **Responsive Design**: Clean, print-friendly interface
- **Keyboard Navigation**: Enter key moves between cells automatically, up/down arrow keys for vertical cell navigation
- **Reset Functionality**: Clear all data with confirmation
- **Romanian Language Support**: User interface in Romanian

### 🔧 Technical Features
- **Frontend Only**: Pure HTML/CSS/JavaScript implementation
- **jQuery Integration**: Enhanced DOM manipulation and event handling
- **Local Storage**: Client-side data persistence
- **Print Optimization**: CSS media queries for clean printing
- **Cross-browser Compatibility**: Works in modern browsers

## Current Implementation

The application is **fully functional** with the following components:

- **`index.html`**: Main application interface with 10x10 input grid
- **`scripts.js`**: Core functionality including validation, calculations, and data management
- **`style.css`**: Responsive styling with print optimization
- **External Dependencies**: jQuery 3.7.1, home button utility

## Usage

1. **Open** `index.html` in a web browser
2. **Enter Values**: Type values in the grid (must end in 5 or 0)
3. **Navigate**: Use Enter key to move between cells, or up/down arrow keys for vertical navigation
4. **View Results**: See totals and frequency analysis automatically
5. **Save**: Data is automatically saved to browser storage
6. **Print**: Use browser print function for clean reports
7. **Reset**: Click "Reset" button to clear all data

## File Structure

```
argint/
├── index.html          # Main application interface
├── scripts.js          # Core JavaScript functionality
├── style.css           # Application styling
└── README.md           # Project documentation
```

## Browser Compatibility

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (responsive design)


## Development

This is a client-side only application requiring no server setup. Simply open `index.html` in any modern web browser to run.
