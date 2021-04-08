async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('#title').value;
  const artist = document.querySelector('#artist-name').value;
  const lp = document.querySelector('#album-title').value;
  const content = document.querySelector('#content').value;


  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      artist,
      lp,
      content,
      photo
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