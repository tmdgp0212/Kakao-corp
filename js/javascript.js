$("a").on("click", function (evt) {
  evt.preventDefault();
});

const $header = $("header>.container");
const $todaysKaKao = $("header>.todays-kakao-top");
const $tit = $("section>.todays-kakao>h2");

const $upperCard = $("section>.upperside>.main>.main-card");
const $underCard = $("section>.underside>.main>.main-card");

let lastScroll;
let scrollTop;

$(window).on("scroll", function (evt) {
  scrollTop = Math.ceil($(document).scrollTop());

  /*헤더 스크롤 효과*/
  if (scrollTop > 5) {
    $header.parent().css({ borderBottom: "1px solid #eee" });
  } else {
    $header.parent().css({ borderBottom: "none" });
  }

  if (lastScroll > scrollTop) {
    $header.slideDown(200);
  } else {
    if (scrollTop < $tit.offset().top) {
      $header.slideDown(200);
    } else {
      $header.slideUp(200);
    }
  }

  if (scrollTop > $tit.offset().top) {
    $todaysKaKao.slideDown(200);
  } else if (scrollTop < $tit.offset().top) {
    $todaysKaKao.slideUp(200);
  }

  /*카드 스크롤 효과*/

  cardScroll($upperCard);
  cardScroll($underCard);

  lastScroll = scrollTop;
});

const cardScroll = function (card) {
  const mainTop = card.parent().offset().top;
  const mainBottom = mainTop + card.parent().outerHeight();
  let position;

  const positionTop = function (position) {
    card.css({ top: position });
  };

  if (scrollTop + 100 < mainTop) {
    position = 0;
    positionTop(position);
  } else if (
    scrollTop + 100 > mainTop &&
    scrollTop + 100 < mainBottom - card.outerHeight()
  ) {
    if (lastScroll > scrollTop) {
      position = scrollTop + 170 - mainTop;
    } else {
      position = scrollTop + 100 - mainTop;
    }
    positionTop(position);
  } else if (scrollTop + 100 > mainBottom - card.outerHeight()) {
    position = card.parent().outerHeight() - card.outerHeight() - 34;
    positionTop(position);
  }
};

const getDate = function () {
  const $nav = $("header>.container>nav>.gnb>li");

  $nav.on("mouseover", function () {
    $(this).siblings().addClass("blur");
  });
  $nav.on("mouseout", function () {
    $nav.removeClass("blur");
  });

  /* todays kakao */
  const $today = $("section>.todays-kakao>p>span");
  const $todayPng = $("#today-png");
  const $todayGif = $("#today-gif");

  const time = new Date();
  const month = time.getMonth() + 1;
  const date = time.getDate();
  const day = time.getDay();

  let dayStr;

  switch (day) {
    case 0:
      dayStr = "일요일";
      break;

    case 1:
      dayStr = "월요일";
      break;

    case 2:
      dayStr = "화요일";
      break;

    case 3:
      dayStr = "수요일";
      break;

    case 4:
      dayStr = "목요일";
      break;

    case 5:
      dayStr = "금요일";
      break;

    case 6:
      dayStr = "토요일";
      break;
  }

  $today.text(`${month}월 ${date}일 ${dayStr}`);
  $todayPng.attr("src", `./images/${date}.png`);
  $todayGif.attr("src", `./images/ico_date${date}.gif`);
};

/* 카드헤더 일괄적용 */
const $card = $("section>.board .card");
const news = $("section>.board .news");
const stock = $("section>.board .stock");
const promise = $("section>.board .promise");
const serviceCenter = $("section>.board .service-center");
const privacy = $("section>.board .privacy");

const categories = [
  {
    category: news,
    txt: "보도자료",
    imgSrc: "./images/notice.png",
  },
  {
    category: stock,
    txt: "주가정보",
    imgSrc: "./images/ico_stock.png",
  },
  {
    category: promise,
    txt: "약속과 책임",
    imgSrc: "./images/ico_responsible.png",
  },
  {
    category: serviceCenter,
    txt: "고객센터",
    imgSrc: "./images/ico_customer.png",
  },
  {
    category: privacy,
    txt: "카카오 프라이버시",
    imgSrc: "./images/ico_privacy.png",
  },
];

const pushCardHeader = function () {
  for (let i = 0; i < categories.length; i++) {
    categories[i].category.prepend(`
        <p class="card-header">
        <img src="${categories[i].imgSrc}" alt="notice">
        <span class="category">${categories[i].txt}</span>
        <a rel="noopener noreferer" href="#" class="more">
            <i class="fa-solid fa-ellipsis-vertical"></i>
        </a></p>
        `);
  }
};

/* etc */
const $onTop = $("section>.top");

$onTop.on("click", function () {
  $("html, body").animate({ scrollTop: 0 }, 1000);
});

/* 반응형 */
const $wrap = $("#wrap");
const $nav = $("header>.container>nav");
const $kakaoCultureImg = $("section>.culture>img");
const $siteMap = $("footer>.load_map>nav>.gnb>.more");

$(window).on("resize", function () {
  sizingEvt();
});

function sizingEvt() {
  if ($(window).innerWidth() < 1024) {
    $nav.height(window.innerHeight);

    $kakaoCultureImg.attr("src", "./images/bg_home_culture_s.png");
    $siteMap.on("click", function () {
      $(this).toggleClass("on");
    });
  } else {
    $nav.height(40);

    $kakaoCultureImg.attr("src", "./images/bg_home_culture.png");
  }
}

$(document).ready(function () {
  getDate();
  pushCardHeader();
  sizingEvt();
});

/* 푸터영역 */
const $terms = $("footer>.contact>.terms>li>a");

$terms.on("click", function (evt) {
  evt.preventDefault();

  const li = $(this).parent();
  const pop = $(this).next();
  const height = -pop.outerHeight() - 10;

  pop.css({ top: height });
  li.siblings().removeClass("on");
  li.toggleClass("on");
});

const $site = $("footer>.contact>.site>p");

$site.on("click", function () {
  $site.toggleClass("show");
  $site.next().toggle();
});
