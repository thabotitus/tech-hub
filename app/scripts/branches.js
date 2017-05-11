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
      auth_data = this.creds().username + ":" + this.creds().token;
      jQuery.ajax
      ({
        type: "GET",
        url: "https://api.github.com/repos/" + this.creds().org + "/"+ this.creds().repo +"/branches",
        dataType: 'json',
        headers: {"Authorization": "Basic " + btoa(auth_data)},
        success: function (data){
          vt.payload = vt.buildBranches(data, vt.payload);
        },
        error: function() {
          alert('error');
        }
       });
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
      auth_data = this.creds().username + ":" + this.creds().token;
      jQuery.ajax
      ({
        type: "GET",
        url: "https://api.github.com/repos/" + this.creds().org + "/"+ this.creds().repo +"/branches/" + branch.name,
        dataType: 'json',
        headers: {"Authorization": "Basic " + btoa(auth_data)},
        success: function (data){
          vt.updateStale(data, branch);
          vt.fetch_gh_status(data, branch);
        },
        error: function() {
          alert('error');
        }
       });
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
      auth_data = this.creds().username + ":" + this.creds().token;
      jQuery.ajax
      ({
        type: "GET",
        url: url + "/statuses",
        dataType: 'json',
        headers: {"Authorization": "Basic " + btoa(auth_data)},
        success: function (data){
          vt.updateStatus(data, branch);
        },
        error: function() {
          alert('error');
        }
       });
    },

    updateStatus: function(data, branch) {
      if(data.length > 0) {
        branch.status = data[0].state;
      }
    },


    creds: function() {
      return github_details();
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
