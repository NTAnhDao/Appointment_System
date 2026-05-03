import puppeteer from "puppeteer";
import { generateInvoiceHTML } from "./invoiceTemplate.js";

export const generatePDF = async (invoice) => {
    const browser = await puppeteer.launch({args: ["--no-sandbox", "--disable-setuid-sandbox"],});
    const page = await browser.newPage();

    const html = generateInvoiceHTML(invoice);

    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true
    });

    await browser.close();

    return pdfBuffer;
};

export default generatePDF;