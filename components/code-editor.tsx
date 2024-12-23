'use client'

import Editor from '@monaco-editor/react'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  height?: string
}

export function CodeEditor({ value, onChange, height = "400px" }: CodeEditorProps) {
  return (
    <Editor
      height={height}
      defaultLanguage="cpp"
      theme="vs-dark"
      value={value}
      onChange={(value) => onChange(value || '')}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  )
}

