function generateVerse() {
    let verse_key = document.getElementById('verse_key').value;

    fetchVerseDetails(verse_key)
        .then(displayVerse)
        .catch(error => console.error("Error generating verse:", error));
}

function generateRandomVerse() {
    fetch('https://api.quran.com/api/v4/verses/random')
        .then(response => response.json())
        .then(data => {
            const verse_key = data.verse.verse_key;
            const verse_page_number = data.verse.page_number.toString();
            return fetchVerseDetails(verse_key, verse_page_number);
        })
        .then(displayVerse)
        .catch(error => console.error("Error generating random verse:", error));
}

function fetchVerseDetails(verse_key, verse_page_number = '') {
    let verse_text, chapter_name, glyph_text;

    const translationUrl = `https://api.quran.com/api/v4/quran/translations/20?verse_key=${verse_key}`;
    const chapterUrl = `https://api.quran.com/api/v4/chapters/${verse_key}`;
    const verseUrl = `https://api.quran.com/api/v4/quran/verses/uthmani?verse_key=${verse_key}`;

    return fetch(translationUrl)
        .then(response => response.json())
        .then(data => {
            verse_text = data.translations[0].text;
            return fetch(chapterUrl);
        })
        .then(response => response.json())
        .then(data => {
            chapter_name = data.chapter.name_simple;
            return fetch(verseUrl);
        })
        .then(response => response.json())
        .then(data => {
            glyph_text = data.verses[0].text_uthmani;
            return { verse_text, chapter_name, glyph_text, verse_key, verse_page_number };
        });
}

function displayVerse({ verse_text, chapter_name, glyph_text, verse_key }) {
    document.getElementById('verse_text').innerHTML =
        `<div style="text-align: right;">${glyph_text}</div>
         <br>${verse_text}
         <br>- Surah ${chapter_name} (${verse_key})`;
}

function copyVerseAsImage() {
    html2canvas(document.querySelector("#output_container"), {
        allowTaint: true,
        useCORS: true
    }).then(canvas => {
        canvas.toBlob(blob => {
            navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
            ]);
        });
    });
}

function downloadImage() {
    html2canvas(document.querySelector("#output_container"), {
        allowTaint: true,
        useCORS: true
    }).then(canvas => {
        canvas.toBlob(blob => {
            const link = document.createElement('a');
            link.download = 'verse.png';
            link.href = URL.createObjectURL(blob);
            link.click();
        });
    });
}