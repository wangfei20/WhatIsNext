#!/bin/bash
echo "# WhatIsNext" >> README.md
git init
git add . 
git commit -m "init"
git branch -M main
git remote add origin https://github.com/wangfei20/WhatIsNext.git
git push -u origin main