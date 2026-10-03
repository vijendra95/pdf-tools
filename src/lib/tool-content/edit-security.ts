import type { ToolInfo } from "./types";

export const editSecurityContent: Record<string, ToolInfo> = {
  "edit-pdf": {
    name: "Edit PDF",
    title: "Edit PDF Online Free - Add Text, Shapes & Annotations to PDF",
    description:
      "Edit PDF files online for free. Add text, images, shapes and freehand annotations, change font size and colour, and download the edited PDF.",
    keywords: ["edit pdf", "pdf editor online", "add text to pdf", "annotate pdf", "write on pdf"],
    intro: [
      "Edit PDF is a free online PDF editor that lets you add text, images, rectangles, circles and freehand drawings on top of any PDF page. You can change the size, font weight and colour of the added content.",
      "It is the quickest way to fill in details, highlight information or mark corrections without installing desktop software.",
    ],
    steps: [
      "Select or drag and drop your PDF.",
      "Choose a tool: Text, Shape, Image or Draw.",
      "Click on the page where you want to add content and adjust size, style and colour.",
      "Click 'Save' to download the edited PDF.",
    ],
    features: [
      ["Add text", "Type anywhere on the page with custom size, bold and colour."],
      ["Shapes and drawings", "Add rectangles, circles and freehand annotations."],
      ["Multi-page editing", "Switch between pages and edit each one."],
      ["Private", "Your PDF is edited in your browser."],
    ],
    useCases: [
      "Filling in printed forms that have no form fields.",
      "Marking corrections on drafts and proofs.",
      "Highlighting important parts of contracts.",
      "Adding notes to study material.",
    ],
    faqs: [
      ["How can I write on a PDF for free?", "Open Edit PDF, upload the file, choose the Text tool, click where you want to write and type. Click Save to download."],
      ["Can I edit existing text in the PDF?", "The editor adds new content on top of pages. To change existing text, convert the PDF to Word, edit it and convert back with Word to PDF."],
      ["Does the editor add a watermark?", "No. Your edited PDF is downloaded without any watermark."],
    ],
  },
  "page-numbers": {
    name: "Page Numbers",
    title: "Add Page Numbers to PDF Online Free",
    description:
      "Add page numbers to PDF online for free. Choose the position (top or bottom, centre or right) and font size. Fast, private and no sign-up.",
    keywords: ["add page numbers to pdf", "pdf page numbering", "number pdf pages", "insert page numbers pdf"],
    intro: [
      "Page Numbers is a free online tool that adds page numbers to every page of a PDF. You choose the position, such as bottom centre or top right, and the font size.",
      "Numbered pages make long documents, reports and legal files easy to reference, print and review.",
    ],
    steps: [
      "Select or drag and drop your PDF.",
      "Choose the position: top centre, top right, bottom centre or bottom right.",
      "Set the font size.",
      "Click 'Add Page Numbers' and download the PDF.",
    ],
    features: [
      ["Four positions", "Top or bottom, centre or right."],
      ["Adjustable size", "Pick a font size that suits your document."],
      ["All pages at once", "Numbers are added automatically to every page."],
      ["No upload", "Runs in your browser."],
    ],
    useCases: [
      "Numbering project reports, theses and dissertations.",
      "Preparing legal documents and court filings.",
      "Adding numbers to merged PDFs before printing.",
      "Making manuals and booklets easy to navigate.",
    ],
    faqs: [
      ["How do I add page numbers to a PDF?", "Upload the PDF to Page Numbers, choose a position and font size, then click 'Add Page Numbers'."],
      ["Can I put page numbers at the bottom centre?", "Yes. Bottom centre is one of the four available positions."],
      ["Will page numbers cover my content?", "Numbers are placed in the page margin. If your content reaches the edge, choose a smaller font or a different position."],
    ],
  },
  "crop-pdf": {
    name: "Crop PDF",
    title: "Crop PDF Online Free - Trim PDF Margins",
    description:
      "Crop PDF pages online for free. Trim top, bottom, left and right margins to remove white space or unwanted areas. Private and instant.",
    keywords: ["crop pdf", "trim pdf margins", "cut pdf page", "remove white space pdf"],
    intro: [
      "Crop PDF is a free online tool that trims the margins of PDF pages. Set how much to cut from the top, bottom, left and right, and the visible area of every page is reduced accordingly.",
      "Cropping removes extra white space, scanner borders, headers or footers so content is easier to read on phones and prints larger on paper.",
    ],
    steps: [
      "Select or drag and drop your PDF.",
      "Enter the amount to crop from the top, bottom, left and right.",
      "Click 'Crop PDF'.",
      "Download the cropped PDF.",
    ],
    features: [
      ["Four-side cropping", "Control each margin separately."],
      ["All pages", "The crop is applied to every page."],
      ["Lossless", "Content quality is not changed."],
      ["Private", "Processed in your browser."],
    ],
    useCases: [
      "Removing black scanner borders.",
      "Cutting large white margins for mobile reading.",
      "Hiding headers or footers before sharing.",
      "Preparing pages for printing on smaller paper.",
    ],
    faqs: [
      ["How do I crop a PDF page?", "Upload the PDF to Crop PDF, enter the margin values to cut from each side and click 'Crop PDF'."],
      ["Is the cropped area deleted?", "Cropping hides the area outside the new page box. To permanently remove sensitive content, use Redact PDF instead."],
      ["Can I crop only one page?", "The current version crops all pages equally. Use Extract Pages to crop a single page separately."],
    ],
  },
  "pdf-forms": {
    name: "PDF Forms",
    title: "Fill PDF Forms Online Free - Create & Fill Fillable PDF",
    description:
      "Fill PDF forms online for free. Type into text fields, tick checkboxes, choose dropdowns and radio buttons, add new fields and flatten the form.",
    keywords: ["fill pdf form", "fillable pdf", "pdf form filler", "create fillable pdf", "flatten pdf form"],
    intro: [
      "PDF Forms is a free online tool to fill and create fillable PDF forms. It detects existing text fields, checkboxes, dropdowns, option lists and radio buttons so you can complete them in your browser.",
      "You can also add new text boxes and checkboxes to any page, and flatten the form so the answers can no longer be changed.",
    ],
    steps: [
      "Select or drag and drop your PDF form.",
      "Fill in the detected fields, or add new text boxes and checkboxes on the page.",
      "Turn on 'Flatten form' if you want to lock the answers.",
      "Click 'Save PDF' to download the completed form.",
    ],
    features: [
      ["Auto field detection", "Finds text, checkbox, dropdown, list and radio fields."],
      ["Create new fields", "Add text boxes and checkboxes to non-fillable PDFs."],
      ["Flatten option", "Convert filled fields into fixed content."],
      ["Private", "Personal details stay on your device."],
    ],
    useCases: [
      "Filling government, bank and insurance application forms.",
      "Completing HR onboarding and tax forms.",
      "Creating simple fillable forms for customers.",
      "Locking completed forms before emailing.",
    ],
    faqs: [
      ["How do I fill a PDF form online?", "Upload the form to PDF Forms, type into the detected fields, then click 'Save PDF'."],
      ["What if my PDF has no fillable fields?", "Add new text boxes and checkboxes on the page with the tool, or use Edit PDF to type anywhere."],
      ["What does 'flatten form' mean?", "Flattening merges the field values into the page so they look like normal text and cannot be edited anymore."],
    ],
  },
  "watermark-pdf": {
    name: "Watermark PDF",
    title: "Add Watermark to PDF Online Free - Text Watermark",
    description:
      "Add a text watermark to PDF online for free. Choose the text, font size and opacity, and stamp it diagonally on every page. Private and fast.",
    keywords: ["watermark pdf", "add watermark to pdf", "pdf watermark online", "stamp pdf", "confidential watermark"],
    intro: [
      "Watermark PDF is a free online tool that stamps text such as 'CONFIDENTIAL', 'DRAFT' or your company name across every page of a PDF. You control the text, font size and opacity.",
      "A watermark discourages copying, shows the status of a document and brands your files.",
    ],
    steps: [
      "Select or drag and drop your PDF.",
      "Type your watermark text.",
      "Adjust the font size and opacity.",
      "Click 'Add Watermark' and download the PDF.",
    ],
    features: [
      ["Custom text", "Use any word, name or phrase."],
      ["Opacity control", "Make the watermark subtle or bold."],
      ["Diagonal stamp", "Placed across the page so it is hard to crop out."],
      ["No upload", "Applied in your browser."],
    ],
    useCases: [
      "Marking documents as CONFIDENTIAL or DRAFT.",
      "Branding quotations and catalogues with a company name.",
      "Protecting sample documents shared with clients.",
      "Adding 'Copy' to ID proofs shared online.",
    ],
    faqs: [
      ["How do I add a watermark to a PDF for free?", "Upload the PDF to Watermark PDF, type the watermark text, set size and opacity, then click 'Add Watermark'."],
      ["Should I watermark my ID proof copies?", "Yes. Adding text like 'For XYZ bank KYC only' helps prevent misuse of copies of Aadhaar, PAN or passport."],
      ["Can a watermark be removed?", "A text watermark is part of the page content. It discourages misuse but determined editing can still alter PDFs, so also use Protect PDF for sensitive files."],
    ],
  },
  "sign-pdf": {
    name: "Sign PDF",
    title: "Sign PDF Online Free - Add Electronic Signature to PDF",
    description:
      "Sign PDF documents online for free. Draw or type your signature, add the date, place it on any page and download the signed PDF. Save signers for reuse.",
    keywords: ["sign pdf", "esign pdf", "electronic signature pdf", "add signature to pdf", "sign document online free"],
    intro: [
      "Sign PDF is a free online tool to add an electronic signature to PDF documents. Draw your signature with a mouse or finger, or type your name in a signature style, then place it along with the date anywhere on the page.",
      "Signer details can be saved in your browser so you can sign future documents in seconds.",
    ],
    steps: [
      "Select or drag and drop the PDF to sign.",
      "Enter the signer name and email, then draw or type the signature.",
      "Click on the page to place the signature and date.",
      "Download the signed PDF.",
    ],
    features: [
      ["Draw or type", "Create a handwritten-style or typed signature."],
      ["Add date", "Place the signing date beside your signature."],
      ["Saved signers", "Reuse saved signatures on this device."],
      ["Any page", "Sign on one or many pages."],
    ],
    useCases: [
      "Signing offer letters, agreements and NDAs.",
      "Approving invoices and purchase orders.",
      "Signing rental agreements and consent forms.",
      "Returning signed documents without printing and scanning.",
    ],
    faqs: [
      ["How do I sign a PDF without printing it?", "Open Sign PDF, upload the document, draw or type your signature, click on the page to place it and download the signed file."],
      ["Is an electronic signature legally valid?", "Simple electronic signatures are accepted for many business documents. Some documents in India require an Aadhaar eSign or a digital signature certificate (DSC). Check the requirements for your document."],
      ["Where is my saved signature stored?", "Saved signers are stored only in your own browser on this device. They are never sent to our server."],
    ],
  },
  "unlock-pdf": {
    name: "Unlock PDF",
    title: "Unlock PDF Online Free - Remove PDF Password",
    description:
      "Remove the password and restrictions from a PDF you own, online for free. Enter the password once and download an unlocked PDF. Private and secure.",
    keywords: ["unlock pdf", "remove pdf password", "pdf password remover", "decrypt pdf", "unlock bank statement pdf"],
    intro: [
      "Unlock PDF is a free online tool that removes password protection and restrictions from PDF files. Enter the password once and download a copy that opens without asking for it again.",
      "It is commonly used for password-protected bank statements, salary slips, e-Aadhaar, insurance policies and bills that you need to share or upload repeatedly.",
    ],
    steps: [
      "Select or drag and drop the protected PDF.",
      "Enter the PDF password, if it asks for one.",
      "Click 'Unlock PDF'.",
      "Download the unlocked PDF.",
    ],
    features: [
      ["Removes open password", "Saves a copy that opens without a password."],
      ["Removes restrictions", "Allows printing, copying and editing where restricted."],
      ["Instant", "Unlocking takes seconds."],
      ["Private", "The password and file never leave your browser."],
    ],
    useCases: [
      "Removing passwords from bank and credit card statements.",
      "Unlocking e-Aadhaar or salary slip PDFs before uploading.",
      "Merging protected files after unlocking them.",
      "Printing restricted documents you own.",
    ],
    faqs: [
      ["How do I remove a password from a PDF?", "Upload the PDF to Unlock PDF, type the password and click 'Unlock PDF'. The downloaded copy opens without a password."],
      ["Can I unlock a PDF if I forgot the password?", "No. You need the correct password. The tool is meant for files you own and are authorised to open."],
      ["What is the e-Aadhaar PDF password?", "UIDAI e-Aadhaar uses the first 4 letters of your name in capitals followed by your birth year, for example RAHU1990."],
    ],
  },
  "protect-pdf": {
    name: "Protect PDF",
    title: "Protect PDF with Password Online Free - Encrypt PDF",
    description:
      "Add a password to a PDF online for free. Encrypt your PDF so only people with the password can open it. Private, fast and no sign-up.",
    keywords: ["protect pdf", "password protect pdf", "encrypt pdf", "lock pdf", "add password to pdf"],
    intro: [
      "Protect PDF is a free online tool that encrypts a PDF with a password. Anyone who opens the file must enter the password to view it.",
      "Use it before emailing salary slips, financial statements, contracts, medical reports or ID documents.",
    ],
    steps: [
      "Select or drag and drop your PDF.",
      "Enter a strong password.",
      "Click 'Protect PDF'.",
      "Download the encrypted PDF and share the password separately.",
    ],
    features: [
      ["Password encryption", "Standard PDF encryption supported by all major PDF readers."],
      ["Works everywhere", "Opens in Adobe Reader, Chrome, Edge, phone PDF apps and more."],
      ["Instant", "Encrypts in seconds."],
      ["Private", "Your password and file are processed only in your browser."],
    ],
    useCases: [
      "Emailing payslips and Form 16 to employees.",
      "Sharing bank statements with a CA.",
      "Sending contracts and legal documents securely.",
      "Protecting medical reports and ID proofs.",
    ],
    faqs: [
      ["How do I put a password on a PDF?", "Upload the PDF to Protect PDF, type a password and click 'Protect PDF'. The downloaded file asks for this password when opened."],
      ["What if I forget the password?", "Encrypted PDFs cannot be opened without the password, so keep it somewhere safe. We never see or store it."],
      ["What makes a strong PDF password?", "Use at least 8 characters with a mix of letters, numbers and symbols. Don't use your name or date of birth alone."],
    ],
  },
  "redact-pdf": {
    name: "Redact PDF",
    title: "Redact PDF Online Free - Permanently Black Out Sensitive Text",
    description:
      "Redact PDF online for free. Search for phone numbers, emails or names, or draw boxes, and permanently remove the information with black boxes.",
    keywords: ["redact pdf", "black out pdf text", "remove sensitive information pdf", "pdf redaction tool", "censor pdf"],
    intro: [
      "Redact PDF is a free online tool that permanently removes sensitive information from a PDF. Search for words, numbers or email addresses, or draw boxes over any area, and the tool replaces that content with solid black boxes.",
      "Affected pages are re-rendered, so the hidden text is truly removed and cannot be copied, searched or recovered, unlike simply drawing a black shape on top.",
    ],
    steps: [
      "Select or drag and drop your PDF.",
      "Search for text to redact, or draw rectangles over areas on the page.",
      "Review the marked areas.",
      "Click 'Apply redaction' and download the redacted PDF.",
    ],
    features: [
      ["Search and redact", "Find every occurrence of a word, number or email automatically."],
      ["Manual boxes", "Draw redaction areas over signatures, photos or any region."],
      ["True removal", "Redacted pages are flattened so the original text is gone."],
      ["Private", "Sensitive documents are never uploaded."],
    ],
    useCases: [
      "Hiding Aadhaar, PAN and bank account numbers before sharing.",
      "Removing personal data for privacy and data protection rules.",
      "Redacting names in legal and HR documents.",
      "Sharing invoices without revealing prices or contacts.",
    ],
    faqs: [
      ["What is PDF redaction?", "Redaction permanently removes text or images from a document and replaces them with a black box, so the information cannot be read or recovered."],
      ["Is drawing a black box the same as redacting?", "No. A black shape on top can be moved and the text below can still be copied. Redact PDF re-renders the page so the hidden content is completely removed."],
      ["Will redacted pages still have selectable text?", "Redacted pages become images. Other pages keep their text. Run OCR PDF afterwards if you need the remaining text to be searchable."],
    ],
  },
  "compare-pdf": {
    name: "Compare PDF",
    title: "Compare PDF Files Online Free - Find Differences Between Two PDFs",
    description:
      "Compare two PDF files online for free. See added and removed words side by side and highlight visual differences page by page.",
    keywords: ["compare pdf", "pdf diff", "compare two pdf files", "find differences in pdf", "document comparison"],
    intro: [
      "Compare PDF is a free online tool that finds the differences between two versions of a PDF. Text comparison highlights words that were added or removed, and visual comparison marks changed pixels in red on each page.",
      "It helps you review contract changes, check revisions of reports and confirm that nothing important changed between drafts.",
    ],
    steps: [
      "Upload the original PDF and the changed PDF.",
      "Click 'Compare'.",
      "Use the Text tab to see added (green) and removed (red) words.",
      "Use the Visual tab to see highlighted differences on each page.",
    ],
    features: [
      ["Text diff", "Word-by-word comparison with added and removed counts."],
      ["Visual diff", "Pixel comparison shows layout, image and formatting changes."],
      ["Page by page", "Review every page of both documents."],
      ["Private", "Both files stay on your device."],
    ],
    useCases: [
      "Reviewing changes in contracts and agreements.",
      "Checking edits between report drafts.",
      "Verifying printed proofs against originals.",
      "Spotting changes in tender or policy documents.",
    ],
    faqs: [
      ["How do I compare two PDF files for differences?", "Upload both PDFs to Compare PDF and click 'Compare'. Check the Text tab for word changes and the Visual tab for layout changes."],
      ["Can it compare scanned PDFs?", "Visual comparison works on scanned PDFs. For text comparison, run OCR PDF on both files first."],
      ["Do the PDFs need the same number of pages?", "No. Pages are compared in order and extra pages are shown as differences."],
    ],
  },
};
