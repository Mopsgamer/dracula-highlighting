const result = await Bun.build({
	entrypoints: ["./src/index.ts"],
	outdir: "./dist",
	metafile: true,
})

// Analyze bundle sizes
for (const [path, meta] of Object.entries(result.metafile.inputs)) {
	console.log(`${path}: ${meta.bytes} bytes`)
}

for (const [path, meta] of Object.entries(result.metafile.outputs)) {
	console.log(`${path}: ${meta.bytes} bytes`)
}

// Save for external tools like esbuild's bundle analyzer
await Bun.write("./dist/meta.json", JSON.stringify(result.metafile))
