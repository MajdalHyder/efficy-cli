#!/usr/bin/env node

import readline from 'readline';
import keypress from 'keypress';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define menu options
const menuOptions = [
  { label: 'Option One', action: () => console.log('You chose Option One.') },
  { label: 'Option Two', action: () => console.log('You chose Option Two.') },
  { label: 'Option Three', action: () => console.log('You chose Option Three.') },
  { label: 'Exit', action: () => { console.log('Exiting the menu.'); rl.close(); } }
];

// Initialize current option index
let currentIndex = 0;

// Display menu with current selection highlighted
function displayMenu() {
  console.clear();
  console.log('Choose an option:');
  menuOptions.forEach((option, index) => {
    if (index === currentIndex) {
      console.log(`> ${option.label}`);
    } else {
      console.log(`  ${option.label}`);
    }
  });
}

// Process the user's choice
function processChoice() {
    const selectedOption = menuOptions[currentIndex];
    selectedOption.action();
    displayMenu();  // Redraw the menu after processing the choice
  }

// Set up keypress events
keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

process.stdin.on('keypress', (ch, key) => {
  if (key) {
    if (key.name === 'up' && currentIndex > 0) {
      currentIndex--;
    } else if (key.name === 'down' && currentIndex < menuOptions.length - 1) {
      currentIndex++;
    } else if (key.name === 'return') {
      processChoice();
    }
    displayMenu();
  }
});

// Start the menu
displayMenu();

// Handle program exit
rl.on('close', () => {
  process.stdin.setRawMode(false);
  process.stdin.pause();
});

// Listen for keypress events
process.stdin.on('keypress', (ch, key) => {
  if (key && key.ctrl && key.name === 'c') {
    rl.close();
  }
});

// Display initial menu
displayMenu();

processChoice();