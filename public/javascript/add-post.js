async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('#title').value;
  const artist = document.querySelector('#artist-name').value;
  const lp = document.querySelector('#album-title').value;
  const content = document.querySelector('#content').value;
  // const photo = "./img/ComingSoon.jpg";


  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('input[name="content"]').value;
  const artist = document.querySelector('input[name="artist"]').value;
  const lp = document.querySelector('input[name="lp"]').value;


  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      artist,
      lp,
      content,
      photo
If running into issues, can use the direct link https://zoom.us/j/8323244859?pwd=aTFWb05EQTFIN3hmczRta0FxaFZwdz09 pinned in #general in the interim
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.login-form').addEventListener('submit', newFormHandler);