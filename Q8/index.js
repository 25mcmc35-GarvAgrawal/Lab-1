let books = [];

const loadBook = () => {
  books = [];
  $.ajax({
    type: "GET",
    url: "index.xml",
    dataType: "xml",
    success: function (response) {
      $(response)
        .find("book")
        .each(function () {
          let book = {
            id: $(this).attr("id"),
            author: $(this).find("author").text(),
            title: $(this).find("title").text(),
            genre: $(this).find("genre").text(),
            price: parseFloat($(this).find("price").text()),
            publication_date: $(this).find("publication_date").text(),
          };

          books.push(book);
        });
      $("#loading").hide();
      displayBook(books);
      $(".filterBtn").prop("disabled", false);
      addGenre(books);
      addAuthor(books);
    },
    error: function (e) {
      console.error(e);
    },
  });
};

const displayBook = (books) => {
  $("#tableBody").empty();
  books.forEach((books) => {
    let tr = $("<tr>");
    tr.append($("<td>").text(books.id));
    tr.append($("<td>").text(books.author));
    tr.append($("<td>").text(books.title));
    tr.append($("<td>").text(books.genre));
    tr.append($("<td>").text(books.price));
    tr.append($("<td>").text(books.publication_date));

    $("#tableBody").append(tr);
  });
};

const addGenre = (books) => {
  let genres = [];

  books.forEach((element) => {
    if (!genres.includes(element.genre)) {
      genres.push(element.genre);
    }
  });

  $("#genreFilter").empty().append(`<option value="">Filter by Genre</option>`);

  genres.forEach((genre) => {
    let option = $("<option>");
    option.attr("value", genre);
    option.text(genre);
    $("#genreFilter").append(option);
  });
};

const addAuthor = (books) => {
  let authors = [];

  books.forEach((element) => {
    if (!authors.includes(element.author)) {
      authors.push(element.author);
    }
  });

  $("#authorFilter")
    .empty()
    .append(`<option value="">Filter by Author</option>`);

  authors.forEach((author) => {
    let option = $("<option>");
    option.attr("value", author);
    option.text(author);
    $("#authorFilter").append(option);
  });
};

const reset = () => {
  $(".filterBtn").val("");
  $("#minPrice").val("");
  $("#maxPrice").val("");

  // Show all books again
  displayBook(books);
};

const applyFilters = () => {
  let selectedGenre = $("#genreFilter").val();
  let selectedAuthor = $("#authorFilter").val();
  let minPrice = parseFloat($("#minPrice").val());
  let maxPrice = parseFloat($("#maxPrice").val());

  if (isNaN(minPrice)) minPrice = 0;
  if (isNaN(maxPrice)) maxPrice = Infinity;

  let filtered = books.filter((book) => {
    let matchGenre = selectedGenre === "" || book.genre === selectedGenre;
    let matchAuthor =
      selectedAuthor === "" ||
      book.author.toLowerCase() === selectedAuthor.toLowerCase();
    let matchPrice = book.price >= minPrice && book.price <= maxPrice;

    return matchGenre && matchAuthor && matchPrice;
  });

  displayBook(filtered);
};

$(document).ready(function () {
  $(".filterBtn").prop("disabled", true); 
  loadBook();
});

$("#resetBtn").click(function (e) {
  e.preventDefault();
  reset();
});

$("#priceFilterBtn").click(function (e) {
  e.preventDefault();
  applyFilters();
});

$("#genreFilter").change(function (e) {
  e.preventDefault();
  applyFilters();
});

$("#authorFilter").change(function (e) {
  e.preventDefault();
  applyFilters();
});