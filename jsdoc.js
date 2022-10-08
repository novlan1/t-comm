

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

function hiddenFooter() {
  const footer = document.querySelector('footer');

  if (footer) {
    footer.style.display = 'none';
  }
}


document.addEventListener('DOMContentLoaded', () => {
  hiddenSeparatorWhenSearch();
});
