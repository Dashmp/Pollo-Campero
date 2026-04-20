# Usamos la versión de Python que tienes en tu entorno
FROM python:3.13-slim

# Evita que Python genere archivos .pyc y fuerza la salida por consola
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Instalamos dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiamos el código de Django
COPY . .

# Exponemos el puerto y corremos el servidor
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]