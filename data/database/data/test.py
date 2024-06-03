import pandas as pd

for file in ['BDT_background_test', 'BDT_background_train', 'BDT_signal_test', 'BDT_signal_train']:
    # Read the TXT file (replace 'GeeksforGeeks.txt' with your file name)
    dataframe1 = pd.read_csv(f"{file}.txt", sep=' ', header=None)

    dataframe1.columns = ['one', 'two', 'three']
    # Save the DataFrame as a CSV file (replace 'GeeksforGeeks.csv' with your desired output file name)
    dataframe1.to_csv(f"{file}.csv", index=None)
