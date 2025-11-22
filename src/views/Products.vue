<template>
  <div class="products-page">
    <h1 class="title">Products Management</h1>

    <button class="back-btn" @click="goDashboard">← Back to Dashboard</button>
    <button class="add-btn" @click="openCreateModal">+ Add Product</button>

    <table class="products-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in products" :key="p.id">
          <td>{{ p.id }}</td>
          <td>{{ p.name }}</td>
          <td>${{ p.price }}</td>
          <td>{{ p.stock }}</td>
          <td>
            <span :class="p.status === 'in_stock' ? 'in-stock' : 'out-stock'">
              {{ p.status }}
            </span>
          </td>
          <td>
            <button class="edit" @click="openEditModal(p)">Edit</button>
            <button class="delete" @click="deleteProduct(p.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="pagination" v-if="meta.last_page > 1">
      <button 
        :disabled="meta.current_page === 1" 
        @click="loadProducts(meta.current_page - 1)">
        Prev
      </button>

      <button 
        v-for="page in meta.last_page" 
        :key="page"
        :class="{ active: page === meta.current_page }"
        @click="loadProducts(page)">
        {{ page }}
      </button>

      <button 
        :disabled="meta.current_page === meta.last_page" 
        @click="loadProducts(meta.current_page + 1)">
        Next
      </button>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h2>{{ editMode ? 'Edit Product' : 'Create Product' }}</h2>
        <input v-model="form.name" class="input" placeholder="Product Name" />
        <input v-model="form.price" class="input" placeholder="Price" type="number" />
        <input v-model="form.stock" class="input" placeholder="Stock" type="number" />
        <button class="save-btn" @click="saveProduct">
          {{ editMode ? 'Update' : 'Create' }}
        </button>
        <button class="close-btn" @click="closeModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axios";

export default {
  name: "ProductsPage",
  data() {
    return {
      products: [],
      meta: {
        current_page: 1,
        last_page: 1
      },
      showModal: false,
      editMode: false,
      form: { id: null, name: "", price: "", stock: "" },
    };
  },
  async created() {
    this.loadProducts();
  },
  methods: {
    async loadProducts(page = 1) {
      try {
        const res = await axios.get(`/products?page=${page}`);
        this.products = res.data.data.products;
        this.meta = res.data.data.meta;
      } catch (err) {
        console.error(err);
      }
    },

    openCreateModal() {
      this.editMode = false;
      this.form = { name: "", price: "", stock: "" };
      this.showModal = true;
    },

    openEditModal(product) {
      this.editMode = true;
      this.form = { ...product };
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },

    async saveProduct() {
      if (this.editMode) {
        await axios.put(`/products/${this.form.id}`, this.form);
      } else {
        await axios.post("/products", this.form);
      }
      this.loadProducts(this.meta.current_page);
      this.closeModal();
    },

    async deleteProduct(id) {
      if (!confirm("Are you sure?")) return;
      await axios.delete(`/products/${id}`);
      this.loadProducts(this.meta.current_page);
    },

    goDashboard() {
      this.$router.push("/dashboard");
    },
  },
};
</script>


<style scoped>
.products-page {
  padding: 30px;
  font-family: Arial, sans-serif;
}

.title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 15px;
}

.back-btn {
      float: right; 
  margin-bottom: 15px;
  padding: 8px 16px;
  background-color: #10b981; /* أخضر */
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.back-btn:hover {
  background-color: #059669;
}

.add-btn {
  padding: 10px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 20px;
}

.products-table {
  width: 100%;
  background: white;
  border-collapse: collapse;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.07);
}

.products-table th,
.products-table td {
  padding: 14px;
  border: 1px solid #e5e7eb; /* خطوط مسطرة */
  text-align: left; /* بيانات تحت رؤوسها */
}

.in-stock {
  color: green;
  font-weight: bold;
}

.out-stock {
  color: red;
  font-weight: bold;
}

.edit {
  background: #10b981;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  margin-right: 8px;
}

.delete {
  background: #ef4444;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  width: 380px;
  background: white;
  border-radius: 12px;
  padding: 25px;
  text-align: center;
}

.input {
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
}

.save-btn {
  background: #2563eb;
  padding: 12px;
  width: 100%;
  color: white;
  border: none;
  border-radius: 8px;
  margin-bottom: 10px;
}

.close-btn {
  background: #6b7280;
  padding: 10px;
  width: 100%;
  color: white;
  border: none;
  border-radius: 8px;
}

.pagination {
  margin-top: 20px;
}
.pagination button {
  margin: 0 5px;
  padding: 6px 12px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
}
.pagination button.active {
  background: #3b82f6;
  color: white;
}
.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
