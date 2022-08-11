const startApp = async () => {
  await getDetails(
    `https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84&page=${1}`
  );
  const nextBtn = document.querySelector("[data-nextbtn]");
  const prevBtn = document.querySelector("[data-prevbtn]");

  nextBtn.addEventListener("click", async () => {
    const link = nextBtn.getAttribute("link");
    if (!link) return;
    await getDetails(link);
  });
  prevBtn.addEventListener("click", async () => {
    const link = prevBtn.getAttribute("link");
    if (!link) return;
    await getDetails(link);
  });
};

const getDetails = async (link) => {
  await fetch(link)
    .then((response) => response.json())
    .then((data) => {
      const { paging, ...remainder } = data.results[0];
      const current = remainder[Object.keys(remainder)[0]];
      const currentPage = Object.keys(remainder)[0];
      const tableBodyElement = document.querySelector("[data-sink]");
      const pageView = document.querySelector("[data-pageview]");
      let tableBody = "";
      for (i of current) {
        tableBody += `
        <tr data-entryid=${i.id}>
          <td>${i.row}</td>
          <td>${i.gender}</td>
          <td>${i.age}</td>
        </tr>`;
      }
      tableBodyElement.innerHTML = tableBody;
      pageView.innerHTML = `Showing Page ${currentPage}`;
      pageView.setAttribute("currentPage", currentPage);

      if (paging.next) {
        document.querySelector("[data-nextbtn]").removeAttribute("disabled");
        document
          .querySelector("[data-nextbtn]")
          .setAttribute("link", paging.next);
      } else {
        document
          .querySelector("[data-nextbtn]")
          .setAttribute("disabled", "disabled");
        document.querySelector("[data-nextbtn]").removeAttribute("link");
      }
      if (paging.previous) {
        document.querySelector("[data-prevbtn]").removeAttribute("disabled");
        document
          .querySelector("[data-prevbtn]")
          .setAttribute("link", paging.previous);
      } else {
        document
          .querySelector("[data-prevbtn]")
          .setAttribute("disabled", "disabled");
        document.querySelector("[data-prevbtn]").removeAttribute("link");
      }
    });
};

document.addEventListener("DOMContentLoaded", startApp);
