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

function fetch_from_github() {
  return [ { type: 'push',
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
}
