import axios from "axios";
import { config } from "./Constants";
const API_URL = config.url;
// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

// PRODUCTS
export async function fetchAllProducts() {
  try {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function addNewProduct(productObj) {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productObj }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteProduct(productId) {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateProduct(productId, updateObj) {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateObj),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getMe() {
  try {
    const response = await fetch(`${API_URL}/users/me`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function loginUser(username, password) {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function registerUser(username, password, email) {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function logoutUser() {
  try {
    const response = await fetch(`${API_URL}/users/logout`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// export async function processPayment() {
//   try {
//     await fetch(`${api_url}`)
//   } catch (error) {
//     throw error;
//   }
// }

export async function getAllUsers() {
  try {
    const response = await fetch(`${API_URL}/users`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function giveAdminToUserId(id) {
  try {
    const response = await fetch(`${API_URL}/users/admin/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// Cart fetches

export async function addItemToCart({ productId, quantity }) {
  try {
    const response = await fetch(`${API_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function removeItemFromCart(productId) {
  try {
    const response = await fetch(`${API_URL}/cart/${productId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateItemQuantity(productId, quantity) {
  try {
    const response = await fetch(`${API_URL}/cart/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: quantity }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function clearAllItemsInCart() {
  try {
    const response = await fetch(`${API_URL}/cart`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function adminClearUserCart(userId) {
  try {
    const response = await fetch(`${API_URL}/cart/admin/${userId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(id) {
  try {
    const response = await fetch(`${API_URL}/users/admin/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateUser(updateUser) {
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateUser),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}
