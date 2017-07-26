'use strict';
var app = app || {};

(function(module) {
  const repos = {};
  repos.all = [];

  repos.requestRepos = function(callback) {
    $.ajax({
      url: 'https://api.github.com/user',
      method: 'GET',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })
    .then(data => {
      return $.get(data.repos_url);
    })
    .then(data => {
      callback(null, data);
    })
    .catch(err => {
      callback(err);
      console.error('Failed to load repos: ', err);
    });

    // DONE: How would you like to fetch your repos? Don't forget to call the callback.
    //       Remember that the callback function we'll want to call relies on repos.all
    //       being an array with a bunch of repo objects in it, so you'll need to
    //       populate it with the response from Github before you call the callback.

  };

  repos.requestRepos((err, data) => {
    if (err) console.log(err);
    repos.all = data;
    console.log('repos: ', repos.all);
  });

  // REVIEW: Model method that filters the full collection for repos with a particular attribute.
  // You could use this to filter all repos that have a non-zero `forks_count`, `stargazers_count`, or `watchers_count`.
  repos.with = attr => repos.all.filter(repo => repo[attr]);
  // let reposWithProjects = repos.with('has_projects');

  module.repos = repos;
})(app);
