function generateVerse() {
    let glyph_text;
    let verse_page_number;
    let verse_text;
    let verse_key;
    let chapter_name;

    const url = 'https://api.quran.com/api/v4/verses/random';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            verse_key = data.verse.verse_key;
            verse_page_number = data.verse.page_number.toString();
            const url2 = 'https://api.quran.com/api/v4/quran/translations/20?verse_key=' + verse_key;
            return fetch(url2);
        })

        .then(response => response.json())
        .then(data => {
            verse_text = data.translations[0].text;
            const url3 = 'https://api.quran.com/api/v4/chapters/' + verse_key;
            return fetch(url3);
        })

        .then(response => response.json())
        .then(data => {
            chapter_name = data.chapter.name_simple;
            const url4 = 'https://api.quran.com/api/v4/quran/verses/code_v1?verse_key=' + verse_key;
            return fetch(url4);
        })

        .then(response => response.json())
        .then(data => {
            glyph_text = data.verses[0].code_v1;

            console.log("Name: [" + verse_page_number.toString() + "]");

            const fontFace = new FontFace("custom_font", `url(fonts/QCF_P${verse_page_number.toString().padStart(3, '0')}.TTF)`);
            document.fonts.add(fontFace);

            fontFace.load().then((loadedFace) => {
                document.getElementById('glyph_text').style.fontFamily = loadedFace.family;
            })

            document.getElementById('glyph_text').innerHTML = glyph_text;
            document.getElementById('verse_text').innerHTML = verse_text + '<br>- Surah ' + chapter_name + ' (' + verse_key + ')';
        })
}

function copyVerseAsImage() {
    document.fonts.ready.then(() => {
        html2canvas(document.querySelector(".verse_container")).then(canvas => {
            canvas.toBlob(blob => {
                navigator.clipboard.write([
                    new ClipboardItem({
                        'image/png': blob
                    })
                ])
            });
        });
    })
}