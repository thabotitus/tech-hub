var events = new Vue({
  el: '#events',
  data: {
    events: 'anything',
    payload: []
  },
  methods: {
    load_events: function(){
      this.make_gh_call();
    },

    make_gh_call: function() {
      vt = this;
      auth_data = this.creds().username + ":" + this.creds().token;
      jQuery.ajax
      ({
        type: "GET",
        url: "https://api.github.com/users/"+ this.creds().username +"/events/orgs/"+ this.creds().org,
        dataType: 'json',
        headers: {"Authorization": "Basic " + btoa(auth_data)},
        success: function (data){
          vt.payload = vt.build_events(data, vt.payload);
        },
        error: function() {
          alert('error');
        }
       });
    },

    creds: function() {
      return github_details();
    },

    build_events: function( data, payload ) {
      payload = [];
      vt = this;
      $.each(data, function(_,v){
        image_url = v.actor.avatar_url;
        person = v.actor.display_login;
        event = vt.map_event(v);
        repo = v.repo.name;
        branch = vt.branch_from(v.payload.ref, v.payload);
        time = vt.formatTime(v.created_at);
        payload.push({
          person: person,
          event: event,
          branch: branch,
          repo: repo,
          image_url: image_url,
          time: time
        });
      });
      return payload;
    },

    map_event: function(event){
      switch(event.type) {
          case "PushEvent":
              return 'pushed updates to';
              break;
          case "CreateEvent":
              return 'created a branch on';
              break;
          case "DeleteEvent":
              return 'removed a branch on';
              break;
          case "PullRequestEvent":
              return event.payload.action + ' a pull request to merge';
          default:
              return 'did something on';
      }
    },

    poll: function (){
      var vm = this;
      setInterval(function(){
        vm.load_events();
      },5000);
    },

    branch_from: function(ref, payload) {
      ref = payload['ref'];
      if(ref == null && payload['pull_request'] != null && payload['pull_request']['head'] != null) {
        ref = payload['pull_request']['head']['ref'];
      }
      if(ref == null) {
        ref = '';
      }
      return ref.replace(/^refs\/heads\//, '');
    },

    formatTime: function(time) {
      vt = this;
      date = new Date(time);
      day = date.getDate();
      month = vt.monthMapper(date.getMonth() + 1);
      year = date.getFullYear();
      hour = date.getUTCHours() + 2;
      minutes = date.getUTCMinutes();

      return day + " " + month + ", " + year + ' @ ' + hour + ":" + minutes;
    },

    monthMapper: function(month){
      switch(month) {
          case 1:
            return 'Jan';
            break;
          case 2:
            return 'Feb';
            break;
          case 3:
            return 'Mar';
            break;
          case 4:
            return 'Apr';
            break;
          case 5:
            return 'May';
            break;
          case 6:
            return 'June';
            break;
          default:
            return 'Second Half of the Year';
            break;
      }
    }
  }
});

$(document).ready(function(){
  events.load_events();
  events.poll();
});
