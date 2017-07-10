//Keller Han project2
var header, tweetList, followerList, followingList, twitterLogo,
  switchUserInput, switchButton, followButton, tweetButton, followInput, tweetText;

window.addEventListener('load', function() {
  header = document.querySelector('#current-user-header');
  tweetList = document.querySelector('#tweet-list');
  followerList = document.querySelector('#follower-list');
  followingList = document.querySelector('#following-list');
  switchUserInput = document.querySelector('input[type=text]#switch-user-input');
  switchButton = document.querySelector('button#switch-user-button');
  followButton = document.querySelector('button#follow-button');
  followInput = document.querySelector('input[type=text]#follow-input');
  tweetButton = document.querySelector('button#tweet-button');
  tweetText = document.querySelector('textarea#tweet-input');
  twitterLogo = document.querySelector('img#twitter-logo');
  tweetButton.addEventListener('click', newTweet);
  followButton.addEventListener('click', emptyTextFollow);
  followButton.addEventListener('click', followUser);
  switchButton.addEventListener('click', emptyTextSwitch);
  switchButton.addEventListener('click', switchUser);
  twitterLogo.addEventListener('click', reloadPage);
});

function reloadPage() {
  location.reload();
}

function emptyTextSwitch() {
  var switchUserValue = switchUserInput.value;
  if (switchUserValue === '')
  {
    alert('Please enter a valid name');
  }
}

function emptyTextFollow() {
  var followValue = followInput.value;
  if (followValue === '')
  {
    alert('Please enter a valid name');
  }
}

function switchUser() {
  var newUser = switchUserInput.value;
  signup(newUser);
  header.innerHTML = newUser;
  switchUserInput.value = '';
}

function switchUserDefined(user) {
  var newUser = user;
  signup(newUser);
  header.innerHTML = newUser;
  switchUserInput.value = '';
}

function newTweet()
{
  var createdTweetList = createTweetList(header.innerHTML, tweetText.value);
  tweetList.prepend(createdTweetList);
  tweetText.value = '';
}
function createTweetList(username, content) {
  var createList = document.createElement('li');
  var nameParagraph = document.createElement('p');
  var contentParagraph = document.createElement('p');
  createList.className = 'list-group-item tweet';
  nameParagraph.className = 'tweet-username';
  contentParagraph.className ='tweet-content';
  nameParagraph.innerHTML = username;
  contentParagraph.innerHTML = content;
  createList.appendChild(nameParagraph);
  createList.appendChild(contentParagraph);
  return createList;
}

function followUser() {
  var currentUser = header.innerHTML;
  var toFollow = followInput.value;
  var theFollower = currentUser;
  var addFollowing = newFollowingList(toFollow);
  var addFollowers = newFollowerList(theFollower);
  follow(currentUser, toFollow);
  followingList.appendChild(addFollowing);
  followerList.appendChild(addFollowers);
  followInput.value = '';
}

function newFollowingList(following) {
  var followingList = document.createElement('li');
  var newFollowing = document.createElement('a');
  newFollowing.href = '#';
  newFollowing.innerHTML = following;
  newFollowing.addEventListener('click', function() {
    switchUserDefined(newFollowing.innerText);
  })
  followingList.append(newFollowing);
  return followingList;
}

function newFollowerList(follower) {
  var followerList = document.createElement('li');
  var newFollower = document.createElement('a');
  newFollower.href = '#';
  newFollower.innerHTML = follower;
  newFollower.addEventListener('click', function() {
    switchUserDefined(newFollower.innerText);
  })
  followerList.append(newFollower);
  return followerList;
}

var users = {};

function isValidString(user) {
  return typeof user === 'string' && user !== '';
}

function isSignedUp(user) {
  return users.hasOwnProperty(user);
}

function signup(user) {
  if(!isValidString(user) || isSignedUp(user)) {
    return false;
  }
  users[user] = {
    timeline: [],
    followers: [],
    following: [],
  };
  return true;
}

function follow(follower, user) {
  if(!isValidString(follower) || !isSignedUp(follower)) {
    return false;
  }
  if(!isValidString(user) || !isSignedUp(user)) {
    return false;
  }
  if(follower === user) {
    return false;
  }
  if(users[follower].following.indexOf(user) !==  -1) {
    return false;
  }
  users[follower].following.push(user);
  users[user].followers.push(follower);
  return true;
}
