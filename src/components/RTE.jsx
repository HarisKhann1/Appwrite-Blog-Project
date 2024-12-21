import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import {Controller} from 'react-hook-form'
import conf from '../conf/conf'

export default function RTE({name, control, label, defaultValue = ''}) { 
    // the control in responsible to transfer the state of the editor to the form in another component (parent component).
    // or the control will transfer the control to another component from where the this component is called.
    
    return (
        <div>
            {label && <label className='font-medium inline-block mb-1 pl-1 text-left'>{label}</label>}
            <Controller 
                name = {name || "editor"}
                control = {control}
                render={({ field: { onChange } }) => (
                    <Editor
                        // apiKey = {conf.rteAPIKey}
                        initialValue={defaultValue}
                        init={{
                            initialValue: defaultValue,
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image", "advlist", "autolink", "lists",
                                "link", "image", "charmap", "preview",
                                "anchor", "searchreplace", "visualblocks",
                                "code", "fullscreen", "insertdatetime",
                                "media", "table", "code", "help",
                                "wordcount", "anchor",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}
