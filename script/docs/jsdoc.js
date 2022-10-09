

function hiddenSeparatorWhenSearch() {
  document.querySelector('#nav-search').addEventListener('input', (event) => {
    const { value } = event.target;
    if (value) {
      document.querySelectorAll('.nav-separator').forEach((item) => {
        item.style.display = 'none';
      });
    } else {
      document.querySelectorAll('.nav-separator').forEach((item) => {
        item.style.display = 'block';
      });
    }
  });
}


document.addEventListener('DOMContentLoaded', () => {
  hiddenSeparatorWhenSearch();
});
