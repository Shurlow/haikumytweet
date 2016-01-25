#!/bin/sh
rsync -rv --exclude-from 'excludes.txt' * Umami:haikumytweet