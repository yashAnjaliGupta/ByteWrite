import { NodeViewWrapper } from "@tiptap/react"
import { Excalidraw } from "@excalidraw/excalidraw"

export function ExcalidrawComponent(props: any) {

    const { node, updateAttributes } = props

    const data = node.attrs.data
    const safeAppState = {
        ...(data?.appState || {}),
        collaborators: new Map(),
    }
    const editable = props.editor?.isEditable ?? true
    return (
        <NodeViewWrapper className="my-6">

            <div className="overflow-hidden rounded-2xl border border-gray-200">

                <div className="h-[500px] w-full">

                    <Excalidraw
                        viewModeEnabled={!editable}
                        initialData={{
                            elements: data?.elements || [],

                            appState: safeAppState,

                            files: data?.files || {},
                        }}

                        onChange={(elements, appState, files) => {
                            const {
                                collaborators,
                                ...safeAppState
                            } = appState
                            updateAttributes({
                                data: {
                                    elements,
                                    safeAppState,
                                    files,
                                },
                            })
                        }}

                        theme="light"

                        UIOptions={{
                            canvasActions: editable
                            ? {
                                loadScene: false,
                                saveToActiveFile: false,
                                toggleTheme: false,
                            }
                            : {
                                changeViewBackgroundColor: false,
                            },
                        }}
                    />

                </div>

            </div>

        </NodeViewWrapper>
    )
}