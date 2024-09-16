function generateVerse() {
    const url = 'https://api.quran.com/api/v4/verses/random';
    let verse_key;
    let verse_translation;
    let chapter_name;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        verse_key = data.verse.verse_key;
        const url2 = 'https://api.quran.com/api/v4/quran/translations/20?verse_key=' + verse_key;
        return fetch(url2);
    })
    
    .then(response => response.json())
    .then(data => {
        verse_translation = data.translations[0].text;        
        const url3 = 'https://api.quran.com/api/v4/chapters/' + verse_key;
        return fetch(url3);
    })

    .then(response => response.json())
    .then(data => {
        chapter_name = data.chapter.name_simple;
        document.getElementById('verse-paragraph').innerHTML = verse_translation + '<br>- Surah ' + chapter_name + ' (' + verse_key + ')';
    })
}
