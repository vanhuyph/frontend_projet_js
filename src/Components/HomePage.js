let homePage = `
<div class="container-fluid">
      <div class="container m-5">
        <div class="row ">
          <article
            class="
              col-xs-12 col-sm-12 col-md-12 col-lg12 text-center"
          >
          <h3>MyCMS</h3>
          <p>
            Le Lorem Ipsum est simplement du faux texte employé dans la composition et
            la mise en page avant impression. Le Lorem Ipsum est le faux texte standard
            de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla
            ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.
            Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique
            informatique, sans que son contenu n'en soit modifié.
          </p>
          <button type="button" class="btn btn-primary">Generate</button>
          </article>
        </div>
</div>

`;
const HomePage = () => {
  let page = document.querySelector("#page");
  page.innerHTML = homePage;
};

// anime({
//   targets: "#vm path",
//   strokeDashoffset: [anime.setDashoffset, 0],
//   easing: "easeInOutSine",
//   duration: 1500,
//   delay: function (el, i) {
//     return i * 250;
//   },
//   direction: "alternate",
//   loop: true,
// });

export default HomePage;
