<script>
import axios from 'axios'
export default {
  data() {
    return {
      results: [],
      blog: {
        id: '',
        title: '',
        body: ''
      }
    }
  },
  created() {
    this.blogLoad()
  },
  methods: {
    blogLoad() {
      const res = "http://localhost:8000/api/posts/"
      axios.get(res)
        .then((data) => {
          console.log(data)
          this.results = data.data
        })
    },
    save() {
      if (this.blog.id == '') {
        this.saveData()
      } else {
        this.updateData()
      }
    },
    saveData() {
      axios.post("http://localhost:8000/api/posts/", this.blog)
        .then((data) => {
          alert("saveeeddd")
          this.blog.title = '',
            this.blog.body = ''
          this.blogLoad()
        })
    },
    edit(result) {
      this.blog = result
    },
    updateData() {
      const res = "http://localhost:8000/api/posts/" + this.blog.id
      axios.put(res, this.blog)
        .then((data) => {
          alert("Updated!!!")
          this.blog.title = '',
            this.blog.body = ''
          this.blogLoad()
        })
    },
    remove(result) {
      const res = `http://localhost:8000/api/posts/${result.id}`
      axios.delete(res)
      alert("Deleteddd!!")
      this.blogLoad()
    }
  }
}


</script>

<template>
  <div class="container">
    <h1>TodoList Adnan</h1>
    <form @submit.prevent="save">
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Title</label>
        <input v-model="blog.title" type="text" class="form-control" id="exampleFormControlInput1"
          placeholder="Masukkan title">
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">Body</label>
        <textarea v-model="blog.body" class="form-control" id="exampleFormControlTextarea1" rows="3"
          placeholder="Masukkan body"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Save</button>
    </form>

    <table class="table table-dark table-striped mt-3">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Title</th>
          <th scope="col">Body</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="result in results" :key="result.id">
          <th scope="row">{{ result.id }}</th>
          <td>{{ result.title }}</td>
          <td>{{ result.body }}</td>
          <td>
            <button class="badge text-bg-danger" @click="remove(result)">delete</button>
            <button class="badge text-bg-primary" @click="edit(result)">edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
