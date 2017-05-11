var events = new Vue({
  el: '#events',
  data: {
    events: 'this.foo()'
  },
  methods: {
    foo: function(){
      return fetch_from_github();
    }
  }
})












// Functions for fetching data from github

function fetch_data(callback_method, auth_data, org, repo) {
  jQuery.ajax
  ({
    type: "GET",
    url: "https://api.github.com/repos/"+org+"/"+repo+"/events",
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
  event_hashes = $.map(data, function(event) {
    return {
      type: 'push'
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
  call_backmethod = function() { alert('calling home'); }
  fetch_data(call_backmethod,
             github_creds['username'] + ":" + github_creds['token'],
             github_creds['org'],
             github_creds['repo']
            );

  result = [ { type: 'push',
             handle: 'Billy Bob',
             image_url: 'https://s-media-cache-ak0.pinimg.com/736x/3e/de/0b/3ede0bf72b5e51dc895714f1f6d9ee7d.jpg',
             repo: 'prodigy',
             branch: 'master',
             date: '2017-03-22',
             description: 'Some cool stuff'
           },
           { type: 'create_branch',
             handle: 'Billy Bob',
             image_url: 'http://imakeityoumakeit.com/wp-content/uploads/2013/09/how-to-make-a-cat-bowtie-442x450.jpg',
             repo: 'prodigy',
             branch: 'master2',
             date: '2017-04-22',
             description: 'Some cool stuff'
           },
  ];
  callback_method(result);
}
