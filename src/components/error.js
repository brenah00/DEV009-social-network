function error() {
  const errorSection = document.createElement('section');
  const logo = document.createElement('img');
  const title = document.createElement('h2');
  errorSection.id = 'error-section';
  logo.src = 'https://i.postimg.cc/bJVfLCbz/My-Music-8.png';
  title.textContent = 'ERROR 404, PAGE NO FOUND';
  errorSection.append(logo, title);
  return errorSection;
}
export default error;
