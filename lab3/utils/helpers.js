// Utility helper functions
function formatDate(date) {
  return new Date(date).toLocaleDateString('uk-UA');
}

function truncate(text, length = 100) {
  if (text.length > length) {
    return text.substring(0, length) + '...';
  }
  return text;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
  formatDate,
  truncate,
  capitalizeFirstLetter
};
