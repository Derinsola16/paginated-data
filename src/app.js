const startApp = async () => {
  await getDetails();
  const nextBtn = document.querySelector("[data-nextbtn]");
  const prevBtn = document.querySelector("[data-prevbtn]");

  nextBtn.addEventListener("click", async () => {
    const pageView = document.querySelector("[data-pageview]");
    const currentPage = pageView.getAttribute("currentPage");
    await getDetails(parseInt(currentPage) + 1);
  });
  prevBtn.addEventListener("click", () => {
    const pageView = document.querySelector("[data-pageview]");
    const currentPage = pageView.getAttribute("currentPage");
    if (parseInt(currentPage) == 1) return;
    getDetails(parseInt(currentPage) - 1);
  });
};

const getDetails = async (currentPage = 1) => {
  await fetch(
    `https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84&page=${currentPage}`
  )
    .then((response) => response.json())
    .then((data) => {
      const current = data.results[0][currentPage];
      const tableBodyElement = document.querySelector("[data-sink]");
      const pageView = document.querySelector("[data-pageview]");
      let tableBody = "";
      for (i of current) {
        tableBody += `
        <tr 'data-entryid'=${i.id}>
          <td>${i.row}</td>
          <td>${i.gender}</td>
          <td>${i.age}</td>
        </tr>`;
      }
      tableBodyElement.innerHTML = tableBody;
      pageView.innerHTML = `Showing Page ${currentPage}`;
      pageView.setAttribute("currentPage", currentPage);
      if (currentPage <= 1) {
        document
          .querySelector("[data-prevbtn]")
          .setAttribute("disabled", "disabled");
      } else {
        document.querySelector("[data-prevbtn]").removeAttribute("disabled");
      }
    });
};

document.addEventListener("DOMContentLoaded", startApp);
