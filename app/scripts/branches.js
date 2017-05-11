var branches = new Vue({
  el: '#branches',
  data: {
    payload: [],
    branchData: {

    }
  },
  methods: {
    payload = [];
    buildBranches: function (data, payload) {
      name = '',
      isStale = '',
      status = ''
      $.each(data, function (_, v) {
        payload.push({
          name: name,
          isStale: isStale,
          status: status
        });
      });
      return payload;
    }
  }
});