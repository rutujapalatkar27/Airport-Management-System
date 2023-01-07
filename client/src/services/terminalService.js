import { BACKEND_PORT, BACKEND_URL } from "./constants"

export const fetchTerminalListService = async () => {
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
      const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/terminal/list`, options);
      const status = response.status;
      const data = await response.json();
      return { status, data };
}

// export const fetchTerminalListForAirlineService = async (airlineId) => {
//   const options = {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json' },
//   }
//   const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/flight/list/airline?airlineId=${airlineId}`, options);
//   const status = response.status;
//   const data = await response.json();
//   return { status, data };
// }


export const addTerminalService = async (terminal) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(terminal)
  }
  const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/terminal/new`, options);
  const status = response.status;
  const data = await response.json();
  return {status, data};
}

export const fetchTerminalDetailsService = async(terminal_id) => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json'},
  }
  const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/terminal/${terminal_id}`, options);
  const status = response.status;
  const data = await response.json();
  return {status, data};
}