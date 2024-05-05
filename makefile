build:
	bunx rollup src/index.js --file dist/tagged.js --format esm

minify:
	bunx terser dist/tagged.js -c -o dist/tagged.min.js --source-map url

all: build minify
