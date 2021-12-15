const ErrorPage = (err) => {
  let errorPage;
  if (!err) errorPage = `<p>Oups, il semblerait que quelqu'un ait gaffé.</p>`;
  else if (!err.message) errorPage = `<p>${err}</p>`;
  else errorPage = `<p>${err.message}</p>`;
  let page = document.querySelector("#page");
  return (page.innerHTML = errorPage);
};

export default ErrorPage;