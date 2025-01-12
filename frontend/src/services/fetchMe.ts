export const fetchMe = async () => {
    const res = await fetch("/api/user/me");
    if (res.status === 401) {
        window.location.replace("/api/auth/github");
    }
};
