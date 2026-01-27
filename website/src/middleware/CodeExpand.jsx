import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

const CodeExpand = ({ code, initialHeight = 300 }) => {
    const [expanded, setExpanded] = useState(false)

    const containerStyle = {
        maxHeight: expanded ? 'none' : `${initialHeight}px`,
        overflowY: expanded ? 'visible' : 'auto',
        border: '1px solid #ccc',
        borderRadius: '6px',
        background: '#1e1e1e',
    }

    const maxRows = code.trim().split('\n').length >= 20

    return (
        <div>
            <div style={containerStyle}>
                <SyntaxHighlighter
                    language="javascript"
                    style={vscDarkPlus}
                    wrapLongLines={true}
                >
                    {code.trim()}
                </SyntaxHighlighter>
            </div>

            {maxRows &&
            <button
                className="btn btn-primary mt-2"
                onClick={() => setExpanded(!expanded)}
            >
                {expanded ? 'Pienennä' : 'Näytä kokonaan'}
            </button>
}
        </div>
    )
}

export default CodeExpand