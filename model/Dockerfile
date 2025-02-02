# Use the official MLflow image
FROM mlflow/mlflow:latest

# Install necessary dependencies
RUN pip install scikit-learn

# Copy the Python script into the container
COPY check_and_save_model.py /app/check_and_save_model.py

# Set the working directory
WORKDIR /app

# Command to check if the model exists and save it if it doesn't
RUN python check_and_save_model.py

# Command to serve the model
CMD ["mlflow", "models", "serve", "-m", "model", "--host", "0.0.0.0", "--port", "5001"]
