#!/usr/bin/env python
import sys

maxKey = None
maxCount = 0

for line in sys.stdin:
	line = line.strip()
	thisCount, thisKey = line.split("\t", 1)
	thisCount = int(thisCount)
	
	if thisCount > maxCount:
		maxCount = thisCount
		maxKey = thisKey
print("{0}\t{1}".format(maxCount, maxKey))
