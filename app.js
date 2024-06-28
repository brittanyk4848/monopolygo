let stickers = {
    have: [],
    need: [],
    duplicate: []
};

document.addEventListener('DOMContentLoaded', () => {
    loadStickers();
    updateStickerLists();
});

function saveStickers() {
    localStorage.setItem('stickers', JSON.stringify(stickers));
}

function loadStickers() {
    const savedStickers = localStorage.getItem('stickers');
    if (savedStickers) {
        stickers = JSON.parse(savedStickers);
    }
}

function addSticker() {
    const stickerName = document.getElementById('stickerName').value;
    const stickerType = document.getElementById('stickerType').value;
    if (stickerName) {
        stickers[stickerType].push(stickerName);
        document.getElementById('stickerName').value = '';
        updateStickerLists();
        saveStickers();
    }
}

function updateStickerLists() {
    updateStickerList('have');
    updateStickerList('need');
    updateStickerList('duplicate');
}

function updateStickerList(type) {
    const stickerList = document.getElementById(`${type}List`);
    stickerList.innerHTML = '';
    stickers[type].forEach((sticker, index) => {
        const li = document.createElement('li');
        li.textContent = sticker;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeSticker(type, index);
        li.appendChild(removeButton);
        stickerList.appendChild(li);
    });
}

function removeSticker(type, index) {
    stickers[type].splice(index, 1);
    updateStickerLists();
    saveStickers();
}

function copyToClipboard() {
    let copyText = 'Stickers I Have:\n' + stickers.have.join(', ') + '\n\n';
    copyText += 'Stickers I Need:\n' + stickers.need.join(', ') + '\n\n';
    copyText += 'Duplicate Stickers:\n' + stickers.duplicate.join(', ');

    navigator.clipboard.writeText(copyText).then(() => {
        alert('Sticker data copied to clipboard!');
    }).catch(err => {
        console.error('Error copying text: ', err);
    });
}

function uploadStickers() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const contents = e.target.result;
            const uploadedStickers = JSON.parse(contents);
            stickers = uploadedStickers;
            updateStickerLists();
            saveStickers();
        };
        reader.readAsText(file);
    }
}
