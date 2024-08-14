import inquirer from 'inquirer';
import fs from 'fs';
import { Circle, Triangle, Square } from './shapes.js';

const questions = [
    {
        type: 'input',
        name: 'text',
        message: 'Enter up to three characters for your logo:',
        validate: input => input.length <= 3 || 'Text must be three characters or less.'
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Enter the text color (color keyword or hexadecimal):',
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape for your logo:',
        choices: ['Circle', 'Triangle', 'Square']
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter the shape color (color keyword or hexadecimal):',
    }
];

inquirer.prompt(questions).then(answers => {
    let shape;
    switch (answers.shape) {
        case 'Circle':
            shape = new Circle();
            break;
        case 'Triangle':
            shape = new Triangle();
            break;
        case 'Square':
            shape = new Square();
            break;
    }
    shape.setColor(answers.shapeColor);

    const svgContent = `
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            ${shape.render()}
            <text x="150" y="125" font-size="60" text-anchor="middle" fill="${answers.textColor}">${answers.text}</text>
        </svg>
    `;

    fs.writeFileSync('logo.svg', svgContent.trim());
    console.log('Generated logo.svg');
});
