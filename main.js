const form = document.querySelector('.search-box');
const formInput = document.querySelector('#username');
const formIcon  = document.querySelector('.search-icon');
const content  = document.querySelector('.content');
const theme = document.querySelector('.theme');

theme.addEventListener('click', () => {
    theme.classList.toggle('active');
    if(theme.classList.contains('active')){
      
      theme.innerHTML = `<span>dark</span>
      <img src="./dark_mode.svg" alt="Light Mode">`;
    }
    else{
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
         <h2>${data.name}</h2>
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
                 <img src="./location.svg" alt="Location Icon">
                 <span>${data.location == null ? 'Not Available' : data.location}</span>
             </div>
             
             <div class="twitter">
             <img src="./twitter.svg" width="30px" height="30px" alt="Twitter Icon">
             <a href="#">${data.twitter_username ==  null ? 'Not Available' : data.twitter_username}</a>
             </div>
 
             <div class="website">
                 <a href=${data.blog ==  null ? '#' : data.blog} target="_blank">
                 <img src="./link.svg" alt="Website Icon">
                 <span class="link-text">${data.blog ==  '' ? 'Not Available' : data.blog}</span> 
                 </a>
             </div>
 
             <div class="organization">
                 <img src="./github_org.svg" alt="Organization Svg">
                 <span class="company-name">${data.company == null ? 'Not Available' : data.company}</span>
             </div>
           </div>
         </div>`;   
      }
    });
});
