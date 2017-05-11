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
      vt = this;
      $.each(data, function(_,v){
        person = v.actor.display_login;
        event = vt.map_event(v);
        repo = v.repo.name;
        sentence = person + " " + event + " " + repo;
        payload.push({sentence: sentence});
      });
      return payload;
    },

    map_event: function(event){
      switch(event.type) {
          case "PushEvent":
              return 'pushed to';
              break;
          case "CreateEvent":
              return 'created on';
              break;
          default:
              return 'did something';
      }
    }
  }
})












// Functions for fetching data from github

// function fetch_data(callback_method, auth_data, org, repo) {
//   jQuery.ajax
//   ({
//     type: "GET",
//     url: "https://api.github.com/repos/"+org+"/"+repo+"/events",
//     dataType: 'json',
//     headers: {"Authorization": "Basic " + btoa(auth_data)},
//     success: function (data){
//       map_github_to_events_hash(callback_method, data);
//       return call_me_back(data);
//     },
//     error: function() {
//       alert('error??');
//     }
//    });
}

// function map_github_to_events_hash(callback_method, data) {
//   function event_from(event_type) {
//     if(event_type == 'PushEvent') {
//       return {type: 'push', description: 'Branch pushed'};
//     } else if(event_type == 'CreateEvent') {
//       return {type: 'create_branch', description: 'Branch created'};
//     } else if(event_type == 'DeleteEvent') {
//       return {type: 'delete_branch', description: 'Branch deleted'};
//     }
//     return {type: 'generic', description: 'Event of type '+ event_type +' occured'};
//   }
//   function branch_from(ref) {
//     return ref.replace(/^refs\/heads\//, '');
//   }
//   event_hashes = $.map(data, function(event) {
//     event_detail = event_from(event['type']);
//     return {
//       type: event_detail['type'],
//       handle: event['actor']['display_login'],
//       image_url: event['actor']['avatar_url'],
//       repo: event['repo']['name'],
//       branch: branch_from(event['payload']['ref']),
//       date: event['created_at'],
//       description: event_detail['description'] //'Branch pushed'
//     };
//   });
//   callback_method(event_hashes);
// }