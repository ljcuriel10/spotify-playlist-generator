const clientId = '0f57c614ed8e40728cd464b766d5d88e';
const params = new URLSearchParams(window.location.search);
const code = params.get('code')
const redirectUri = 'http://localhost:3000/';



const redirectToAuthCodeFlow = async clientId => {
    const verifier = generateCodeVerifier(128)
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('response_type', 'code');
    params.append('redirect_uri', redirectUri);
    params.append('scope', 'user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-private');
    params.append('code_challenge_method', 'S256');
    params.append('code_challenge', challenge);
    
    window.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
   
}




function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}




const Spotify = {

    // Get Access Token

    async getToken(clientId, c1) {
        const verifier = localStorage.getItem('verifier');
        

        const params = new URLSearchParams();
        params.append('client_id', clientId);
        params.append('grant_type', 'authorization_code');
        params.append('code', c1)
        params.append('redirect_uri', redirectUri);
        params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const response = await result.json()

    localStorage.setItem('access_token', response.access_token)
    return localStorage.getItem('access_token')
    },

    // Fetch Profile

    async fetchProfile(token) {
        
        const result = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}` 
            }
        });
        const response = await result.json()
        return response
    }, 

    // Search
    async search(token, term) {
        const searchUrl = `https://api.spotify.com/v1/search?query=${term}&type=track`;
        const payload = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const result = await fetch(searchUrl, payload)
            const response = await result.json();
            const tracks = response.tracks.items
        return tracks
        } catch (e) {
            console.log(e)
        }
    },

    // Create Playlist
    async createPlaylist(token, userId, playlistName, trackUris) {
        const createUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
        
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        return  fetch(createUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({name: playlistName})
        }).then(res => res.json()).then(data => {
            const playlistId = data.id;
            return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                method:'POST',
                headers: headers,
                body: JSON.stringify({uris: trackUris})
            });
        });
    },

    // Get Playlists

    async getPlaylists (token) {
        const url = 'https://api.spotify.com/v1/me/playlists'
        const payload = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const res = await fetch(url, payload)
        const data = await res.json()
        const playlists = data.items
        return playlists
    }

}


if(!code) {
    redirectToAuthCodeFlow(clientId)
} else {
    await Spotify.getToken(clientId, code)
}

export default Spotify;