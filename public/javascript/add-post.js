async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('#title').value;
  const artist = document.querySelector('#artist-name').value;
  const lp = document.querySelector('#album-title').value;
  const content = document.querySelector('#content').value;



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
      content
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