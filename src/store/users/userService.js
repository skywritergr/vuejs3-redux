export const getUsersPromise = async () => {
  const userPromise = fetch("https://gorest.co.in/public/v2/users", {
    headers: new Headers({
      Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`,
    }),
  });

  return userPromise;
};

export const getAddUserPromise = async (user) => {
  const addedUserPromise = await fetch("https://gorest.co.in/public/v2/users", {
    method: "POST",
    body: JSON.stringify(user),
    headers: new Headers({
      Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
  });

  return addedUserPromise;
};

export const getUpdatedRowPromise = async (user) => {
  const updatedRowPromise = await fetch(
    `https://gorest.co.in/public/v2/users/${user.id}`,
    {
      method: "PATCH",
      body: JSON.stringify(user),
      headers: new Headers({
        Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    }
  );
  return updatedRowPromise;
};
