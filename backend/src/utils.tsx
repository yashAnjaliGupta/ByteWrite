export function generatePreview(content: any, maxWords = 150): string {
    const contentJSON=JSON.parse(content)
    const words: string[] = []
    
    function extractText(node: any) {

        if (!node || words.length >= maxWords) {
            return
        }

        // Extract text nodes
        if (node.type === "text" && node.text) {

            const splitWords = node.text
                .replace(/\s+/g, " ")
                .trim()
                .split(" ")

            for (const word of splitWords) {

                if (words.length >= maxWords) {
                    break
                }

                if (word.trim()) {
                    words.push(word)
                }
            }
        }

        // Traverse child nodes
        if (node.content && Array.isArray(node.content)) {

            for (const child of node.content) {

                if (words.length >= maxWords) {
                    break
                }

                extractText(child)
            }
        }
    }

    extractText(contentJSON)

    return words.join(" ") + (words.length >= maxWords ? "..." : "")
}