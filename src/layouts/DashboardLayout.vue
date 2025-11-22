<template>
  <div class="dashboard-wrapper">

    <!-- Sidebar -->
    <aside class="sidebar">
            <h2 class="sidebar">Hi, {{ userName }}</h2>
      <!-- Links في أول الـ Sidebar -->
      <ul class="nav-links">
        <li><router-link to="/dashboard" active-class="active-link">Dashboard</router-link></li>
        <li><router-link to="/products" active-class="active-link">Products</router-link></li>
        <li><router-link to="/orders" active-class="active-link">Orders</router-link></li>
        <li><router-link to="/profile" active-class="active-link">Profile</router-link></li>
      </ul>

      <!-- اسم المستخدم -->
 

      <!-- زر Logout في الأسفل -->
      <button class="logout-btn" @click="logout">Logout</button>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <router-view />
    </main>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "User" // افتراضي، ممكن تجيب الاسم من localStorage أو API
    };
  },
  created() {
    const storedName = localStorage.getItem("user_name");
    if (storedName) this.userName = storedName;
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user_name");
      this.$router.push("/login");
    }
  }
}
</script>

<style scoped>
.dashboard-wrapper {
  display: flex;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

/* Sidebar */
.sidebar {
  width: 220px;
  background-color: #1f2937;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
 
}

.sidebar-title {
  font-size: 18px;
  font-weight: bold;
  margin: 20px 0;
}

.nav-links {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
}

.nav-links li {
  margin-bottom: 15px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.nav-links a.active-link {
  color: #10b981;
  font-weight: bold;
}

/* Logout */
.logout-btn {
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #dc2626;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 30px;
  background-color: #f9fafb;
}
</style>
