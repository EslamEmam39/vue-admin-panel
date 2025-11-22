<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2 class="title">Create Account ✨</h2>
      <p class="subtitle">Join us and start your journey</p>

      <form @submit.prevent="register">

        <input
          v-model="name"
          type="text"
          placeholder="Full Name"
          class="input"
        />

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
        <input
          v-model="password_confirmation"
          type="password"
          placeholder="password_confirmation"
          class="input"
        />

        <button type="submit" class="btn">Register</button>

        <p class="error" v-if="error">{{ error }}</p>

        <p class="link">
          Already have an account?
          <router-link to="/login">Login</router-link>
        </p>

      </form>
    </div>
  </div>
</template>


<script>
import axios from "../axios";

export default {
  name: "RegisterPage",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      error: "",
    };
  },
  methods: {
    async register() {
      try {
        const res = await axios.post("/auth/register", {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        });

        localStorage.setItem("token", res.data.token);
        this.$router.push("/login");
      } catch (err) {
        this.error = err.response?.data?.error || "Registration failed";
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
  background: linear-gradient(135deg, #10b981, #059669);
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
}

.btn:hover {
  background: linear-gradient(135deg, #059669, #047857);
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
 