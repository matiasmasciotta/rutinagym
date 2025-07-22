# Configuración de la API para Actualizar Rutinas

## URL de la API

Para configurar la URL correcta de tu API, edita el archivo `src/views/Perfil.vue` en la línea 108:

```javascript
// URL de la API - CAMBIAR POR LA URL REAL
const API_URL = 'https://tu-api.com/rutinas'
```

Cambia `'https://tu-api.com/rutinas'` por la URL real de tu API.

## Formato de la petición

La aplicación hace una petición GET con el email como query parameter:

```
GET https://tu-api.com/rutinas?email=calumasciotta@gmail.com
```

## Mapeo de usuarios a emails

- **Carla**: calumasciotta@gmail.com
- **Sara**: sarahi055@hotmail.com  
- **Matías**: matiasmasciotta@gmail.com
- **Marisa**: marisagfridman@gmail.com

## Formato esperado de respuesta

La API debe devolver un JSON con esta estructura:

```json
{
    "success": true,
    "message": "Success",
    "data": {
        "_id": "67e1d08f4c03b0788d4e34e5",
        "student": "67d8908f1e823b2e63a362e9",
        "isPreset": false,
        "days": [
            {
                "dayNumber": 1,
                "muscularGroups": ["PIERNAS I"],
                "items": [
                    {
                        "type": "exercise",
                        "name": "SENTADILLAS CON BARRA",
                        "notes": "AUMENTAMOS PROGRESIVAMENTE EL PESO",
                        "series": 5,
                        "repetitions": "12-12-10-10-8",
                        "_id": "685f14c51c200a351ef754d1",
                        "exercises": []
                    }
                ],
                "_id": "685f14c51c200a351ef754d0"
            }
        ],
        "frequency": "3 VECES POR SEMANA",
        "objective": "HIPERTROFIA",
        "mesocycle": "8 SEMANAS",
        "trainer": "bruno",
        "nextUpdate": "2025-08-02T00:00:00.000Z",
        "updateDate": "2025-06-27T22:01:41.098Z",
        "createdAt": "2025-03-24T21:37:19.258Z",
        "updatedAt": "2025-06-27T22:01:41.098Z",
        "__v": 0
    }
}
```

## Funcionamiento

1. El usuario va a la pestaña "Perfil"
2. Ve la nueva sección "Actualizar Rutinas" con su email
3. Hace clic en "Actualizar Datos"
4. La app hace la petición HTTP con su email
5. Los datos se guardan localmente y se actualizan en tiempo real
6. Las rutinas se sincronizan automáticamente 