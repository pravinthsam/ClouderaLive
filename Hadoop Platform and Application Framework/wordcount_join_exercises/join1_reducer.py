#! /usr/bin/env python

import sys

lastWord = None
lastMax = 0
lastVals = []
lastDates = []

for line in sys.stdin:
	line = line.strip()
	
	word, values = line.split("\t",1)
#	print (word)
#	print lastWord
#	print word != lastWord 
	if word != lastWord:
		if lastWord:
                        for i in range(0,len(lastVals)):
                                print("{0} {1}\t{2} {3}".format(lastDates[i], lastWord, lastVals[i], lastMax))
		lastVals = []
		lastDates = []
		lastWord = word
	
	values = values.split()
	
	if len(values) == 1:
		lastMax = values[0]
	else:
		lastVals.append(values[0])
		lastDates.append(values[1])

if lastWord:
	for i in range(0,len(lastVals)):
		print("{0} {1}\t{2} {3}".format(lastDates[i], word, lastVals[i], lastMax))
