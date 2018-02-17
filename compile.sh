#!/bin/bash
echo "" > compiled.js
for f in greasemonkey_base.js basegui.js interactions.js instaInteraction.js ; do
   echo "Adding $f"
   echo "$(cat $f)" >> compiled.js
   echo -e "\n" >> compiled.js
done
echo -e "// Compile date $(date)\n" >> compiled.js
