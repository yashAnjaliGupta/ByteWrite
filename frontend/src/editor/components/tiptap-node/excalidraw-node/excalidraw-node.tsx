import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewRenderer } from "@tiptap/react"

import { ExcalidrawComponent } from "./ExcalidrawComponent"

export const ExcalidrawNode = Node.create({
    name: "excalidraw",

    group: "block",

    atom: true,

    selectable: true,

    draggable: true,

    addAttributes() {
        return {
            data: {
                default: {
                    elements: [],
                    appState: {},
                    files: {},
                },
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: "excalidraw-node",
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return [
            "excalidraw-node",
            mergeAttributes(HTMLAttributes),
        ]
    },

    addNodeView() {
        return ReactNodeViewRenderer(ExcalidrawComponent)
    },
})