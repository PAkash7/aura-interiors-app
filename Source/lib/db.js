import fs from 'fs';
import path from 'path';

// Path to the JSON files
const productsPath = path.join(process.cwd(), 'data', 'products.json');
const messagesPath = path.join(process.cwd(), 'data', 'messages.json');
const usersPath = path.join(process.cwd(), 'data', 'users.json');
const applicationsPath = path.join(process.cwd(), 'data', 'applications.json');

// --- PRODUCTS ---
export function getProducts() {
    try {
        const fileContents = fs.readFileSync(productsPath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error("Error reading products DB:", error);
        return [];
    }
}

export function saveProducts(products) {
    try {
        fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
        return true;
    } catch (error) {
        console.error("Error writing products DB:", error);
        return false;
    }
}

// --- MESSAGES ---
export function getMessages() {
    try {
        const fileContents = fs.readFileSync(messagesPath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error("Error reading messages DB:", error);
        return [];
    }
}

export function saveMessages(messages) {
    try {
        fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2));
        return true;
    } catch (error) {
        console.error("Error writing messages DB:", error);
        return false;
    }
}

// --- USERS ---
export function getUsers() {
    try {
        const fileContents = fs.readFileSync(usersPath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error("Error reading users DB:", error);
        return [];
    }
}

export function saveUsers(users) {
    try {
        fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
        return true;
    } catch (error) {
        console.error("Error writing users DB:", error);
        return false;
    }
}

// --- APPLICATIONS ---
export function getApplications() {
    try {
        const fileContents = fs.readFileSync(applicationsPath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error("Error reading applications DB:", error);
        return [];
    }
}

export function saveApplications(apps) {
    try {
        fs.writeFileSync(applicationsPath, JSON.stringify(apps, null, 2));
        return true;
    } catch (error) {
        console.error("Error writing applications DB:", error);
        return false;
    }
}
