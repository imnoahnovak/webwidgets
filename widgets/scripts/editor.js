function updatePreview() {
    const textarea = document.getElementById('editor');
    const iframe = document.getElementById('preview');
    iframe.contentDocument.body.innerHTML = textarea.value;
}