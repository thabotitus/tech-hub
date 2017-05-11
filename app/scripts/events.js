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
      et = this;
      github.fetch("users/"+ github.creds().username +"/events/orgs/"+ github.creds().org,
               function (data) { et.payload = et.build_events(data, et.payload); }
              );
    },

    build_events: function( data, payload ) {
      payload = [];
      et = this;
      $.each(data, function(_,v){
        image_url = v.actor.avatar_url;
        person = v.actor.display_login;
        event = et.map_event(v);
        repo = v.repo.name;
        branch = et.branch_from(v.payload.ref, v.payload);
        time = et.formatTime(v.created_at);
        isGrant = v.actor.login === 'grantspeelman';
        newEvent = et.checkNewEvent(v.created_at);
        payload.push({
          person: person,
          event: event,
          branch: branch,
          repo: repo,
          image_url: image_url,
          time: time,
          isGrant: isGrant,
          newEvent: newEvent
        });
      });
      // return payload.slice(0, 8);
      return payload;
    },

    map_event: function(event){
      switch(event.type) {
          case "PushEvent":
              return 'pushed updates to';
              break;
          case "CreateEvent":
              return 'created branch ';
              break;
          case "DeleteEvent":
              return 'removed branch ';
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
      }, 30000);
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
      et = this;
      date = new Date(time);
      day = date.getDate();
      month = et.monthMapper(date.getMonth() + 1);
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
    },

    checkNewEvent: function(date){
      now = new Date();
      old = new Date(date);
      diff = now.getTime() - old.getTime();
      return diff < 300000;
    }
  }
});

$(document).ready(function(){
  events.load_events();
  events.poll();
});
