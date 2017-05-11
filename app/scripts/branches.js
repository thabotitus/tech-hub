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

    creds: function() {
      return github_details();
    },

    buildBranches: function (data, payload) {
      payload = [];
      $.each(data, function (_, v) {
        name = v.name;
        isStale = '',
        status = ''
        payload.push({
          name: name,
          isStale: isStale,
          status: status
        });
      });
      return payload;
    }
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
