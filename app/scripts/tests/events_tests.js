// Create Branch
// Delete Branch
// All types
// multiple Generic

var all_data;
function callback_method(data) {
  all_data = data;
}

QUnit.test( "no data - sets to empty list", function( assert ) {
  all_data = null;
  map_github_to_events_hash(callback_method, []);
  assert.equal( all_data.length, 0, 'empty array set');
});

QUnit.test( "one event - sets one event in list", function( assert ) {
  all_data = null;
  map_github_to_events_hash(callback_method, [generate_push_event()]);
  assert.equal( all_data.length, 1, 'one event' );
});

QUnit.test( "push event mapping", function( assert ) {
  all_data = null;
  map_github_to_events_hash(callback_method, [generate_push_event()]);
  event = all_data[0];
  assert.equal( event['type'], 'push', 'Type of event' );
  assert.equal( event['handle'], 'timinator', 'Handle of event' );
  assert.equal( event['image_url'], 'https://avatars.githubusercontent.com/u/1553926?', 'Image for handle' );
  assert.equal( event['repo'], 'org/repo', 'git repo for event' );
  assert.equal( event['branch'], 'allocation', 'git branch for event' );
  assert.equal( event['date'], '2017-05-11T10:02:00Z', 'date for event' );
  assert.equal( event['description'], 'Branch pushed', 'description for event' );
});

QUnit.test( "generic event mapping", function( assert ) {
  all_data = null;
  map_github_to_events_hash(callback_method, [generate_generic_event()]);
  event = all_data[0];
  assert.equal( event['type'], 'generic', 'Type of event' );
  assert.equal( event['handle'], 'timinator', 'Handle of event' );
  assert.equal( event['image_url'], 'https://avatars.githubusercontent.com/u/1553926?', 'Image for handle' );
  assert.equal( event['repo'], 'org/repo', 'git repo for event' );
  assert.equal( event['branch'], 'allocation', 'git branch for event' );
  assert.equal( event['date'], '2017-05-11T10:02:00Z', 'date for event' );
  assert.equal( event['description'], 'Event of type SomeOtherEvent occured', 'description for event' );
});

QUnit.test( "create branch event mapping", function( assert ) {
  all_data = null;
  map_github_to_events_hash(callback_method, [generate_create_branch_event()]);
  event = all_data[0];
  assert.equal( event['type'], 'create_branch', 'Type of event' );
  assert.equal( event['handle'], 'grant', 'Handle of event' );
  assert.equal( event['image_url'], 'https://avatars.githubusercontent.com/u/155?', 'Image for handle' );
  assert.equal( event['repo'], 'org/repo', 'git repo for event' );
  assert.equal( event['branch'], 'fix/something', 'git branch for event' );
  assert.equal( event['date'], '2017-05-11T06:48:13Z', 'date for event' );
  assert.equal( event['description'], 'Branch created', 'description for event' );
});

function generate_generic_event() {
  return {
    "type": "SomeOtherEvent",
    "actor": {
      "login": "timinator",
      "display_login": "timinator",
      "gravatar_id": "",
      "avatar_url": "https://avatars.githubusercontent.com/u/1553926?"
    },
    "repo": {
      "name": "org/repo",
      "url": "https://api.github.com/repos/org/repo"
    },
    "payload": {
      "ref": "refs/heads/allocation",
    },
    "created_at": "2017-05-11T10:02:00Z",
  }
}

function generate_push_event() {
  return {
    "id": "5851989347",
    "type": "PushEvent",
    "actor": {
      "id": 1553926,
      "login": "timinator",
      "display_login": "timinator",
      "gravatar_id": "",
      "url": "https://api.github.com/users/timinator",
      "avatar_url": "https://avatars.githubusercontent.com/u/1553926?"
    },
    "repo": {
      "id": 2273570,
      "name": "org/repo",
      "url": "https://api.github.com/repos/org/repo"
    },
    "payload": {
      "push_id": 1732958111,
      "size": 2,
      "distinct_size": 2,
      "ref": "refs/heads/allocation",
      "head": "98a5f16cb2c4377f932d2c04fdd1b55b55d0ccaa",
      "before": "8e903d9925fc876ce20dc36d540b3e5780ef6f0b",
      "commits": [
        {
          "sha": "b6c6c38cff68db0eba04b060dbb7e5f30e4b979e",
          "author": {
            "email": "tim@xxx.me",
            "name": "Tim"
          },
          "message": "Added a few filter conditions",
          "distinct": true,
          "url": "https://api.github.com/repos/org/repo/commits/b6c6c38cff68db0eba04b060dbb7e5f30e4b979e"
        },
        {
          "sha": "98a5f16cb2c4377f932d2c04fdd1b55b55d0ccaa",
          "author": {
            "email": "tim@xxx.me",
            "name": "Tim"
          },
          "message": "MOAR refactors (filtering now working) ಠ_ಠ",
          "distinct": true,
          "url": "https://api.github.com/repos/org/repo/commits/98a5f16cb2c4377f932d2c04fdd1b55b55d0ccaa"
        }
      ]
    },
    "public": false,
    "created_at": "2017-05-11T10:02:00Z",
    "org": {
      "id": 3367007,
      "login": "org",
      "gravatar_id": "",
      "url": "https://api.github.com/orgs/org",
      "avatar_url": "https://avatars.githubusercontent.com/u/3367007?"
    }
  }
}

function generate_create_branch_event() {
  return {
    "id": "5850849846",
    "type": "CreateEvent",
    "actor": {
      "id": 98919,
      "login": "grant",
      "display_login": "grant",
      "gravatar_id": "",
      "url": "https://api.github.com/users/grant",
      "avatar_url": "https://avatars.githubusercontent.com/u/155?"
    },
    "repo": {
      "id": 2273570,
      "name": "org/repo",
      "url": "https://api.github.com/repos/org/repo"
    },
    "payload": {
      "ref": "fix/something",
      "ref_type": "branch",
      "master_branch": "master",
      "description": "My Web App ",
      "pusher_type": "user"
    },
    "public": false,
    "created_at": "2017-05-11T06:48:13Z",
    "org": {
      "id": 3367007,
      "login": "org",
      "gravatar_id": "",
      "url": "https://api.github.com/orgs/org",
      "avatar_url": "https://avatars.githubusercontent.com/u/3367007?"
    }
  }
}
