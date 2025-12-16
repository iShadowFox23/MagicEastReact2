const images = import.meta.glob('../images/*.{png,jpg,jpeg,svg}');
const formattedImages = {};
for (const path in images) {
// Extraemos el nombre sin extensión y lo usamos como key
const key = path
.replace('./', '') // quitar "./"
.replace(/\.[^/.]+$/, ''); // quitar extensión
formattedImages[key] = images[path].default;
}
export default formattedImages;