var github = {
  creds: function() {
    return github_details();
  },

  fetch: function(url, success_callback) {
    auth_data = this.creds().username + ":" + this.creds().token;
    url = url.replace(/^https:\/\/api\.github\.com\//, '');

    jQuery.ajax
    ({
      type: "GET",
      url: "https://api.github.com/" + url,
      dataType: 'json',
      headers: {"Authorization": "Basic " + btoa(auth_data)},
      success: function (data){
        success_callback(data);
      },
      error: function(data) {
        console.log('error in calling github');
        console.log(data);
      }
    });
  }
}
