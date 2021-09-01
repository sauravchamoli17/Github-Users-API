const form = document.querySelector('.search-box');
const formInput = document.querySelector('#username');
const formIcon  = document.querySelector('.search-icon');
const content  = document.querySelector('.content');
const theme = document.querySelector('.theme');

theme.addEventListener('click', () => {
    theme.classList.toggle('active');
    if(theme.classList.contains('active')){ 
      document.body.classList.add('light-theme');
      theme.innerHTML = `<span>dark</span>
      <img src="./dark_mode.svg" alt="Light Mode">`;
    }
    else{
      document.body.classList.remove('light-theme');
        theme.innerHTML =  `<span>light</span>
        <img src="./sunny_white.svg" alt="Light Mode">`;
    }
});

formIcon.addEventListener('click', () => {
    formInput.select();
});

form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const url = `https://api.github.com/users/${formInput.value}`;

    if(formInput.value === ''){
       content.innerHTML = "<h2 class='invalid'> Please enter a username! </h2>";
    }

    fetch(url).then(blob => blob.json())
    .then(data => {
      if(data.message == 'Not Found'){
        content.innerHTML = "<h2 class='invalid'> No user found! </h2>";
      }
      else{
        content.innerHTML = `
        <div class="profile-pic">
          <img src=${data.avatar_url} id="profile-pic" alt="Profile Pic">
         </div>
 
         <div class="user-data">
         <div class="basic-information">
         <h2>${data.name == null ? 'Not Available' : data.name}</h2>
         <p>Joined ${new Date(data.created_at).toDateString()}</p>
         </div>
 
         <p class="login">
         <a href="https://www.github.com">@${data.login}</a>
         </p>
         <div class="bio">
             <p>${data.bio == null ? 'This profile has no bio' : data.bio}</p>
         </div>
 
         <div class="user-stats">
             <div class="repos">
             <span>repos</span>
             <h2>${data.public_repos}</h2>
             </div>
             <div class="followers">
             <span>followers</span>
             <h2>${data.followers}</h2>
             </div>
             <div class="following">
             <span>following</span>
             <h2>${data.following}</h2>
             </div>
         </div>
 
         <div class="user-links">
             <div class="location">
             <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 24 24" width="30px" fill="#FFFFFF"><path id="location" d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"/><circle cx="12" cy="9" r="2.5"/></svg>                 
             <span>${data.location == null ? 'Not Available' : data.location}</span>
             </div>
             
             <div class="twitter">
             <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 273.5 222.3" role="img" aria-labelledby="p9pnikqgomgvfhq23o7cobxvq06qsxl" ><title id="p9pnikqgomgvfhq23o7cobxvq06qsxl">Twitter</title><path id="twitter" d="M273.5 26.3a109.77 109.77 0 0 1-32.2 8.8 56.07 56.07 0 0 0 24.7-31 113.39 113.39 0 0 1-35.7 13.6 56.1 56.1 0 0 0-97 38.4 54 54 0 0 0 1.5 12.8A159.68 159.68 0 0 1 19.1 10.3a56.12 56.12 0 0 0 17.4 74.9 56.06 56.06 0 0 1-25.4-7v.7a56.11 56.11 0 0 0 45 55 55.65 55.65 0 0 1-14.8 2 62.39 62.39 0 0 1-10.6-1 56.24 56.24 0 0 0 52.4 39 112.87 112.87 0 0 1-69.7 24 119 119 0 0 1-13.4-.8 158.83 158.83 0 0 0 86 25.2c103.2 0 159.6-85.5 159.6-159.6 0-2.4-.1-4.9-.2-7.3a114.25 114.25 0 0 0 28.1-29.1" fill="#fff"></path></svg>
             <a href="#">${data.twitter_username ==  null ? 'Not Available' : data.twitter_username}</a>
             </div>
 
             <div class="website">
                 <a href=${data.blog ==  null ? '#' : data.blog} target="_blank">
                 <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink" aria-hidden="true" height="30px" width="30px" data-view-component="true" fill="#fff"><path id="website" fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"/></svg>
                 <span class="link-text">${data.blog ==  '' ? 'Not Available' : data.blog}</span> 
                 </a>
             </div>
 
             <div class="organization">
                 <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink" fill="#FFF" width="30px" height="30px" aria-hidden="true"><path id="org" fill-rule="evenodd" d="M1.5 14.25c0 .138.112.25.25.25H4v-1.25a.75.75 0 01.75-.75h2.5a.75.75 0 01.75.75v1.25h2.25a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25v12.5zM1.75 16A1.75 1.75 0 010 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 00.25-.25V8.285a.25.25 0 00-.111-.208l-1.055-.703a.75.75 0 11.832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0114.25 16h-3.5a.75.75 0 01-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 01-.75-.75V14h-1v1.25a.75.75 0 01-.75.75h-3zM3 3.75A.75.75 0 013.75 3h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 3.75zM3.75 6a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM3 9.75A.75.75 0 013.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 9.75zM7.75 9a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM7 6.75A.75.75 0 017.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 017 6.75zM7.75 3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z"/></svg>
                 <span class="company-name">${data.company == null ? 'Not Available' : data.company}</span>
             </div>
           </div>
         </div>`;   
      }
    });
});
