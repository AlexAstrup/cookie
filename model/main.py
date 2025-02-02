import numpy.random as r
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import AdaBoostClassifier


import psycopg2

conn = psycopg2.connect(
    dbname="mydb",
    user="alexander",
    password="mypassword",
    host="127.0.0.1",
    port="5432"
)
cursor = conn.cursor()

query = "SELECT * FROM mydb.test.BDT_background_train"
cursor.execute(query)
data = cursor.fetchall()

df = pd.DataFrame(data)

fig, (ax1, ax2, ax3) = plt.subplots(1, 3)
ax1.plot(np.arange(len(df)), df.iloc[:, 0])
ax2.plot(np.arange(len(df)), df.iloc[:, 1])
ax3.plot(np.arange(len(df)), df.iloc[:, 2])

plt.show()




# ftrain = np.concatenate([sigtrain, backtrain])
# ftest = np.concatenate([sigtest, backtest])
#
# randid = np.arange(0, len(ftrain))
# r.shuffle(randid)
# Y = np.concatenate([np.ones(4000), np.zeros(4000)])
#
# ftrain = ftrain[randid]
# Y = Y[randid]
#
# Ytest = np.concatenate([np.ones(2000), np.zeros(2000)])
#
# # Create and fit an AdaBoosted decision tree
# bdt = AdaBoostClassifier(DecisionTreeClassifier(max_depth=2),
#                          algorithm="SAMME",
#                          n_estimators=100)
#
# bdt.fit(ftrain, Y)
#
# twoclass_output = bdt.decision_function(ftest)
# plot_range = (twoclass_output.min(), twoclass_output.max())
#
# plt.hist(twoclass_output[Ytest == 0], range=(-1, 1), bins=40, alpha=0.8)
# plt.hist(twoclass_output[Ytest == 1], range=(-1, 1), bins=40, alpha=0.8)
