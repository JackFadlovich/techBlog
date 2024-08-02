// Function to handle form submissions
document.addEventListener('DOMContentLoaded', () => {
    // Handle new blog post form submission
    const newPostForm = document.querySelector('#new-post-form');
    if (newPostForm) {
      newPostForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const title = document.querySelector('#post-title').value;
        const content = document.querySelector('#post-content').value;
  
        try {
          const response = await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content }),
          });
          if (response.ok) {
            window.location.href = '/dashboard'; // Redirect to dashboard after successful post creation
          } else {
            console.error('Failed to create post.');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      });
    }
  
    // Handle comment form submission
    const commentForms = document.querySelectorAll('.comment-form');
    commentForms.forEach((form) => {
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const postId = form.dataset.postId;
        const comment = form.querySelector('.comment-input').value;
  
        try {
          const response = await fetch(`/api/posts/${postId}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ comment }),
          });
          if (response.ok) {
            window.location.reload(); // Reload page to show new comment
          } else {
            console.error('Failed to submit comment.');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      });
    });
  });
  