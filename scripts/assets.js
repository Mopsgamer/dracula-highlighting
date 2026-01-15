import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"

const inputDir = "./assets"
const outputDir = "./assets"

if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true })
}

const files = fs.readdirSync(inputDir).filter((f) => f.endsWith(".png"))

for (const file of files) {
	const inputPath = path.join(inputDir, file)
	const outputPath = path.join(outputDir, file.replace(".png", ".avif"))

	await sharp(inputPath).avif({ quality: 100 }).toFile(outputPath)

	console.log(`Converted ${file}`)
	fs.rmSync(inputPath)
	console.log(`Removed ${file}`)
}

console.log("All images converted")
