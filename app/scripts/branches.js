var branches = new Vue({
  el: '#branches',
  data: {
    payload: [],
    branchData: {

    }
  },
  methods: {
    payload = [];

    make_gh_call: function() {
      vt = this;
      auth_data = this.creds().username + ":" + this.creds().token;
      jQuery.ajax
      ({
        type: "GET",
        url: "https://api.github.com/repos/" + this.creds().org + "/"+ this.creds().repo +"/branches"
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
  }
});
