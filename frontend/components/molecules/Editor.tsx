import React from 'react'
import { Editor } from '@tinymce/tinymce-react';


export default function BlogEditor({ defaultValue, onChange }: { defaultValue: string, onChange: (e: string) => void }) {
  return (
    <div className='w-full'>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY || 'qne4pziu0mgnhstdk62droe2h4a7ut6rxnfkhky8q2iz4mw1'}
        initialValue={defaultValue}
        init={{
          height: 500,
          menubar: true,
          // plugins: [
          //   "advlist", "autolink", "lists", "link", "charmap", 
          //   "searchreplace", "visualblocks", "code",  "insertdatetime",
          //   "media", "table", "code", "help", "wordcount"
          // ],
          toolbar:
            "undo redo | formatselect | bold italic underline strikethrough forecolor backcolor | " +
            "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | " +
            "blockquote subscript superscript removeformat | link image media table | fullscreen preview help",
          block_formats: "Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Paragraph=p",
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onEditorChange={(e) => onChange(e)}
      />
    </div>
  )
}

