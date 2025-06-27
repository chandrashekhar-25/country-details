import React from 'react';

function GeneratePptxButton() {
    const handleGeneratePptx = async () => {
        try {
            const response = await fetch('http://localhost:3001/generate-pptx');
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'generated_presentation.pptx';
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            } else {
                console.error('Failed to generate PPTX:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching PPTX:', error);
        }
    };

    return (
        <div>
            <button onClick={handleGeneratePptx}>Generate PowerPoint</button>
        </div>
    );
}

export default GeneratePptxButton;