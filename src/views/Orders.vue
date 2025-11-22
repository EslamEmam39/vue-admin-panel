 <template>
  <div class="orders-page">

    <h1 class="title">Orders Management</h1>

    <!-- زرار العودة للداشبورد -->
    <button class="back-btn" @click="goDashboard">← Back to Dashboard</button>

    <!-- Orders Table -->
    <table class="orders-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Order Number</th>
          <th>Total</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.order_number }}</td>
          <td>${{ order.total }}</td>
          <td>{{ order.address }}</td>
          <td>{{ order.phone }}</td>
          <td>
            <button class="view" @click="openDetails(order)">View</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="close">
      <div class="modal">
        <h2>Order Details #{{ selected.order_number }}</h2>
        <p><strong>Total:</strong> ${{ selected.total }}</p>
        <p><strong>Address:</strong> {{ selected.address }}</p>
        <p><strong>Phone:</strong> {{ selected.phone }}</p>

        <!-- عرض المنتجات -->
        <div v-if="selected.items && selected.items.length">
          <h3 class="items-title">Items</h3>
          <table class="items-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in selected.items" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.quantity }}</td>
                <td>${{ item.price }}</td>
                <td>${{ item.subtotal }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button class="close-btn" @click="close">Close</button>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "../axios";

export default {
  name: "OrdersPage",
  data() {
    return {
      orders: [],
      showModal: false,
      selected: {},
    };
  },
  async created() {
    this.loadOrders();
  },
  methods: {
    async loadOrders() {
      try {
        const res = await axios.get("/orders");
        this.orders = res.data.data;
      } catch (err) {
        console.log(err);
      }
    },

    async openDetails(order) {
      try {
        const res = await axios.get(`/orders/${order.id}`);
        this.selected = res.data.data;
        this.showModal = true;
      } catch (err) {
        console.log(err);
      }
    },

    close() {
      this.showModal = false;
      this.selected = {};
    },

    goDashboard() {
      this.$router.push("/dashboard");
    },
  },
};
</script>

<style scoped>
.orders-page {
  padding: 30px;
  font-family: Arial, sans-serif;
}

.title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* جدول الطلبات */
.orders-table,
.items-table {
  width: 100%;
  border-collapse: collapse; 
  background: #fff;
  margin-bottom: 20px;
  box-shadow: 0 6px 18px rgba(0,0,0,.05);
}

.orders-table th,
.orders-table td,
.items-table th,
.items-table td {
  border: 1px solid #e5e7eb; 
  padding: 12px 15px;         
  text-align: left;           
}

.orders-table th,
.items-table th {
  background-color: #f3f4f6; 
  font-weight: 600;
}

/* زرار عرض التفاصيل */
.view {
  padding: 6px 14px;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

/* المودال */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  width: 500px;
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,.1);
}

.close-btn {
  width: 100%;
  padding: 12px;
  background: #6b7280;
  color: white;
  border: none;
  border-radius: 6px;
  margin-top: 20px;
  cursor: pointer;
}

.items-title {
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: bold;
}

.back-btn {
  float: right; 
  margin-bottom: 15px;
  padding: 8px 16px;
  background-color: #10b981; 
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.back-btn:hover {
  background-color: #059669;
}
</style>
