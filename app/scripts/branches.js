var branches = new Vue({
  el: '#branches',
  data: {
    payload: [],
    count: 0
  },
  methods: {
    load_branches: function(){
      this.make_gh_call();
    },

    make_gh_call: function() {
      vt = this;
      github.fetch("repos/" + github.creds().org + "/"+ github.creds().repo +"/branches",
                   function (data) { vt.payload = vt.buildBranches(data, vt.payload); }
                  );
    },

    buildBranches: function (data, payload) {
      vt = this;
      payload = [];
      $.each(data, function (_, v) {
        name = v.name;
        isStale = '';
        isOld = '';
        status = 'fetching';
        branch = { name: name,
                   isStale: isStale,
                   isOld: isOld,
                   status: status
                 };
        payload.push(branch);
        vt.fetch_gh_age(branch);
      });
      return payload;
    },

    fetch_gh_age: function(branch) {
      vt = this;
      github.fetch("repos/" + github.creds().org + "/"+ github.creds().repo +"/branches/" + branch.name,
                   function (data) {
                     vt.updateStale(data, branch);
                     vt.fetch_gh_status(data, branch);
                   }
                  );
    },

    updateStale: function(data, branch) {
      lastCommit = data.commit.commit.committer.date;
      lastCommitDate = new Date(lastCommit);
      today = new Date();
      daysOld = (today - lastCommitDate) / 1000 / 60 / 60 / 24;
      branch.isStale = daysOld > 14;
    },

    fetch_gh_status: function(data, branch) {
      vt = this;
      url = data.commit.url;
      github.fetch(url + "/statuses",
                   function (data) {
                     vt.updateStatus(data, branch);
                     vt.fetch_gh_diff_commits(branch);
                   }
                  );
    },

    updateStatus: function(data, branch) {
      if(data.length > 0) {
        branch.status = data[0].state;
      }
    },

    fetch_gh_diff_commits: function(branch) {
      vt = this;
      github.fetch("repos/" + github.creds().org + "/"+ github.creds().repo +"/compare/master..." + branch.name,
                   function (data) {
                     vt.updateIsOld(data, branch);
                   }
                  );
    },

    updateIsOld: function(data, branch) {
      if(data.commits.length == 0) {
        branch.isOld = false;
      } else {
        lastCommit = data.commits[0].commit.committer.date;
        lastCommitDate = new Date(lastCommit);
        today = new Date();
        daysOld = (today - lastCommitDate) / 1000 / 60 / 60 / 24;
        branch.isOld = daysOld > 14;
      }
    },
  },
  watch: {
    payload: function() {
      this.count = this.payload.length;
    }
  }
});

$(document).ready(function () {
  setTimeout(function(){
    branches.load_branches();
  },2000);
});
