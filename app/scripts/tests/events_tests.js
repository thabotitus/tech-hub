// nothing
// one Generic
// multiple Generic
// Push
// Create Branch
// Delete Branch
// All types

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
  map_github_to_events_hash(callback_method, [event]);
  assert.equal( all_data.length, 1, 'one event' );
});

QUnit.test( "push event mapping", function( assert ) {
  all_data = null;
  map_github_to_events_hash(callback_method, [event]);
  event = all_data[0];
  assert.equal( event['type'], 'push', 'Type of event' );
});

function event() {
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
