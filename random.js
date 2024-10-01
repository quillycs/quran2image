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
            /* const url4 = 'https://api.quran.com/api/v4/quran/verses/code_v1?verse_key=' + verse_key;*/
            const url4 = 'https://api.quran.com/api/v4/quran/verses/uthmani?verse_key=' + verse_key;
            return fetch(url4);
        })

        .then(response => response.json())
        .then(data => {
            //glyph_text = data.verses[0].code_v1;
            glyph_text = data.verses[0].text_uthmani;

            /*const fontFace = new FontFace("custom_font", `url(fonts/QCF_P${verse_page_number.toString().padStart(3, '0')}.TTF)`);
            document.fonts.add(fontFace);

            fontFace.load().then((loadedFace) => {
                document.getElementById('glyph_text').style.fontFamily = loadedFace.family;
            })*/

            //document.getElementById('glyph_text').innerHTML = glyph_text;
            document.getElementById('verse_text').innerHTML =
                '<div style="text-align: right;">' + glyph_text + '</div>' +
                '<br>' + verse_text +
                '<br>- Surah ' + chapter_name + ' (' + verse_key + ')';
        })
}

function copyVerseAsImage() {
    html2canvas(document.querySelector("#output_container"), {
        allowTaint: true,
        useCORS: true
    }).then(canvas => {
        canvas.toBlob(blob => {
            navigator.clipboard.write([
                new ClipboardItem({
                    'image/png': blob
                })
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

/*
function invertTextColour() {
    const verseText = document.getElementById('verse_text');
    const currentColor = window.getComputedStyle(verseText).color;

    if (currentColor === 'rgb(0, 0, 0)') {
        verseText.style.color = 'white';
    } else {
        verseText.style.color = 'black';
    }
}
*/

/*
function setBackgroundImage() {
    var background_image_link = document.getElementById('background_image_link').value;
    document.getElementById("output_container").style.backgroundImage = 'url(' + background_image_link + ')';
}
*/