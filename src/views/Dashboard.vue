<template>
  <div class="dashboard-wrapper">

    <!-- Sidebar -->

    <!-- Main Content -->
    <main class="main-content">
      <h1 class="dashboard-title">Dashboard Overview</h1>

      <div class="stats-grid">

        <!-- Total Products -->
        <div class="stat-card blue">
          <h3>Total Products</h3>
          <p class="number">{{ totals.products }}</p>
        </div>

        <!-- Total Orders -->
        <div class="stat-card green">
          <h3>Total Orders</h3>
          <p class="number">{{ totals.orders }}</p>
        </div>

      </div>
    </main>
    
  </div>
</template>
<script>
import axios from "../axios";

export default {
  name: "DashboardPage",
  data() {
    return {
     totals: {
      products: 0,
      orders: 0
    }
    };
  },
  async created() {
    try {
      const res = await axios.get("/dashboard");
      this.totals = res.data.data.data;
      console.log(this.totals);
    } catch (err) {
      console.log(err);
      this.$router.push("/login");
    }
  },
};
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
}

.sidebar-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.nav-links {
  list-style: none;
  padding: 0;
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

/* Main Content */
.main-content {
  flex: 1;
  padding: 30px;
  background-color: #f9fafb;
}

.dashboard-title {
  font-size: 28px;
  margin-bottom: 20px;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-card {
  padding: 20px;
  border-radius: 12px;
  color: white;
}

.stat-card.blue {
  background-color: #3b82f6;
}

.stat-card.green {
  background-color: #10b981;
}

.number {
  font-size: 32px;
  font-weight: bold;
  margin-top: 10px;
}
</style>
