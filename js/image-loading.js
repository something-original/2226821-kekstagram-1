const loadImage = () => {
  const fileChooserElement = document.querySelector('input[type=file]');
  const previewElement = document.querySelector('.img-upload__preview').querySelector('img');
  fileChooserElement.addEventListener('change', () => {
    const file = fileChooserElement.files[0];
    const fileName = file.name.toLowerCase();
    if (fileName.endsWith('.gif')||fileName.endsWith('.jpg')||fileName.endsWith('.jpeg')||fileName.endsWith('.png')) {
      previewElement.src = URL.createObjectURL(file);
    }
  });
};

export { loadImage };
