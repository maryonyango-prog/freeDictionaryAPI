document.getElementById('search-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const word = document.getElementById('word-input').value.trim();
    const resultDiv = document.getElementById('result');
    
    if (!word) {
        resultDiv.innerHTML = '<p class="error">Please enter a word</p>';
        return;
    }
    
    // Show loading
    resultDiv.innerHTML = '<p>Searching...</p>';
    
    try {
        // Call the free dictionary API
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        
        if (!response.ok) {
            throw new Error('Word not found');
        }
        
        const data = await response.json();
        const wordData = data[0];
        
        // Display the result
        resultDiv.innerHTML = `
            <h2 class="word">${wordData.word}</h2>
            <p><strong>Phonetic:</strong> ${wordData.phonetic || 'Not available'}</p>
        `;
        
        // Show meanings
        wordData.meanings.forEach(meaning => {
            resultDiv.innerHTML += `
                <h3>${meaning.partOfSpeech}</h3>
                <p class="meaning"><strong>Definition:</strong> ${meaning.definitions[0].definition}</p>
            `;
        });
        
    } catch (error) {
        resultDiv.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
});