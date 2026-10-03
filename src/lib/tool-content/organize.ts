import type { ToolInfo } from "./types";

export const organizeContent: Record<string, ToolInfo> = {
  "merge-pdf": {
    name: "Merge PDF",
    title: "Merge PDF Online Free - Combine PDF Files in Seconds",
    description:
      "Merge PDF files online for free. Combine multiple PDFs into one document in the order you want. No sign-up, no watermark, files never leave your browser.",
    keywords: ["merge pdf", "combine pdf", "join pdf files", "pdf merger online", "merge pdf free"],
    intro: [
      "Merge PDF is a free online tool that combines two or more PDF files into a single PDF document. You choose the order of the files, and every page from each file is copied into the new PDF without changing its quality.",
      "It is the fastest way to put scanned documents, invoices, certificates or report chapters together so you can send, print or upload one file instead of many.",
    ],
    steps: [
      "Click 'Select PDF files' or drag and drop two or more PDF files into the upload box.",
      "Arrange the files in the order you want using the up and down buttons.",
      "Click 'Merge PDFs' to combine them.",
      "The merged PDF downloads automatically to your device.",
    ],
    features: [
      ["Unlimited files", "Combine as many PDF files as you need into one document."],
      ["Custom order", "Reorder files before merging so pages appear exactly where you want."],
      ["Original quality", "Pages are copied as-is. Text, images and fonts are not re-compressed."],
      ["Private by design", "Merging happens in your browser. Your PDFs are never uploaded."],
    ],
    useCases: [
      "Students combining assignments, mark sheets and certificates for admission forms.",
      "Businesses merging invoices, quotations and purchase orders into one file for clients.",
      "Job seekers joining a resume, cover letter and documents into a single PDF.",
      "Anyone uploading multiple scanned pages to a government or bank portal that accepts only one file.",
    ],
    faqs: [
      ["How do I merge PDF files for free?", "Open Merge PDF, select two or more PDF files, set their order and click 'Merge PDFs'. The combined PDF downloads instantly. It is free with no sign-up."],
      ["Will merging reduce the quality of my PDF?", "No. Merge PDF copies the original pages into the new document without re-compressing images or text, so the quality stays exactly the same."],
      ["Can I merge password-protected PDFs?", "Encrypted PDFs must be unlocked first. Use the Unlock PDF tool with the password, then merge the unlocked files."],
      ["Is there a limit on how many PDFs I can merge?", "There is no fixed limit. Very large files depend on your device memory, but merging dozens of normal PDFs works smoothly."],
    ],
  },
  "split-pdf": {
    name: "Split PDF",
    title: "Split PDF Online Free - Separate PDF Pages by Range",
    description:
      "Split a PDF into multiple files by page ranges. Free online PDF splitter that works in your browser with no upload, no sign-up and no watermark.",
    keywords: ["split pdf", "separate pdf pages", "pdf splitter", "split pdf by page range", "divide pdf"],
    intro: [
      "Split PDF is a free online tool that divides one PDF document into several smaller PDF files. You type the page ranges you want, for example 1-3, 4-6, 7-10, and each range is saved as its own PDF.",
      "It is useful when a single scanned file contains several documents, or when a portal only accepts a few pages at a time.",
    ],
    steps: [
      "Select or drag and drop the PDF you want to split.",
      "Enter the page ranges, separated by commas (for example 1-3, 4-6, 7-10).",
      "Click 'Split PDF'.",
      "Download each new PDF file created from your ranges.",
    ],
    features: [
      ["Split by custom ranges", "Create as many output files as you need, each with exactly the pages you choose."],
      ["Fast and lossless", "Pages are copied without re-encoding, so quality is unchanged."],
      ["Works offline after loading", "All processing happens locally in your browser."],
      ["No account needed", "Split PDFs instantly without registration or email."],
    ],
    useCases: [
      "Separating a long scanned file into individual documents such as Aadhaar, PAN and certificates.",
      "Sending only the relevant chapter of a book or report to a colleague.",
      "Breaking a large bank statement into monthly files.",
      "Uploading documents to portals that have a page or size limit.",
    ],
    faqs: [
      ["How do I split a PDF into separate files?", "Upload the PDF to Split PDF, type page ranges like 1-3, 4-6 and click 'Split PDF'. Each range becomes a separate PDF file that you can download."],
      ["Can I extract just one page from a PDF?", "Yes. Enter a single-page range such as 5-5, or use the Extract Pages tool to pick pages visually."],
      ["Does splitting change the content of my pages?", "No. Splitting only copies pages into new files. Text, images, links and formatting remain the same."],
    ],
  },
  "remove-pages": {
    name: "Remove Pages",
    title: "Remove Pages from PDF Online Free - Delete PDF Pages",
    description:
      "Delete unwanted pages from a PDF online for free. Click pages or type page numbers to remove them, then download the cleaned PDF. No upload required.",
    keywords: ["remove pages from pdf", "delete pdf pages", "pdf page remover", "delete page from pdf online"],
    intro: [
      "Remove Pages is a free online tool that deletes selected pages from a PDF document. You see a preview of every page, click the ones you do not need (or type page numbers like 2, 5-7) and download a new PDF without them.",
      "Use it to get rid of blank pages, advertisements, duplicate scans or confidential pages before sharing a document.",
    ],
    steps: [
      "Select or drag and drop your PDF file.",
      "Click the page thumbnails you want to delete, or type page numbers such as 2, 5-7.",
      "Check the preview: pages marked in red will be removed.",
      "Click 'Remove pages' and download the new PDF.",
    ],
    features: [
      ["Visual page preview", "See thumbnails of every page so you delete exactly the right ones."],
      ["Type page numbers", "Quickly mark pages with ranges like 1, 3, 8-12."],
      ["Lossless", "Remaining pages keep their original quality and text."],
      ["Private", "Pages are removed in your browser. Nothing is uploaded."],
    ],
    useCases: [
      "Removing blank or duplicate pages from scanned documents.",
      "Deleting pages with personal information before sharing a file.",
      "Trimming cover pages and advertisements from e-books or reports.",
      "Reducing page count to meet upload limits on online forms.",
    ],
    faqs: [
      ["How do I delete a page from a PDF without Adobe Acrobat?", "Open Remove Pages, upload your PDF, click the page you want to delete and press 'Remove pages'. The new PDF downloads without that page. No software is needed."],
      ["Can I remove multiple pages at once?", "Yes. Click as many thumbnails as you want or type ranges such as 2, 4-9, 15 to remove them in one go."],
      ["Can I undo a page I marked by mistake?", "Yes. Click the page thumbnail again to unmark it before downloading."],
    ],
  },
  "extract-pages": {
    name: "Extract Pages",
    title: "Extract Pages from PDF Online Free - Save Selected Pages",
    description:
      "Extract selected pages from a PDF into a new PDF, or save each page as a separate file. Free, fast and private online PDF page extractor.",
    keywords: ["extract pages from pdf", "extract pdf pages", "save pdf page", "pdf page extractor"],
    intro: [
      "Extract Pages is a free online tool that copies only the pages you choose from a PDF into a new document. You can save all selected pages as one PDF, or get every selected page as its own PDF file in a ZIP.",
      "It is the opposite of Remove Pages: instead of deleting what you don't need, you pick what you want to keep.",
    ],
    steps: [
      "Select or drag and drop your PDF file.",
      "Click the page thumbnails you want to extract, or type page numbers such as 1, 4-6.",
      "Choose 'One PDF' or 'Separate PDF for each page'.",
      "Click 'Extract pages' and download the result.",
    ],
    features: [
      ["Pick pages visually", "Thumbnail previews make it easy to select the right pages."],
      ["One file or many", "Save selected pages as a single PDF or as separate PDFs in a ZIP archive."],
      ["Original quality", "Extracted pages are identical to the original pages."],
      ["Runs in your browser", "Your document is never uploaded to a server."],
    ],
    useCases: [
      "Saving only the result page from a long exam or admission document.",
      "Sharing one invoice from a combined monthly PDF.",
      "Pulling specific chapters or slides from a large PDF for study notes.",
      "Creating single-page PDFs for document upload portals.",
    ],
    faqs: [
      ["How do I extract specific pages from a PDF?", "Upload the PDF to Extract Pages, click the pages you want (or type 1, 4-6), choose one PDF or separate files and click 'Extract pages'."],
      ["What is the difference between Extract Pages and Split PDF?", "Split PDF divides a document into several files by ranges. Extract Pages lets you visually pick any pages, even non-consecutive ones, and save them together or separately."],
      ["Can I extract every page as a separate PDF?", "Yes. Select all pages and choose 'Separate PDF for each page'. You will get a ZIP file containing one PDF per page."],
    ],
  },
  "organize-pdf": {
    name: "Organize PDF",
    title: "Organize PDF Pages Online Free - Reorder & Delete Pages",
    description:
      "Rearrange, reorder and delete pages in a PDF online for free. Sort pages the way you want and download the new PDF instantly. No upload, no sign-up.",
    keywords: ["organize pdf", "reorder pdf pages", "rearrange pdf pages", "sort pdf pages", "move pdf pages"],
    intro: [
      "Organize PDF is a free online tool that lets you change the order of pages in a PDF and delete the pages you don't need. Move pages left or right, mark pages for deletion and download a neatly arranged document.",
      "It is perfect for fixing scans that came out in the wrong order or for preparing a document before printing or sharing.",
    ],
    steps: [
      "Select or drag and drop your PDF.",
      "Use the arrow buttons to move pages to a new position.",
      "Click 'Delete' on any page you want to remove (click 'Undo' to keep it).",
      "Click 'Apply & Download' to save the organized PDF.",
    ],
    features: [
      ["Reorder pages", "Move any page forward or backward in the document."],
      ["Delete pages", "Remove unwanted pages while organizing."],
      ["Live page count", "See how many pages will be in the final file."],
      ["No quality loss", "Pages are copied without re-compression."],
    ],
    useCases: [
      "Fixing the page order of a double-sided scan.",
      "Arranging chapters of a report or project file.",
      "Putting the most important pages first before sending a proposal.",
      "Cleaning up a document by removing extra pages.",
    ],
    faqs: [
      ["How do I change the order of pages in a PDF?", "Upload the PDF to Organize PDF, move pages with the arrow buttons into the order you want and click 'Apply & Download'."],
      ["Can I delete pages while reordering?", "Yes. Click 'Delete' on any page. It will be excluded from the final PDF. Click 'Undo' to restore it."],
      ["Does Organize PDF keep links and text?", "Yes. Pages are copied as they are, so selectable text and images are preserved."],
    ],
  },
  "rotate-pdf": {
    name: "Rotate PDF",
    title: "Rotate PDF Online Free - Rotate PDF Pages Permanently",
    description:
      "Rotate PDF pages 90, 180 or 270 degrees online for free. Rotate a single page or all pages at once and save the result permanently. Private and fast.",
    keywords: ["rotate pdf", "rotate pdf pages", "turn pdf page", "rotate pdf online free", "fix sideways pdf"],
    intro: [
      "Rotate PDF is a free online tool that turns PDF pages clockwise or anti-clockwise and saves the new orientation permanently. You can rotate one page at a time or every page in the document with one click.",
      "Use it to fix sideways or upside-down scans so the document reads correctly on every device and prints properly.",
    ],
    steps: [
      "Select or drag and drop your PDF file.",
      "Click the rotate button on individual pages, or use 'Rotate All' left or right.",
      "Check the preview to confirm each page faces the right way.",
      "Click the download button to save the rotated PDF.",
    ],
    features: [
      ["Rotate single or all pages", "Rotate pages individually or the whole document at once."],
      ["90° steps", "Rotate left or right in 90 degree steps, including 180° for upside-down pages."],
      ["Permanent rotation", "The new orientation is saved in the file, not just in the viewer."],
      ["Browser based", "Works without uploading your document."],
    ],
    useCases: [
      "Fixing pages scanned sideways on a mobile phone or scanner.",
      "Rotating landscape tables inside a portrait report.",
      "Correcting upside-down pages before printing.",
      "Preparing documents for upload so reviewers can read them easily.",
    ],
    faqs: [
      ["How do I rotate a PDF and save it permanently?", "Upload the file to Rotate PDF, rotate the pages you need and download. The rotation is written into the PDF, so it stays rotated in every PDF reader."],
      ["Can I rotate only one page in a PDF?", "Yes. Use the rotate button on that page only. Other pages keep their original orientation."],
      ["Does rotating a PDF reduce quality?", "No. Rotation only changes the page orientation setting. Content is not re-compressed."],
    ],
  },
  "scan-to-pdf": {
    name: "Scan to PDF",
    title: "Scan to PDF Online Free - Camera & Photo to PDF Scanner",
    description:
      "Scan documents to PDF with your phone camera or webcam. Enhance, crop to A4, convert to black and white and save as PDF. Free online document scanner.",
    keywords: ["scan to pdf", "document scanner online", "camera to pdf", "photo to pdf scanner", "mobile scanner pdf"],
    intro: [
      "Scan to PDF is a free online document scanner. It uses your phone camera, webcam or existing photos to capture pages, improves them for readability and saves them as a single PDF.",
      "Options such as auto-enhance, grayscale and black-and-white make photos of paper look like clean scans, without installing a scanner app.",
    ],
    steps: [
      "Click 'Use camera' to capture pages, or upload photos from your gallery.",
      "Reorder or rotate the captured pages if needed.",
      "Choose a filter (Enhance, Grayscale or Black & White) and page size (A4 or fit to image).",
      "Click 'Create PDF' to download your scanned document.",
    ],
    features: [
      ["Camera capture", "Scan directly with a mobile camera or laptop webcam."],
      ["Scan filters", "Enhance contrast, grayscale or high-contrast black and white for text documents."],
      ["Multi-page PDFs", "Capture many pages and combine them into one PDF."],
      ["A4 output", "Fit each scan neatly on standard A4 pages for printing."],
    ],
    useCases: [
      "Scanning ID cards, mark sheets and certificates for online applications.",
      "Digitising receipts and bills for accounting.",
      "Capturing handwritten notes and assignments.",
      "Creating PDFs of signed forms without a physical scanner.",
    ],
    faqs: [
      ["How can I scan a document to PDF with my phone?", "Open Scan to PDF in your phone browser, tap 'Use camera', capture each page, apply the Enhance or Black & White filter and tap 'Create PDF'."],
      ["Do I need to install a scanner app?", "No. The scanner works inside the browser on Android and iPhone. Camera access is requested only while you scan."],
      ["Can I make the scanned text searchable?", "Yes. After creating the PDF, run it through the OCR PDF tool to add a searchable, selectable text layer."],
    ],
  },
  "compress-pdf": {
    name: "Compress PDF",
    title: "Compress PDF Online Free - Reduce PDF File Size",
    description:
      "Reduce PDF file size online for free. Choose less, recommended or extreme compression and see the size saved. Ideal for email and upload limits.",
    keywords: ["compress pdf", "reduce pdf size", "pdf compressor", "compress pdf to 100kb", "make pdf smaller"],
    intro: [
      "Compress PDF is a free online tool that reduces the file size of a PDF document. It offers three levels: less compression for maximum quality, recommended for a balance of size and quality, and extreme for the smallest possible file.",
      "Smaller PDFs are easier to email, faster to upload and fit within the file size limits of job portals, government websites and exam forms.",
    ],
    steps: [
      "Select or drag and drop the PDF you want to compress.",
      "Choose a compression level: Less, Recommended or Extreme.",
      "Click 'Compress PDF'.",
      "Compare the original and new size, then download the compressed file.",
    ],
    features: [
      ["Three compression levels", "Pick the right balance between file size and visual quality."],
      ["Size report", "See the original size, compressed size and percentage saved."],
      ["Image optimisation", "Recommended and Extreme modes re-encode page images as optimised JPEG."],
      ["No upload", "Compression runs in your browser, keeping documents private."],
    ],
    useCases: [
      "Meeting upload limits such as 100 KB, 200 KB or 1 MB on application forms.",
      "Emailing large scanned documents as attachments.",
      "Saving storage space on phones and cloud drives.",
      "Sharing reports quickly on WhatsApp.",
    ],
    faqs: [
      ["How do I reduce PDF size without losing quality?", "Use the 'Less compression' level. It optimises the file structure without re-encoding images, so quality stays the same while size shrinks."],
      ["How can I compress a PDF to under 100 KB?", "Choose 'Extreme compression'. It converts pages to compact JPEG images. If the file is still too large, split it or remove unneeded pages first."],
      ["Will text remain selectable after compression?", "With 'Less compression' text stays selectable. Recommended and Extreme modes turn pages into images, so use OCR PDF afterwards if you need searchable text."],
    ],
  },
  "repair-pdf": {
    name: "Repair PDF",
    title: "Repair PDF Online Free - Fix Corrupted or Damaged PDF",
    description:
      "Repair corrupted or damaged PDF files online for free. Fix broken headers, missing end markers and cross-reference errors and recover your pages.",
    keywords: ["repair pdf", "fix corrupted pdf", "recover damaged pdf", "pdf repair tool", "pdf not opening"],
    intro: [
      "Repair PDF is a free online tool that tries to fix PDF files that won't open or show errors. It removes junk data before the PDF header, adds a missing end-of-file marker, rebuilds the cross-reference table and recovers as many pages as possible.",
      "If the structure cannot be rebuilt, the tool renders whatever pages are readable into a new, clean PDF so you can still get your content back.",
    ],
    steps: [
      "Select or drag and drop the damaged PDF file.",
      "Click 'Repair PDF'.",
      "Read the repair report to see what was fixed.",
      "Download the repaired PDF.",
    ],
    features: [
      ["Header and EOF repair", "Fixes files with extra bytes at the start or a missing end marker."],
      ["Structure rebuild", "Reconstructs the cross-reference table and object structure."],
      ["Fallback recovery", "Renders readable pages into a fresh PDF when the structure is too damaged."],
      ["Detailed log", "Shows each repair step so you know what happened."],
    ],
    useCases: [
      "Recovering PDFs from interrupted downloads or email attachments.",
      "Fixing files that show 'There was an error opening this document'.",
      "Rescuing documents copied from damaged USB drives or SD cards.",
      "Cleaning PDFs generated by buggy software before uploading.",
    ],
    faqs: [
      ["Why is my PDF file not opening?", "The file is usually incomplete (interrupted download), has extra data before the header, or has a broken cross-reference table. Repair PDF fixes these common problems."],
      ["Can every corrupted PDF be repaired?", "Not always. If important data is missing, only some pages may be recovered. The repair report tells you how many pages were saved."],
      ["Does repairing change my content?", "Structural repair keeps the original text and quality. Only the fallback mode converts pages to images."],
    ],
  },
  "ocr-pdf": {
    name: "OCR PDF",
    title: "OCR PDF Online Free - Make Scanned PDF Searchable (Hindi & English)",
    description:
      "Convert scanned PDFs and images into searchable, selectable text with free online OCR. Supports English, Hindi, Marathi, Gujarati, Tamil and more.",
    keywords: ["ocr pdf", "searchable pdf", "scanned pdf to text", "hindi ocr", "pdf text recognition"],
    intro: [
      "OCR PDF is a free online optical character recognition tool. It reads the text inside scanned PDFs and images and adds an invisible text layer, turning a picture-only PDF into a searchable, selectable document. You can also download the recognised text as a .txt file.",
      "It supports 15 languages including English, Hindi, Marathi, Gujarati, Punjabi, Bengali, Tamil, Telugu, Kannada, Malayalam, Urdu, Arabic, French, German and Spanish.",
    ],
    steps: [
      "Select or drag and drop a scanned PDF.",
      "Choose the document language (you can select more than one).",
      "Click 'Start OCR' and wait while each page is recognised.",
      "Download the searchable PDF or the extracted text.",
    ],
    features: [
      ["15 languages", "Recognises Indian and international languages, including Hindi and other Indic scripts."],
      ["Searchable PDF", "Keeps the original look while adding selectable, copyable text."],
      ["Text export", "Download all recognised text as a plain text file."],
      ["Page progress", "See recognition progress page by page."],
    ],
    useCases: [
      "Making scanned books, notes and old documents searchable.",
      "Copying text from scanned government letters or court documents.",
      "Extracting Hindi text from printed documents for editing.",
      "Preparing scanned files for translation or summarisation.",
    ],
    faqs: [
      ["What is OCR in PDF?", "OCR (optical character recognition) detects letters in an image of a page and converts them into real text. An OCR PDF looks the same but lets you search, select and copy its text."],
      ["Does OCR PDF support Hindi?", "Yes. Select Hindi (and English if the document is mixed) before starting OCR."],
      ["How accurate is the OCR?", "Clear, straight scans at good resolution give very high accuracy. Blurry photos, handwriting or low contrast reduce accuracy; use Scan to PDF's Enhance filter first."],
    ],
    privacy:
      "Your PDF never leaves your device. Recognition runs in your browser; only the language data files are downloaded the first time you use a language. Your document is not uploaded or stored.",
  },
};
