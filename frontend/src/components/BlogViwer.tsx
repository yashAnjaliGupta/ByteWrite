import { EditorContent, useEditor } from "@tiptap/react"

// --- Core Extensions ---
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import { TextAlign } from "@tiptap/extension-text-align"
import { Typography } from "@tiptap/extension-typography"
import { Highlight } from "@tiptap/extension-highlight"
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { TaskItem, TaskList } from "@tiptap/extension-list"
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension"
// --- Custom Nodes ---
import { ExcalidrawNode } from "@/components/tiptap-node/excalidraw-node/excalidraw-node"

// --- Styles ---
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss"
import "@/components/tiptap-node/code-block-node/code-block-node.scss"
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss"
import "@/components/tiptap-node/list-node/list-node.scss"
import "@/components/tiptap-node/image-node/image-node.scss"
import "@/components/tiptap-node/heading-node/heading-node.scss"
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss"

interface BlogViewerProps {
    content: any
}

export function BlogViewer({ content }: BlogViewerProps) {

    const editor = useEditor({
        editable: false,

        immediatelyRender: false,

        editorProps: {
            attributes: {
                class: `prose prose-lg max-w-none focus:outline-none min-h-screen`,
            },
        },

        extensions: [

            StarterKit.configure({
                horizontalRule: false,
            }),

            Image,

            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),

            TaskList,

            TaskItem.configure({
                nested: true,
            }),

            Highlight.configure({
                multicolor: true,
            }),

            Typography,

            Superscript,
            HorizontalRule,
            Subscript,

            ExcalidrawNode,
        ],

        content,
    })

    if (!editor) {
        return null
    }

    return (
        <div className="min-h-screen bg-[#f9fafb] py-10">

            <div
                className="
                    mx-auto
                    max-w-4xl
                    rounded-3xl
                    bg-white
                    p-10
                    shadow-sm
                "
            >

                <EditorContent
                    editor={editor}
                />

            </div>

        </div>
    )
}