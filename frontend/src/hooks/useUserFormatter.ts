export function useUserFormatter() {
  function getUsername(user: { firstName: string; lastName: string }) {
    const { firstName, lastName } = user;
    const username = `${firstName} ${lastName}`;

    return username;
  }

  return { getUsername };
}
