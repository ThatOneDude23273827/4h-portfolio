// Copyright 2025 ThatOneGuy2664 //

const params = new URLSearchParams(window.location.search);
const url = params.get("file") || 'https://raw.githubusercontent.com/ThatOneDude23273827/4h-portfolio/refs/heads/main/assets/section-a-2024.pdf';
const viewerContainer = document.getElementById('viewerContainer');
const scale = 1.5;

pdfjsLib.getDocument(url).promise.then(pdf => {
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    pdf.getPage(pageNumber).then(page => {
      const viewport = page.getViewport({ scale: scale });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const wrapper = document.createElement('div');
      wrapper.className = 'pageCanvasWrapper';
      wrapper.style.height = `${viewport.height}px`;

      wrapper.appendChild(canvas);
      viewerContainer.appendChild(wrapper);

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      page.render(renderContext).promise.then(() => {
        console.log('Page ' + pageNumber + ' rendered');
      });
    });
  }
}).catch(err => {
  console.error('Error loading PDF: ' + err);
});
