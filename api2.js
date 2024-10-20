// Marvel API credentials
const publicKey = '2e356e8bef3d73a72c84c75f15220e87';
const privateKey = 'f6b87e01b4be2a96b681067faaa030207208188a';
const baseURL = 'https://gateway.marvel.com/v1/public/characters';

// Function to generate MD5 hash
function generateHash(ts, privateKey, publicKey) {
    return CryptoJS.MD5(ts + privateKey + publicKey).toString();
}

// Fetch characters when button is clicked
document.getElementById('fetchButton').addEventListener('click', () => {
    fetchMarvelCharacters()
        .then(() => console.log('Characters fetched and displayed successfully'))
        .catch(error => console.error('Error:', error));
});

function fetchMarvelCharacters() {
    const container = document.getElementById('charactersContainer');
    container.innerHTML = '<p>Loading...</p>'; // loading indicator

    const ts = Date.now(); // Use current timestamp
    const hash = generateHash(ts, privateKey, publicKey);
    const url = `${baseURL}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON from the response
        })
        .then(data => {
            console.log(data); // Log the fetched data
            return data.data.results; // Return the results for the next then block
        })
        .then(displayCharacters) // Call displayCharacters with the results
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            container.innerHTML = '<p>Error fetching characters. Please try again.</p>';
            throw error; 
        });
}

// Function to display characters in the UI
function displayCharacters(characters) {
    return new Promise((resolve) => {
        const container = document.getElementById('charactersContainer');
        container.innerHTML = ''; // Clear any content

        characters.forEach(character => {
            const characterElement = document.createElement('div');
            characterElement.classList.add('character');

            // Character name and thumbnail
            characterElement.innerHTML = `
                <h2>${character.name}</h2>
                <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
            `;

            container.appendChild(characterElement); // Append character to the container
        });

        resolve('UI updated successfully');
    });
}
