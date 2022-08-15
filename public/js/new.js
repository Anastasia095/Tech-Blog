const newPostHandler = async (event) => {
    event.preventDefault();
  
  const title = document.querySelector('#titlepost-name-input').value.trim();
  const postContent = document.querySelector('#post-input').value.trim();
 
  if (title && postContent) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, postContent }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
        (console.log("RESPONSE OK"))
      document.location.replace('/');
    } else {
      alert('Failed to create post');
    }
  }
};

document
  .querySelector('#post-form')
  .addEventListener('submit', newPostHandler);