function generateVerse() {
    const url = 'https://api.quran.com/api/v4/verses/random';

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const verse_key = data.verse.verse_key;
        const url2 = 'https://api.quran.com/api/v4/quran/translations/20?verse_key=' + verse_key;

        return fetch(url2);
    })
    
    .then(response => response.json())
    .then(data => {
        const verse_translation = data.translations[0].text;
        document.getElementById('verse-paragraph').innerHTML = verse_translation;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
