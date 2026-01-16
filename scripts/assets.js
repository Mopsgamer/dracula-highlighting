import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"

const inputDir = "./assets"
const outputDir = "./assets"

if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true })
}

const files = fs
	.readdirSync(inputDir)
	.filter((f) => [".png", ".avif", ".webp"].some((s) => f.endsWith(s)))

for (const file of files) {
	const inputPath = path.join(inputDir, file)
	const outputPath = path.join(outputDir, file.replace(path.extname(file), ".jpg"))

	await sharp(inputPath).jpeg({ quality: 100 }).toFile(outputPath)

	console.log(`Converted ${file}`)
}

sharp("assets/icon.png")
	.resize({ left: 0, top: 0, width: 128, height: 128 })
	.jpeg({ quality: 100 })
	.toFile("assets/icon.jpg")
	.then(() => console.log("Image clipped!"))
	.catch((err) => console.error(err))

console.log("All images converted")
