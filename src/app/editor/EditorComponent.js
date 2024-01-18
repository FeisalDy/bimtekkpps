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
  imagePlugin,
  InsertThematicBreak,
  ListsToggle,
  SingleChoiceToggleGroup,
  Separator
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
      <div className='border rounded-md min-h-[70vh] border-dark '>
        <MDXEditor
          className='min-w-full col-span-12 prose font-in sm:prose-base md:prose-lg max-w-max prose-blockquote:bg-accent/20 prose-blockquote:p-2 prose-blockquote:px-6 prose-blockquote:border-accent prose-blockquote:not-italic prose-blockquote:rounded-r-lg prose-li:marker:text-accent dark:prose-invert dark:prose-blockquote:border-accentDark dark:prose-blockquote:bg-accentDark/20 dark:prose-li:marker:text-accentDark'
          ref={ref}
          markdown={markdown}
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            imagePlugin({ imageUploadHandler }),
            thematicBreakPlugin(),
            listsPlugin(),
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <UndoRedo />
                  <Separator />
                  <BoldItalicUnderlineToggles />
                  <Separator />
                  <BlockTypeSelect />
                  <InsertImage />
                  <InsertThematicBreak />
                  <ListsToggle />
                </>
              )
            })
          ]}
          onChange={console.log}
        />
      </div>
      <button onClick={() => console.log(ref.current?.getMarkdown())}>
        Get markdown
      </button>
    </>
  )
}

export default Editor
