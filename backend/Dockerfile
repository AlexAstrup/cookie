# Build
FROM python:3.9-slim AS builder

RUN apt-get update && apt-get install -y build-essential libpq-dev --no-install-recommends
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

# Run
FROM python:3.9-slim

WORKDIR /app
COPY --from=builder /root/.local /root/.local
ENV PATH=/root/.local/bin:$PATH

COPY . /app/backend
ENV PYTHONPATH=/backend

EXPOSE 5000
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "5000"]
