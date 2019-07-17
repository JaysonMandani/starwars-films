function favourites() {
  const filmsTable = document.getElementById("filmsTable");

  if (filmsTable) {
    const tbody = filmsTable.lastElementChild;
    const storedFilms = JSON.parse(localStorage.getItem("storedFilms")) || [];
    const rows = tbody.getElementsByTagName("tr");

    for (let row of rows) {
      const filmId = row.dataset["film_id"];
      if (storedFilms.indexOf(filmId) > -1) {
        row.lastElementChild.textContent = "Yes";
        tbody.prepend(tbody.removeChild(row));
      }
    }

    filmsTable.addEventListener("click", e => {
      if (e.target.className.indexOf("fav-film") > -1) {
        handleClick(e);
      }
    });
  }
}

function handleClick(e) {
  const tr = e.target.parentNode;
  const filmId = tr.dataset["film_id"];
  const tbody = tr.parentNode;
  const storedFilms = JSON.parse(localStorage.getItem("storedFilms")) || [];
  const index = storedFilms.indexOf(filmId);

  if (index > -1) {
    storedFilms.splice(index, 1);
    e.target.textContent = "No";
    tbody.insertBefore(
      tbody.removeChild(tr),
      tbody.childNodes[storedFilms.length]
    );
  } else {
    const title = tr.firstElementChild.textContent;
    storedFilms.push(filmId);
    e.target.textContent = "Yes";
    tbody.prepend(tbody.removeChild(tr));
    showAlert(title);
  }
  localStorage.setItem("storedFilms", JSON.stringify(storedFilms));
}

function showAlert(title) {
  let newDiv = document.createElement("div");
  newDiv.classList.add("alert", "alert-success", "fade", "show");
  newDiv.innerHTML = `
    ${title} was successfully added to favourites.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  `;
  document.body.insertBefore(newDiv, document.body.childNodes[3]);
}

function search() {
  const searchInput = document.getElementById("searchInput");

  if (searchInput) {
    searchInput.addEventListener("keyup", e => {
      const searchValue = searchInput.value.toUpperCase();
      const filmsTable = document.getElementById("filmsTable");
      const rows = filmsTable.getElementsByTagName("tr");

      for (let row of rows) {
        const cell = row.getElementsByTagName("td")[0];
        if (cell) {
          const title = cell.textContent;
          if (title.toUpperCase().indexOf(searchValue) > -1) {
            row.style.display = "";
          } else {
            row.style.display = "none";
          }
        }
      }
    });
  }
}
