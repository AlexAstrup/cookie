# Use the official pgAdmin 4 image
FROM dpage/pgadmin4

# Set environment variables
ENV PGADMIN_DEFAULT_EMAIL=test@astrup.dk
ENV PGADMIN_DEFAULT_PASSWORD=test1234

# Expose port 80
EXPOSE 80

# Start pgAdmin 4
CMD ["python", "/pgadmin4/web/pgAdmin4.py"]