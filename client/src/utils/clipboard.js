const copyToClipboard = (text) => {
    const elem = window.document.createElement('textarea');    
    elem.value = text;
    document.body.appendChild(elem);
    elem.select();
    window.document.execCommand('copy');
    document.body.removeChild(elem);
}

export default copyToClipboard;