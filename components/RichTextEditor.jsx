'use client';

import dynamic from 'next/dynamic';
import { useRef, useCallback } from 'react';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => (
    <div className="rich-text-editor-loading">
      <div className="animate-pulse bg-gray-200 rounded-lg h-48"></div>
    </div>
  ),
});

const RichTextEditor = ({ value, onChange, placeholder = 'Write your content here...' }) => {
  const quillRef = useRef(null);

  // Upload image to Cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!res.ok) throw new Error('Upload failed');
    const data = await res.json();
    return data.secure_url;
  };

  // Custom image handler
  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      // Validate file
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert('Image must be less than 10MB');
        return;
      }

      const quill = quillRef.current?.getEditor();
      if (!quill) return;

      // Save cursor position
      const range = quill.getSelection(true);

      // Show uploading placeholder
      quill.insertText(range.index, 'Uploading image...', { italic: true, color: '#999' });

      try {
        const url = await uploadToCloudinary(file);

        // Remove placeholder and insert image
        quill.deleteText(range.index, 'Uploading image...'.length);
        quill.insertEmbed(range.index, 'image', url);
        quill.setSelection(range.index + 1);
      } catch (error) {
        console.error('Image upload failed:', error);
        quill.deleteText(range.index, 'Uploading image...'.length);
        alert('Failed to upload image. Please try again.');
      }
    };
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ align: [] }],
        ['blockquote', 'code-block'],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: {
        image: imageHandler,
      },
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'indent',
    'align',
    'blockquote',
    'code-block',
    'link',
    'image',
  ];

  return (
    <div className="rich-text-editor-wrapper">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className="rich-text-editor"
      />
      <style jsx global>{`
      .rich-text-editor .ql-editor {
          min-height: 220px;
          padding: 1rem;
          line-height: 1.75;
          hyphens: none !important;
          word-break: normal !important;
          overflow-wrap: normal !important;
          overflow-x: hidden;
        }

        .rich-text-editor .ql-editor img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1rem 0;
        }
        .rich-text-editor-wrapper {
          width: 100%;
        }

        .rich-text-editor .ql-container {
          min-height: 200px;
          font-size: 1rem;
          font-family: inherit;
          border-bottom-left-radius: 0.75rem;
          border-bottom-right-radius: 0.75rem;
          border-color: #e5e7eb;
        }

        .rich-text-editor .ql-toolbar {
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
          border-color: #e5e7eb;
          background-color: #f9fafb;
        }

        .rich-text-editor .ql-editor {
          min-height: 200px;
          padding: 1rem;
          line-height: 1.75;
        }

        .rich-text-editor .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: normal;
          left: 1rem;
          right: 1rem;
        }

        .rich-text-editor .ql-editor h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: #1E3A5F;
        }

        .rich-text-editor .ql-editor h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: #1E3A5F;
        }

        .rich-text-editor .ql-editor h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #2D3339;
        }

        .rich-text-editor .ql-editor h4,
        .rich-text-editor .ql-editor h5,
        .rich-text-editor .ql-editor h6 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #2D3339;
        }

        .rich-text-editor .ql-editor p {
          margin-bottom: 1rem;
        }

        .rich-text-editor .ql-editor ul,
        .rich-text-editor .ql-editor ol {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }

        .rich-text-editor .ql-editor li {
          margin-bottom: 0.25rem;
        }

        .rich-text-editor .ql-editor blockquote {
          border-left: 4px solid #C9A227;
          padding-left: 1rem;
          margin: 1rem 0;
          color: #4b5563;
          font-style: italic;
          background-color: #f9fafb;
          padding: 0.75rem 1rem;
          border-radius: 0 0.5rem 0.5rem 0;
        }

        .rich-text-editor .ql-editor pre.ql-syntax {
          background-color: #1f2937;
          color: #e5e7eb;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }

        .rich-text-editor .ql-editor a {
          color: #C9A227;
          text-decoration: underline;
        }

        .rich-text-editor .ql-editor a:hover {
          color: #1E3A5F;
        }

        .rich-text-editor .ql-editor img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }

        .rich-text-editor .ql-snow .ql-picker.ql-header {
          width: 110px;
        }

        .rich-text-editor .ql-snow .ql-tooltip {
          z-index: 1000;
          border-radius: 0.5rem;
          border-color: #e5e7eb;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .rich-text-editor .ql-snow .ql-tooltip input[type='text'] {
          border-radius: 0.375rem;
          border-color: #e5e7eb;
          padding: 0.25rem 0.5rem;
        }

        .rich-text-editor .ql-snow .ql-tooltip a.ql-action,
        .rich-text-editor .ql-snow .ql-tooltip a.ql-remove {
          margin-left: 0.5rem;
        }

        .rich-text-editor:focus-within .ql-toolbar {
          border-color: #1E3A5F;
        }

        .rich-text-editor:focus-within .ql-container {
          border-color: #1E3A5F;
        }

        .rich-text-editor .ql-toolbar button:hover,
        .rich-text-editor .ql-toolbar button:focus,
        .rich-text-editor .ql-toolbar button.ql-active,
        .rich-text-editor .ql-toolbar .ql-picker-label:hover,
        .rich-text-editor .ql-toolbar .ql-picker-item:hover,
        .rich-text-editor .ql-toolbar .ql-picker-item.ql-selected {
          color: #1E3A5F;
        }

        .rich-text-editor .ql-toolbar button:hover .ql-stroke,
        .rich-text-editor .ql-toolbar button:focus .ql-stroke,
        .rich-text-editor .ql-toolbar button.ql-active .ql-stroke,
        .rich-text-editor .ql-toolbar .ql-picker-label:hover .ql-stroke,
        .rich-text-editor .ql-toolbar .ql-picker-item:hover .ql-stroke,
        .rich-text-editor .ql-toolbar .ql-picker-item.ql-selected .ql-stroke {
          stroke: #1E3A5F;
        }

        .rich-text-editor .ql-toolbar button:hover .ql-fill,
        .rich-text-editor .ql-toolbar button:focus .ql-fill,
        .rich-text-editor .ql-toolbar button.ql-active .ql-fill {
          fill: #1E3A5F;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
