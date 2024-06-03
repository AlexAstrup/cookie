import numpy.random as r
import numpy as np
import matplotlib.pyplot as plt
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import AdaBoostClassifier

sigtrain = np.loadtxt('BDT_signal_train.txt')
sigtest = np.loadtxt('BDT_signal_test.txt')
backtrain = np.loadtxt('BDT_background_train.txt')
backtest = np.loadtxt('BDT_background_test.txt')

fig, (ax1, ax2, ax3) = plt.subplots(1, 3)
ax1.hist(sigtrain[:, 0])
ax2.hist(sigtrain[:, 1])
ax3.hist(sigtrain[:, 2])

ftrain = np.concatenate([sigtrain, backtrain])
ftest = np.concatenate([sigtest, backtest])

randid = np.arange(0, len(ftrain))
r.shuffle(randid)
Y = np.concatenate([np.ones(4000), np.zeros(4000)])

ftrain = ftrain[randid]
Y = Y[randid]

Ytest = np.concatenate([np.ones(2000), np.zeros(2000)])

# Create and fit an AdaBoosted decision tree
bdt = AdaBoostClassifier(DecisionTreeClassifier(max_depth=2),
                         algorithm="SAMME",
                         n_estimators=100)

bdt.fit(ftrain, Y)

twoclass_output = bdt.decision_function(ftest)
plot_range = (twoclass_output.min(), twoclass_output.max())

plt.hist(twoclass_output[Ytest == 0], range=(-1, 1), bins=40, alpha=0.8)
plt.hist(twoclass_output[Ytest == 1], range=(-1, 1), bins=40, alpha=0.8)
