fetch("http://localhost:3000/resume").then(res=>{
  res.json().then(
    ts=>{console.log(ts);})})

// json-server --watch Data.json
const url = "http://localhost:3000/resume";
// const url = "/resumeProject/data/Data.json";

let sno = -1;
let data = null;
let searchInfo = false;
let goTo = null;

const body = document.querySelector("body");
const search = document.querySelector(".search");
const header = document.querySelector("header");
const btns = document.querySelector(".buttons");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

const next = async () => {
  if (searchInfo) {
    data = goTo;
  } else if (data === null) {
    data = await calInfo(url);
  }

  if (data.length === 0) {
    noDataMsg();
  } else {
    displayData();
    if (data.length === 1) {
      showSearch();
      hideBtn(btns);
    }

    if (++sno <= data.length - 1) {
      if (sno === 0) {
        hideBtn(btnPrev);
      } else if (sno === data.length - 1) {
        hideBtn(btnNext);
      }
      showResume(data[sno]);
    }
  }
};

const prev = async () => {
  showResume(data[--sno]);
  if (sno === 0) {
    hideBtn(btnPrev);
  }
  enableElement(btnNext);
};

const searchdata = async () => {
  if (event.key === "Enter") {
    searchInfo = true;
    const searchedVal = search.value.trim();
    const data = await calInfo(url);
    goTo = data.filter((item) => {
      if (
        item.basics.AppliedFor.trim().toLowerCase() ===
        searchedVal.toLowerCase()
      )
        return item;
    });

    if (searchedVal === "") {
      goTo = data;
    }
    sno = -1;
    next();
  }
};
search.addEventListener("keypress", searchdata);

const calInfo = async () => {
  try {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const applicantInfoEl = document.querySelector(".applicantdata");
const noDataEl = document.querySelector(".nodata");

const noDataMsg = () => {
  showSearch();
  enableElement(noDataEl);
  hideBtn(applicantInfoEl);
  hideBtn(btns);
};

const showSearch = () => {
  header.style.gridTemplateColumns = "1fr";
};

const displayData = () => {
  header.style.gridTemplateColumns = "4fr 1fr";
  hideBtn(noDataEl);
  enableElement(btns);
  enableElement(btnNext);
  enableElement(btnPrev);
  enableElement(applicantInfoEl);
};
body.addEventListener("load", next());
btnNext.addEventListener("click", next);
btnPrev.addEventListener("click", prev);

const enableElement = (el) => {
  el.classList.remove("hidden");
};

const hideBtn = (el) => {
  el.classList.add("hidden");
};

const applicantNameEl = document.querySelector(".applicantname");
const appliedForEl = document.querySelector(".appliedfor");

const showResume = (info) => {
  applicantNameEl.textContent = info.basics.name;
  appliedForEl.textContent = `Applied For: ${info.basics.AppliedFor}`;
  getTechnicalData(info);
  getExperienceData(info);
};

const phoneNo = document.querySelector(".phone");
const emaild = document.querySelector(".email");
const profileId = document.querySelector(".profile");
const technicalSkills = document.querySelector(".technicalSkills ul");
const hobbyData = document.querySelector(".hobbies ul");

const getTechnicalData = (info) => {
  phoneNo.textContent = info.basics.phone;
  emaild.textContent = info.basics.email;
  profileId.innerHTML = `<a href=${info.basics.profiles.url} target="_blank">${info.basics.profiles.network}</a>`;

  const skills = info.skills.keywords;
  let skillstr = "";
  for (let skill of skills) {
    skillstr += `<li>${skill}</li>`;
  }
  technicalSkills.innerHTML = skillstr;
  const hobbies = info.interests.hobbies;
  let hhobbies = "";
  for (let hobby of hobbies) {
    hhobbies += `<li>${hobby}</li>`;
  }
  hobbyData.innerHTML = hhobbies;
};

const getExperienceData = (info) => {
  const workList = document.querySelector(".work ul");

  const work = info.work;
  let workstr = "";
  for (const item in work) {
    workstr += `<li><b>${item}</b>: ${info.work[item]}</li>`;
  }
  workList.innerHTML = workstr;
  const projects = info.projects;
  let projectstr = `<li><b>${projects.name}:</b> ${projects.description}</li>`;
  const projectList = document.querySelector(".projects ul");

  projectList.innerHTML = projectstr;
  const education = info.education;
  let eduEle = "";
  for (const i in education) {
    eduEle += "<li><b>" + i + ": </b>";
    for (const j in education[i]) {
      eduEle += education[i][j] + ", ";
    }
    eduEle = eduEle.substring(0, eduEle.lastIndexOf(","));
    eduEle += "</li>";
  }
  const educationList = document.querySelector(".education ul");

  educationList.innerHTML = eduEle;
  const internship = info.Internship;
  let internEle = "";
  for (const item in internship) {
    internEle += `<li><b>${item}</b>: ${info.Internship[item]}</li>`;
  }
  const internshipList = document.querySelector(".internship ul");

  internshipList.innerHTML = internEle;
  const achievements = info.achievements.Summary;
  let aachievement = "";
  for (const item of achievements) {
    aachievement += `<li>${item}</li>`;
  }
  const achievementsList = document.querySelector(".achievements ul");

  achievementsList.innerHTML = aachievement;
};