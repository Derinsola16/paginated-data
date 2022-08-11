const startApp = async () => {
  getDetails();
  const nextBtn = document.querySelector("[data-nextbtn]");

  nextBtn.addEventListener("click", () => {
    const pageView = document.querySelector("[data-pageview]");
    const currentPage = pageView.getAttribute("currentPage");
    getDetails(parseInt(currentPage) + 1);
  });
};

const getDetails = async (currentPage = 1) => {
  await fetch(
    `https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84&page=${currentPage}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const current = data.results[0][currentPage];
      const tableBodyElement = document.querySelector("[data-sink]");
      const pageView = document.querySelector("[data-pageview]");
      let tableBody = "";
      for (i of current) {
        tableBody += `
        <tr>
          <td>${i.row}</td>
          <td>${i.gender}</td>
          <td>${i.age}</td>
        </tr>`;
      }
      tableBodyElement.innerHTML = tableBody;
      pageView.innerHTML = `Showing page ${currentPage}`;
      pageView.setAttribute("currentPage", currentPage);
    });
};

document.addEventListener("DOMContentLoaded", startApp);
