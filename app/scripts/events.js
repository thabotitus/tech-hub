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
        person = v.actor.display_login;
        event = vt.map_event(v);
        repo = v.repo.name;
        payload.push({
          person: person,
          event: event,
          repo: repo
        });
      });
      console.log('updated');
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
    }
  }
});

$(document).ready(function(){
  events.load_events();
  events.poll();
});












// Functions for fetching data from github

function fetch_data(callback_method, user, token, org, repo) {
  auth_data = user + ":" + token;
  jQuery.ajax
  ({
    type: "GET",
    url: "https://api.github.com/users/"+user+"/events/orgs/"+org,
    dataType: 'json',
    headers: {"Authorization": "Basic " + btoa(auth_data)},
    success: function (data){
      map_github_to_events_hash(callback_method, data);
    },
    error: function() {
      alert('error??');
    }
   });
}

function map_github_to_events_hash(callback_method, data) {
  function event_from(event_type, payload) {
    if(event_type == 'PushEvent') {
      return {type: 'push', description: 'Branch pushed'};
    } else if(event_type == 'CreateEvent') {
      return {type: 'create_branch', description: 'Branch created'};
    } else if(event_type == 'DeleteEvent') {
      return {type: 'delete_branch', description: 'Branch deleted'};
    } else if(event_type == 'PullRequestEvent') {
      return {type: 'pull_request', description: 'Pull Request '+ payload['action']};
    }

    return {type: 'generic', description: 'Event of type '+ event_type +' occured'};
  }
  function branch_from(payload) {
    ref = payload['ref'];
    if(ref == null && payload['pull_request'] != null && payload['pull_request']['head'] != null) {
      ref = payload['pull_request']['head']['ref'];
    }
    if(ref == null) {
      ref = '';
    }
    return ref.replace(/^refs\/heads\//, '');
  }
  event_hashes = $.map(data, function(event) {
    event_detail = event_from(event['type'], event['payload']);
    return {
      type: event_detail['type'],
      handle: event['actor']['display_login'],
      image_url: event['actor']['avatar_url'],
      repo: event['repo']['name'],
      branch: branch_from(event['payload']),
      date: event['created_at'],
      description: event_detail['description'] //'Branch pushed'
    };
  });
  callback_method(event_hashes);
}


function convert_events(events) {
  // maps events to Vue...
}

function do_my_thing() {
  fetch_from_github(convert_events);
}

function fetch_from_github(callback_method) {
  github_creds = github_details();
  fetch_data(callback_method,
             github_creds['username'],
             github_creds['token'],
             github_creds['org'],
             github_creds['repo']
            );

/*  result = [ { type: 'push',*/
             //handle: 'Billy Bob',
             //image_url: 'https://s-media-cache-ak0.pinimg.com/736x/3e/de/0b/3ede0bf72b5e51dc895714f1f6d9ee7d.jpg',
             //repo: 'prodigy',
             //branch: 'master',
             //date: '2017-03-22',
             //description: 'Some cool stuff'
           //},
           //{ type: 'create_branch',
             //handle: 'Billy Bob',
             //image_url: 'http://imakeityoumakeit.com/wp-content/uploads/2013/09/how-to-make-a-cat-bowtie-442x450.jpg',
             //repo: 'prodigy',
             //branch: 'master2',
             //date: '2017-04-22',
             //description: 'Some cool stuff'
           //},
  //];
  /*callback_method(result);*/
}
