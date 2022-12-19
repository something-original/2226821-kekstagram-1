const imgLoading = () => {
    const ALLOWED_FORMATS = ['jpeg', 'jpg', 'png', 'gif'];
    const fileLoader = document.querySelector('input[type=file]');
    const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');

    fileLoader.addEventListener('change', () => {
        const file = fileLoader.files[0];
        const name = file.name.toLowerCase();
        const matches = ALLOWED_FORMATS.some((it) => name.endsWith(it));
        if (matches) {
            imgPreview.src = URL.createObjectURL(file);
        }
    });
};

export { imgLoading };