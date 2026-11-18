# Wedding invitation · محمد & سلمى

Folder: index.html, css/style.css, js/script.js, images/, audio/

1. OPEN GRAPH (WhatsApp preview): in index.html replace every `https://YOUR-DOMAIN` with your real site address (e.g. https://mohamed-salma.vercel.app). The preview image is images/og-image.jpg (1200x630).
2. SONG: replace the file in audio/ (keep the same name song.mp3 / song.wav, or edit the src of the <audio> tag in index.html).
3. RSVP: in js/script.js put your WhatsApp number in `wa:""` (example "201001234567"). Replies will open a WhatsApp message to you.
4. DATE / MAP: also in js/script.js (`C` at the top).
5. Deploy: drag this folder to vercel.com/new (or push to GitHub and import). WhatsApp caches previews, so test with a fresh link.
