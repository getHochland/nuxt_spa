<template>
  <div>
    <Header :h1=post.h1 />
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <nav aria-label="breadcrumb" class="mt-4">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><nuxt-link to="/">Главная</nuxt-link></li>
              <li class="breadcrumb-item active" aria-current="page">{{ post.h1 }}</li>
            </ol>
          </nav>
          <img class="img-fluid rounded " :src="post.image" alt="">
          <hr>
          <p v-html="post.content"></p>
          <div class="d-flex justify-content-end">
            <span v-for="tag in post.tags">
                  <nuxt-link :to="`/tags/${tag}`" class="mr-1 badge badge-info">#{{ tag }}</nuxt-link>
            </span>
          </div>
          <hr>
          <div class="d-flex">
            <div class="mr-auto p-2 lead">Автор: {{ post.author }}</div>
            <div class="p-2">Опубликовано: {{ post.created_at }}</div>
          </div>
          <hr>
          <Comments :post="post"/>
        </div>
        <Aside :tags=tags :aside=aside />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import post_detail from "@/layouts/post_detail";
import Header from "~/components/Header";
import Aside from "~/components/Aside";
import Comments from '~/components/Comments';
export default {
  components: {
    Aside,
    Header,
    Comments,
  },
  layout: "post_detail",
  async asyncData({params}) {
    const post = await axios.get(`https://spa--blog.herokuapp.com/api/posts/${params.slug}`);
    const tags = await axios.get(`https://spa--blog.herokuapp.com/api/tags/`);
    const aside = await axios.get(`https://spa--blog.herokuapp.com/api/aside/`);
    return {
      post: post.data,
      tags: tags.data,
      aside: aside.data,
    }
  },

  created() {
    this.$store.dispatch('store/getComments', this.$route.params.slug);
  },

  methods: {
    getComments (count = 1, time = '', start) {
      axios.get(`https://spa--blog.herokuapp.com/api/comments/${this.$route.params.slug}`)
        .then((res) => {
          this.$store.commit('store/SET_COMMENTS', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    stopTimer () {
      if (this.interval) {
        window.clearInterval(this.interval)
      }
    },
    startTimer () {
      this.stopTimer()
      this.interval = window.setInterval(() => {
        this.getComments()
      }, 6000)
    }
  },
  mounted () {
    this.startTimer()
  },
  beforeDestroy () {
    this.stopTimer()
  }
}
</script>

<style scoped>

</style>
