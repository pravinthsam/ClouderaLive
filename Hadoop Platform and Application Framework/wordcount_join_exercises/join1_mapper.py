#!/usr/bin/env python
import sys

for line in sys.stdin:
	line = line.strip()
	keys, value = line.split(",", 1)

	keys = keys.split()
	if len(keys) == 2:
		print ("{0}\t{1} {2}".format(keys[1], value, keys[0]))
	else:
		print ("{0}\t{1}".format(keys[0], value))
