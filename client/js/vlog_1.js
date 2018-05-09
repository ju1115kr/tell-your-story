function vlog_1() {

  var title = `스물 다섯, 첫 번째 그 여자 이야기`;
  var date = `18.03.01`;
  var context = `
    &nbsp;
  <iframe class="vlog" width="1920" height="1080" src="https://youtube.com/embed/OLygstgrqNI" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe><br /><br />
    &nbsp;
  <br /><br />

    <span>스물 다섯, 인생의 4분의 1을 지나는 우리.</span>
    <span>근데 나, 잘 살고 있는 걸까?</span><br />
    <span>첫 번째, 졸업 시즌에 고민이 많은 그 여자, 보현이의 이야기</span><br /><br />

    <span>1. 너는 학벌에 대한 고민이 있어? - 01:49</span>
    <span>2. 너는 외모에 대한 고민이 있어? - 05:40</span>
    <span>3. 하고 싶은 것? 아니면 현실적인 것? - 11:50</span><br />

    <span>“아무도 시도하지 않는 것을 했다” - 김먼찌</span>
    <span>“내 영혼을 갈아넣은 작품” - 박먼찌</span><br />

    <span>조선의 먼찌들에서 선보이는 첫 리얼 v-log 인터뷰 다큐</span>
    <span>#조선의먼찌들 #찌질함은_결국_한낱_먼찌일뿐</span><br /><br />


    <span>유튜버에 도전한 빵튜버 뽀니가 궁금하다면??</span>
    <span>유튜브에서 구독하기! 
    <a target="_blank" href="https://www.youtube.com/channel/UCysSC6UjONpWKMbBupJZjpg">[빵튜브]뽀니 BreadTube</a></span>

    <span>구글 뉴스랩 펠로우십 : <a target="_blank" href="http://newslabfellows.com/category/meonzzi">조선의 먼찌들</a></span>
    <span>페이스북 : <a target="_blank" href="https://www.facebook.com/meonzzi/">조선의 먼찌들 페이스북</a></span>
    `;


  $("h2.news-main-content-header-title").text(title);
  $("p.news-main-content-date").text(date);
  $("p.news-main-content-text").html(context);

  var body = $("html, body");
  body.stop().animate({scrollTop:0}, 500, 'swing');
};

