function updatePreview() {
    const textarea = document.getElementById('editor');
    const iframe = document.getElementById('preview');
    iframe.contentDocument.body.innerHTML = textarea;
}

function autotag(tag) {
    const textarea = document.getElementById('editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = textarea.value.substring(start, end);
    const replacement = `<${tag}>${selected}</${tag}>`;
    textarea.value = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
    updatePreview();
}