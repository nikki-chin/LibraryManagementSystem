import api from "../api.js"

export async function login(email, password) {
    const response = await api.post("auth/login",
        {
            email,
            password
        });

    const user = {
        email: response.data.email,
        role: response.data.role,
        name: response.data.name,
        id: response.data.id
    };

    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("email", user.email);
    localStorage.setItem("role", user.role);
    localStorage.setItem("name", user.name);
    localStorage.setItem("id", user.id)
    console.log("user id:", user.id);


    return user;
}

export async function logout() {
    try {
        await api.delete("/auth/logout")
    } catch (error) {
        console.log("logout fail: ", error);
    }
    finally {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        localStorage.removeItem("id");
    }

}