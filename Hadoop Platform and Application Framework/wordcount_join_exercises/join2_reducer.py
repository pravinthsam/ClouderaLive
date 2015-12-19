#! /usr/bin/env python

import sys

lastWord = None
hasABC = False
total = 0

for line in sys.stdin:
	line = line.strip()
	
	word, value = line.split()
	word = word.strip()
	value = value.strip()
#	print (word)
#	print lastWord
#	print word != lastWord 
	if word != lastWord:
		if hasABC:
			print ("{0} {1}".format(lastWord, total))
		lastWord = word
		total = 0
		hasABC = False

	if value.isdigit():
		total += int(value)
	else:
		hasABC = True

if lastWord:
	print("{0} {1}".format(lastWord, total))
