import type { PageDoc, PageKey, Post } from "./store";
import { withBase } from "./site";

const D = "2026-10-04T00:00:00.000Z";
const a = (href: string, text: string) => `<a href="${withBase(href)}">${text}</a>`;

export function defaultPages(): Record<PageKey, PageDoc> {
  return {
    about: {
      title: "About PDF Tools",
      seoTitle: "About Us - Free Online PDF Tools",
      seoDescription: "PDF Tools offers 40+ free, private PDF and audio tools that run in your browser. Learn who we are and why we built it.",
      updatedAt: D,
      contentHtml: `<p>PDF Tools is a free collection of more than 40 online tools to merge, split, compress, convert, edit, sign, protect, OCR, translate and summarize PDF files, plus audio converters for MP3, WAV and more.</p>
<h2>Our mission</h2>
<p>We believe everyday document work should be simple, free and private. That is why almost every tool on this website runs directly in your web browser. Your files are processed on your own device and are not uploaded to our servers.</p>
<h2>Why people use PDF Tools</h2>
<ul><li><strong>Free forever</strong> – no sign-up, no watermark, no daily limits.</li><li><strong>Private</strong> – files stay on your device.</li><li><strong>Works everywhere</strong> – Android, iPhone, Windows, Mac and Linux.</li><li><strong>All-in-one</strong> – every popular PDF tool in one place.</li></ul>
<p>Have a suggestion or found a problem? ${a("/contact/", "Contact us")}.</p>`,
    },
    contact: {
      title: "Contact Us",
      seoTitle: "Contact Us - PDF Tools",
      seoDescription: "Get in touch with the PDF Tools team for support, feedback, feature requests or business enquiries.",
      updatedAt: D,
      contentHtml: `<p>We'd love to hear from you. Whether you have a question about a tool, found a bug or want to suggest a new feature, reach out using the details below and we'll reply as soon as possible.</p>
<p>Before contacting us, you may find a quick answer on our ${a("/faq/", "FAQ page")}.</p>`,
    },
    faq: {
      title: "Frequently Asked Questions",
      seoTitle: "FAQ - Free Online PDF Tools",
      seoDescription: "Answers to common questions about PDF Tools: pricing, privacy, file limits, supported devices and how each PDF tool works.",
      updatedAt: D,
      contentHtml: `<h2>Is PDF Tools really free?</h2>
<p>Yes. All tools are free to use with no registration, no watermark and no daily limit.</p>
<h2>Are my files uploaded to your server?</h2>
<p>No. Almost all tools process your files directly in your browser. The only exception is ${a("/translate-pdf/", "Translate PDF")}, which sends the extracted text to a public translation service to translate it.</p>
<h2>Is there a file size limit?</h2>
<p>There is no fixed limit. Because processing happens on your device, very large files depend on your device memory. Most PDFs up to a few hundred pages work smoothly.</p>
<h2>Which devices are supported?</h2>
<p>Any modern browser on Android, iPhone, iPad, Windows, Mac or Linux. No app installation is required.</p>
<h2>How do I reduce a PDF to under 100 KB or 200 KB?</h2>
<p>Use ${a("/compress-pdf/", "Compress PDF")} with the Extreme level. If it is still too large, remove unnecessary pages with ${a("/remove-pages/", "Remove Pages")} first.</p>
<h2>Can I edit text inside a PDF?</h2>
<p>You can add text, shapes and drawings with ${a("/edit-pdf/", "Edit PDF")}. To change existing text, convert the file with ${a("/pdf-to-word/", "PDF to Word")}, edit it, and convert back with ${a("/word-to-pdf/", "Word to PDF")}.</p>
<h2>How do I make a scanned PDF searchable?</h2>
<p>Use ${a("/ocr-pdf/", "OCR PDF")}. It supports English, Hindi and 13 other languages.</p>`,
    },
    privacy: {
      title: "Privacy Policy",
      seoTitle: "Privacy Policy - PDF Tools",
      seoDescription: "Read how PDF Tools protects your privacy. Files are processed in your browser and are not uploaded or stored on our servers.",
      updatedAt: D,
      contentHtml: `<p><em>Last updated: 4 October 2026</em></p>
<p>This Privacy Policy explains how PDF Tools ("we", "us") handles information when you use this website.</p>
<h2>1. Your files</h2>
<p>Our PDF and audio tools run inside your web browser. Files you select are processed on your own device and are <strong>not uploaded to, stored on, or shared from our servers</strong>. When you close or refresh the page, the files are removed from memory.</p>
<p><strong>Exceptions:</strong> Translate PDF sends the text extracted from your PDF directly from your browser to a public translation service (Google Translate or MyMemory) to produce the translation. OCR PDF and the audio converters download language data or converter engines from public content delivery networks; your files are not sent with these requests.</p>
<h2>2. Information we collect</h2>
<p>We do not require an account and we do not ask for your name, email or phone number to use the tools. If you contact us, we use the details you provide only to reply to you.</p>
<h2>3. Cookies, analytics and advertising</h2>
<p>We may use Google Analytics to understand how visitors use the website, Meta Pixel to measure marketing, and Google AdSense to show advertisements. These services may set cookies and collect information such as your IP address, browser type, pages visited and device information, according to their own privacy policies. You can block or delete cookies in your browser settings and opt out of personalised ads at <a href="https://adssettings.google.com" rel="nofollow noopener" target="_blank">Google Ad Settings</a>.</p>
<h2>4. Local storage</h2>
<p>Some tools (for example saved signers in Sign PDF) store data in your browser's local storage so you can reuse it. This data stays on your device and can be cleared at any time from your browser settings.</p>
<h2>5. Children</h2>
<p>This website is not directed at children under 13, and we do not knowingly collect their personal information.</p>
<h2>6. Changes</h2>
<p>We may update this policy from time to time. Changes are posted on this page with a new "Last updated" date.</p>
<h2>7. Contact</h2>
<p>For any privacy question, please ${a("/contact/", "contact us")}.</p>`,
    },
    terms: {
      title: "Terms of Service",
      seoTitle: "Terms of Service - PDF Tools",
      seoDescription: "Terms and conditions for using the free online PDF and audio tools on PDF Tools.",
      updatedAt: D,
      contentHtml: `<p><em>Last updated: 4 October 2026</em></p>
<p>By using PDF Tools you agree to these Terms of Service. If you do not agree, please do not use the website.</p>
<h2>1. Use of the service</h2>
<p>PDF Tools provides free online tools to view, convert, edit and manage PDF and audio files. You may use the tools for personal and commercial purposes in accordance with these terms and applicable laws.</p>
<h2>2. Your content</h2>
<p>You keep all rights to the files you process. You are responsible for making sure you have the right to use, convert, unlock or modify any file you process with our tools. Do not use the tools to remove protection from documents you are not authorised to access.</p>
<h2>3. Acceptable use</h2>
<p>You agree not to misuse the website, attempt to disrupt it, reverse engineer it for malicious purposes, or use it to process illegal content.</p>
<h2>4. No warranty</h2>
<p>The tools are provided "as is" and "as available" without warranties of any kind. While we work hard to produce accurate results, we cannot guarantee that every conversion, OCR, translation or summary will be error-free. Always keep a copy of your original files and review important output.</p>
<h2>5. Limitation of liability</h2>
<p>To the maximum extent permitted by law, we are not liable for any loss of data, profits or other damages arising from the use of, or inability to use, the website.</p>
<h2>6. Third-party services</h2>
<p>Some features rely on third-party services such as translation providers, analytics or advertising. Their use is subject to their own terms.</p>
<h2>7. Governing law</h2>
<p>These terms are governed by the laws of India. Courts in Jaipur, Rajasthan have exclusive jurisdiction.</p>
<h2>8. Contact</h2>
<p>Questions about these terms? ${a("/contact/", "Contact us")}.</p>`,
    },
  };
}

export function defaultPosts(): Post[] {
  const post = (slug: string, title: string, excerpt: string, seoTitle: string, seoDescription: string, keywords: string, contentHtml: string): Post => ({
    id: slug,
    slug,
    title,
    excerpt,
    contentHtml,
    coverImage: "",
    coverAlt: "",
    seoTitle,
    seoDescription,
    keywords,
    published: true,
    createdAt: D,
    updatedAt: D,
  });
  return [
    post(
      "how-to-compress-pdf-to-100kb",
      "How to Compress a PDF to 100 KB (or 200 KB) for Online Forms",
      "Government and job portals often limit uploads to 100 KB or 200 KB. Here is the fastest free way to shrink your PDF without installing anything.",
      "How to Compress PDF to 100 KB Free (Step-by-Step Guide)",
      "Learn how to reduce PDF size to 100 KB or 200 KB for online forms, exams and job portals using a free browser-based PDF compressor.",
      "compress pdf to 100kb, reduce pdf size to 200kb, pdf size reducer for online form",
      `<p>Many online application forms, such as exam registrations, government schemes and job portals, accept documents only up to <strong>100 KB</strong> or <strong>200 KB</strong>. Scanned PDFs are often 1–5 MB, so they get rejected. This guide shows how to fix that in under a minute.</p>
<h2>Quick answer</h2>
<p>Open ${a("/compress-pdf/", "Compress PDF")}, upload your file, choose <strong>Extreme compression</strong> and download. Check the size shown on screen; most 1–2 page scans drop below 100 KB.</p>
<h2>Step-by-step</h2>
<ol><li>Go to ${a("/compress-pdf/", "Compress PDF")}.</li><li>Select your PDF file.</li><li>Choose a level: <em>Recommended</em> for around 200 KB, <em>Extreme</em> for around 100 KB.</li><li>Click <strong>Compress PDF</strong> and download the result.</li></ol>
<h2>Still too big? Try these tips</h2>
<ul><li><strong>Remove extra pages</strong> with ${a("/remove-pages/", "Remove Pages")}; every page adds size.</li><li><strong>Split the document</strong> using ${a("/split-pdf/", "Split PDF")} if the portal allows several uploads.</li><li><strong>Rescan in black and white</strong> with ${a("/scan-to-pdf/", "Scan to PDF")}; B&amp;W scans are much smaller than colour.</li></ul>
<h2>Is it safe?</h2>
<p>Yes. Compression runs inside your browser, so your Aadhaar, mark sheets or certificates are never uploaded to a server.</p>`,
    ),
    post(
      "how-to-remove-password-from-pdf",
      "How to Remove the Password from a PDF (Bank Statement, e-Aadhaar, Salary Slip)",
      "Tired of typing the password every time you open a bank statement? Here is how to save an unlocked copy for free.",
      "How to Remove Password from PDF Free - Bank Statement & e-Aadhaar",
      "Step-by-step guide to remove the password from bank statements, e-Aadhaar and salary slip PDFs online for free, without uploading your file.",
      "remove password from pdf, unlock bank statement pdf, e-aadhaar pdf password",
      `<p>Banks, UIDAI and employers protect PDFs with a password. That is good for security, but annoying when you must open, merge or upload the file again and again. If you know the password, you can save an unlocked copy in seconds.</p>
<h2>Steps</h2>
<ol><li>Open ${a("/unlock-pdf/", "Unlock PDF")}.</li><li>Select the protected PDF.</li><li>Type the password.</li><li>Click <strong>Unlock PDF</strong> and download the new file.</li></ol>
<h2>Common PDF passwords</h2>
<ul><li><strong>e-Aadhaar:</strong> first four letters of your name in CAPITALS + year of birth (for example RAHU1990).</li><li><strong>Bank statements:</strong> usually a combination of your name, date of birth or customer ID; check the email from your bank.</li><li><strong>Salary slips / Form 16:</strong> often your PAN in capitals or date of birth.</li></ul>
<h2>Want to add a password instead?</h2>
<p>Use ${a("/protect-pdf/", "Protect PDF")} to encrypt any PDF before sharing it.</p>
<p><strong>Note:</strong> only unlock documents that you own or are authorised to access.</p>`,
    ),
    post(
      "how-to-merge-pdf-on-mobile",
      "How to Merge PDF Files on Mobile (Android & iPhone) for Free",
      "Combine several PDFs into one on your phone without installing an app. Works on Android and iPhone.",
      "How to Merge PDF on Mobile Free - Android & iPhone (No App)",
      "Learn how to combine multiple PDF files into one on Android or iPhone using a free online PDF merger. No app, no sign-up, no watermark.",
      "merge pdf on mobile, combine pdf android, merge pdf iphone without app",
      `<p>Need to send several documents as one file from your phone? You don't need to install an app. A browser-based PDF merger does the job in a few taps.</p>
<h2>Steps on Android or iPhone</h2>
<ol><li>Open ${a("/merge-pdf/", "Merge PDF")} in Chrome or Safari.</li><li>Tap <strong>Select PDF files</strong> and choose two or more PDFs from Files, Downloads or Google Drive.</li><li>Use the arrows to put the files in the right order.</li><li>Tap <strong>Merge PDFs</strong>. The combined file is saved to your Downloads.</li></ol>
<h2>Have photos instead of PDFs?</h2>
<p>Convert them first with ${a("/jpg-to-pdf/", "JPG to PDF")}, or capture pages directly with ${a("/scan-to-pdf/", "Scan to PDF")}.</p>
<h2>Need to reorder or delete pages after merging?</h2>
<p>Use ${a("/organize-pdf/", "Organize PDF")} to move pages, or ${a("/remove-pages/", "Remove Pages")} to delete them.</p>`,
    ),
  ];
}
