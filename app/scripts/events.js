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
        url: "https://api.github.com/repos/"+ this.creds().org +"/"+ this.creds().repo +"/events",
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
        branch = vt.branch_from(v.payload.ref);
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
          default:
              return 'removed a branch on';
      }
    },

    poll: function (){
      var vm = this;
      setInterval(function(){
        vm.load_events();
      },5000);
    },

    branch_from: function(ref) {
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












// Functions for fetching data from github

function map_github_to_events_hash(callback_method, data) {
  function event_from(event_type) {
    if(event_type == 'PushEvent') {
      return {type: 'push', description: 'Branch pushed'};
    } else if(event_type == 'CreateEvent') {
      return {type: 'create_branch', description: 'Branch created'};
    } else if(event_type == 'DeleteEvent') {
      return {type: 'delete_branch', description: 'Branch deleted'};
    }
    return {type: 'generic', description: 'Event of type '+ event_type +' occured'};
  }
  function branch_from(ref) {
    return ref.replace(/^refs\/heads\//, '');
  }
  event_hashes = $.map(data, function(event) {
    event_detail = event_from(event['type']);
    return {
      type: event_detail['type'],
      handle: event['actor']['display_login'],
      image_url: event['actor']['avatar_url'],
      repo: event['repo']['name'],
      branch: branch_from(event['payload']['ref']),
      date: event['created_at'],
      description: event_detail['description'] //'Branch pushed'
    };
  });
  callback_method(event_hashes);
}