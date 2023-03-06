#!/bin/bash
IFS=$'\n'
cd "$(readlink -f "$(dirname "$0")")"
cd src
for file in $(find -type f -name "*.ts"); do
  file="$(sed -e 's/\.ts$/.js/' -e 's|^\./||' <<< "$file")"
  echo "<script src=\"$file\" async defer></script>"
done
