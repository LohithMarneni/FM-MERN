import fs from 'fs/promises'; // Use the promises API of fs for async handling
import path from 'path';
import { fileURLToPath } from 'url';
// console.log("Hi");
export const contactMe = async (req, res, next) => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const filePath = path.join(__dirname, '..', 'data', 'contactMe.txt'); // Adjust this path as needed
        const data = await fs.readFile(filePath, "utf-8");
        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        console.error('Error reading file:', error.message);
        next(error);
    }
};
