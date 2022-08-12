const startApp = async () => {
  // The function that calls the api to fetch all details
  await getDetails(
    `https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84&page=${1}`
  );
  // A variable to get the data element of each button
  const nextBtn = document.querySelector("[data-nextbtn]");
  const prevBtn = document.querySelector("[data-prevbtn]");

  // A callback function that is triggered when the next button is been clicked
  nextBtn.addEventListener("click", async () => {
    const link = nextBtn.getAttribute("link");
    if (!link) return;
    await getDetails(link);
  });
  // A callback function that is triggered when the previous button is been clicked
  prevBtn.addEventListener("click", async () => {
    const link = prevBtn.getAttribute("link");
    if (!link) return;
    await getDetails(link);
  });
};

// A reuseable function
const getDetails = async (link) => {
  // Fetching api
  fetch(link)
    // make the resonponse a readable json
    .then((response) => response.json())
    .then((data) => {
      // Destructing the first value result array
      const { paging, ...remainder } = data.results[0];
      // Getting the first value of the reminder object
      const currentPage = Object.keys(remainder)[0];
      // The variable displaying the details in on the table
      const current = remainder[currentPage];
      // A variable to get the data element the table
      const tableBodyElement = document.querySelector("[data-sink]");
      // A variable to get the data element of the label to display what page is showing
      const pageView = document.querySelector("[data-pageview]");
      let tableBody = "";
      // Looping through the array to get each details
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

      // If next page is available, enable button and add the link as an attribute, else it is disabled 
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
      // If previous page is available, enable button and add the link as an attribute, else it is disabled
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
// Event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
document.addEventListener("DOMContentLoaded", startApp);
