# Musicfy - Backend

LABORATORIO NO. 4 - Programación Web

## 📋 Descripción

Backend de la aplicación Musicfy construido con Flask y MongoDB. Esta API permite gestionar una base de datos de canciones con operaciones CRUD.

## 🛠️ Requisitos Previos

- Python 3.7+
- pip (generador de paquetes de Python)
- MongoDB (local o conexión remota)
- Virtual Environment (recomendado)

## 📦 Instalación

### 1. Crear y activar el entorno virtual

**En Windows (PowerShell):**
```bash
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**En Windows (CMD):**
```bash
python -m venv venv
venv\Scripts\activate.bat
```

**En macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 2. Instalar las dependencias

```bash
pip install -r requirements.txt
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la carpeta `backend` con la siguiente estructura:

```
MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/music_db?retryWrites=true&w=majority
```

O para MongoDB local:
```
MONGO_URI=mongodb://localhost:27017/music_db
```

## 🚀 Ejecución

### Ejecutar el servidor de desarrollo

```bash
python app.py
```

El servidor estará disponible en: `http://localhost:5000`

## 📡 Endpoints Disponibles

### Obtener todas las canciones
```
GET /api/songs
```

**Respuesta:**
```json
[
  {
    "id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "title": "Nombre de la canción",
    "artist": "Nombre del artista",
    "year": 2024,
    "genre": "Género musical"
  }
]
```

### Agregar una nueva canción
```
POST /api/songs
```

**Body (JSON):**
```json
{
  "title": "Nombre de la canción",
  "artist": "Nombre del artista",
  "year": 2024,
  "genre": "Género musical"
}
```

**Respuesta:**
```json
{
  "message": "Song added successfully",
  "id": "64a1b2c3d4e5f6g7h8i9j0k1"
}
```

## 📁 Estructura del Proyecto

```
backend/
├── app.py              # Aplicación principal Flask
├── config.py           # Configuraciones de la aplicación
├── requirements.txt    # Dependencias del proyecto
├── .env                # Variables de entorno (no versionar)
└── README.md          # Este archivo
```

## ⚙️ Configuración

- **DEBUG**: Activado por defecto en desarrollo
- **MONGO_URI**: URL de conexión a MongoDB (variable de entorno)
- **Puerto**: 5000 (por defecto)

## 📝 Notas importantes

- El archivo `.env` contiene credenciales sensibles y **no debe ser versionado**
- Asegúrate de tener MongoDB corriendo antes de iniciar la aplicación
- Utiliza sempre el entorno virtual para evitar conflictos de dependencias
