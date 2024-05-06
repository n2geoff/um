build:
	bunx rollup src/index.js --file dist/um.js --format esm

minify:
	bunx terser dist/um.js -c -o dist/um.min.js --source-map url

all: build minify
