function escapeHTML(input) {
    const div = document.createElement('div');
    div.innerText = input;
    return div.innerHTML;
}

function updatePreview() {
    const textarea = document.getElementById('editor');
    const iframe = document.getElementById('preview');
    const escapedContent = escapeHTML(textarea.value);
    iframe.contentDocument.body.innerHTML = escapedContent;
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