import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  queue: [],
  currentOrder: null,
  maxQueueSize: 3,
  customerIdCounter: 0,
  totalCustomers: 0,
  satisfiedCustomers: 0,
  dissatisfiedCustomers: 0,
  averageWaitTime: 0,
  averageSatisfaction: 100
};

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    addCustomer: (state, action) => {
      if (state.queue.length < state.maxQueueSize) {
        const customer = {
          id: ++state.customerIdCounter,
          name: action.payload.name || `Customer ${state.customerIdCounter}`,
          avatar: action.payload.avatar || 'default',
          order: action.payload.order,
          patience: action.payload.patience || 100,
          maxPatience: action.payload.patience || 100,
          arrivalTime: Date.now(),
          satisfaction: 100,
          isVIP: action.payload.isVIP || false,
          specialRequests: action.payload.specialRequests || []
        };

        state.queue.push(customer);
        state.totalCustomers += 1;
      }
    },

    removeCustomer: (state, action) => {
      const customerId = action.payload;
      state.queue = state.queue.filter(customer => customer.id !== customerId);
    },

    updateCustomerPatience: (state, action) => {
      const { customerId, patienceChange } = action.payload;
      const customer = state.queue.find(c => c.id === customerId);

      if (customer) {
        customer.patience = Math.max(0, Math.min(customer.maxPatience, customer.patience + patienceChange));

        // Update satisfaction based on patience
        customer.satisfaction = (customer.patience / customer.maxPatience) * 100;

        // Remove customer if patience reaches 0
        if (customer.patience <= 0) {
          state.dissatisfiedCustomers += 1;
          state.queue = state.queue.filter(c => c.id !== customerId);
        }
      }
    },

    serveCustomer: (state, action) => {
      const { customerId, orderQuality } = action.payload;
      const customer = state.queue.find(c => c.id === customerId);

      if (customer) {
        const waitTime = Date.now() - customer.arrivalTime;
        const satisfactionBonus = orderQuality >= 80 ? 20 : orderQuality >= 60 ? 10 : 0;

        customer.satisfaction = Math.min(100, customer.satisfaction + satisfactionBonus);

        // Update statistics
        state.satisfiedCustomers += 1;
        state.averageWaitTime = ((state.averageWaitTime * (state.satisfiedCustomers - 1)) + waitTime) / state.satisfiedCustomers;
        state.averageSatisfaction = ((state.averageSatisfaction * (state.satisfiedCustomers - 1)) + customer.satisfaction) / state.satisfiedCustomers;

        // Remove served customer
        state.queue = state.queue.filter(c => c.id !== customerId);
      }
    },

    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },

    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },

    updateQueueSize: (state, action) => {
      state.maxQueueSize = Math.max(1, Math.min(5, action.payload));
    },

    resetCustomers: (state) => {
      Object.assign(state, initialState);
    },

    generateOrder: (state, action) => {
      const difficulty = action.payload.difficulty || 1;
      const ingredients = ['burger', 'fries', 'drink', 'salad', 'pizza', 'pasta', 'steak', 'fish'];
      const cookingMethods = ['grill', 'fry', 'bake', 'boil', 'steam'];

      // Generate order based on difficulty
      const numIngredients = Math.min(ingredients.length, 1 + difficulty);
      const selectedIngredients = ingredients
        .sort(() => Math.random() - 0.5)
        .slice(0, numIngredients);

      const order = {
        id: Date.now(),
        ingredients: selectedIngredients,
        cookingMethod: cookingMethods[Math.floor(Math.random() * cookingMethods.length)],
        timeLimit: 30 + (difficulty * 10), // seconds
        specialInstructions: difficulty > 2 ? ['well-done', 'extra-spicy', 'no-salt'][Math.floor(Math.random() * 3)] : null,
        points: 100 * difficulty
      };

      return order;
    }
  }
});

export const {
  addCustomer,
  removeCustomer,
  updateCustomerPatience,
  serveCustomer,
  setCurrentOrder,
  clearCurrentOrder,
  updateQueueSize,
  resetCustomers,
  generateOrder
} = customerSlice.actions;

export default customerSlice.reducer;