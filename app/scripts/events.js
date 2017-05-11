var events = new Vue({
  el: '#events',
  data: {
    message: 'This is a message'
  },
  methods: {
    foo: function(){
      return 'I am a function';
    }
  }
})

function fetch_from_github() {
  return [ { type: 'push',
             handle: 'Billy Bob',
             image_url: 'http://foo',
             repo: 'prodigy',
             branch: 'master',
             date: '2017-03-22',
             description: 'Some cool stuff'
           },
           { type: 'create_branch',
             handle: 'Billy Bob',
             image_url: 'http://foo',
             repo: 'prodigy',
             branch: 'master2',
             date: '2017-04-22',
             description: 'Some cool stuff'
           },
  ];
}
