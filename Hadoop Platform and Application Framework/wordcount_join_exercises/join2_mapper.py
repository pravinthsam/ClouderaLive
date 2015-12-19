#!/usr/bin/env python
import sys

for line in sys.stdin:
	line = line.strip()
	key, value = line.split(",", 1)
	key = key.strip()
	value = value.strip()
	if value.isdigit():
		print ("{0} {1}".format(key, value))
	else:
		if value == "ABC":
			print ("{0} {1}".format(key, value))
