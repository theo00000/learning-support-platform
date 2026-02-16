export const isAuthenticated = () => {
  // Mengecek apakah ada token yang tersimpan setelah login
  const token = localStorage.getItem("token");

  // Mengembalikan true jika token ada, false jika tidak ada
  return !!token;
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  try {
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};
