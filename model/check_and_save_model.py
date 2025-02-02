# check_and_save_model.py
import os
import mlflow
import mlflow.sklearn
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

model_path = "model"

def train_and_save_model():
    # Load data
    iris = load_iris()
    X_train, X_test, y_train, y_test = train_test_split(iris.data, iris.target, test_size=0.2)

    # Train model
    clf = RandomForestClassifier()
    clf.fit(X_train, y_train)

    # Save model
    mlflow.sklearn.save_model(clf, model_path)
    print(f"Model saved to {model_path}")

if not os.path.exists(model_path):
    print("Model not found. Training and saving model...")
    train_and_save_model()
else:
    print("Model already exists. Skipping training.")
