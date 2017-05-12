#!/bin/sh
while sleep 1; do 
	echo "------------------"
	while read -r line; do 
		curl -H "Content-Type: application/json" -X POST -d "$line" http://192.168.0.103:7050
	done< <(node ./macSniff.js wlan0mon "type mgt")
done
