const loadImage = () => {
  const fileChooser = document.querySelector('input[type=file]');
  const preview = document.querySelector('.img-upload__preview').querySelector('img');
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();
    if (fileName.endsWith('.gif')||fileName.endsWith('.jpg')||fileName.endsWith('.jpeg')||fileName.endsWith('.png')) {
      preview.src = URL.createObjectURL(file);
    }
  });
};

export { loadImage };
