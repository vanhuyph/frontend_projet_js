const ErrorPage = (err) => {
  let errorPage;
<<<<<<< HEAD
  if (!err) errorPage = `<p>Il y a eu une erreur.</p>`;
=======
  if (!err) errorPage = `<p>Oups, il semblerait que quelqu'un ait gaffé.</p>`;
>>>>>>> 04ed319a1d3bc1b38facf7ccfd5f61eb0de80672
  else if (!err.message) errorPage = `<p>${err}</p>`;
  else errorPage = `<p>${err.message}</p>`;
  let page = document.querySelector("#page");
  return (page.innerHTML = errorPage);
};

export default ErrorPage;