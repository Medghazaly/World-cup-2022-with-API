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

      document.querySelector(".matches").innerHTML = "";
      for (stand of standings) {
        let tableContent = "";
        for (row of stand.table) {
          tableContent += `
          <!-- Team -->
          <li class="list-group-item">
              <div class="row t-align-c d-flex align-items-center justify-content-center">
                  <div class="col-sm-4 d-flex align-items-center justify-content-center">
                      <div class="flag">
                          <img src="${row.team.crest}"
                              alt="" class="rounded-circle">
                      </div>
                      <h5><b>${row.team.tla}</b></h5>
                  </div>
                  <div class="col-sm-2">${row.won}</div>
                  <div class="col-sm-2">${row.lost}</div>
                  <div class="col-sm-2">${row.draw}</div>
                  <div class="col-sm-2"><b>${row.points}</b></div>
              </div>
          </li>
          <!-- Team -->
          `;
        }

        const content = `
        <!-- Stading Col -->
                <div class="col-sm-6 mb-4">
                    <div class="card shadow">
                        <div class="card-header bg-primary t-align-c">
                            <b>${stand.group}</b>
                        </div>

                        <div class="row m-0 bg-secondary t-align-c">
                            <div class="col-sm-4">team</div>
                            <div class="col-sm-2">W</div>
                            <div class="col-sm-2">L</div>
                            <div class="col-sm-2">D</div>
                            <div class="col-sm-2">Pts</div>
                        </div>

                        <!-- Teams-->
                        <ul class="list-group list-group-flush">

                          ${tableContent}

                        </ul>
                        <!--// Teams //-->
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
        } / ${matchTime.getUTCDate()} ${matchTime.getUTCHours()}:${matchTime.getUTCMinutes()}`;
        if (homeTeam.name == null) {
          continue;
        }
        const content = `
        <!-- MATCH COL -->
                <div class="col-sm-12">
                    <div class="card shadow rounded-pill mb-5">
                        <div class="card-body p-0 ">
                            <div class="teams row">

                                <!-- FIRST TEAM -->
                                <div
                                    class="box flag-right col-sm-3 bg-primary d-flex align-items-center justify-content-center">
                                    <div>
                                        <div class="flag">
                                            <img src="${homeTeam.crest}"
                                                alt="" class="rounded-circle">
                                        </div>
                                        <h5><b>${homeTeam.tla}</b></h5>
                                    </div>
                                </div>
                                <!--// FIRST TEAM //-->

                                <!-- INFO MATCHE TEAM -->
                                <div class="box groups col-sm-6">
                                    <div class="info row d-flex align-items-center justify-content-center">
                                        <div class="col-sm-4">
                                            <h1>${
                                              match.score.fullTime.home ?? "-"
                                            }</h1>
                                        </div>
                                        <div class="col-sm-4">
                                            <div>
                                                <h6>${match.group}</h6>
                                                <h1>X</h1>
                                                <h6>${dateString}</h6>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <h1>${
                                              match.score.fullTime.away ?? "-"
                                            }</h1>
                                        </div>
                                    </div>
                                </div>
                                <!--// INFO MATCHE TEAM //-->

                                <!-- SECOND TEAM -->
                                <div
                                    class="box flag-left col-sm-3 bg-primary d-flex align-items-center justify-content-center">
                                    <div>
                                        <div class="flag">
                                            <img src="${awayTeam.crest}"
                                                alt="" class="rounded-circle">
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

getStandings();
getMateches();
