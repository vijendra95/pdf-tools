import type { ToolInfo } from "./types";

export const convertContent: Record<string, ToolInfo> = {
  "pdf-to-word": {
    name: "PDF to Word",
    title: "PDF to Word Converter Online Free - Convert PDF to DOCX",
    description:
      "Convert PDF to editable Word (DOCX) documents online for free. Extracts text and paragraphs into a Word file you can edit. No sign-up, no upload.",
    keywords: ["pdf to word", "pdf to docx", "convert pdf to word free", "editable word from pdf", "pdf to doc"],
    intro: [
      "PDF to Word is a free online converter that turns a PDF document into an editable Microsoft Word (.docx) file. It extracts the text and paragraphs from every page so you can edit, rewrite and reuse the content in Word, Google Docs or LibreOffice.",
      "For scanned PDFs, run OCR PDF first so the text can be recognised before converting.",
    ],
    steps: [
      "Select or drag and drop your PDF file.",
      "Click 'Convert to Word'.",
      "Wait a few seconds while the text is extracted.",
      "Download the .docx file and open it in Word.",
    ],
    features: [
      ["Editable DOCX output", "Opens in Microsoft Word, Google Docs, WPS and LibreOffice."],
      ["Page-by-page text", "Text from each page is kept in reading order."],
      ["Fast conversion", "Most documents convert in seconds."],
      ["No upload", "Conversion happens in your browser."],
    ],
    useCases: [
      "Editing a resume or letter you only have as a PDF.",
      "Reusing text from reports, notices and articles.",
      "Updating old contracts or quotations.",
      "Teachers editing question papers and notes.",
    ],
    faqs: [
      ["How do I convert a PDF to an editable Word document?", "Upload the PDF to PDF to Word and click 'Convert to Word'. Download the .docx file and open it in Word to edit."],
      ["Can I convert a scanned PDF to Word?", "Yes, but scanned PDFs contain images, not text. Use OCR PDF first to recognise the text, then convert the searchable PDF to Word."],
      ["Will the layout be exactly the same?", "The converter focuses on clean, editable text. Complex layouts with columns, tables and graphics may need small adjustments in Word."],
    ],
  },
  "pdf-to-jpg": {
    name: "PDF to JPG",
    title: "PDF to JPG Converter Online Free - Convert PDF Pages to Images",
    description:
      "Convert every PDF page into a high-quality JPG image online for free. Choose Normal, High or Ultra quality and download images one by one or all together.",
    keywords: ["pdf to jpg", "pdf to image", "convert pdf to jpeg", "pdf page to photo", "pdf to jpg high quality"],
    intro: [
      "PDF to JPG is a free online tool that converts each page of a PDF into a JPG image. You can pick Normal, High or Ultra quality and download each image separately or all at once.",
      "JPG images are easy to share on WhatsApp, Instagram and websites, and to insert into presentations or documents.",
    ],
    steps: [
      "Select or drag and drop your PDF file.",
      "Choose the image quality: Normal, High or Ultra.",
      "Click 'Convert to JPG'.",
      "Download individual images or click 'Download All Images'.",
    ],
    features: [
      ["Three quality levels", "Higher quality gives sharper images for printing and zooming."],
      ["Every page converted", "Each PDF page becomes its own JPG file."],
      ["Preview before download", "See all page images before saving."],
      ["Private", "Pages are rendered in your browser."],
    ],
    useCases: [
      "Sharing a single PDF page as an image on WhatsApp or social media.",
      "Using PDF pages in PowerPoint, Canva or website posts.",
      "Uploading documents to portals that accept only images.",
      "Creating thumbnails or previews of PDF documents.",
    ],
    faqs: [
      ["How do I convert a PDF to JPG images?", "Upload the PDF to PDF to JPG, choose a quality, click 'Convert to JPG' and download the images."],
      ["Which quality should I choose?", "Normal is good for screens and sharing. High suits most uses. Ultra is best for printing or reading small text."],
      ["Can I convert only one page?", "All pages are converted, but you can download only the page image you need."],
    ],
  },
  "jpg-to-pdf": {
    name: "JPG to PDF",
    title: "JPG to PDF Converter Online Free - Convert Images to PDF",
    description:
      "Convert JPG and PNG images to a single PDF online for free. Arrange the order of photos and download one PDF. No watermark, no upload.",
    keywords: ["jpg to pdf", "image to pdf", "png to pdf", "photo to pdf", "convert images to pdf free"],
    intro: [
      "JPG to PDF is a free online converter that combines JPG and PNG images into one PDF document. Each image becomes a page, in the order you choose.",
      "It is the easiest way to send many photos of documents as a single, professional PDF file.",
    ],
    steps: [
      "Select or drag and drop one or more JPG or PNG images.",
      "Arrange the images in the order you want.",
      "Click 'Convert to PDF'.",
      "Download the PDF containing all your images.",
    ],
    features: [
      ["JPG and PNG support", "Convert common image formats from phones and cameras."],
      ["Multiple images", "Combine many photos into one multi-page PDF."],
      ["Custom order", "Reorder images before converting."],
      ["Original quality", "Images are embedded without extra compression."],
    ],
    useCases: [
      "Submitting photographed documents for KYC, admission or job applications.",
      "Turning phone photos of notes into a study PDF.",
      "Creating a PDF portfolio of designs or products.",
      "Sending receipts and bills to an accountant in one file.",
    ],
    faqs: [
      ["How do I convert multiple images into one PDF?", "Select all images in JPG to PDF, arrange their order and click 'Convert to PDF'. You get one PDF with one image per page."],
      ["Does JPG to PDF support PNG?", "Yes. Both JPG/JPEG and PNG images are supported."],
      ["Want a cleaner scanned look?", "Use Scan to PDF instead. It adds Enhance and Black & White filters and fits pages to A4."],
    ],
  },
  "word-to-pdf": {
    name: "Word to PDF",
    title: "Word to PDF Converter Online Free - Convert DOCX to PDF",
    description:
      "Convert Word documents (DOCX) to PDF online for free. Create a PDF that looks the same on every device. Fast, private and no sign-up.",
    keywords: ["word to pdf", "docx to pdf", "convert word to pdf free", "doc to pdf online"],
    intro: [
      "Word to PDF is a free online converter that turns Microsoft Word documents into PDF files. PDF keeps your content fixed so it looks the same on phones, computers and printers.",
      "It is ideal for sending resumes, letters, applications and reports in a format that cannot be accidentally edited.",
    ],
    steps: [
      "Select or drag and drop your Word (.docx) file.",
      "Click 'Convert to PDF'.",
      "Wait a moment while the document is converted.",
      "Download the PDF file.",
    ],
    features: [
      ["DOCX support", "Converts modern Word documents created in Word, Google Docs or WPS."],
      ["Text and headings", "Keeps paragraphs, headings and basic formatting."],
      ["Printable output", "Produces standard PDF pages ready for print."],
      ["Private", "Your document is converted locally in your browser."],
    ],
    useCases: [
      "Sending a resume or cover letter to employers.",
      "Submitting assignments and project reports.",
      "Sharing official letters and notices.",
      "Archiving documents in a format that won't change.",
    ],
    faqs: [
      ["How do I convert a Word file to PDF for free?", "Upload the .docx file to Word to PDF and click 'Convert to PDF'. The PDF downloads in seconds."],
      ["Can I convert old .doc files?", "Modern .docx files work best. Open an old .doc file in Word or Google Docs and save it as .docx first."],
      ["Will images and tables be included?", "Text, headings and basic formatting are converted. Complex layouts may look simpler than in Word."],
    ],
  },
  "html-to-pdf": {
    name: "HTML to PDF",
    title: "HTML to PDF Converter Online Free - Convert HTML Code to PDF",
    description:
      "Convert HTML files or pasted HTML code into a PDF online for free. Quick, private HTML to PDF conversion in your browser.",
    keywords: ["html to pdf", "convert html to pdf", "web page to pdf", "html code to pdf"],
    intro: [
      "HTML to PDF is a free online converter that turns HTML files or HTML code into a PDF document. Upload an .html file or paste your code, preview it and save it as a PDF.",
      "Developers, bloggers and businesses use it to create printable versions of invoices, emails, templates and web content.",
    ],
    steps: [
      "Upload an .html/.htm file or paste HTML code into the editor.",
      "Check the preview.",
      "Click 'Convert to PDF'.",
      "Download the generated PDF.",
    ],
    features: [
      ["File or code input", "Convert an HTML file or code pasted directly."],
      ["Live preview", "See the content before converting."],
      ["Text-friendly output", "Headings and paragraphs are written as real PDF text."],
      ["Runs locally", "No upload to any server."],
    ],
    useCases: [
      "Saving HTML email templates or newsletters as PDF.",
      "Creating PDF invoices from HTML templates.",
      "Archiving web content for offline reading.",
      "Sharing code-generated reports with clients.",
    ],
    faqs: [
      ["How do I convert HTML code to PDF?", "Paste the code into HTML to PDF (or upload the .html file) and click 'Convert to PDF'."],
      ["Can I convert a live website URL?", "This tool converts HTML files and code. To save a live page, open it in your browser, save it as HTML, then convert it here, or use the browser's Print → Save as PDF."],
      ["Are CSS styles supported?", "Basic text structure is converted. Advanced CSS layouts may appear simplified."],
    ],
  },
  "pdf-to-ppt": {
    name: "PDF to PowerPoint",
    title: "PDF to PowerPoint Converter Online Free - PDF to PPTX",
    description:
      "Convert PDF to PowerPoint (PPTX) online for free. Every PDF page becomes a slide you can present and add to. No sign-up, no upload.",
    keywords: ["pdf to ppt", "pdf to powerpoint", "pdf to pptx", "convert pdf to slides"],
    intro: [
      "PDF to PowerPoint is a free online converter that turns each page of a PDF into a slide in a PowerPoint (.pptx) presentation. The page is placed as a high-quality image so your slides look exactly like the original.",
      "You can then add notes, animations, new slides or extra text in PowerPoint, Google Slides or Keynote.",
    ],
    steps: [
      "Select or drag and drop your PDF file.",
      "Click 'Convert to PowerPoint'.",
      "Wait while each page is turned into a slide.",
      "Download the .pptx presentation.",
    ],
    features: [
      ["One slide per page", "Every PDF page becomes its own slide."],
      ["Exact look", "Pages are kept as sharp images so design and fonts don't break."],
      ["Works with all editors", "Open in PowerPoint, Google Slides, Keynote or WPS."],
      ["Private", "Converted entirely in your browser."],
    ],
    useCases: [
      "Presenting a PDF report in a meeting.",
      "Teachers turning PDF notes into classroom slides.",
      "Reusing a PDF brochure in a sales pitch.",
      "Adding speaker notes to an existing PDF deck.",
    ],
    faqs: [
      ["How do I convert a PDF into a PowerPoint presentation?", "Upload the PDF to PDF to PowerPoint and click 'Convert to PowerPoint'. Download the .pptx file and open it in PowerPoint."],
      ["Can I edit the text on the slides?", "Pages are placed as images to keep the exact design. You can add new text boxes on top. For editable text, use PDF to Word."],
      ["Does it work with Google Slides?", "Yes. Upload the .pptx file to Google Drive and open it with Google Slides."],
    ],
  },
  "pdf-to-excel": {
    name: "PDF to Excel",
    title: "PDF to Excel Converter Online Free - Convert PDF Tables to XLSX",
    description:
      "Convert PDF to Excel (XLSX) online for free. Pull data and tables from PDFs into spreadsheet rows and columns. Private, fast and no sign-up.",
    keywords: ["pdf to excel", "pdf to xlsx", "convert pdf table to excel", "extract table from pdf"],
    intro: [
      "PDF to Excel is a free online converter that extracts text and tables from a PDF and arranges them into rows and columns in an Excel (.xlsx) spreadsheet.",
      "It saves hours of manual typing when you need to analyse bank statements, price lists, reports or invoices in Excel or Google Sheets.",
    ],
    steps: [
      "Select or drag and drop your PDF file.",
      "Click 'Convert to Excel'.",
      "Wait while text is detected and arranged into rows and columns.",
      "Download the .xlsx spreadsheet.",
    ],
    features: [
      ["Row and column detection", "Text positions are used to rebuild table rows and columns."],
      ["XLSX output", "Opens in Excel, Google Sheets, WPS and LibreOffice Calc."],
      ["One sheet per page", "Keeps data from each page organised."],
      ["No upload", "Your financial data stays on your device."],
    ],
    useCases: [
      "Analysing bank or credit card statements.",
      "Importing supplier price lists into Excel.",
      "Converting GST or sales reports for accounting.",
      "Extracting tables from research papers.",
    ],
    faqs: [
      ["How do I convert a PDF table to Excel?", "Upload the PDF to PDF to Excel and click 'Convert to Excel'. The tool detects rows and columns and creates an .xlsx file."],
      ["Does it work with scanned PDFs?", "Scanned PDFs need OCR first. Run OCR PDF, then convert the searchable PDF to Excel."],
      ["Is my bank statement safe?", "Yes. The PDF is processed in your browser and never uploaded."],
    ],
  },
  "excel-to-pdf": {
    name: "Excel to PDF",
    title: "Excel to PDF Converter Online Free - Convert XLSX & CSV to PDF",
    description:
      "Convert Excel spreadsheets (XLS, XLSX) and CSV files to PDF online for free. Share tables in a clean, printable format. No upload needed.",
    keywords: ["excel to pdf", "xlsx to pdf", "csv to pdf", "convert spreadsheet to pdf"],
    intro: [
      "Excel to PDF is a free online converter that turns Excel workbooks (.xls, .xlsx) and CSV files into PDF documents with neat tables.",
      "PDF makes spreadsheets easy to read, print and share without the recipient needing Excel or being able to change the numbers.",
    ],
    steps: [
      "Select or drag and drop an .xls, .xlsx or .csv file.",
      "Click 'Convert to PDF'.",
      "Wait while each sheet is laid out as a table.",
      "Download the PDF.",
    ],
    features: [
      ["XLS, XLSX and CSV", "Supports all common spreadsheet formats."],
      ["Table layout", "Rows and columns are drawn as a readable table."],
      ["All sheets", "Every sheet in the workbook is included."],
      ["Private", "Spreadsheets are converted locally."],
    ],
    useCases: [
      "Sending price lists or quotations to customers.",
      "Sharing salary sheets, attendance or reports with management.",
      "Printing inventory or stock registers.",
      "Submitting data tables with applications.",
    ],
    faqs: [
      ["How do I convert Excel to PDF without Microsoft Office?", "Upload the spreadsheet to Excel to PDF and click 'Convert to PDF'. No Office installation is needed."],
      ["Can I convert CSV files?", "Yes. CSV, XLS and XLSX files are all supported."],
      ["Will formulas be kept?", "PDF shows the calculated values of cells. Formulas themselves are not included in a PDF."],
    ],
  },
  "ppt-to-pdf": {
    name: "PowerPoint to PDF",
    title: "PowerPoint to PDF Converter Online Free - Convert PPTX to PDF",
    description:
      "Convert PowerPoint presentations (PPT, PPTX) to PDF online for free. Share slides as an easy-to-view PDF on any device.",
    keywords: ["ppt to pdf", "pptx to pdf", "powerpoint to pdf", "convert slides to pdf"],
    intro: [
      "PowerPoint to PDF is a free online converter that turns PowerPoint slideshows into PDF documents. Each slide becomes a PDF page with its text content.",
      "PDF presentations open on any phone or computer without PowerPoint, and are smaller and easier to email.",
    ],
    steps: [
      "Select or drag and drop your .pptx file.",
      "Click 'Convert to PDF'.",
      "Wait while the slides are converted.",
      "Download the PDF.",
    ],
    features: [
      ["PPTX support", "Converts presentations from PowerPoint, Google Slides and WPS."],
      ["One page per slide", "Slides stay in their original order."],
      ["Universal viewing", "Anyone can open the PDF without PowerPoint."],
      ["No upload", "Converted in your browser."],
    ],
    useCases: [
      "Sharing class or training slides with students.",
      "Sending business pitch decks to clients.",
      "Submitting project presentations to colleges.",
      "Printing handouts from slides.",
    ],
    faqs: [
      ["How do I convert a PowerPoint to PDF?", "Upload the .pptx file to PowerPoint to PDF and click 'Convert to PDF'."],
      ["Are animations kept?", "No. PDF is a static format, so animations and transitions are not included."],
      ["Can I convert old .ppt files?", "Save the .ppt file as .pptx in PowerPoint or Google Slides first for the best result."],
    ],
  },
  "pdf-to-pdfa": {
    name: "PDF to PDF/A",
    title: "PDF to PDF/A Converter Online Free - Archive PDF (PDF/A-1b, 2b, 3b)",
    description:
      "Convert PDF to PDF/A for long-term archiving online for free. Choose PDF/A-1b, PDF/A-2b or PDF/A-3b with embedded sRGB colour profile and metadata.",
    keywords: ["pdf to pdfa", "pdf/a converter", "pdf a-1b", "archive pdf", "pdf/a online"],
    intro: [
      "PDF to PDF/A is a free online converter that turns a normal PDF into PDF/A, the ISO standard format for long-term document archiving. It adds PDF/A identification metadata (XMP) and an sRGB output intent so the document can be displayed the same way years from now.",
      "Courts, government offices, banks and universities often require PDF/A for e-filing and record keeping.",
    ],
    steps: [
      "Select or drag and drop your PDF.",
      "Choose the conformance level: PDF/A-1b, PDF/A-2b or PDF/A-3b.",
      "Choose 'Preserve text' or 'Flatten to images' mode.",
      "Click 'Convert to PDF/A' and download the archive-ready file.",
    ],
    features: [
      ["PDF/A-1b, 2b and 3b", "Pick the version your portal or archive requires."],
      ["Embedded colour profile", "Adds an sRGB ICC output intent for consistent colours."],
      ["XMP metadata", "Writes PDF/A identification, title and dates."],
      ["Two modes", "Preserve selectable text, or flatten pages to images for maximum compatibility."],
    ],
    useCases: [
      "E-filing documents in courts and tribunals.",
      "Archiving invoices, contracts and records for compliance.",
      "Submitting theses and dissertations to universities.",
      "Long-term storage of important personal documents.",
    ],
    faqs: [
      ["What is PDF/A?", "PDF/A is an ISO-standardised version of PDF designed for long-term archiving. It must be self-contained and must not depend on external resources, so it displays the same way in the future."],
      ["Which PDF/A version should I choose?", "Choose the version your portal asks for. PDF/A-1b is the most widely accepted; PDF/A-2b and 3b allow newer features like transparency and attachments."],
      ["Is the output validated?", "The tool adds the required metadata and colour profile. For strict legal submissions, you can verify the file with a PDF/A validator such as veraPDF."],
    ],
  },
  "pdf-to-markdown": {
    name: "PDF to Markdown",
    title: "PDF to Markdown Converter Online Free - Convert PDF to .md",
    description:
      "Convert PDF to Markdown online for free. Extract headings, lists and paragraphs into clean .md text for AI tools, docs, GitHub and note apps.",
    keywords: ["pdf to markdown", "pdf to md", "convert pdf to markdown", "pdf for chatgpt", "pdf to text markdown"],
    intro: [
      "PDF to Markdown is a free online converter that extracts text from a PDF and formats it as Markdown. It detects headings, bullet and numbered lists and paragraphs, and separates pages clearly.",
      "Markdown is the preferred input for AI chatbots like ChatGPT and Gemini, documentation sites, GitHub, Notion and Obsidian, so this tool makes PDF content easy to reuse anywhere.",
    ],
    steps: [
      "Select or drag and drop your PDF.",
      "Click 'Convert to Markdown'.",
      "Review the Markdown output in the preview.",
      "Copy it to the clipboard or download the .md file.",
    ],
    features: [
      ["Heading detection", "Larger text is converted into Markdown headings (#, ##, ###)."],
      ["Lists and paragraphs", "Bullet and numbered lists are preserved."],
      ["Copy or download", "Copy with one click or save as a .md file."],
      ["AI-ready", "Clean text that is ideal for prompts and knowledge bases."],
    ],
    useCases: [
      "Feeding PDF documents to ChatGPT, Gemini or Claude.",
      "Moving PDF manuals into documentation sites or wikis.",
      "Importing PDF notes into Notion or Obsidian.",
      "Creating README files from PDF content.",
    ],
    faqs: [
      ["Why convert PDF to Markdown?", "Markdown is plain text with simple formatting. It is easy to edit, works in most writing apps and is the best format for giving documents to AI models."],
      ["Does PDF to Markdown work with scanned PDFs?", "Scanned PDFs need text recognition first. Run OCR PDF, then convert the result to Markdown."],
      ["Are tables converted?", "Text from tables is extracted in reading order. Complex tables may need small manual fixes."],
    ],
  },
};
