<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2 class="title">Welcome Back 👋</h2>
      <p class="subtitle">Login to your account</p>

      <form @submit.prevent="login">

        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="input"
        />

        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="input"
        />

        <button class="btn" type="submit">Login</button>

        <p class="error" v-if="error">{{ error }}</p>

        <p class="link">
          Don't have an account?
          <router-link to="/register">Create one</router-link>
        </p>

      </form>
    </div>
  </div>
</template>

<script>
import axios from "../axios";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      try {
        const res = await axios.post("/auth/login", {
          email: this.email,
          password: this.password,
        });

        localStorage.setItem("token", res.data.token);

        localStorage.setItem("user_name", res.data.user.name);

        this.$router.push("/dashboard");
      } catch (err) {
        this.error = err.response?.data?.error || "Login failed";
      }
    },
  },
};
</script>



<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f3f4f6;
}

.auth-card {
  background: white;
  width: 380px;
  padding: 35px;
  border-radius: 14px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.title {
  font-size: 26px;
  margin-bottom: 5px;
  font-weight: bold;
  color: #111827;
}

.subtitle {
  margin-bottom: 25px;
  color: #6b7280;
}

.input {
  width: 100%;
  padding: 12px;
  margin-bottom: 14px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: #f9fafb;
  font-size: 15px;
}

.input:focus {
  outline: none;
  border-color: #6366f1;
  background: white;
}

.btn {
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  border: none;
  color: white;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
}

.btn:hover {
  background: linear-gradient(135deg, #4f46e5, #4338ca);
}

.error {
  color: red;
  margin-top: 10px;
}

.link {
  margin-top: 15px;
  color: #6b7280;
}
</style>