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

function fetch_data(auth_data) {
  jQuery.ajax
  ({
    type: "GET",
    url: "https://api.github.com/repos/x/y/events",
    dataType: 'json',
    headers: {"Authorization": "Basic " + btoa(auth_data)},
    success: function (data){
      alert(data[0]);
      callback_method(the_list);
    },
    error: function() {
      alert('error??');
    }
   });
}

function convert_events(events) {
  // maps events to Vue...
}

function do_my_thing() {
  fetch_from_github(convert_events, 'pv', 'xxxx');
}

function fetch_from_github(callback_method, user, token) {
 // data = fetch_data(call_backmethod, user + ":" + token);
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
