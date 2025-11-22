<template>
  <div class="profile-page">
    <h1 class="title">My Profile</h1>

    
    <div v-if="successMsg" class="success-msg">{{ successMsg }}</div>
    <div v-if="errorMsg" class="error-msg">{{ errorMsg }}</div>

    <div class="profile-card">
      <label>Name:</label>
      <input v-model="form.name" class="input" placeholder="Your Name" />

      <label>Email:</label>
      <input v-model="form.email" class="input" placeholder="Your Email" />

      <hr />

      <label>Current Password:</label>
      <input v-model="form.current_password" class="input" type="password" placeholder="Current Password" />

      <label>New Password:</label>
      <input v-model="form.new_password" class="input" type="password" placeholder="New Password" />

      <label>Confirm New Password:</label>
      <input v-model="form.new_password_confirmation" class="input" type="password" placeholder="Confirm New Password" />

      <button class="save-btn" @click="updateProfile">Update Profile</button>
    </div>
  </div>
</template>

<script>
import axios from "../axios"; // axios معد مسبقًا مع التوكن

export default {
  name: "ProfilePage",
  data() {
    return {
      form: {
        name: "",
        email: "",
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      },

        successMsg: "",
      errorMsg: "",
    };

  },
  created() {
    this.loadProfile();
  },
  methods: {
    async loadProfile() {
      try {
        const res = await axios.get("/auth/me");
        this.form.name = res.data.data.name;
        this.form.email = res.data.data.email;
      } catch (err) {
        console.error(err);
        alert("Failed to load profile");
      }
    },

    async updateProfile() {
      try {
        // إرسال البيانات للباك
        await axios.put("/auth/me", this.form);
          this.successMsg = "Profile updated successfully!";
        this.errorMsg = "";

        // تحديث اسم المستخدم في Sidebar
        localStorage.setItem("user_name", this.form.name);

        // مسح حقول الباس
        this.form.current_password = "";
        this.form.new_password = "";
        this.form.new_password_confirmation = "";

                setTimeout(() => {
          this.successMsg = "";
        }, 3000);
      } catch (err) {
        console.error(err);
        // عرض رسائل الخطأ القادمة من الباك
        if (err.response?.data?.errors) {
          const messages = Object.values(err.response.data.errors).flat().join("\n");
          alert(messages);
        } else {
          alert("Failed to update profile");
        }
      }
    },
  },
};
</script>

<style scoped>
.profile-page {
  padding: 30px;
}
.title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
}
.profile-card {
  max-width: 400px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.07);
}
.input {
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
}
.save-btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: white;
  cursor: pointer;
}
.save-btn:hover {
  background: #1d4ed8;
}
hr {
  margin: 20px 0;
  border: 1px solid #e5e7eb;
}


.success-msg {
  background-color: #10b981;
  color: white;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: center;
}

.error-msg {
  background-color: #ef4444;
  color: white;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: center;
}
</style>
