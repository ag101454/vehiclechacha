'use client';

import { useState, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { 
  Bold, Italic, Underline as UnderlineIcon, List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight, Link2, ImagePlus,
  Heading1, Heading2, Quote, Undo, Redo, Minus, Plus,
  MoveLeft, MoveRight, Trash2
} from 'lucide-react';

export default function RichTextEditor({ content, onChange }) {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const editorRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        allowBase64: true,
        inline: false,
        HTMLAttributes: {
          class: 'guide-image',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'guide-link',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
      }),
      Underline,
      Placeholder.configure({
        placeholder: 'Write your guide content here...',
      }),
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      // Extract images from content
      const html = editor.getHTML();
      const imgRegex = /<img[^>]+src="([^"]+)"/g;
      const foundImages = [];
      let match;
      while ((match = imgRegex.exec(html)) !== null) {
        foundImages.push(match[1]);
      }
      setImages(foundImages);
    },
  });

  if (!editor) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (images.length >= 4) {
      alert('Maximum 4 images allowed');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target.result;
      editor.chain().focus().setImage({ src: imageUrl }).run();
    };
    reader.readAsDataURL(file);
  };

  const handleLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const resizeImage = (direction) => {
    const img = editor.view.dom.querySelector('.guide-image.is-selected, .guide-image.ProseMirror-selectednode');
    if (img) {
      const currentWidth = parseInt(img.style.width) || img.width || 400;
      const newWidth = direction === 'increase' ? currentWidth + 50 : Math.max(100, currentWidth - 50);
      img.style.width = `${newWidth}px`;
      img.style.height = 'auto';
    }
  };

  const moveImage = (direction) => {
    const img = editor.view.dom.querySelector('.guide-image.is-selected, .guide-image.ProseMirror-selectednode');
    if (img) {
      if (direction === 'left') {
        img.style.marginRight = 'auto';
        img.style.marginLeft = '0';
        img.style.display = 'block';
      } else if (direction === 'right') {
        img.style.marginLeft = 'auto';
        img.style.marginRight = '0';
        img.style.display = 'block';
      } else {
        img.style.marginLeft = 'auto';
        img.style.marginRight = 'auto';
        img.style.display = 'block';
      }
    }
  };

  const deleteImage = () => {
    const selected = editor.view.dom.querySelector('.ProseMirror-selectednode');
    if (selected) {
      editor.chain().focus().deleteSelection().run();
    }
  };

  const ToolbarButton = ({ active, onClick, children, title, disabled }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`p-2 rounded-lg transition-colors ${
        active 
          ? 'bg-chacha-yellow text-chacha-black' 
          : 'text-chacha-muted hover:bg-chacha-card hover:text-white'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-chacha-border rounded-xl overflow-hidden">
      {/* Main Toolbar */}
      <div className="bg-chacha-card border-b border-chacha-border p-2 flex flex-wrap gap-1">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">
          <Bold size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic">
          <Italic size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline">
          <UnderlineIcon size={18} />
        </ToolbarButton>
        
        <div className="w-px h-6 bg-chacha-border mx-1" />
        
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="Heading 1">
          <Heading1 size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2">
          <Heading2 size={18} />
        </ToolbarButton>
        
        <div className="w-px h-6 bg-chacha-border mx-1" />
        
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List">
          <List size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered List">
          <ListOrdered size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Quote">
          <Quote size={18} />
        </ToolbarButton>
        
        <div className="w-px h-6 bg-chacha-border mx-1" />
        
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Align Left">
          <AlignLeft size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Align Center">
          <AlignCenter size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Align Right">
          <AlignRight size={18} />
        </ToolbarButton>
        
        <div className="w-px h-6 bg-chacha-border mx-1" />
        
        <ToolbarButton onClick={handleLink} active={editor.isActive('link')} title="Add Link">
          <Link2 size={18} />
        </ToolbarButton>
        
        <button
          type="button"
          onClick={() => document.getElementById('guide-image-input').click()}
          className="p-2 rounded-lg text-chacha-muted hover:bg-chacha-card hover:text-white transition-colors relative"
          title="Add Image (Max 4)"
        >
          <ImagePlus size={18} />
          <span className="absolute -top-1 -right-1 bg-chacha-yellow text-chacha-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {images.length}/4
          </span>
        </button>
        <input
          id="guide-image-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
        
        <div className="w-px h-6 bg-chacha-border mx-1" />
        
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Undo">
          <Undo size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Redo">
          <Redo size={18} />
        </ToolbarButton>
      </div>

      {/* Image Controls Toolbar (appears when image selected) */}
      {editor.isActive('image') && (
        <div className="bg-chacha-yellow/10 border-b border-chacha-yellow/20 px-3 py-2 flex flex-wrap items-center gap-2">
          <span className="text-chacha-yellow text-xs font-bold mr-2">IMAGE CONTROLS:</span>
          <button
            type="button"
            onClick={() => resizeImage('decrease')}
            className="p-1.5 rounded bg-chacha-black text-white hover:bg-chacha-card"
            title="Make Smaller"
          >
            <Minus size={14} />
          </button>
          <button
            type="button"
            onClick={() => resizeImage('increase')}
            className="p-1.5 rounded bg-chacha-black text-white hover:bg-chacha-card"
            title="Make Larger"
          >
            <Plus size={14} />
          </button>
          <button
            type="button"
            onClick={() => moveImage('left')}
            className="p-1.5 rounded bg-chacha-black text-white hover:bg-chacha-card"
            title="Move Left"
          >
            <MoveLeft size={14} />
          </button>
          <button
            type="button"
            onClick={() => moveImage('center')}
            className="p-1.5 rounded bg-chacha-black text-white hover:bg-chacha-card"
            title="Center"
          >
            <AlignCenter size={14} />
          </button>
          <button
            type="button"
            onClick={() => moveImage('right')}
            className="p-1.5 rounded bg-chacha-black text-white hover:bg-chacha-card"
            title="Move Right"
          >
            <MoveRight size={14} />
          </button>
          <button
            type="button"
            onClick={deleteImage}
            className="p-1.5 rounded bg-red-500 text-white hover:bg-red-600"
            title="Delete Image"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}

      {/* Editor Area */}
      <EditorContent 
        editor={editor} 
        className="prose prose-invert max-w-none p-4 min-h-[300px] bg-chacha-black text-white focus:outline-none guide-editor"
      />

      {/* Image Counter */}
      <div className="bg-chacha-card border-t border-chacha-border px-4 py-2 text-xs text-chacha-muted flex justify-between">
        <span>{images.length} image(s) added (max 4)</span>
        <span>{editor.storage.characterCount?.characters?.() || 0} characters</span>
      </div>
    </div>
  );
}