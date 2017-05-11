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
  assert.equal( event['image_url'], 'https://avatars.githubusercontent.com/u/155?', 'Image for handle' );
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
  assert.equal( event['image_url'], 'https://avatars.githubusercontent.com/u/155?', 'Image for handle' );
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

QUnit.test( "delete branch event mapping", function( assert ) {
  all_data = null;
  map_github_to_events_hash(callback_method, [generate_delete_branch_event()]);
  event = all_data[0];
  assert.equal( event['type'], 'delete_branch', 'Type of event' );
  assert.equal( event['handle'], 'grant', 'Handle of event' );
  assert.equal( event['image_url'], 'https://avatars.githubusercontent.com/u/989?', 'Image for handle' );
  assert.equal( event['repo'], 'org/repo', 'git repo for event' );
  assert.equal( event['branch'], 'feature/other_thing', 'git branch for event' );
  assert.equal( event['date'], '2017-05-11T07:29:18Z', 'date for event' );
  assert.equal( event['description'], 'Branch deleted', 'description for event' );
});

QUnit.test( "Pull Request event mapping", function( assert ) {
  all_data = null;
  map_github_to_events_hash(callback_method, [generate_pull_request_event()]);
  event = all_data[0];
  assert.equal( event['type'], 'pull_request', 'Type of event' );
  assert.equal( event['handle'], 'burn', 'Handle of event' );
  assert.equal( event['image_url'], 'https://avatars.githubusercontent.com/u/364?', 'Image for handle' );
  assert.equal( event['repo'], 'org/marketing-system', 'git repo for event' );
  assert.equal( event['branch'], 'basic-seeds', 'git branch for event' );
  assert.equal( event['date'], '2017-05-11T12:05:10Z', 'date for event' );
  assert.equal( event['description'], 'Pull Request closed', 'description for event' );
});

function generate_generic_event() {
  return {
    "type": "SomeOtherEvent",
    "actor": {
      "login": "timinator",
      "display_login": "timinator",
      "gravatar_id": "",
      "avatar_url": "https://avatars.githubusercontent.com/u/155?"
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
      "avatar_url": "https://avatars.githubusercontent.com/u/155?"
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
      "avatar_url": "https://avatars.githubusercontent.com/u/3367?"
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
      "avatar_url": "https://avatars.githubusercontent.com/u/3367?"
    }
  }
}

function generate_delete_branch_event() {
  return {
    "id": "5851043583",
    "type": "DeleteEvent",
    "actor": {
      "id": 98919,
      "login": "grant",
      "display_login": "grant",
      "gravatar_id": "",
      "url": "https://api.github.com/users/grant",
      "avatar_url": "https://avatars.githubusercontent.com/u/989?"
    },
    "repo": {
      "id": 2273570,
      "name": "org/repo",
      "url": "https://api.github.com/repos/org/repo"
    },
    "payload": {
      "ref": "feature/other_thing",
      "ref_type": "branch",
      "pusher_type": "user"
    },
    "public": false,
    "created_at": "2017-05-11T07:29:18Z",
    "org": {
      "id": 3367007,
      "login": "org",
      "gravatar_id": "",
      "url": "https://api.github.com/orgs/org",
      "avatar_url": "https://avatars.githubusercontent.com/u/3367?"
    }
  }
}

function generate_pull_request_event() {
  return {
    "type": "PullRequestEvent",
    "actor": {
      "id": 3646962,
      "login": "burn",
      "display_login": "burn",
      "gravatar_id": "",
      "url": "https://api.github.com/users/burn",
      "avatar_url": "https://avatars.githubusercontent.com/u/364?"
    },
    "repo": {
      "id": 90954581,
      "name": "org/marketing-system",
      "url": "https://api.github.com/repos/org/marketing-system"
    },
    "payload": {
      "action": "closed",
      "number": 2,
      "pull_request": {
        "id": 120089749,
        "number": 2,
        "state": "closed",
        "locked": false,
        "title": "add first seeds!",
        "user": {
          "login": "burn",
          "id": 3646962,
          "avatar_url": "https://avatars3.githubusercontent.com/u/364?v=3",
          "gravatar_id": "",
          "type": "User",
          "site_admin": false
        },
        "body": "Seed and fix the db auth things!",
        "created_at": "2017-05-11T12:04:39Z",
        "updated_at": "2017-05-11T12:05:10Z",
        "closed_at": "2017-05-11T12:05:10Z",
        "merged_at": "2017-05-11T12:05:10Z",
        "merge_commit_sha": "14075f2fa1185a",
        "assignee": null,
        "assignees": [
        ],
        "requested_reviewers": [
        ],
        "milestone": null,
        "head": {
          "label": "org:basic-seeds",
          "ref": "basic-seeds",
          "sha": "717002ddb39ff4432",
          "user": {
            "login": "org",
            "id": 3367007,
            "avatar_url": "https://avatars1.githubusercontent.com/u/336?v=3",
            "gravatar_id": "",
            "type": "Organization",
            "site_admin": false
          },
          "repo": {
            "id": 90954581,
            "name": "marketing-system",
            "full_name": "org/marketing-system",
            "owner": {
              "login": "org",
              "id": 3367007,
              "avatar_url": "https://avatars1.githubusercontent.com/u/336?v=3",
              "gravatar_id": "",
              "type": "Organization",
              "site_admin": false
            },
            "private": true,
            "html_url": "https://github.com/org/marketing-system",
            "description": null,
            "fork": false,
            "created_at": "2017-05-11T08:13:00Z",
            "updated_at": "2017-05-11T08:28:49Z",
            "pushed_at": "2017-05-11T12:05:09Z",
            "homepage": null,
            "size": 39,
            "stargazers_count": 0,
            "watchers_count": 0,
            "language": "Ruby",
            "has_issues": true,
            "has_projects": true,
            "has_downloads": true,
            "has_wiki": true,
            "has_pages": false,
            "forks_count": 0,
            "mirror_url": null,
            "open_issues_count": 0,
            "forks": 0,
            "open_issues": 0,
            "watchers": 0,
            "default_branch": "master"
          }
        },
        "base": {
          "label": "org:master",
          "ref": "master",
          "sha": "342ef7d9680",
          "user": {
            "login": "org",
            "id": 3367007,
            "avatar_url": "https://avatars1.githubusercontent.com/u/336?v=3",
            "gravatar_id": "",
            "type": "Organization",
            "site_admin": false
          },
          "repo": {
            "id": 90954581,
            "name": "marketing-system",
            "full_name": "org/marketing-system",
            "owner": {
              "login": "org",
              "id": 3367007,
              "avatar_url": "https://avatars1.githubusercontent.com/u/336?v=3",
              "gravatar_id": "",
              "type": "Organization",
              "site_admin": false
            },
            "private": true,
            "html_url": "https://github.com/org/marketing-system",
            "description": null,
            "fork": false,
            "created_at": "2017-05-11T08:13:00Z",
            "updated_at": "2017-05-11T08:28:49Z",
            "pushed_at": "2017-05-11T12:05:09Z",
            "size": 39,
            "stargazers_count": 0,
            "watchers_count": 0,
            "has_issues": true,
            "has_projects": true,
            "has_downloads": true,
            "has_wiki": true,
            "has_pages": false,
            "forks_count": 0,
            "mirror_url": null,
            "open_issues_count": 0,
            "forks": 0,
            "open_issues": 0,
            "watchers": 0,
            "default_branch": "master"
          }
        },
        "_links": {
          "self": {
            "href": "https://api.github.com/repos/org/marketing-system/pulls/2"
          },
        },
        "merged": true,
        "mergeable": null,
        "rebaseable": null,
        "mergeable_state": "unknown",
        "merged_by": {
          "login": "burntham",

        },
        "comments": 0,
        "review_comments": 0,
        "maintainer_can_modify": false,
        "commits": 1,
        "additions": 12,
        "deletions": 6,
        "changed_files": 2
      }
    },
    "public": false,
    "created_at": "2017-05-11T12:05:10Z",
    "org": {
      "id": 3367007,
      "login": "org",
      "gravatar_id": "",
      "url": "https://api.github.com/orgs/org",
      "avatar_url": "https://avatars.githubusercontent.com/u/336?"
    }
  }
}
