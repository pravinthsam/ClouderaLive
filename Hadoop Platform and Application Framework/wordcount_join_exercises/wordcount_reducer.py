#!/usr/bin/env python
import sys

lastKey = None
total = 0

for line in sys.stdin:
	line = line.strip()
	thisKey, value = line.split("\t", 1)
	value = int(value)
	
	if thisKey == lastKey:
		total += value
	else:
		if lastKey:
			print("{0}\t{1}".format(lastKey, total))
		lastKey = thisKey
		total = value
if thisKey == lastKey:
	print("{0}\t{1}".format(lastKey, total))
