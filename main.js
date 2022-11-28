const token = "e3b92352edc14de3ab06009628e7f5d5";
const baseUrl = "https://api.football-data.org//v4/competitions/2000";

function getStandings() {
  const url = `${baseUrl}/standings`;

  axios
    .get(url, {
      headers: {
        "X-Auth-Token": token,
      },
    })
    .then((response) => {
      const standings = response.data.standings;
      document.querySelector(".standings").innerHTML = "";
      for (stand of standings) {
        let tableContent = "";
        let rank = 1;
        for (row of stand.table) {
          tableContent += `
          <!-- Team -->
          <li class="list-group-item">
              <div class="row t-align-c d-flex align-items-center justify-content-center">
                  <div class="team-1 col-4 d-flex align-items-center ">
                    
                      <div><b>${rank++}</b></div>
                      <div class="flag">
                          <img src="${row.team.crest}"
                              alt="">
                      </div>
                      <h5><b>${row.team.name}</b></h5>
                    
                  </div>
                  <div class="col-1">${row.playedGames}</div>
                  <div class="col-1">${row.won}</div>
                  <div class="col-1">${row.lost}</div>
                  <div class="col-1">${row.draw}</div>
                  <div class="col-1"><b>${row.points}</b></div>
                  <div class="col-1"><b>${row.goalsFor}</b></div>
                  <div class="col-1"><b>${row.goalsAgainst}</b></div>
                  <div class="col-1"><b>${row.goalDifference}</b></div>
              </div>
          </li>
          <!-- Team -->
          `;
        }

        const content = `
        <!-- Stading Col -->
        <div class="col-xl-6 mb-4">
          <div class="overflow">
            <div class="cards card shadow">
                <div class="card-header bg-primary t-align-c">
                    <b>${stand.group}</b>
                </div>

                <div class="row m-0 bg-secondary">
                  
                    <div class="col-4">Team</div>
                    <div class="col-1 t-align-c">MP</div>
                    <div class="col-1 t-align-c">W</div>
                    <div class="col-1 t-align-c">L</div>
                    <div class="col-1 t-align-c">D</div>
                    <div class="col-1 t-align-c">Pts</div>
                    <div class="col-1 t-align-c">GF</div>
                    <div class="col-1 t-align-c">GA</div>
                    <div class="col-1 t-align-c">GD</div>
                </div>

                <!-- Teams-->
                <ul class="br-left list-group list-group-flush">

                  ${tableContent}

                </ul>
                <!--// Teams //-->
            </div>
          </div>
        </div>
        <!--// Stading Col //-->
        `;
        document.querySelector(".standings").innerHTML += content;
      }
    });
}

function getMateches() {
  const url = `${baseUrl}/matches`;

  axios
    .get(url, {
      headers: {
        "X-Auth-Token": token,
      },
    })
    .then((response) => {
      const matches = response.data.matches;

      document.querySelector(".matches").innerHTML = "";
      for (match of matches) {
        const awayTeam = match.awayTeam;
        const homeTeam = match.homeTeam;

        const utcDate = match.utcDate;
        const matchTime = new Date(utcDate);

        const dateString = `${matchTime.getUTCFullYear()} / ${
          matchTime.getUTCMonth() + 1
        } / ${matchTime.getUTCDate()} <div class='date'> ${matchTime.getUTCHours()}:${matchTime.getUTCMinutes()}</div>`;

        if (homeTeam.name == null) {
          continue;
        }
        const content = `
        <!-- MATCH COL -->
                <div class="col-12">
                    <div class="card shadow rounded-pill mb-5">
                        <div class="card-body p-0 ">
                            <div class="teams row">

                                <!-- FIRST TEAM -->
                                <div
                                    class="box flag-right col-3 bg-primary d-flex align-items-center justify-content-center">
                                    <div>
                                        <div class="flag">
                                            <img src="${homeTeam.crest}"
                                                alt=""
                                                class="flag-img">
                                        </div>
                                        <h5><b>${homeTeam.tla}</b></h5>
                                    </div>
                                </div>
                                <!--// FIRST TEAM //-->

                                <!-- INFO MATCHE TEAM -->
                                <div class="box groups col-6">
                                    <div class="info row d-flex align-items-center justify-content-center">
                                        <div class="col-3">
                                            <h1>${
                                              match.score.fullTime.home != null
                                                ? match.score.fullTime.home
                                                : "-"
                                            }</h1>
                                        </div>
                                        <div class="dates col-6">
                                            <div>
                                                <h6>${match.group}</h6>
                                                <h1>X</h1>
                                                <h6>${dateString}</h6>
                                            </div>
                                        </div>
                                        <div class="col-3">
                                            <h1>${
                                              match.score.fullTime.away != null
                                                ? match.score.fullTime.away
                                                : "-"
                                            }</h1>
                                        </div>
                                    </div>
                                </div>
                                <!--// INFO MATCHE TEAM //-->

                                <!-- SECOND TEAM -->
                                <div
                                    class="box flag-left col-3 bg-primary d-flex align-items-center justify-content-center">
                                    <div>
                                        <div class="flag">
                                            <img src="${awayTeam.crest}"
                                                alt=""
                                                class="flag-img">
                                        </div>
                                        <h5><b>${awayTeam.tla}</b></h5>
                                    </div>
                                </div>
                                <!--// SECOND TEAM //-->

                            </div>
                        </div>
                    </div>
                </div>
                <!--// MATCH COL //-->
        `;
        document.querySelector(".matches").innerHTML += content;
      }
    });
}

function getScorers() {
  const url = `${baseUrl}/scorers`;
  axios
    .get(url, {
      headers: {
        "X-Auth-Token": token,
      },
    })
    .then((response) => {
      const scorers = response.data.scorers;

      document.querySelector(".tbody").innerHTML = "";
      let rank = 1;
      for (scorer of scorers) {
        const content = `
          <!-- SCORER COL -->
          <tr>
              <th scope="row">
                  <div>${rank++}</div>
              </th>
              <td colspan="2">
                  <div>
                      <b>${scorer.player.name}</b>
                  </div>
              </td>
              <td>
                  <div class="flag-2">
                      <img src="${scorer.team.crest}" alt="">
                      <h5><b>${scorer.team.name}</b></h5>
                  </div>
              </td>
              <td>
                  <div class="goals">
                    <b>${scorer.goals}</b> 
                    <i class="fa-sharp fa-solid fa-futbol"></i>
                  </div>
              </td>
          </tr>
          <!--// SCORER COL //-->
        `;

        document.querySelector(".tbody").innerHTML += content;
      }
    });
}

const btnUp = document.querySelector(".btn-up");

window.addEventListener("scroll", () => {
  this.scrollY >= "700"
    ? btnUp.classList.add("show")
    : btnUp.classList.remove("show");
});

btnUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const bars = document.querySelector(".bars");
const overlay = document.querySelector(".overlay");
const xMark = document.querySelector(".xmark i");
const links = document.querySelectorAll(".links-2 a");

links.forEach((link) => {
  link.onclick = function () {
    overlay.classList.remove("active");
  };
});

bars.addEventListener("click", () => {
  console.log("clicked");
  overlay.classList.add("active");
});

xMark.addEventListener("click", () => {
  overlay.classList.remove("active");
});

getStandings();
getMateches();
getScorers();
