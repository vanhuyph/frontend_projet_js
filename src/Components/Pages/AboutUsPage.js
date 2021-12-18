let aboutUsPage = `<div class="container-about">
<div class="about-section">
<h1>About Us :</h1>
<br>
<p>Ce site a été créé entièrement en JavaScript par 3 étudiants en informatique de gestion à l'Institut Paul Lambin.</p>
<p>Si vous remarquez des infonctionnalités, des coquilles ou que vous voulez simplement nous envoyer un feedback :</p>
<ul>
  <li>abdenour.didi@student.vinci.be</li>
  <li>bryan.vanmoer@student.vinci.be</li>
  <li>vanhuy.pham@student.vinci.be</li>
</ul>
<br>© IPL-Corp 2021
</div>
</div>`;

const AboutUsPage = () => {
    let page = document.querySelector("#page");
    page.innerHTML = aboutUsPage;
}

export default AboutUsPage;