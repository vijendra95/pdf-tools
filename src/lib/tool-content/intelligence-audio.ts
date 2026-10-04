import type { ToolInfo } from "./types";

const audioPrivacy =
  "Your files never leave your device. Conversion runs inside your browser using FFmpeg compiled to WebAssembly. Only the converter engine is downloaded the first time; your audio and video are not uploaded or stored.";

export const intelligenceAudioContent: Record<string, ToolInfo> = {
  "summarize-pdf": {
    name: "Summarize PDF",
    title: "AI PDF Summarizer Online Free - Summarize PDF in Seconds",
    description:
      "Summarize long PDF documents online for free. Get a short, medium or long summary, key points, keywords, word count and reading time instantly.",
    keywords: ["summarize pdf", "pdf summarizer", "ai pdf summary", "summarize document", "pdf key points"],
    intro: [
      "Summarize PDF is a free online PDF summarizer. It reads the text of your document, scores every sentence by importance and returns the most relevant sentences as a short, medium or long summary, together with key points and top keywords.",
      "It also shows page count, word count and estimated reading time, so you can decide in seconds whether a document needs a full read.",
    ],
    steps: [
      "Select or drag and drop your PDF.",
      "Choose the summary length: Short, Medium or Long.",
      "Click 'Summarize'.",
      "Read or copy the summary, key points and keywords.",
    ],
    features: [
      ["Three summary lengths", "From a quick overview to a detailed digest."],
      ["Key points", "The most important sentences as a bullet list."],
      ["Keywords", "Top topics found in the document."],
      ["Reading stats", "Pages, words and estimated reading time."],
    ],
    useCases: [
      "Students summarising chapters, research papers and notes.",
      "Professionals reviewing long reports and proposals.",
      "Lawyers getting an overview of judgments and contracts.",
      "Readers previewing e-books and articles.",
    ],
    faqs: [
      ["How do I summarize a PDF for free?", "Upload the PDF to Summarize PDF, pick a summary length and click 'Summarize'. The summary and key points appear instantly."],
      ["How does the summarizer work?", "It uses extractive summarisation: sentences are scored by how often their important words appear in the document, and the highest scoring sentences are selected in their original order."],
      ["Can it summarize scanned PDFs?", "Run OCR PDF on scanned files first so the text can be read, then summarize."],
    ],
  },
  "translate-pdf": {
    name: "Translate PDF",
    title: "Translate PDF Online Free - English to Hindi & 30+ Languages",
    description:
      "Translate PDF documents online for free. Convert English to Hindi, Hindi to English and many more languages, then download as text, Word or PDF.",
    keywords: ["translate pdf", "pdf translator", "translate pdf english to hindi", "hindi to english pdf", "document translator"],
    intro: [
      "Translate PDF is a free online document translator. It extracts the text from each page of your PDF and translates it into the language you choose, including Hindi, English, Marathi, Gujarati, Tamil, Bengali, Urdu, Arabic, French, Spanish and many more.",
      "You can download the translation as a text file, a Word document, or print it as a PDF.",
    ],
    steps: [
      "Select or drag and drop your PDF.",
      "Choose the source language (or auto-detect) and the target language.",
      "Click 'Translate'.",
      "Download the translation as TXT or Word, or save it as PDF.",
    ],
    features: [
      ["Many languages", "Translate between English, Indian languages and major world languages."],
      ["Page by page", "Translation keeps page separation for easy reference."],
      ["Multiple outputs", "Download as text, Word (.docx) or PDF."],
      ["Auto-detect", "Detects the source language automatically."],
    ],
    useCases: [
      "Translating English government notices or documents into Hindi.",
      "Understanding foreign-language contracts and manuals.",
      "Students translating study material.",
      "Businesses translating brochures for new markets.",
    ],
    faqs: [
      ["How do I translate a PDF from English to Hindi?", "Upload the PDF to Translate PDF, choose English as the source and Hindi as the target, click 'Translate' and download the result."],
      ["Does it keep the original layout?", "The tool translates the text content page by page. Images and complex layouts are not reproduced in the translated file."],
      ["Can I translate scanned PDFs?", "Run OCR PDF first to recognise the text, then translate the searchable PDF."],
    ],
    privacy:
      "Your PDF file is read in your browser and is not uploaded to our server. To translate, the extracted text is sent directly from your browser to a public translation service (Google Translate, with MyMemory as a fallback). Avoid translating highly confidential documents.",
  },
  "audio-converter": {
    name: "Audio Converter",
    title: "Audio Converter Online Free - MP3, WAV, OGG, AAC, FLAC, M4A",
    description:
      "Convert audio files online for free between MP3, WAV, OGG, AAC, FLAC and M4A. Choose the bitrate and convert in your browser with no upload.",
    keywords: ["audio converter", "convert audio online", "mp3 converter", "flac to mp3", "m4a to mp3"],
    intro: [
      "Audio Converter is a free online tool that converts audio files between the most popular formats: MP3, WAV, OGG, AAC, FLAC and M4A. You can choose the output bitrate to balance quality and file size.",
      "It runs FFmpeg directly in your browser, so even large audio files are converted privately without uploading.",
    ],
    steps: [
      "Click 'Select File' and choose your audio file.",
      "Pick the output format (MP3, WAV, OGG, AAC, FLAC or M4A).",
      "Choose the audio quality (bitrate).",
      "Click 'Convert' and download the new file.",
    ],
    features: [
      ["6 formats", "MP3, WAV, OGG, AAC, FLAC and M4A."],
      ["Bitrate control", "Choose higher quality or smaller files."],
      ["FFmpeg engine", "Professional-grade conversion in the browser."],
      ["Private", "Audio is never uploaded."],
    ],
    useCases: [
      "Converting WhatsApp voice notes or recordings to MP3.",
      "Making ringtones and audio clips for phones.",
      "Converting FLAC music to MP3 for car stereos.",
      "Preparing audio for podcasts and video editing.",
    ],
    faqs: [
      ["How do I convert an audio file to MP3?", "Select the file in Audio Converter, choose MP3 as the output, pick a bitrate and click 'Convert'."],
      ["Which bitrate should I choose for MP3?", "128 kbps is fine for voice, 192 kbps is good for music and 320 kbps gives the best MP3 quality."],
      ["Why does the first conversion take longer?", "The converter engine (about 30 MB) downloads once and is then cached by your browser."],
    ],
    privacy: audioPrivacy,
  },
  "mp3-to-wav": {
    name: "MP3 to WAV",
    title: "MP3 to WAV Converter Online Free",
    description:
      "Convert MP3 to WAV online for free. Get uncompressed WAV audio for editing, studio work and compatibility. Private conversion in your browser.",
    keywords: ["mp3 to wav", "convert mp3 to wav", "mp3 to wav online", "mp3 wav converter"],
    intro: [
      "MP3 to WAV is a free online converter that turns compressed MP3 audio into uncompressed WAV files.",
      "WAV is the standard format for audio editing software, video editors, DJ tools and many hardware devices that don't accept MP3.",
    ],
    steps: [
      "Click 'Select MP3 File' and choose your MP3.",
      "Click 'Convert to WAV'.",
      "Wait for the conversion to finish.",
      "Download the WAV file.",
    ],
    features: [
      ["Uncompressed output", "Standard PCM WAV for maximum compatibility."],
      ["Fast conversion", "Converts typical songs in seconds."],
      ["No software", "Works in the browser on any device."],
      ["Private", "Your MP3 is not uploaded."],
    ],
    useCases: [
      "Importing audio into editing software like Audacity, Premiere or FL Studio.",
      "Burning audio CDs.",
      "Using audio on devices that only support WAV.",
      "Preparing samples for music production.",
    ],
    faqs: [
      ["Does converting MP3 to WAV improve quality?", "No. WAV is uncompressed, but it cannot restore details already removed by MP3 compression. It improves compatibility, not quality."],
      ["Why is the WAV file much bigger?", "WAV stores audio without compression, so it is typically about 10 times larger than an MP3."],
      ["Can I convert WAV back to MP3?", "Yes. Use the WAV to MP3 converter."],
    ],
    privacy: audioPrivacy,
  },
  "mp4-to-mp3": {
    name: "MP4 to MP3",
    title: "MP4 to MP3 Converter Online Free - Extract Audio from Video",
    description:
      "Convert MP4 video to MP3 audio online for free. Extract music, speech or podcasts from videos and choose the MP3 bitrate. No upload required.",
    keywords: ["mp4 to mp3", "video to mp3", "extract audio from video", "convert mp4 to mp3 free"],
    intro: [
      "MP4 to MP3 is a free online converter that extracts the audio track from an MP4 video and saves it as an MP3 file. You can choose the MP3 bitrate for the quality you need.",
      "It is perfect for saving songs, lectures, speeches and podcasts from your own videos so you can listen without the video.",
    ],
    steps: [
      "Click 'Select MP4 Video' and choose your video.",
      "Choose the MP3 quality (bitrate).",
      "Click 'Convert to MP3'.",
      "Download the MP3 audio file.",
    ],
    features: [
      ["Audio extraction", "Saves only the sound track from the video."],
      ["Bitrate options", "Choose quality from small to high fidelity."],
      ["Large files", "Converts long videos directly in the browser."],
      ["Private", "Videos stay on your device."],
    ],
    useCases: [
      "Saving lecture or sermon audio from recorded videos.",
      "Creating podcasts from video interviews.",
      "Extracting background music from your own videos.",
      "Listening to video content offline on the go.",
    ],
    faqs: [
      ["How do I convert an MP4 video to MP3?", "Select the video in MP4 to MP3, choose a bitrate and click 'Convert to MP3'. The audio file downloads when ready."],
      ["Can I convert videos from my phone?", "Yes. Open the tool in your phone browser and select the video from your gallery."],
      ["Can I convert videos other than MP4?", "MP4 is supported best. Many MOV and WebM files also work because FFmpeg is used for conversion."],
    ],
    privacy: audioPrivacy,
  },
  "mp4-to-wav": {
    name: "MP4 to WAV",
    title: "MP4 to WAV Converter Online Free - Extract WAV Audio from Video",
    description:
      "Convert MP4 video to WAV audio online for free. Extract uncompressed audio from video files for editing and transcription. Private and fast.",
    keywords: ["mp4 to wav", "video to wav", "extract wav from video", "convert mp4 to wav"],
    intro: [
      "MP4 to WAV is a free online converter that extracts the audio from an MP4 video and saves it as an uncompressed WAV file.",
      "WAV audio is ideal for video editing, noise removal, transcription services and professional audio work.",
    ],
    steps: [
      "Click 'Select MP4 Video' and choose your video.",
      "Click 'Convert to WAV'.",
      "Wait for the audio to be extracted.",
      "Download the WAV file.",
    ],
    features: [
      ["Uncompressed audio", "No additional quality loss from MP3 compression."],
      ["Editing-ready", "Works with all audio and video editors."],
      ["In-browser FFmpeg", "Reliable conversion without software installation."],
      ["Private", "Your video is never uploaded."],
    ],
    useCases: [
      "Extracting dialogue for subtitles and transcription.",
      "Cleaning up audio from interviews in an audio editor.",
      "Separating music from your own video projects.",
      "Archiving high-quality audio from recordings.",
    ],
    faqs: [
      ["What is the difference between MP4 to MP3 and MP4 to WAV?", "MP3 is compressed and small, good for listening. WAV is uncompressed and larger, better for editing and professional use."],
      ["Is there a file size limit?", "There is no fixed limit, but very large videos depend on your device memory and browser."],
      ["Does it work on iPhone?", "Yes, in Safari or Chrome on recent iOS versions."],
    ],
    privacy: audioPrivacy,
  },
  "wav-to-mp3": {
    name: "WAV to MP3",
    title: "WAV to MP3 Converter Online Free - Compress WAV Audio",
    description:
      "Convert WAV to MP3 online for free. Shrink large WAV recordings into small MP3 files with your chosen bitrate. Private conversion in your browser.",
    keywords: ["wav to mp3", "convert wav to mp3", "compress wav", "wav to mp3 online free"],
    intro: [
      "WAV to MP3 is a free online converter that compresses large WAV audio files into small MP3 files. Choose a bitrate to control the balance between quality and size.",
      "MP3 files are much easier to share on WhatsApp and email, upload to websites and store on phones.",
    ],
    steps: [
      "Click 'Select WAV File' and choose your WAV audio.",
      "Choose the MP3 quality (bitrate).",
      "Click 'Convert to MP3'.",
      "Download the MP3 file.",
    ],
    features: [
      ["Big size savings", "MP3 is typically about 10 times smaller than WAV."],
      ["Bitrate control", "Choose from voice quality to high-quality music."],
      ["Universal playback", "MP3 plays on every phone, computer and car stereo."],
      ["Private", "Audio is converted locally."],
    ],
    useCases: [
      "Sharing studio recordings with clients.",
      "Compressing voice recordings and interviews.",
      "Uploading audio to websites and podcast platforms.",
      "Saving storage space on your phone.",
    ],
    faqs: [
      ["How do I convert WAV to MP3?", "Select the WAV file in WAV to MP3, choose a bitrate and click 'Convert to MP3'."],
      ["Which bitrate is best?", "Use 320 kbps for music where quality matters, 192 kbps for general use and 128 kbps for speech."],
      ["Will I lose quality?", "MP3 is a lossy format, but at 192 to 320 kbps the difference is hard to hear for most listeners."],
    ],
    privacy: audioPrivacy,
  },
};
