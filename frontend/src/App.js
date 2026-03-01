import React, { useState, useEffect } from 'react';
import './App.css'; 

function App() {
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/songs');
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error("Error al cargar canciones:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !artist) return;

    // Ahora sí enviamos los 4 campos al backend
    const newSong = { title, artist, year, genre };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/songs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSong),
      });

      if (response.ok) {
        fetchSongs();
        // Limpiamos todos los campos del formulario
        setTitle('');
        setArtist('');
        setYear('');
        setGenre('');
      }
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1 className="title">
          <span className="music-icon">🎵</span> 
          Musicfy
          <span className="music-icon">🎶</span>
        </h1>
        <p>Laboratorio 4 - Gestor de Canciones</p>
      </div>

      <div className="card">
        <h2>Agregar Nueva Canción</h2>
        <form onSubmit={handleSubmit} className="form-group">
          <input 
            type="text" 
            className="input-field"
            placeholder="Nombre de la canción *" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
          <input 
            type="text" 
            className="input-field"
            placeholder="Artista *" 
            value={artist} 
            onChange={(e) => setArtist(e.target.value)} 
            required 
          />
          <input 
            type="number" 
            className="input-field"
            placeholder="Año de lanzamiento" 
            value={year} 
            onChange={(e) => setYear(e.target.value)} 
          />
          <input 
            type="text" 
            className="input-field"
            placeholder="Género musical" 
            value={genre} 
            onChange={(e) => setGenre(e.target.value)} 
          />
          <button type="submit" className="submit-btn">Guardar Canción</button>
        </form>
      </div>

      <div className="card">
        <h2>Listado de Canciones</h2>
        {songs.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#a1a1aa' }}>
            No hay canciones registradas. Asegúrate de que Flask esté corriendo.
          </p>
        ) : (
          <ul className="song-list">
            {songs.map((song) => (
              <li key={song.id} className="song-item">
                <span className="song-title">{song.title}</span>
                <span className="song-artist">
                  {song.artist} 
                  {/* Aquí mostramos el año y el género si existen */}
                  {(song.year || song.genre) && (
                    <span style={{ color: '#a855f7', marginLeft: '8px', fontSize: '0.85rem' }}>
                      | {song.year} {song.genre && `- ${song.genre}`}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;