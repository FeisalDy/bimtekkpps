'use client'
import '../../../node_modules/@mdxeditor/editor/dist/style.css'
import React, { useRef } from 'react'

import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  BlockTypeSelect,
  ChangeAdmonitionType,
  ChangeCodeMirrorLanguage,
  CodeToggle,
  CreateLink,
  linkDialogPlugin,
  DiffSourceToggleWrapper,
  diffSourcePlugin,
  InsertAdmonition,
  InsertCodeBlock,
  InsertFrontmatter,
  InsertImage,
  imagePlugin
} from '@mdxeditor/editor'

async function imageUploadHandler (image) {
  const formData = new FormData()
  formData.append('file', image)

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  })

  const json = await response.json()
  return json.imagePath
}

const Editor = ({ markdown, editorRef }) => {
  const ref = useRef(null)
  return (
    <>
      <button onClick={() => ref.current?.setMarkdown('new markdown')}>
        Set new markdown
      </button>

      <MDXEditor
        ref={ref}
        markdown={markdown}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          imagePlugin({ imageUploadHandler }),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <BlockTypeSelect />
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <InsertImage />
              </>
            )
          })
        ]}
        onChange={console.log}
      />
      <button onClick={() => console.log(ref.current?.getMarkdown())}>
        Get markdown
      </button>
    </>
  )
}

export default Editor
