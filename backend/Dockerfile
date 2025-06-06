# Use a lightweight Python image
FROM python:3.9-slim

# Install system dependencies required for psycopg2
RUN apt-get update && apt-get install -y postgresql-server-dev-all gcc python3-dev musl-dev

WORKDIR /app

# Copy dependencies first (better Docker caching)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy your backend code
COPY . /app

EXPOSE 5000

# Start FastAPI with Uvicorn
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "5000"]
