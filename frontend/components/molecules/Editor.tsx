import React from 'react'
import { Editor } from '@tinymce/tinymce-react';


export default function BlogEditor({ defaultValue, onChange }: { defaultValue: string, onChange: (e: string) => void }) {
  return (
    <div className='w-full'>
      <Editor
        apiKey= {process.env.NEXT_PUBLIC_TINY_API_KEY || 'qne4pziu0mgnhstdk62droe2h4a7ut6rxnfkhky8q2iz4mw1'} 
        initialValue={defaultValue}
        init={{
          initialValue: defaultValue,
          height: 500,
          menubar: true,
          // plugins: [
          //     // "image",
          //     "advlist",
          //     "autolink",
          //     "lists",
          //     "link",
          //     // "image",
          //     "charmap",
          //     "preview",
          //     "anchor",
          //     "searchreplace",
          //     "visualblocks",
          //     "code",
          //     "fullscreen",
          //     "insertdatetime",
          //     "media",
          //     "table",
          //     "code",
          //     "help",
          //     "wordcount",
          //     "anchor",
          // ],
          toolbar:
            "undo redo | blocks  | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={(e) => onChange(e)}
      />
    </div>
  )
}

