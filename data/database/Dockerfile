FROM postgres:latest

ENV POSTGRES_USER=alexander
ENV POSTGRES_PASSWORD=mypassword
ENV POSTGRES_DB=mydb

# Copy the scripts
COPY scripts/init.sql /docker-entrypoint-initdb.d/init.sql

# Expose the default PostgreSQL port (5432)
EXPOSE 5432

# Start the PostgreSQL server
CMD ["postgres"]
