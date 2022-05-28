import axios from "axios";

export const state = () => ({
    comments: []
});


export const actions = {
    async getComments({commit}, slug) {
      let response
      try {
        response = await axios.get(`https://spa--blog.herokuapp.com/api/comments/${slug}`)
      } catch (ex) {
        console.log(ex)
      }
      // Handle success
      const data = response.data
      commit('SET_COMMENTS', data)
      console.log(data);
    },
};


export const mutations = {
  SET_COMMENTS(state, payload) {
      state.comments = payload;
    }
};
