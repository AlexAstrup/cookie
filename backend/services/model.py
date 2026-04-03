import pandas as pd
from sklearn.linear_model import Ridge


def train_model_from_df(df, target_column, model_params):
    # Example: Assume 'X' and 'y' are predefined columns
    X = df.drop(columns=[target_column])
    y = df[target_column]

    # Initialize and train model
    model = Ridge(**model_params)
    model.fit(X, y)

    # Return coefficients or predictions
    return {
        "coefficients": model.coef_.tolist(),
        "intercept": model.intercept_
    }
